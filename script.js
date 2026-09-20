
const CONFIG = {
  familyName: "Guest Name",
  roomNumber: "7229",
  temperature: "82°F",
  useLiveClock: true,
  useLiveDate: true,
  fixedTime: "4:10 PM",
  fixedDate: "SATURDAY, AUGUST 15TH, 2026",
  musicVolume: 0.48,
};

function randomDigits(length) {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, value => String(value % 10)).join("");
}

function getOrCreateCloudSession() {
  const key = "grand-floridian-cloud-session-v1";
  try {
    const existing = JSON.parse(sessionStorage.getItem(key) || "null");
    if (existing && /^\d{4}$/.test(existing.room) && /^\d{9}$/.test(existing.code)) return existing;
  } catch {}
  const room = String(1000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 9000));
  const code = randomDigits(9);
  const created = { room, code };
  try { sessionStorage.setItem(key, JSON.stringify(created)); } catch {}
  return created;
}

const CLOUD_SESSION = getOrCreateCloudSession();
CONFIG.roomNumber = CLOUD_SESSION.room;


const HOTEL_DETAILS = {
  "Dining": {
    title: "Dining",
    description: "Signature restaurants, lively lounges and quick-service favorites are all just steps from your room at Disney's Grand Floridian Resort & Spa.",
    hero: "https://dixiedelightsonline.com/wp-content/uploads/2023/12/20230409070856-scaled.jpg",
    heroAlt: "Dining room at Disney's Grand Floridian Resort & Spa",
    glance: [
      "1900 Park Fare, Grand Floridian Café and Gasparilla Island Grill are easy resort favorites.",
      "Enjoy celebrated signature dining at Cítricos, Narcoossee's and Victoria & Albert's.",
      "The Enchanted Rose lounge is ideal for cocktails, small plates and a polished evening atmosphere.",
      "Dining hours and reservation availability can change throughout the day."
    ],
    highlights: [
      { title: "Character Meals", text: "1900 Park Fare blends buffet favorites with character appearances in a grand Victorian setting." },
      { title: "Signature Evenings", text: "Cítricos, Narcoossee's and Victoria & Albert's offer the resort's most elevated dinner experiences." },
      { title: "Quick & Casual", text: "Gasparilla Island Grill covers breakfast, sandwiches, treats and late-night bites with mobile-order convenience." }
    ],
    noteTitle: "Helpful Tip",
    note: "For the smoothest experience, check today's dining hours first and make advance dining reservations for the signature restaurants whenever possible."
  },
  "Pools": {
    title: "Pools",
    description: "Choose between the lively Beach Pool, the quieter Courtyard Pool and family-friendly splash areas designed for a relaxing resort day.",
    hero: "https://images.squarespace-cdn.com/content/v1/64d1019731f2a4291586bdb5/2176b5d9-e939-4f96-b287-c1506c55837d/232-Blog-Grand-Floridian-Beach-Pool.jpg",
    heroAlt: "Grand Floridian Beach Pool",
    glance: [
      "The Beach Pool features the waterslide and pool bar area.",
      "The Courtyard Pool offers a quieter setting closer to the main buildings.",
      "A water play area provides extra fun for younger guests.",
      "Pool hours and lifeguard coverage may vary by day and weather conditions."
    ],
    highlights: [
      { title: "Beach Pool", text: "The main feature pool is the resort's most energetic swim spot, with easy access to snacks and drinks nearby." },
      { title: "Courtyard Pool", text: "This more relaxed pool area is ideal when you want a calmer atmosphere for a quieter swim." },
      { title: "Family Extras", text: "Look for nearby cabanas, deck seating and the whimsical Alice in Wonderland water play area." }
    ],
    noteTitle: "Good to Know",
    note: "Weather can affect pool operations, so it's always worth confirming current availability before heading down with towels and swim gear."
  },
  "Shops": {
    title: "Shops",
    description: "Browse elegant resort gifts, Disney merchandise and practical travel essentials without ever leaving Disney's Grand Floridian Resort & Spa.",
    hero: "https://flyingoffthebookshelf.com/wp-content/uploads/2025/05/M-Mouse-Mercantile-900x643.jpg",
    heroAlt: "M. Mouse Mercantile shop at the Grand Floridian",
    glance: [
      "M. Mouse Mercantile offers plush, apparel, pins and classic Walt Disney World souvenirs.",
      "Curiouser Clothiers focuses on upscale apparel, accessories and resort-style finds.",
      "Sandy Cove Gifts & Sundries is handy for snacks, sundries and in-room essentials.",
      "Merchandise assortment can shift seasonally and throughout the day."
    ],
    highlights: [
      { title: "Disney Merchandise", text: "Pick up character apparel, accessories, home goods and last-minute gifts close to the lobby." },
      { title: "Resort Style", text: "Grand Floridian shops often feel a little dressier, matching the resort's Victorian-inspired atmosphere." },
      { title: "Convenience Items", text: "Forgot something? The resort shops are also useful for snacks, medicine basics and travel essentials." }
    ],
    noteTitle: "Shopping Tip",
    note: "If you see a limited-edition item you love, grab it while it's available—popular resort merchandise can change quickly."
  },
  "Activities": {
    title: "Activities",
    description: "Grand Floridian activities mix laid-back resort fun with classic Walt Disney World evening entertainment along the Seven Seas Lagoon.",
    hero: "https://images.squarespace-cdn.com/content/v1/6174eb718b498d5bdd30394e/a5fd84c5-4392-480c-aeac-a8b7ee5d0c65/PXL_20250302_223744912.jpg",
    heroAlt: "Grand Floridian resort activities outdoors",
    glance: [
      "Movies Under the Stars and campfire-style evenings are common family favorites.",
      "Many guests enjoy watching the Electrical Water Pageant from the lagoon side of the resort.",
      "Marina and recreation offerings can include boat rentals or additional water activities.",
      "Schedules vary by day, weather and season."
    ],
    highlights: [
      { title: "Evening Entertainment", text: "Relax outdoors for Disney movies and lagoon-area nighttime entertainment around the resort grounds." },
      { title: "Lagoon Recreation", text: "The marina area adds a scenic starting point for water-based fun and extra downtime away from the parks." },
      { title: "Family Friendly", text: "These activities are designed to feel easy, low-stress and resort-focused for all ages." }
    ],
    noteTitle: "Planning Tip",
    note: "Check the daily resort activities schedule once you arrive—times and locations are the easiest way to catch evening offerings without missing them."
  },
  "Spa & Fitness": {
    title: "Spa & Fitness",
    description: "Recharge with a serene spa atmosphere, wellness treatments and fitness options designed to complement a polished Grand Floridian stay.",
    hero: "https://dixiedelightsonline.com/wp-content/uploads/2023/11/IMG_5421-scaled.jpg",
    heroAlt: "The Grand Floridian Spa relaxation area",
    glance: [
      "The Grand Floridian Spa offers treatments, relaxation spaces and a luxurious wellness atmosphere.",
      "The fitness center supports independent workouts with cardio and strength equipment.",
      "Some services may require appointments or advance booking.",
      "Spa and fitness hours can be different from pool and recreation hours."
    ],
    highlights: [
      { title: "Spa Treatments", text: "Massage and beauty-focused services help turn a resort break into a true rest day." },
      { title: "Wellness Space", text: "Expect a calm setting with elegant décor that feels in line with the Grand Floridian's signature style." },
      { title: "Fitness Center", text: "Work out on your own schedule with the resort's fitness room and standard exercise equipment." }
    ],
    noteTitle: "Reservation Tip",
    note: "Spa appointments are best arranged ahead of time, especially on weekends or during busier travel periods."
  },
  "Transportation": {
    title: "Transportation",
    description: "Grand Floridian transportation puts Magic Kingdom-area convenience front and center, with multiple routes available throughout your stay.",
    hero: "https://www.dvcresaleexperts.com/wp-content/uploads/2020/06/Grand-Floridian-1.jpg",
    heroAlt: "Monorail by Disney's Grand Floridian Resort",
    glance: [
      "The Resort Monorail offers direct access to Magic Kingdom-area destinations.",
      "Water launches connect the resort with Magic Kingdom across Seven Seas Lagoon.",
      "Bus transportation serves the remaining theme parks, water parks and Disney Springs.",
      "Travel times vary with weather, demand and operating conditions."
    ],
    highlights: [
      { title: "Monorail Access", text: "One of the biggest Grand Floridian perks is the ease of hopping on the monorail for a polished arrival and departure experience." },
      { title: "Boat Service", text: "Watercraft service adds a scenic alternative when heading toward Magic Kingdom." },
      { title: "Bus Network", text: "For EPCOT, Hollywood Studios, Animal Kingdom and more, buses round out the full resort transportation mix." }
    ],
    noteTitle: "Transit Tip",
    note: "If timing matters, build in a little buffer—transportation is frequent, but boats, buses and monorails can all be affected by weather or peak demand."
  },
  "Guest Services": {
    title: "Guest Services",
    description: "From front desk support to housekeeping assistance, Grand Floridian guest services are there to help throughout your vacation.",
    hero: "https://images.squarespace-cdn.com/content/v1/58520a4e37c58186144df0cf/f562b2fd-c873-4729-81f9-ec82f0c1c4cf/disney-grand-floridian-check-in-2026.jpeg",
    heroAlt: "Grand Floridian front desk and guest services",
    glance: [
      "Front desk and lobby cast members can help with room questions and resort information.",
      "Bell Services assists with luggage support and arrival/departure logistics.",
      "Housekeeping-related needs can be coordinated during your stay.",
      "For additional assistance, check with the lobby or guest-services area first."
    ],
    highlights: [
      { title: "Front Desk Help", text: "Need room assistance, directions or a quick resort answer? The front desk is still the easiest first stop." },
      { title: "Stay Support", text: "Extra towels, housekeeping questions and in-room needs can usually be routed through guest services." },
      { title: "Arrival & Departure", text: "Bell Services helps streamline luggage handling so check-in and checkout feel smoother." }
    ],
    noteTitle: "Need Assistance?",
    note: "If you are unsure where to start, the front desk can usually route you to the right cast member for transportation, housekeeping, dining or reservation questions."
  }
};

const RESTAURANT_DETAILS = {
  "1900 Park Fare": {
    service: "Character Dining • Buffet",
    badge: "CHARACTER DINING",
    bestFor: "Breakfast & Dinner",
    hours: "Breakfast 8:00 AM–12:00 PM • Dinner 4:00 PM–9:00 PM",
    status: "Open",
    summary: "A whimsical Victorian buffet where Disney Characters celebrate the magical power of a wish with families over breakfast and dinner.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2025/02/20250215085858-scaled.jpg"
  },
  "Cítricos": {
    service: "Signature Dining • Table Service",
    badge: "SIGNATURE DINING",
    bestFor: "Dinner",
    hours: "Dinner 5:00 PM–9:30 PM",
    status: "Open • Hosting temporary brunch service during Grand Floridian Cafe refurbishment",
    summary: "An elegant dinner experience inspired by Mary Poppins Returns, with a refined menu and a softly whimsical dining room.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/08/20220502075130-scaled.jpg"
  },
  "Cítricos Lounge": {
    service: "Lounge",
    badge: "LOUNGE",
    bestFor: "Drinks Before Dinner",
    hours: "See today's Disney schedule",
    status: "Open",
    summary: "A polished lounge attached to Cítricos, ideal for wine, cocktails and a quieter pre-dinner stop in the main building.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/01/20210930174711-scaled.jpg"
  },
  "Narcoossee's": {
    service: "Signature Dining • Seafood",
    badge: "SIGNATURE DINING",
    bestFor: "Waterfront Dinner",
    hours: "Dinner 5:00 PM–9:30 PM",
    status: "Open",
    summary: "A waterfront seafood restaurant on Seven Seas Lagoon with panoramic views and an upscale coastal menu.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/01/20210928141839-scaled.jpg"
  },
  "Grand Floridian Cafe": {
    service: "Casual Table Service",
    badge: "TEMPORARILY CLOSED",
    bestFor: "Brunch Classics",
    hours: "Closed for refurbishment through October 2026",
    status: "Temporarily closed • Brunch offerings moved to Cítricos",
    summary: "A relaxed Victorian-inspired café known for American brunch and comfort-food favorites. It is temporarily closed for refurbishment during this period.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/01/20211002093344-scaled.jpg"
  },
  "Enchanted Rose": {
    service: "Lounge • Bar Service",
    badge: "LOUNGE",
    bestFor: "Cocktails & Small Plates",
    hours: "12:00 PM–11:00 PM",
    status: "Open",
    summary: "A Beauty and the Beast-inspired lounge with elegant rooms, crafted cocktails, appetizers and a distinctive golden-chandelier bar.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2021/02/20201123163114-scaled.jpg"
  },
  "Gasparilla Island Grill": {
    service: "Quick Service • Mobile Order",
    badge: "QUICK SERVICE",
    bestFor: "All-Day Casual Meals",
    hours: "6:00 AM–12:00 AM",
    status: "Open",
    summary: "The resort's go-to casual option for breakfast, flatbreads, sandwiches, burgers, bakery treats and late-night bites.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/09/20220717071937-scaled.jpg"
  },
  "Beaches Pool Bar & Grill": {
    service: "Pool Bar • Quick Service",
    badge: "POOL BAR",
    bestFor: "Lunch by the Beach Pool",
    hours: "Typically daytime and early evening",
    status: "Open",
    summary: "A relaxed gazebo bar by the Beach Pool serving cocktails, American snacks and convenient poolside food.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2019/02/IMG_1488.jpg"
  },
  "Courtyard Pool Bar": {
    service: "Pool Bar • Quick Service",
    badge: "POOL BAR",
    bestFor: "Poolside Drinks & Light Food",
    hours: "See today's Disney schedule",
    status: "Open",
    summary: "A casual poolside stop near the Courtyard Pool with drinks, wraps, salads and simple snacks without leaving the pool area.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/01/20210928141448-scaled.jpg"
  },
  "Garden View Lounge – Tea Experience": {
    service: "Afternoon Tea • Table Service",
    badge: "TEA EXPERIENCE",
    bestFor: "Afternoon Tea",
    hours: "Reservation times vary",
    status: "Open",
    summary: "A proper British afternoon tea experience with premium Twinings teas, scones, small bites and whimsical Alice in Wonderland-inspired details.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2016/05/IMG_8955.jpg"
  },
  "The Perch": {
    service: "Lobby Bar",
    badge: "LOBBY BAR",
    bestFor: "Champagne & Cocktails",
    hours: "See today's Disney schedule",
    status: "Open",
    summary: "A newer lobby bar inspired by the Grand Floridian's classic birdcage, serving champagne, wine, cocktails and a small selection of light bites.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2025/12/20251201100306-scaled.jpg"
  },
  "Victoria & Albert's": {
    service: "Fine Dining • Prix Fixe",
    badge: "FINE DINING",
    bestFor: "Special Occasions",
    hours: "One dinner seating window each evening",
    status: "Open • Advance reservations required",
    summary: "The Grand Floridian's most elevated dining experience, featuring a multi-course tasting menu, formal service and an intimate dining room.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/08/20220502075130-scaled.jpg"
  },
  "Chef’s Table at Victoria & Albert’s": {
    service: "Dining Event • Fine Dining",
    badge: "CHEF’S TABLE",
    bestFor: "Immersive Fine Dining",
    hours: "Reservation-only dinner experience",
    status: "Open • Extremely limited availability",
    summary: "An intimate Victoria & Albert's experience centered on the culinary team and a highly personalized multi-course tasting journey.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/08/20220502075130-scaled.jpg"
  },
  "Queen Victoria’s Room at Victoria & Albert’s": {
    service: "Dining Event • Fine Dining",
    badge: "QUEEN VICTORIA’S ROOM",
    bestFor: "Private-feeling Fine Dining",
    hours: "Reservation-only dinner experience",
    status: "Open • Advance reservations required",
    summary: "A more intimate Victoria & Albert's dining room offering elevated service and a refined tasting-menu experience for special occasions.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2022/08/20220502075130-scaled.jpg"
  },
  "Private Dining": {
    service: "Private Dining",
    badge: "PRIVATE DINING",
    bestFor: "In-Room & Special Requests",
    hours: "Availability varies",
    status: "Contact Disney for current availability",
    summary: "Private dining options may be available for select meals or special occasions at Disney's Grand Floridian Resort & Spa.",
    image: "https://dixiedelightsonline.com/wp-content/uploads/2023/12/20230409070856-scaled.jpg"
  }
};


const ONDEMAND_DETAILS = {
  "chairman-welcome": {
    title: "Chairman’s Welcome Message",
    category: "Disney Vacations",
    perfectFor: "Starting Your Stay",
    tagline: "A warm welcome to Walt Disney World.",
    description: "Begin your resort-TV experience with a welcoming look at the magic, destinations and experiences that make a Walt Disney World vacation special.",
    image: "assets/ondemand/chairman-custom.jpg",
    videoId: "uZr3vWmqP7A",
    videoTitle: 'Chairman’s Welcome Message',
    videoUrl: 'https://www.youtube.com/watch?v=uZr3vWmqP7A'
  },
  "magical-story": {
    title: "The Most Magical Story on Earth",
    category: "Fireworks & Stories",
    perfectFor: "Disney History Fans",
    tagline: "Celebrating the story of Walt Disney World.",
    description: "A nostalgic celebration of Walt Disney World, highlighting the places, traditions and memories that have made the resort magical across generations.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Magic_Kingdom_Cinderella_Castle_50TH.jpg",
    videoId: "35VySUD1sGo",
    videoTitle: 'The Most Magical Story on Earth',
    videoUrl: 'https://www.youtube.com/watch?v=35VySUD1sGo'
  },
  "happily-ever-after": {
    title: "Happily Ever After",
    category: "Fireworks & Stories",
    perfectFor: "A Nighttime Disney Moment",
    tagline: "Magic Kingdom fireworks spectacular.",
    description: "Relive the color, music and emotion of a Magic Kingdom nighttime spectacular centered around Cinderella Castle and beloved Disney stories.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Disneyworld_fireworks_-_0230.jpg",
    videoId: "YGppr5BM5hY",
    videoTitle: 'Happily Ever After Fireworks | Magic Kingdom',
    videoUrl: 'https://www.youtube.com/watch?v=YGppr5BM5hY'
  },
  "disney-springs": {
    title: "Disney Springs",
    category: "Disney Vacations",
    perfectFor: "Shopping, Dining & Entertainment",
    tagline: "Discover a different side of Walt Disney World.",
    description: "Explore the shopping, restaurants and entertainment that make Disney Springs a destination of its own beyond the theme parks.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/The_Springs_of_Disney_Springs_%2826476609884%29.jpg",
    videoId: "h8vI-2Ze2us",
    videoTitle: "Disney Springs",
    videoUrl: 'https://www.youtube.com/watch?v=cr9q9iya7KQ'
  },
  "drawn-to-life": {
    title: "Drawn to Life",
    category: "Fireworks & Stories",
    perfectFor: "Live Entertainment Fans",
    tagline: "Cirque du Soleil and Disney imagination together.",
    description: "Discover the creative world of Drawn to Life, where Disney animation-inspired storytelling meets the acrobatics and theatrical style of Cirque du Soleil.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Venue_for_Cirque_du_Soleil%27s_La_Nouba_at_Downtown_Disney.jpg",
    videoId: "hwQG6D14q3o",
    videoTitle: 'Drawn to Life',
    videoUrl: 'https://www.youtube.com/watch?v=o59HZvaKHdc'
  },
  "water-parks": {
    title: "Disney Water Parks",
    category: "Disney Vacations",
    perfectFor: "A Splashy Resort Day",
    tagline: "Dive into another kind of Disney day.",
    description: "Take a look at the water-park side of Walt Disney World, with wave pools, slides and relaxing ways to cool down between park days.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/WDW_Typhoon_Lagoon_Surf_Pool.JPG",
    videoId: "BvWgSflaw4Y",
    videoTitle: 'Disney Water Parks',
    videoUrl: 'https://www.youtube.com/watch?v=ySo-5ngabKI'
  },
  "stay-magical": {
    title: "Stay Magical",
    category: "Disney Vacations",
    perfectFor: "Resort & Vacation Inspiration",
    tagline: "Make the magic last beyond the parks.",
    description: "A resort-focused look at ways to make your Walt Disney World stay feel special, from relaxing hotel time to vacation-club style experiences.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Disney%27s_Grand_Floridian_Resort_%26_Spa_from_Seven_Seas_Lagoon_1.jpg",
    videoId: "hTOy9Niuk40",
    videoTitle: "Disney's Grand Floridian Resort & Spa | Walt Disney World",
    videoUrl: 'https://www.youtube.com/watch?v=myxHUTviKcQ'
  },
  "meet-genie": {
    title: "Meet Disney Genie Service",
    category: "Disney Family Wellness",
    perfectFor: "Planning Your Park Day",
    tagline: "Plan your Disney day from the My Disney Experience app.",
    description: "An introduction to Disney Genie planning tools, including My Plans and the Tip Board, designed to help organize attraction, dining and itinerary information during your visit.",
    image: "https://cache.undercovertourist.com/blog/2021/10/1021-genie-phone-in-front-of-castle-768x1064.jpg",
    videoId: "ra8xZr9fMog",
    videoTitle: 'Disney Genie Service - Full Overview',
    videoUrl: 'https://www.youtube.com/watch?v=ra8xZr9fMog'
  },
  "tip-board": {
    title: "Tip Board & My Day",
    category: "Disney Family Wellness",
    perfectFor: "Keeping Plans Organized",
    tagline: "See your Disney day at a glance.",
    description: "A quick overview of the planning features that bring attraction information, dining options and your day’s plans together in one place.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Magic_Kingdom_-_Cinderella_Castle_-_by_cdharrison.jpg",
    videoId: "u9fP50klEPE",
    videoTitle: 'Disney Genie Service - Digital Overview',
    videoUrl: 'https://www.youtube.com/watch?v=u9fP50klEPE'
  },
  "lightning-lane": {
    title: "Lightning Lane Entrances",
    category: "Disney Family Wellness",
    perfectFor: "Understanding Park Entry",
    tagline: "Learn how Lightning Lane entrances work.",
    description: "A simple overview of where Lightning Lane entrances are located and how they fit into a day of attractions at Walt Disney World.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Space_Mountain_in_the_Magic_Kingdom_in_2021.jpg",
    videoId: "pd7sw5_l1M4",
    videoTitle: 'Get to the Magic Faster with Lightning Lane Passes',
    videoUrl: 'https://www.youtube.com/watch?v=v1fUgTpjW70'
  },
  "purchasing-individually": {
    title: "Purchasing Individually",
    category: "Disney Family Wellness",
    perfectFor: "Planning Popular Attractions",
    tagline: "Learn about individual attraction access options.",
    description: "A resort-TV style explainer covering the idea of purchasing access for select high-demand attractions through Disney’s park-planning tools.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Seven_Dwarfs_Mine_Train.jpg",
    videoId: "v1fUgTpjW70",
    videoTitle: 'How To Purchase A Lightning Lane Pass',
    videoUrl: 'https://www.youtube.com/watch?v=v1fUgTpjW70'
  },
  "genie-plus-selection": {
    title: "Selecting through Disney Genie+ Service",
    category: "Disney Family Wellness",
    perfectFor: "Making Your Next Selection",
    tagline: "A quick guide to planning the next attraction.",
    description: "A simple walkthrough-style overview inspired by the resort-TV library, focused on choosing attraction experiences through Disney’s planning tools.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Disney%27s_Grand_Floridian_Resort_%26_Spa_and_Motor_Launch.jpg",
    videoId: "oVbM5hYy03g",
    videoTitle: "Choose Your Next Lightning Lane with Disney Genie+ Service",
    videoUrl: "https://www.youtube.com/watch?v=u9fP50klEPE"
  }
};

const familyName = document.getElementById("familyName");
const guestSetupOverlay = document.getElementById("guestSetupOverlay");
const guestNameInput = document.getElementById("guestNameInput");
const guestNamePreview = document.getElementById("guestNamePreview");
const guestSetupContinue = document.getElementById("guestSetupContinue");
const changeGuestButton = document.getElementById("changeGuestButton");
const roomNumber = document.getElementById("roomNumber");
const temperature = document.getElementById("temperature");
const clock = document.getElementById("clock");
const dateLine = document.getElementById("dateLine");
const fullscreenButton = document.getElementById("fullscreenButton");
const resortTv = document.getElementById("resortTv");
const menuToast = document.getElementById("menuToast");

const PARK_DETAILS = {
  "magic-kingdom": {title:"Magic Kingdom", header:"MAGIC KINGDOM", badge:"THEME PARK", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cinderella_Castle%2C_Magic_Kingdom_%282026%29_%28square_crop%29.jpg/1280px-Cinderella_Castle%2C_Magic_Kingdom_%282026%29_%28square_crop%29.jpg", summary:"The iconic castle park is all about classic Disney storytelling, beloved attractions, parades and nighttime entertainment built around Main Street, U.S.A. and seven themed lands.", bestFor:"First-time visits and classic Disney moments", signature:"Cinderella Castle and Happily Ever After", highlights:"Fantasyland, Liberty Square, Tomorrowland", location:"Magic Kingdom Resort Area", hours:"8:00 AM – 6:00 PM", hoursExtra:"Early Entry 7:30–8:00 AM • Mickey’s Not-So-Scary Halloween Party 7:00 PM–12:00 AM", officialUrl:"https://disneyworld.disney.go.com/destinations/magic-kingdom/", cards:[{label:"Attractions", title:"Storybook favorites and headline thrills", text:"Expect classics like Haunted Mansion and Pirates of the Caribbean alongside newer adventures such as TRON Lightcycle / Run."},{label:"Dining", title:"Character meals and quick-service staples", text:"From park snacks and bakery favorites to table-service restaurants inside and around the hub, there are options throughout the day."},{label:"Entertainment", title:"Parades, cavalcades and fireworks", text:"The park shines at night with castle projections, fireworks and a full day of live entertainment energy."},{label:"Good To Know", title:"Best with an early start", text:"Magic Kingdom usually rewards rope-drop mornings, especially if you want to cover multiple lands in one day."}]},
  "epcot": {title:"EPCOT", header:"EPCOT", badge:"THEME PARK", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Spaceship_Earth%2C_EPCOT.jpg/1280px-Spaceship_Earth%2C_EPCOT.jpg", summary:"EPCOT blends innovation, global culture and festival energy through World Celebration, World Discovery, World Nature and the World Showcase pavilions.", bestFor:"Food, festivals and a slower-paced park day", signature:"Spaceship Earth and World Showcase", highlights:"International pavilions, festival booths, lagoon views", location:"EPCOT Resort Area", hours:"9:00 AM – 9:00 PM", hoursExtra:"Early Entry 8:30–9:00 AM", officialUrl:"https://disneyworld.disney.go.com/destinations/epcot/", cards:[{label:"Attractions", title:"Future-forward rides and family favorites", text:"Guardians of the Galaxy: Cosmic Rewind, Soarin' Around the World and Remy's Ratatouille Adventure anchor a diverse lineup."},{label:"Dining", title:"Global menus around the lagoon", text:"Many guests visit EPCOT specifically for its international dining, festival kitchens and signature restaurants."},{label:"Entertainment", title:"Festivals and evening spectaculars", text:"Seasonal festivals give EPCOT a changing personality throughout the year, especially in World Showcase."},{label:"Good To Know", title:"Great for hopping between neighborhoods", text:"EPCOT covers a lot of ground, so comfortable pacing and a flexible plan help the most."}]},
  "hollywood-studios": {title:"Disney's Hollywood Studios", header:"HOLLYWOOD STUDIOS", badge:"THEME PARK", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/The_Twilight_Zone_Tower_of_Terror%2C_2024.jpg/1280px-The_Twilight_Zone_Tower_of_Terror%2C_2024.jpg", summary:"Disney's Hollywood Studios focuses on cinematic thrills, immersive lands and live entertainment with a strong mix of blockbuster franchises and classic park atmosphere.", bestFor:"Thrill rides and franchise-heavy park days", signature:"Tower of Terror and Galaxy's Edge", highlights:"Sunset Boulevard, Toy Story Land, Galaxy's Edge", location:"South of EPCOT", hours:"9:00 AM – 9:00 PM", hoursExtra:"Early Entry 8:30–9:00 AM", officialUrl:"https://disneyworld.disney.go.com/destinations/hollywood-studios/", cards:[{label:"Attractions", title:"A headline-heavy lineup", text:"Tower of Terror, Rock 'n' Roller Coaster, Slinky Dog Dash and Rise of the Resistance drive the park's popularity."},{label:"Dining", title:"Quick bites, themed lounges and character meals", text:"Dining is spread across themed areas, from Star Wars-inspired spaces to classic Hollywood-style spots."},{label:"Entertainment", title:"Stage shows and stunt-style energy", text:"Hollywood Studios balances ride demand with strong entertainment offerings and memorable nighttime ambiance."},{label:"Good To Know", title:"Plan key rides early", text:"This park often benefits from a deliberate ride strategy because several major attractions can build long waits quickly."}]},
  "animal-kingdom": {title:"Disney's Animal Kingdom", header:"ANIMAL KINGDOM", badge:"THEME PARK", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Tree_of_Life%2C_Disney%27s_Animal_Kingdom.jpg/1280px-Tree_of_Life%2C_Disney%27s_Animal_Kingdom.jpg", summary:"Animal Kingdom combines lush landscapes, wildlife experiences and immersive themed environments anchored by the Tree of Life and the world of Pandora.", bestFor:"Scenery, animals and immersive environments", signature:"Tree of Life and Pandora – The World of Avatar", highlights:"Kilimanjaro Safaris, Expedition Everest, Discovery Island", location:"West of Disney's Hollywood Studios", hours:"8:00 AM – 7:00 PM", hoursExtra:"Early Entry 7:30–8:00 AM", officialUrl:"https://disneyworld.disney.go.com/destinations/animal-kingdom/", cards:[{label:"Attractions", title:"Adventure and atmosphere", text:"Animal Kingdom mixes thrill rides with nature-driven experiences, giving it a slower but highly immersive rhythm."},{label:"Dining", title:"Global flavors and themed eateries", text:"The park's dining often leans adventurous, with notable quick-service favorites and scenic lounge spaces."},{label:"Entertainment", title:"Wildlife trails and discovery", text:"Live experiences, animal exhibits and land design are a major part of the appeal beyond the ride count."},{label:"Good To Know", title:"A beautiful park to explore at a steady pace", text:"Animal Kingdom is a great fit for wandering, taking photos and leaving room for trails and animal viewing."}]},
  "typhoon-lagoon": {title:"Disney's Typhoon Lagoon", header:"TYPHOON LAGOON", badge:"WATER PARK", image:"https://upload.wikimedia.org/wikipedia/commons/0/0b/WDW_Typhoon_Lagoon_Surf_Pool.JPG", summary:"Typhoon Lagoon brings tropical shipwreck theming, raft rides and one of the most recognizable wave pools in Walt Disney World.", bestFor:"Wave pool time and family slides", signature:"Surf Pool and tropical storm theming", highlights:"Lazy river, raft attractions, beach atmosphere", location:"Near Disney Springs", hours:"CLOSED", hoursExtra:"Closed for refurbishment", officialUrl:"https://disneyworld.disney.go.com/destinations/typhoon-lagoon/", cards:[{label:"Attractions", title:"Slides, rafts and surf-style fun", text:"Typhoon Lagoon is built around all-day water-park fun with a mix of body slides, group rides and quieter lounging spots."},{label:"Dining", title:"Casual water-park dining", text:"Expect snacks, quick-service meals and refreshments designed for easy breaks between attractions."},{label:"Entertainment", title:"Laid-back vacation energy", text:"The setting itself is the entertainment, with beach views, tropical detail and a strong sense of escape."},{label:"Good To Know", title:"Best on a warm-weather rest day", text:"Typhoon Lagoon works especially well as a slower alternative to a full theme-park day."}]},
  "blizzard-beach": {title:"Disney's Blizzard Beach", header:"BLIZZARD BEACH", badge:"WATER PARK", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Blizzard_Beach_Aerial_photo_%287426584544%29.jpg/1280px-Blizzard_Beach_Aerial_photo_%287426584544%29.jpg", summary:"Blizzard Beach pairs a playful melting-ski-resort concept with slides, family raft rides and a distinctive wintry-meets-sunny visual theme.", bestFor:"Water slides and ski-resort theming", signature:"Summit Plummet and snowy storytelling", highlights:"Chairlift visuals, family slides, themed mountain iconography", location:"Near Animal Kingdom area", hours:"10:00 AM – 5:00 PM", hoursExtra:"Water park hours", officialUrl:"https://disneyworld.disney.go.com/destinations/blizzard-beach/", cards:[{label:"Attractions", title:"High-energy slides and family fun", text:"Blizzard Beach has a stronger thrill-slide identity while still offering plenty for groups and more relaxed guests."},{label:"Dining", title:"Quick meals between water attractions", text:"Food options are straightforward and built around a water-park schedule rather than a full dining itinerary."},{label:"Entertainment", title:"A whimsical snowy concept", text:"The charm here comes from the playful contrast of a ski-resort look in the middle of Florida sunshine."},{label:"Good To Know", title:"Ideal if you want a slightly different vibe than Typhoon", text:"Guests often choose between the two water parks based on theming preference and favorite slide styles."}]},
  "disney-springs": {title:"Disney Springs", header:"DISNEY SPRINGS", badge:"SHOPPING & DINING", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Disney_Springs_Water_Tower_%2827690393234%29.jpg/1280px-Disney_Springs_Water_Tower_%2827690393234%29.jpg", summary:"Disney Springs is Walt Disney World's shopping, dining and entertainment district, with waterfront strolls, signature restaurants and late-night energy.", bestFor:"Shopping, restaurants and non-park evenings", signature:"Dining variety and destination shopping", highlights:"Marketplace, Town Center, live entertainment", location:"Lake Buena Vista", hours:"10:00 AM – 11:00 PM", hoursExtra:"Shopping, dining & entertainment district", officialUrl:"https://disneyworld.disney.go.com/destinations/disney-springs/", cards:[{label:"Shopping", title:"A destination built for browsing", text:"Disney Springs combines Disney-owned shops with larger retail destinations and specialty boutiques."},{label:"Dining", title:"One of the largest dining collections on property", text:"Disney Springs is one of the biggest dining destinations anywhere on Walt Disney World property."},{label:"Entertainment", title:"A strong evening option", text:"Live music, shows and a waterfront setting make Disney Springs a popular choice after park hours."},{label:"Good To Know", title:"Great for arrival or rest days", text:"It works especially well when you want Disney atmosphere without committing to a park ticketed day."}]}
};
let currentParkKey = "magic-kingdom";

const connectScreen = document.getElementById("connectScreen");
const connectBackButtons = [...document.querySelectorAll("[data-connect-back]")];
const connectOpenSite = document.getElementById("connectOpenSite");
const connectPairQr = document.getElementById("connectPairQr");
const connectPairCode = document.getElementById("connectPairCode");
const connectPairHint = document.getElementById("connectPairHint");
const connectLiveStatus = document.getElementById("connectLiveStatus");
const connectPhoneUrl = document.getElementById("connectPhoneUrl");
const connectFooterText = document.getElementById("connectFooterText");
const connectRoomCodeLabel = document.getElementById("connectRoomCodeLabel");
const connectFooterRoom = document.getElementById("connectFooterRoom");
const castReceiverRoom = document.getElementById("castReceiverRoom");
const castReceiver = document.getElementById("castReceiver");
const castReceiverStage = document.getElementById("castReceiverStage");
const castReceiverImage = document.getElementById("castReceiverImage");
const castReceiverVideo = document.getElementById("castReceiverVideo");
const castReceiverAudio = document.getElementById("castReceiverAudio");
const castReceiverYoutube = document.getElementById("castReceiverYoutube");
const castReceiverMessage = document.getElementById("castReceiverMessage");
const castReceiverTitle = document.getElementById("castReceiverTitle");
const castReceiverDevice = document.getElementById("castReceiverDevice");
const castReceiverClose = document.getElementById("castReceiverClose");
let pairingInfo = null;
let pairingLastCommandId = -1;
let pairingMediaSignature = "";
let backgroundWasPlayingBeforeCast = false;
let cloudPeer = null;
let cloudPeerId = "";
let cloudConnections = new Set();
let cloudObjectUrl = null;
const menuItems = [...document.querySelectorAll(".menu-item")];
const backgroundMusic = document.getElementById("backgroundMusic");
const homeScreen = document.getElementById("homeScreen");
const disneyScreen = document.getElementById("disneyScreen");
const submenuCards = [...document.querySelectorAll(".submenu-card")];
const disneyAppScreen = document.getElementById("disneyAppScreen");
const disneyOnDemandScreen = document.getElementById("disneyOnDemandScreen");
const ondemandDetailScreen = document.getElementById("ondemandDetailScreen");
const ondemandDetailBackButtons = [...document.querySelectorAll("[data-ondemand-detail-back]")];
const ondemandDetailHeaderTitle = document.getElementById("ondemandDetailHeaderTitle");
const ondemandDetailImage = document.getElementById("ondemandDetailImage");
const ondemandDetailCategory = document.getElementById("ondemandDetailCategory");
const ondemandDetailTitle = document.getElementById("ondemandDetailTitle");
const ondemandDetailTagline = document.getElementById("ondemandDetailTagline");
const ondemandDetailCategoryText = document.getElementById("ondemandDetailCategoryText");
const ondemandDetailPerfectFor = document.getElementById("ondemandDetailPerfectFor");
const ondemandDetailDescription = document.getElementById("ondemandDetailDescription");
const ondemandDetailPlay = document.getElementById("ondemandDetailPlay");
let currentOnDemandKey = "chairman-welcome";
const disneyLoginScreen = document.getElementById("disneyLoginScreen");
const disneyLoginButton = document.getElementById("disneyLoginButton");
const bundleButton = document.getElementById("bundleButton");
const disneyBackButtons = [...document.querySelectorAll("[data-disney-back]")];
const loginBackButtons = [...document.querySelectorAll("[data-login-back]")];
const submenuHomeBackButtons = [...document.querySelectorAll("[data-submenu-home-back]")];
const ondemandBackButtons = [...document.querySelectorAll("[data-ondemand-back]")];
const ondemandTabs = [...document.querySelectorAll("[data-ondemand-filter]")];
const ondemandItems = [...document.querySelectorAll("[data-ondemand-tags]")];
const hotelServicesScreen = document.getElementById("hotelServicesScreen");
const parksMoreScreen = document.getElementById("parksMoreScreen");
const parksBackButtons = [...document.querySelectorAll("[data-parks-back]")];
const parkCards = [...document.querySelectorAll("[data-park-name]")];
const parkDetailScreen = document.getElementById("parkDetailScreen");
const parkDetailBackButtons = [...document.querySelectorAll("[data-park-detail-back]")];
const parkDetailHeaderTitle = document.getElementById("parkDetailHeaderTitle");
const parkDetailHeroImage = document.getElementById("parkDetailHeroImage");
const parkDetailBadge = document.getElementById("parkDetailBadge");
const parkDetailTitle = document.getElementById("parkDetailTitle");
const parkDetailSummary = document.getElementById("parkDetailSummary");
const parkDetailHours = document.getElementById("parkDetailHours");
const parkDetailHoursExtra = document.getElementById("parkDetailHoursExtra");
const parkDetailBestFor = document.getElementById("parkDetailBestFor");
const parkDetailSignature = document.getElementById("parkDetailSignature");
const parkDetailHighlights = document.getElementById("parkDetailHighlights");
const parkDetailLocation = document.getElementById("parkDetailLocation");
const parkDetailSubcards = document.getElementById("parkDetailSubcards");
const parkDetailOfficialButton = document.getElementById("parkDetailOfficialButton");
const hotelDetailScreen = document.getElementById("hotelDetailScreen");
const hotelBackButtons = [...document.querySelectorAll("[data-hotel-back]")];
const hotelDetailBackButtons = [...document.querySelectorAll("[data-hotel-detail-back]")];
const hotelServiceTiles = [...document.querySelectorAll("[data-hotel-section]")];
const hotelDetailHeading = document.getElementById("hotelDetailHeading");
const hotelDetailTitle = document.getElementById("hotelDetailTitle");
const hotelDetailDescription = document.getElementById("hotelDetailDescription");
const hotelDetailHeroImage = document.getElementById("hotelDetailHeroImage");
const hotelDetailGlance = document.getElementById("hotelDetailGlance");
const hotelDetailHighlights = document.getElementById("hotelDetailHighlights");
const hotelDetailNoteTitle = document.getElementById("hotelDetailNoteTitle");
const hotelDetailNote = document.getElementById("hotelDetailNote");
const diningDirectoryScreen = document.getElementById("diningDirectoryScreen");
const restaurantDetailScreen = document.getElementById("restaurantDetailScreen");
const restaurantGrid = document.getElementById("restaurantGrid");
const diningBackButtons = [...document.querySelectorAll("[data-dining-back]")];
const restaurantBackButtons = [...document.querySelectorAll("[data-restaurant-back]")];
const restaurantHeaderTitle = document.getElementById("restaurantHeaderTitle");
const restaurantDetailImage = document.getElementById("restaurantDetailImage");
const restaurantDetailImg = document.getElementById("restaurantDetailImg");
const restaurantDetailBadge = document.getElementById("restaurantDetailBadge");
const restaurantDetailName = document.getElementById("restaurantDetailName");
const restaurantDetailSummary = document.getElementById("restaurantDetailSummary");
const restaurantDetailService = document.getElementById("restaurantDetailService");
const restaurantDetailBestFor = document.getElementById("restaurantDetailBestFor");
const restaurantDetailHours = document.getElementById("restaurantDetailHours");
const restaurantDetailStatus = document.getElementById("restaurantDetailStatus");

let currentHotelSection = "Dining";

const GUEST_NAME_STORAGE_KEY = "grandFloridianGuestName";
function cleanGuestName(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 42);
}
function applyGuestName(value, save = false) {
  const name = cleanGuestName(value) || CONFIG.familyName;
  CONFIG.familyName = name;
  familyName.textContent = name;
  if (guestNamePreview) guestNamePreview.textContent = name;
  if (save) {
    try { localStorage.setItem(GUEST_NAME_STORAGE_KEY, name); } catch {}
  }
  return name;
}
function openGuestSetup(force = false) {
  if (!guestSetupOverlay || !guestNameInput) return;
  let saved = "";
  try { saved = localStorage.getItem(GUEST_NAME_STORAGE_KEY) || ""; } catch {}
  const value = force ? (saved || CONFIG.familyName) : saved;
  if (!force && value) {
    applyGuestName(value, false);
    guestSetupOverlay.hidden = true;
    return;
  }
  guestNameInput.value = force ? (saved || CONFIG.familyName) : "";
  if (guestNamePreview) guestNamePreview.textContent = cleanGuestName(guestNameInput.value) || "Your Family Name";
  if (guestSetupContinue) guestSetupContinue.disabled = !cleanGuestName(guestNameInput.value);
  guestSetupOverlay.hidden = false;
  requestAnimationFrame(() => guestNameInput.focus());
}
function completeGuestSetup() {
  const value = cleanGuestName(guestNameInput?.value);
  if (!value) return;
  applyGuestName(value, true);
  guestSetupOverlay.hidden = true;
}

familyName.textContent = CONFIG.familyName;
roomNumber.textContent = CONFIG.roomNumber;
if (connectFooterRoom) connectFooterRoom.textContent = CONFIG.roomNumber;
if (connectRoomCodeLabel) connectRoomCodeLabel.textContent = `ROOM ${CONFIG.roomNumber} • SESSION ID`;
if (castReceiverRoom) castReceiverRoom.textContent = ` • ROOM ${CONFIG.roomNumber}`;
temperature.textContent = CONFIG.temperature;

function ordinal(n) {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}TH`;
  switch (n % 10) {
    case 1: return `${n}ST`;
    case 2: return `${n}ND`;
    case 3: return `${n}RD`;
    default: return `${n}TH`;
  }
}

function updateDateTime() {
  const now = new Date();

  if (CONFIG.useLiveClock) {
    clock.textContent = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(now).toUpperCase();
  } else {
    clock.textContent = CONFIG.fixedTime;
  }

  if (CONFIG.useLiveDate) {
    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now).toUpperCase();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(now).toUpperCase();
    dateLine.textContent = `${weekday}, ${month} ${ordinal(now.getDate())}, ${now.getFullYear()}`;
  } else {
    dateLine.textContent = CONFIG.fixedDate;
  }
}

function showToast(text, duration = 1100) {
  menuToast.textContent = text;
  menuToast.classList.add("visible");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => menuToast.classList.remove("visible"), duration);
}

function setActiveMenu(screen) {
  menuItems.forEach((item) => item.classList.remove("active"));
  const target = menuItems.find((item) => item.dataset.screenTarget === screen)
    || menuItems.find((item) => item.dataset.screenTarget === "home");
  if (target) target.classList.add("active");
}

function renderHotelDetail(sectionName) {
  const data = HOTEL_DETAILS[sectionName] || HOTEL_DETAILS["Dining"];
  currentHotelSection = sectionName;
  hotelServiceTiles.forEach((tile) => tile.classList.toggle("selected", tile.dataset.hotelSection === sectionName));

  hotelDetailHeading.textContent = data.title.toUpperCase();
  hotelDetailTitle.textContent = data.title;
  hotelDetailDescription.textContent = data.description;
  hotelDetailHeroImage.src = data.hero;
  hotelDetailHeroImage.alt = data.heroAlt;
  hotelDetailGlance.innerHTML = data.glance.map((item) => `<li>${item}</li>`).join("");
  hotelDetailHighlights.innerHTML = data.highlights.map((item) => `
    <article class="hotel-highlight-item">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>`).join("");
  hotelDetailNoteTitle.textContent = data.noteTitle;
  hotelDetailNote.textContent = data.note;
}

function renderRestaurantDirectory() {
  restaurantGrid.innerHTML = Object.entries(RESTAURANT_DETAILS).map(([name, data]) => `
    <button class="restaurant-card" type="button" data-restaurant-name="${name.replace(/"/g, '&quot;')}">
      <div class="restaurant-card-art">
        <img src="${data.image}" alt="${name}" onerror="this.style.display='none'; this.parentElement.classList.add('image-fallback')">
        <span class="restaurant-card-badge">${data.badge}</span>
      </div>
      <div class="restaurant-card-copy">
        <strong>${name}</strong>
        <span>${data.bestFor}</span>
      </div>
    </button>`).join("");

  document.querySelectorAll("[data-restaurant-name]").forEach((button) => {
    button.addEventListener("click", () => {
      renderRestaurantDetail(button.dataset.restaurantName);
      setScreen("restaurant-detail");
    });
  });
}

function renderRestaurantDetail(name) {
  const data = RESTAURANT_DETAILS[name] || RESTAURANT_DETAILS["1900 Park Fare"];
  restaurantHeaderTitle.textContent = name.toUpperCase();
  restaurantDetailName.textContent = name;
  restaurantDetailBadge.textContent = data.badge;
  restaurantDetailSummary.textContent = data.summary;
  restaurantDetailService.textContent = data.service;
  restaurantDetailBestFor.textContent = data.bestFor;
  restaurantDetailHours.textContent = data.hours;
  restaurantDetailStatus.textContent = data.status;
  restaurantDetailImg.style.display = "block";
  restaurantDetailImage.classList.remove("image-fallback");
  restaurantDetailImg.onerror = () => { restaurantDetailImg.style.display = "none"; restaurantDetailImage.classList.add("image-fallback"); };
  restaurantDetailImg.src = data.image;
  restaurantDetailImg.alt = name;
}

function renderOnDemandDetail(key) {
  const data = ONDEMAND_DETAILS[key] || ONDEMAND_DETAILS["chairman-welcome"];
  currentOnDemandKey = key in ONDEMAND_DETAILS ? key : "chairman-welcome";
  ondemandDetailHeaderTitle.textContent = data.title.toUpperCase();
  ondemandDetailImage.src = data.image;
  ondemandDetailImage.alt = data.title;
  ondemandDetailCategory.textContent = data.category.toUpperCase();
  ondemandDetailTitle.textContent = data.title;
  ondemandDetailTagline.textContent = data.tagline;
  ondemandDetailCategoryText.textContent = data.category;
  ondemandDetailPerfectFor.textContent = data.perfectFor;
  ondemandDetailDescription.textContent = data.description;
}


function renderParkDetail(key) {
  const data = PARK_DETAILS[key] || PARK_DETAILS["magic-kingdom"];
  currentParkKey = key in PARK_DETAILS ? key : "magic-kingdom";
  parkDetailHeaderTitle.textContent = data.header;
  parkDetailHeroImage.src = data.image;
  parkDetailHeroImage.alt = data.title;
  parkDetailBadge.textContent = data.badge;
  parkDetailTitle.textContent = data.title;
  parkDetailSummary.textContent = data.summary;
  parkDetailHours.textContent = data.hours || "CHECK TODAY'S HOURS";
  parkDetailHoursExtra.textContent = data.hoursExtra || "Hours may change";
  parkDetailBestFor.textContent = data.bestFor;
  parkDetailSignature.textContent = data.signature;
  parkDetailHighlights.textContent = data.highlights;
  parkDetailLocation.textContent = data.location;
  parkDetailSubcards.innerHTML = data.cards.map((card) => `
    <article class="park-subcard">
      <span class="park-subcard-label">${card.label}</span>
      <strong>${card.title}</strong>
      <p>${card.text}</p>
    </article>
  `).join("");
  parkDetailOfficialButton.onclick = () => window.open(data.officialUrl, "_blank", "noopener");
}

function setScreen(screen) {
  const showHome = screen === "home";
  const showDisney = screen === "disney";
  const showDisneyOnDemand = screen === "disney-ondemand";
  const showOnDemandDetail = screen === "ondemand-detail";
  const showDisneyApp = screen === "disney-app";
  const showDisneyLogin = screen === "disney-login";
  const showConnect = screen === "connect";
  const showHotel = screen === "hotel";
  const showParks = screen === "parks";
  const showHotelDetail = screen === "hotel-detail";
  const showParkDetail = screen === "park-detail";
  const showDiningDirectory = screen === "dining-directory";
  const showRestaurantDetail = screen === "restaurant-detail";
  const appOpen = showDisneyApp || showDisneyLogin;
  const hotelOpen = showHotel || showHotelDetail || showDiningDirectory || showRestaurantDetail;

  homeScreen.hidden = !showHome;
  disneyScreen.hidden = !showDisney;
  disneyOnDemandScreen.hidden = !showDisneyOnDemand;
  ondemandDetailScreen.hidden = !showOnDemandDetail;
  disneyAppScreen.hidden = !showDisneyApp;
  disneyLoginScreen.hidden = !showDisneyLogin;
  connectScreen.hidden = !showConnect;
  hotelServicesScreen.hidden = !showHotel;
  parksMoreScreen.hidden = !showParks;
  parkDetailScreen.hidden = !showParkDetail;
  hotelDetailScreen.hidden = !showHotelDetail;
  diningDirectoryScreen.hidden = !showDiningDirectory;
  restaurantDetailScreen.hidden = !showRestaurantDetail;

  homeScreen.classList.toggle("active", showHome);
  disneyScreen.classList.toggle("active", showDisney);
  disneyOnDemandScreen.classList.toggle("active", showDisneyOnDemand);
  ondemandDetailScreen.classList.toggle("active", showOnDemandDetail);
  disneyAppScreen.classList.toggle("active", showDisneyApp);
  disneyLoginScreen.classList.toggle("active", showDisneyLogin);
  connectScreen.classList.toggle("active", showConnect);
  hotelServicesScreen.classList.toggle("active", showHotel);
  parksMoreScreen.classList.toggle("active", showParks);
  parkDetailScreen.classList.toggle("active", showParkDetail);
  hotelDetailScreen.classList.toggle("active", showHotelDetail);
  diningDirectoryScreen.classList.toggle("active", showDiningDirectory);
  restaurantDetailScreen.classList.toggle("active", showRestaurantDetail);

  resortTv.classList.toggle("submenu-open", showDisney);
  resortTv.classList.toggle("ondemand-open", showDisneyOnDemand);
  resortTv.classList.toggle("ondemand-detail-open", showOnDemandDetail);
  resortTv.classList.toggle("connect-open", showConnect);
  resortTv.classList.toggle("hotel-services-open", hotelOpen);
  resortTv.classList.toggle("parks-more-open", showParks);
  resortTv.classList.toggle("park-detail-open", showParkDetail);
  resortTv.classList.toggle("hotel-detail-open", showHotelDetail);
  resortTv.classList.toggle("dining-directory-open", showDiningDirectory);
  resortTv.classList.toggle("restaurant-detail-open", showRestaurantDetail);
  resortTv.classList.toggle("disney-app-open", appOpen);

  if (showDisney || showDisneyOnDemand || showOnDemandDetail || appOpen) setActiveMenu("disney");
  else if (showConnect) setActiveMenu("connect");
  else if (hotelOpen) setActiveMenu("hotel");
  else if (showParks || showParkDetail) setActiveMenu("parks");
  else if (showHome) setActiveMenu("home");
}

if (guestNameInput) {
  guestNameInput.addEventListener("input", () => {
    const value = cleanGuestName(guestNameInput.value);
    if (guestNamePreview) guestNamePreview.textContent = value || "Your Family Name";
    if (guestSetupContinue) guestSetupContinue.disabled = !value;
  });
  guestNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && cleanGuestName(guestNameInput.value)) completeGuestSetup();
  });
}
if (guestSetupContinue) guestSetupContinue.addEventListener("click", completeGuestSetup);
if (changeGuestButton) changeGuestButton.addEventListener("click", () => openGuestSetup(true));
openGuestSetup(false);

updateDateTime();
setInterval(updateDateTime, 1000);
renderHotelDetail(currentHotelSection);
renderRestaurantDirectory();
renderParkDetail(currentParkKey);
setScreen("home");

if (backgroundMusic) {
  backgroundMusic.volume = CONFIG.musicVolume;
  const startBackgroundMusic = async () => {
    try {
      await backgroundMusic.play();
    } catch (error) {
      // blocked until user/browser policy allows it
    }
  };
  startBackgroundMusic();
  const unlockMusic = () => {
    startBackgroundMusic();
    window.removeEventListener("pointerdown", unlockMusic);
    window.removeEventListener("touchstart", unlockMusic);
    window.removeEventListener("keydown", unlockMusic);
  };
  window.addEventListener("pointerdown", unlockMusic, { once: true });
  window.addEventListener("touchstart", unlockMusic, { once: true, passive: true });
  window.addEventListener("keydown", unlockMusic, { once: true });
}

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const screenTarget = item.dataset.screenTarget;
    if (screenTarget === "home") {
      setScreen("home");
      showToast(item.dataset.panel);
      return;
    }
    if (screenTarget === "disney") {
      setScreen("disney");
      showToast(item.dataset.panel);
      return;
    }
    if (screenTarget === "connect") {
      setScreen("connect");
      showToast(item.dataset.panel);
      return;
    }
    if (screenTarget === "hotel") {
      setScreen("hotel");
      showToast(item.dataset.panel);
      return;
    }
    if (screenTarget === "parks") {
      setScreen("parks");
      showToast(item.dataset.panel);
      return;
    }
    showToast(`${item.dataset.panel} coming soon`);
  });
});

submenuCards.forEach((card) => {
  card.addEventListener("click", () => {
    submenuCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    if (card.dataset.subcard === "Disney+") {
      setScreen("disney-app");
      return;
    }
    if (card.dataset.subcard === "Disney on Demand") {
      setScreen("disney-ondemand");
      return;
    }
    showToast(card.dataset.subcard);
  });
});

if (disneyLoginButton) {
  disneyLoginButton.addEventListener("click", () => setScreen("disney-login"));
}
if (bundleButton) {
  bundleButton.addEventListener("click", () => {
    window.open("https://www.disneyplus.com/es-ar", "_blank", "noopener");
  });
}

disneyBackButtons.forEach((button) => button.addEventListener("click", () => setScreen("disney")));
loginBackButtons.forEach((button) => button.addEventListener("click", () => setScreen("disney-app")));
submenuHomeBackButtons.forEach((button) => button.addEventListener("click", () => { setScreen("home"); showToast("Watch TV"); }));
ondemandBackButtons.forEach((button) => button.addEventListener("click", () => setScreen("disney")));
ondemandTabs.forEach((tab) => tab.addEventListener("click", () => {
  const filter = tab.dataset.ondemandFilter;
  ondemandTabs.forEach((btn) => btn.classList.toggle("is-active", btn === tab));
  ondemandItems.forEach((item) => {
    const tags = (item.dataset.ondemandTags || "").split(/\s+/);
    const show = filter === "all" || tags.includes(filter);
    item.classList.toggle("is-hidden", !show);
  });
}));
ondemandItems.forEach((item) => item.addEventListener("click", () => {
  const key = item.dataset.ondemandKey;
  renderOnDemandDetail(key);
  setScreen("ondemand-detail");
}));
ondemandDetailBackButtons.forEach((button) => button.addEventListener("click", () => setScreen("disney-ondemand")));
if (ondemandDetailPlay) {
  ondemandDetailPlay.addEventListener("click", () => {
    const data = ONDEMAND_DETAILS[currentOnDemandKey] || ONDEMAND_DETAILS["chairman-welcome"];
    if (!data.videoId) {
      showToast("Video unavailable", 1600);
      return;
    }
    window.open(data.videoUrl || `https://www.youtube.com/watch?v=${data.videoId}`, "_blank", "noopener");
  });
}
connectBackButtons.forEach((button) => button.addEventListener("click", () => { setScreen("home"); showToast("Watch TV"); }));


function isShareablePairingMode() {
  return (location.protocol === "https:" || location.protocol === "http:") && location.hostname !== "127.0.0.1" && location.hostname !== "localhost";
}

function formatPairCode(value) {
  const d = String(value || "").replace(/\D/g, "").slice(0, 9);
  return d.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

function buildPairingQrDataUri(value) {
  try {
    const QRCodeCtor = window.GrandFloridianQRCode;
    const levels = window.GrandFloridianQRErrorCorrectLevel;
    if (!QRCodeCtor || !levels) return null;
    const qr = new QRCodeCtor(-1, levels.M);
    qr.addData(value);
    qr.make();
    const count = qr.getModuleCount();
    const border = 4;
    const size = count + border * 2;
    let path = "";
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (qr.isDark(row, col)) path += `M${col + border} ${row + border}h1v1h-1z`;
      }
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="white"/><path d="${path}" fill="black"/></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  } catch (error) {
    console.warn("Could not generate pairing QR.", error);
    return null;
  }
}

function buildRemoteUrl() {
  const url = new URL("remote.html", location.href);
  url.searchParams.set("code", CLOUD_SESSION.code);
  url.searchParams.set("room", CLOUD_SESSION.room);
  return url.href;
}

function updateCloudPairingUi(state, detail = "") {
  if (connectRoomCodeLabel) connectRoomCodeLabel.textContent = `ROOM ${CLOUD_SESSION.room} • SESSION ID`;
  if (connectFooterRoom) connectFooterRoom.textContent = CLOUD_SESSION.room;
  if (castReceiverRoom) castReceiverRoom.textContent = ` • ROOM ${CLOUD_SESSION.room}`;
  if (connectPairCode) connectPairCode.textContent = formatPairCode(CLOUD_SESSION.code);
  if (connectPairHint) connectPairHint.textContent = "This session ID is unique to this browser tab and changes when a new session starts.";
  if (connectPhoneUrl) connectPhoneUrl.textContent = isShareablePairingMode() ? buildRemoteUrl() : "Publish this folder to an HTTPS website to enable no-Terminal pairing.";
  if (connectFooterText) connectFooterText.textContent = "Photos, videos and controls travel directly between paired browsers with WebRTC. The signaling service only helps the two browsers find each other.";
  if (connectOpenSite) connectOpenSite.textContent = isShareablePairingMode() ? "OPEN PHONE CONTROLLER" : "PAIRING ENABLES AFTER PUBLISHING";
  if (connectPairQr) {
    const qrValue = isShareablePairingMode() ? buildRemoteUrl() : "https://example.invalid/publish-this-site-first";
    const qr = buildPairingQrDataUri(qrValue);
    if (qr) connectPairQr.src = qr;
  }
  if (connectLiveStatus) {
    const text = connectLiveStatus.querySelector("span");
    connectLiveStatus.className = `connect-live-status ${state || ""}`.trim();
    if (text) text.textContent = detail || "Preparing secure browser pairing…";
  }
}

function revokeCloudObjectUrl() {
  if (cloudObjectUrl) {
    try { URL.revokeObjectURL(cloudObjectUrl); } catch {}
    cloudObjectUrl = null;
  }
}

function hideAllCastMedia() {
  [castReceiverImage, castReceiverVideo, castReceiverAudio, castReceiverYoutube, castReceiverMessage].forEach((el) => {
    if (!el) return;
    el.hidden = true;
  });
  if (castReceiverVideo) { try { castReceiverVideo.pause(); } catch {} castReceiverVideo.removeAttribute("src"); }
  if (castReceiverAudio) { try { castReceiverAudio.pause(); } catch {} castReceiverAudio.removeAttribute("src"); }
  if (castReceiverYoutube) castReceiverYoutube.src = "about:blank";
  if (castReceiverImage) castReceiverImage.removeAttribute("src");
  revokeCloudObjectUrl();
}

function showCastMedia(media, deviceName) {
  if (!castReceiver || !media) return;
  pairingMediaSignature = `${media.type}:${media.title || ""}:${Date.now()}`;
  hideAllCastMedia();
  if (backgroundMusic && castReceiver.hidden) {
    backgroundWasPlayingBeforeCast = !backgroundMusic.paused;
    try { backgroundMusic.pause(); } catch {}
  }
  castReceiver.hidden = false;
  castReceiverDevice.textContent = (deviceName || "CONNECTED DEVICE").toUpperCase();
  castReceiverTitle.textContent = media.title || "Shared from your device";
  if (media.type === "image" && media.blob instanceof Blob) {
    cloudObjectUrl = URL.createObjectURL(media.blob);
    castReceiverImage.src = cloudObjectUrl;
    castReceiverImage.hidden = false;
  } else if (media.type === "video" && media.blob instanceof Blob) {
    cloudObjectUrl = URL.createObjectURL(media.blob);
    castReceiverVideo.src = cloudObjectUrl;
    castReceiverVideo.hidden = false;
    castReceiverVideo.autoplay = true;
    castReceiverVideo.play().catch(() => {});
  } else if (media.type === "audio" && media.blob instanceof Blob) {
    cloudObjectUrl = URL.createObjectURL(media.blob);
    castReceiverAudio.src = cloudObjectUrl;
    castReceiverAudio.hidden = false;
    castReceiverAudio.autoplay = true;
    castReceiverAudio.play().catch(() => {});
  } else if (media.type === "youtube") {
    castReceiverYoutube.src = media.src;
    castReceiverYoutube.hidden = false;
  } else if (media.type === "message") {
    castReceiverMessage.textContent = media.text || "";
    castReceiverMessage.hidden = false;
  } else {
    castReceiverMessage.textContent = "This media type could not be displayed in this browser.";
    castReceiverMessage.hidden = false;
  }
}

function dismissCastMedia() {
  pairingMediaSignature = "";
  hideAllCastMedia();
  if (castReceiver) castReceiver.hidden = true;
  if (backgroundMusic && backgroundWasPlayingBeforeCast) backgroundMusic.play().catch(() => {});
  backgroundWasPlayingBeforeCast = false;
}

function sendYoutubeCommand(func, arg = "") {
  if (!castReceiverYoutube || castReceiverYoutube.hidden || !castReceiverYoutube.contentWindow) return;
  castReceiverYoutube.contentWindow.postMessage(JSON.stringify({ event: "command", func, args: arg === "" ? [] : [arg] }), "*");
}

function applyCastCommand(command) {
  if (!command) return;
  const action = command.action;
  if (action === "play") {
    if (castReceiverVideo && !castReceiverVideo.hidden) castReceiverVideo.play().catch(() => {});
    if (castReceiverAudio && !castReceiverAudio.hidden) castReceiverAudio.play().catch(() => {});
    sendYoutubeCommand("playVideo");
  } else if (action === "pause") {
    if (castReceiverVideo && !castReceiverVideo.hidden) castReceiverVideo.pause();
    if (castReceiverAudio && !castReceiverAudio.hidden) castReceiverAudio.pause();
    sendYoutubeCommand("pauseVideo");
  } else if (action === "mute") {
    if (castReceiverVideo) castReceiverVideo.muted = true;
    if (castReceiverAudio) castReceiverAudio.muted = true;
    sendYoutubeCommand("mute");
  } else if (action === "unmute") {
    if (castReceiverVideo) castReceiverVideo.muted = false;
    if (castReceiverAudio) castReceiverAudio.muted = false;
    sendYoutubeCommand("unMute");
  } else if (action === "volume") {
    const v = Math.max(0, Math.min(1, Number(command.value)));
    if (castReceiverVideo) castReceiverVideo.volume = v;
    if (castReceiverAudio) castReceiverAudio.volume = v;
    sendYoutubeCommand("setVolume", Math.round(v * 100));
  }
}

function youtubeEmbedFromUrl(value) {
  try {
    const url = new URL(value);
    let id = "";
    if (url.hostname === "youtu.be") id = url.pathname.replace(/^\//, "").split("/")[0];
    else if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") id = url.searchParams.get("v") || "";
      else {
        const parts = url.pathname.split("/").filter(Boolean);
        if (["embed", "shorts", "live"].includes(parts[0])) id = parts[1] || "";
      }
    }
    if (!id) return null;
    return `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&enablejsapi=1&playsinline=1`;
  } catch { return null; }
}

function sendToConnection(conn, payload) {
  try { if (conn && conn.open) conn.send(payload); } catch {}
}

function handleCloudConnection(conn) {
  let paired = false;
  let deviceName = "Mobile Device";
  conn.on("open", () => {
    updateCloudPairingUi("online", "Pairing service online • waiting for device approval");
  });
  conn.on("data", data => {
    if (!data || typeof data !== "object") return;
    if (!paired) {
      if (data.type !== "pair" || String(data.code || "").replace(/\D/g, "") !== CLOUD_SESSION.code) {
        sendToConnection(conn, { type: "pair-result", ok: false, error: "Incorrect session ID" });
        return;
      }
      paired = true;
      deviceName = String(data.device || "Mobile Device").slice(0, 64);
      cloudConnections.add(conn);
      sendToConnection(conn, { type: "pair-result", ok: true, room: CLOUD_SESSION.room, code: CLOUD_SESSION.code });
      updateCloudPairingUi("connected", `${deviceName} connected to Room ${CLOUD_SESSION.room}`);
      return;
    }
    if (data.type === "media" && data.blob instanceof Blob) {
      const kind = String(data.mediaType || "");
      if (["image", "video", "audio"].includes(kind)) showCastMedia({ type: kind, blob: data.blob, title: data.name || "Shared media" }, deviceName);
    } else if (data.type === "youtube") {
      const src = youtubeEmbedFromUrl(data.url || "");
      if (src) showCastMedia({ type: "youtube", src, title: data.title || "YouTube" }, deviceName);
      else sendToConnection(conn, { type: "error", message: "That does not look like a supported YouTube link." });
    } else if (data.type === "command") {
      applyCastCommand({ action: data.action, value: data.value });
    } else if (data.type === "clear") {
      dismissCastMedia();
    } else if (data.type === "message") {
      showCastMedia({ type: "message", text: String(data.text || ""), title: data.title || "Message" }, deviceName);
    }
  });
  conn.on("close", () => {
    cloudConnections.delete(conn);
    if (cloudConnections.size === 0) updateCloudPairingUi("online", "Pairing service online • waiting for device");
  });
  conn.on("error", () => {
    cloudConnections.delete(conn);
  });
}

function startCloudPairing() {
  updateCloudPairingUi("", "Preparing secure browser pairing…");
  if (!isShareablePairingMode()) {
    updateCloudPairingUi("", "Preview mode • Pairing activates after this site is published securely.");
    return;
  }
  if (!window.Peer) {
    updateCloudPairingUi("", "Could not load the pairing library. Check the internet connection and reload.");
    return;
  }
  cloudPeerId = `gftv-${CLOUD_SESSION.code}`;
  try {
    cloudPeer = new Peer(cloudPeerId, { host: "0.peerjs.com", port: 443, secure: true, path: "/", debug: 1 });
  } catch (error) {
    updateCloudPairingUi("", "Could not start the pairing session.");
    return;
  }
  cloudPeer.on("open", () => updateCloudPairingUi("online", "Pairing service online • scan the QR code from your phone"));
  cloudPeer.on("connection", handleCloudConnection);
  cloudPeer.on("disconnected", () => {
    updateCloudPairingUi("", "Pairing service reconnecting…");
    try { cloudPeer.reconnect(); } catch {}
  });
  cloudPeer.on("error", error => {
    if (error && error.type === "unavailable-id") {
      try { sessionStorage.removeItem("grand-floridian-cloud-session-v1"); } catch {}
      updateCloudPairingUi("", "This session ID was already in use. Reload once to generate a new one.");
    } else {
      updateCloudPairingUi("", "Pairing service could not connect. Reload or try another network.");
    }
  });
}

if (connectOpenSite) connectOpenSite.addEventListener("click", () => {
  if (!isShareablePairingMode()) {
    showToast("Publish the website online first", 2200);
    return;
  }
  window.open(buildRemoteUrl(), "_blank", "noopener");
});

if (castReceiverClose) castReceiverClose.addEventListener("click", () => {
  dismissCastMedia();
  cloudConnections.forEach(conn => sendToConnection(conn, { type: "receiver-cleared" }));
});

startCloudPairing();

hotelBackButtons.forEach((button) => button.addEventListener("click", () => { setScreen("home"); showToast("Watch TV"); }));
parksBackButtons.forEach((button) => button.addEventListener("click", () => { setScreen("home"); showToast("Watch TV"); }));
parkCards.forEach((card) => card.addEventListener("click", () => {
  parkCards.forEach((item) => item.classList.remove("selected"));
  card.classList.add("selected");
  const key = card.dataset.parkKey || "magic-kingdom";
  renderParkDetail(key);
  setScreen("park-detail");
  showToast(card.dataset.parkName);
}));
parkDetailBackButtons.forEach((button) => button.addEventListener("click", () => setScreen("parks")));
hotelDetailBackButtons.forEach((button) => button.addEventListener("click", () => setScreen("hotel")));

hotelServiceTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const section = tile.dataset.hotelSection;
    if (section === "Dining") {
      setScreen("dining-directory");
      showToast("Dining");
      return;
    }
    renderHotelDetail(section);
    setScreen("hotel-detail");
    showToast(section);
  });
});

diningBackButtons.forEach((button) => button.addEventListener("click", () => setScreen("hotel")));
restaurantBackButtons.forEach((button) => button.addEventListener("click", () => setScreen("dining-directory")));

fullscreenButton.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await resortTv.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.warn("Fullscreen could not be activated.", error);
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "f") {
    fullscreenButton.click();
    return;
  }
  if (key === "escape" || key === "backspace") {
    if (!disneyLoginScreen.hidden) {
      setScreen("disney-app");
      return;
    }
    if (!disneyAppScreen.hidden) {
      setScreen("disney");
      return;
    }
    if (!ondemandDetailScreen.hidden) {
      setScreen("disney-ondemand");
      return;
    }
    if (!disneyOnDemandScreen.hidden) {
      setScreen("disney");
      return;
    }
    if (!disneyScreen.hidden) {
      setScreen("home");
      showToast("Watch TV");
      return;
    }
    if (!restaurantDetailScreen.hidden) {
      setScreen("dining-directory");
      return;
    }
    if (!diningDirectoryScreen.hidden) {
      setScreen("hotel");
      return;
    }
    if (!parkDetailScreen.hidden) {
      setScreen("parks");
      return;
    }
    if (!parksMoreScreen.hidden) {
      setScreen("home");
      showToast("Watch TV");
      return;
    }
    if (!connectScreen.hidden) {
      setScreen("home");
      showToast("Watch TV");
      return;
    }
    if (!hotelDetailScreen.hidden) {
      setScreen("hotel");
      return;
    }
    if (!hotelServicesScreen.hidden) {
      setScreen("home");
      showToast("Watch TV");
      return;
    }
  }
  if (!disneyScreen.hidden && (key === "arrowleft" || key === "arrowright")) {
    const currentIndex = submenuCards.findIndex((card) => card.classList.contains("is-selected"));
    const nextIndex = key === "arrowright"
      ? Math.min(submenuCards.length - 1, currentIndex + 1)
      : Math.max(0, currentIndex - 1);
    submenuCards.forEach((card) => card.classList.remove("is-selected"));
    submenuCards[nextIndex].classList.add("is-selected");
    submenuCards[nextIndex].focus();
  }
});
