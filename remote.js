const $ = s => document.querySelector(s);
const app = $('#app');
const codeInput = $('#pairCode');
const nameInput = $('#deviceName');
const toast = $('#toast');
const q = new URLSearchParams(location.search);
let peer = null;
let conn = null;
let paired = false;
let device = 'Mobile Device';
let room = q.get('room') || '';

function showToast(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
function formatCode(value){const d=String(value||'').replace(/\D/g,'').slice(0,9);return d.replace(/(\d{3})(?=\d)/g,'$1 ').trim()}
function rawCode(){return codeInput.value.replace(/\D/g,'')}
function setStatus(text, detail, ok=false){$('#statusText').textContent=text;$('#statusDetail').textContent=detail||'';$('#statusDot').classList.toggle('ok',ok)}
function setRoom(value){room=String(value||''); if(room){$('#roomHeading').textContent=`Room ${room} • Device Controller`;$('#connectHeading').textContent=`Connect to Room ${room}`;document.title=`Grand Floridian • Room ${room}`}}
function detectDevice(){try{if(/iPhone/i.test(navigator.userAgent))return 'iPhone';if(/iPad/i.test(navigator.userAgent))return 'iPad';if(/Android/i.test(navigator.userAgent))return 'Android Device';}catch{}return 'Mobile Device'}
function send(data){if(!paired||!conn||!conn.open){showToast('Not connected');return false}try{conn.send(data);return true}catch{showToast('Connection error');return false}}

codeInput.addEventListener('input',()=>codeInput.value=formatCode(codeInput.value));
device=detectDevice();nameInput.value=device;
if(q.get('code'))codeInput.value=formatCode(q.get('code'));
setRoom(room);

async function connect(){
  const code=rawCode();
  if(code.length!==9){showToast('Enter the 9-digit session ID');return}
  if(!window.Peer){showToast('Pairing service did not load');return}
  device=(nameInput.value||device).trim()||'Mobile Device';
  setStatus('Connecting…','Finding the Resort TV session.');
  try{if(peer)peer.destroy()}catch{}
  peer=new Peer(undefined,{host:'0.peerjs.com',port:443,secure:true,path:'/',debug:1});
  peer.on('open',()=>{
    conn=peer.connect(`gftv-${code}`,{reliable:true,serialization:'binary',metadata:{device}});
    conn.on('open',()=>{conn.send({type:'pair',code,device});});
    conn.on('data',data=>{
      if(!data||typeof data!=='object')return;
      if(data.type==='pair-result'){
        if(!data.ok){showToast(data.error||'Could not pair');setStatus('Not connected','Check the session ID and try again.');return}
        paired=true;setRoom(data.room);app.classList.add('connected');setStatus(`Connected to Room ${data.room}`,`${device} is ready to send media.`,true);showToast('Connected');
      } else if(data.type==='error'){showToast(data.message||'Command failed')}
      else if(data.type==='receiver-cleared'){showToast('Returned to Resort TV')}
    });
    conn.on('close',()=>{paired=false;app.classList.remove('connected');setStatus('Disconnected','The Resort TV connection was closed.');});
    conn.on('error',()=>{paired=false;setStatus('Connection error','Try again or use another network.');});
  });
  peer.on('error',err=>{paired=false;setStatus('Could not connect',err?.type==='peer-unavailable'?'That session is not currently online.':'Try again or use another network.');showToast('Could not connect')});
}

$('#pairButton').onclick=connect;
if(q.get('code'))setTimeout(connect,300);
$('#youtubeButton').onclick=()=>{const url=$('#youtubeUrl').value.trim();if(!url){showToast('Paste a YouTube link');return}if(send({type:'youtube',url,title:'YouTube'}))showToast('Sent to TV')};
document.querySelectorAll('[data-control]').forEach(button=>button.onclick=()=>send({type:'command',action:button.dataset.control}));
$('#clearButton').onclick=()=>{if(send({type:'clear'}))showToast('Returned to Resort TV')};
let volumeTimer;$('#volume').oninput=e=>{clearTimeout(volumeTimer);volumeTimer=setTimeout(()=>send({type:'command',action:'volume',value:Number(e.target.value)}),80)};
$('#mediaFile').onchange=async e=>{
  const file=e.target.files?.[0];if(!file||!paired)return;
  if(file.size>75*1024*1024){showToast('Please use a file under 75 MB');e.target.value='';return}
  let mediaType='';if(file.type.startsWith('image/'))mediaType='image';else if(file.type.startsWith('video/'))mediaType='video';else if(file.type.startsWith('audio/'))mediaType='audio';
  if(!mediaType){showToast('Unsupported file type');return}
  $('#sending').classList.add('on');
  try{conn.send({type:'media',mediaType,name:file.name,mime:file.type,blob:file});showToast('Sent to TV')}catch{showToast('Could not send file')}
  setTimeout(()=>$('#sending').classList.remove('on'),900);
};
