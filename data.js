// Rowley Eats — recommendation data
//
// To add a new spot: copy one of the objects below, fill in the details, and add it to the array.
// image: put a photo file in the /images folder and reference it here, e.g. "images/my-photo.jpg"
//        if left blank, a coloured placeholder using an accent colour is shown instead.
// accent: "teal", "blue", or "indigo" — controls the placeholder colour and price-tier colour

const SPOTS = [
  {
    id: "free-state-kitchen",
    name: "Free State Kitchen",
    city: "Liverpool",
    area: "Georgian Quarter",
    cuisine: "American",
    image: "",
    accent: "blue",
    instagram: "https://www.instagram.com/fskliverpool/",
    order: "The American Cheeseburger, and don't skip the buffalo hot wings to start",
    note: "Sit in the secret garden if the weather's playing nice. Closed Mondays and Tuesdays, so don't turn up expecting it.",
    price: 2,
    tags: ["Burgers", "Garden", "Good for groups"]
  },
  {
    id: "rudys-castle-street",
    name: "Rudy's Neapolitan Pizza",
    city: "Liverpool",
    area: "Castle Street",
    cuisine: "Italian",
    image: "",
    accent: "indigo",
    instagram: "https://www.instagram.com/wearerudyspizza/",
    order: "Calabrese, or the Margherita if you want to see what a proper Neapolitan base should taste like",
    note: "Dough is fermented for 24 hours and the oven runs seriously hot, so the crust has that leopard-spotted char. Go early evening to dodge the queue.",
    price: 2,
    tags: ["Pizza", "Wood-fired", "Date night"]
  },
  {
    id: "hardware-liverpool",
    name: "Hardware Coffee + Kitchen",
    city: "Liverpool",
    area: "Renshaw Street",
    cuisine: "Brunch",
    image: "",
    accent: "teal",
    instagram: "https://www.instagram.com/hardware_liverpool/",
    order: "Steak and eggs with a side of smashed avocado, and a cortado to go with it",
    note: "Tucked into the old Rapid Hardware shopfront on Renshaw Street. Order via the QR code, menu's bigger than you'd expect.",
    price: 2,
    tags: ["Brunch", "Coffee", "Weekend"]
  },
  {
    id: "dough-and-doppio",
    name: "Dough & Doppio",
    city: "Wirral",
    area: "Bromborough",
    cuisine: "Italian Deli",
    image: "",
    accent: "teal",
    instagram: "https://www.instagram.com/dough_and_doppio/",
    order: "Any of the focaccia sandwiches, the salami one with hot honey is a strong shout, plus a cannoli if they've got them",
    note: "Slow-proofed dough made fresh in house, went viral locally for good reason. Small spot, more of a grab-and-go than somewhere to sit.",
    price: 1,
    tags: ["Sandwiches", "Coffee", "Quick bite"]
  },
  {
    id: "dope-crusts",
    name: "Dope Crusts",
    city: "Wirral",
    area: "Birkenhead",
    cuisine: "Italian",
    image: "",
    accent: "indigo",
    instagram: "https://www.instagram.com/dopecrusts/",
    order: "Margherita or the goats cheese pizza, both come up consistently as favourites",
    note: "Proper Neapolitan pizza made by two people who clearly love what they do. Great value, also do pizza catering for events if you're planning a party.",
    price: 1,
    tags: ["Pizza", "Takeaway", "Value"]
  }
];
