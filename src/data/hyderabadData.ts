import { Destination, Hotel, RoomType, TourPackage, Attraction } from '../types';

// Hyderabad and Telangana Tourism Data
export const hyderabadDestinations: Destination[] = [
  {
    id: 100,
    name: "Hyderabad",
    country: "India",
    state: "Telangana",
    crimeLevel: "moderate",
    safetyScore: 7.8,
    description: "The City of Pearls and Nizams, known for its rich history, biryani, and IT hub",
    image: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Charminar", "Golconda Fort", "Ramoji Film City", "Hussain Sagar Lake", "Salar Jung Museum"],
    bestTimeToVisit: "October to March",
    averageTemp: "28°C (82°F)",
    currency: "INR",
    language: "Telugu, Hindi, English",
    timeZone: "IST (UTC+5:30)",
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: 101,
    name: "Warangal",
    country: "India",
    state: "Telangana",
    crimeLevel: "low",
    safetyScore: 8.2,
    description: "Historic city known for Kakatiya dynasty heritage and ancient temples",
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Warangal Fort", "Thousand Pillar Temple", "Bhadrakali Temple", "Kakatiya Rock Garden"],
    bestTimeToVisit: "October to March",
    averageTemp: "26°C (79°F)",
    currency: "INR",
    language: "Telugu, Hindi",
    timeZone: "IST (UTC+5:30)",
    coordinates: { lat: 17.9689, lng: 79.5941 }
  },
  {
    id: 102,
    name: "Khammam",
    country: "India",
    state: "Telangana",
    crimeLevel: "low",
    safetyScore: 8.0,
    description: "Gateway to Telangana with beautiful waterfalls and tribal culture",
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Kinnerasani Wildlife Sanctuary", "Bhadrachalam Temple", "Papi Hills", "Khammam Fort"],
    bestTimeToVisit: "November to February",
    averageTemp: "27°C (81°F)",
    currency: "INR",
    language: "Telugu, Hindi",
    timeZone: "IST (UTC+5:30)",
    coordinates: { lat: 17.2473, lng: 80.1514 }
  }
];

export const hyderabadAttractions: Attraction[] = [
  {
    id: 1,
    name: "Charminar",
    type: "Historical Monument",
    description: "Iconic 16th-century mosque and monument, symbol of Hyderabad",
    location: "Old City, Hyderabad",
    coordinates: { lat: 17.3616, lng: 78.4747 },
    entryFee: { indian: 25, foreign: 300 },
    timings: "9:30 AM - 5:30 PM",
    rating: 4.3,
    safetyScore: 7.5,
    image: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    nearbyHotels: [200, 201, 202]
  },
  {
    id: 2,
    name: "Golconda Fort",
    type: "Historical Fort",
    description: "Magnificent 13th-century fort complex with acoustic marvels",
    location: "Golconda, Hyderabad",
    coordinates: { lat: 17.3833, lng: 78.4011 },
    entryFee: { indian: 25, foreign: 300 },
    timings: "9:00 AM - 5:30 PM",
    rating: 4.5,
    safetyScore: 8.0,
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    nearbyHotels: [203, 204]
  },
  {
    id: 3,
    name: "Ramoji Film City",
    type: "Entertainment",
    description: "World's largest film studio complex with guided tours",
    location: "Abdullahpurmet, Hyderabad",
    coordinates: { lat: 17.2543, lng: 78.6808 },
    entryFee: { indian: 1200, foreign: 1500 },
    timings: "9:00 AM - 5:30 PM",
    rating: 4.6,
    safetyScore: 8.5,
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    nearbyHotels: [205, 206]
  },
  {
    id: 4,
    name: "Hussain Sagar Lake",
    type: "Natural",
    description: "Heart-shaped lake with Buddha statue and boating facilities",
    location: "Tank Bund, Hyderabad",
    coordinates: { lat: 17.4239, lng: 78.4738 },
    entryFee: { indian: 0, foreign: 0 },
    timings: "24 hours (boating: 9 AM - 9 PM)",
    rating: 4.2,
    safetyScore: 7.8,
    image: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    nearbyHotels: [207, 208]
  },
  {
    id: 5,
    name: "Salar Jung Museum",
    type: "Museum",
    description: "One of India's largest museums with rare artifacts and collections",
    location: "Darushifa, Hyderabad",
    coordinates: { lat: 17.3713, lng: 78.4804 },
    entryFee: { indian: 20, foreign: 500 },
    timings: "10:00 AM - 5:00 PM (Closed on Fridays)",
    rating: 4.4,
    safetyScore: 8.2,
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    nearbyHotels: [200, 201]
  }
];

const hyderabadRoomTypes: RoomType[] = [
  {
    id: 1,
    name: "Standard AC Room",
    capacity: 2,
    size: "200 sqft",
    price: 2500,
    amenities: ["Free WiFi", "Air Conditioning", "TV", "Complimentary Breakfast"],
    images: ["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    available: true
  },
  {
    id: 2,
    name: "Deluxe Room",
    capacity: 3,
    size: "300 sqft",
    price: 3500,
    amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Room Service", "Balcony"],
    images: ["https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    available: true
  },
  {
    id: 3,
    name: "Executive Suite",
    capacity: 4,
    size: "500 sqft",
    price: 5500,
    amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Room Service", "Balcony", "Separate Living Area", "Complimentary Airport Transfer"],
    images: ["https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    available: true
  }
];

export const hyderabadHotels: Hotel[] = [
  {
    id: 200,
    name: "ITC Kohenur Hyderabad",
    destinationId: 100,
    destination: "Hyderabad",
    rating: 4.8,
    reviewCount: 2847,
    pricePerNight: 8500,
    originalPrice: 10000,
    discount: 15,
    crimeLevel: "moderate",
    safetyScore: 8.5,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Pool", "Business Center", "Valet Parking"],
    description: "Luxury hotel in HITEC City with world-class amenities and traditional Hyderabadi hospitality",
    address: "HITEC City, Cyberabad, Hyderabad, Telangana 500081",
    coordinates: { lat: 17.4435, lng: 78.3772 },
    roomTypes: hyderabadRoomTypes,
    policies: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["HITEC City", "Cyber Towers", "Inorbit Mall", "Shilparamam"]
  },
  {
    id: 201,
    name: "Taj Falaknuma Palace",
    destinationId: 100,
    destination: "Hyderabad",
    rating: 4.9,
    reviewCount: 1654,
    pricePerNight: 25000,
    originalPrice: 30000,
    discount: 17,
    crimeLevel: "moderate",
    safetyScore: 9.0,
    images: [
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Pool", "Heritage Tours", "Butler Service"],
    description: "Magnificent palace hotel offering royal experience with panoramic city views",
    address: "Engine Bowli, Falaknuma, Hyderabad, Telangana 500053",
    coordinates: { lat: 17.3242, lng: 78.4554 },
    roomTypes: hyderabadRoomTypes.map(room => ({ ...room, price: room.price * 3 })),
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Charminar", "Mecca Masjid", "Laad Bazaar", "Salar Jung Museum"]
  },
  {
    id: 202,
    name: "Hyatt Hyderabad Gachibowli",
    destinationId: 100,
    destination: "Hyderabad",
    rating: 4.6,
    reviewCount: 3421,
    pricePerNight: 6500,
    originalPrice: 7500,
    discount: 13,
    crimeLevel: "moderate",
    safetyScore: 8.2,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Pool", "Business Center", "Conference Rooms"],
    description: "Modern luxury hotel in Gachibowli with contemporary amenities and excellent connectivity",
    address: "Gachibowli, Hyderabad, Telangana 500032",
    coordinates: { lat: 17.4399, lng: 78.3489 },
    roomTypes: hyderabadRoomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: true,
      smoking: false
    },
    nearby: ["Gachibowli Stadium", "ISB", "Microsoft Campus", "DLF Cyber City"]
  },
  {
    id: 203,
    name: "The Golkonda Hotel",
    destinationId: 100,
    destination: "Hyderabad",
    rating: 4.4,
    reviewCount: 2156,
    pricePerNight: 4500,
    originalPrice: 5200,
    discount: 13,
    crimeLevel: "moderate",
    safetyScore: 7.8,
    images: [
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Restaurant", "Bar", "Fitness Center", "Business Center", "Laundry", "Room Service"],
    description: "Heritage hotel near Golconda Fort offering traditional hospitality with modern comforts",
    address: "Masab Tank, Hyderabad, Telangana 500028",
    coordinates: { lat: 17.4126, lng: 78.4071 },
    roomTypes: hyderabadRoomTypes,
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Golconda Fort", "Qutb Shahi Tombs", "Durgam Cheruvu", "Jubilee Hills"]
  },
  {
    id: 204,
    name: "Novotel Hyderabad Airport",
    destinationId: 100,
    destination: "Hyderabad",
    rating: 4.5,
    reviewCount: 1876,
    pricePerNight: 5500,
    originalPrice: 6200,
    discount: 11,
    crimeLevel: "moderate",
    safetyScore: 8.3,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Airport Shuttle", "Restaurant", "Bar", "Fitness Center", "Pool", "Business Center", "24/7 Room Service"],
    description: "Contemporary airport hotel with excellent connectivity and modern amenities",
    address: "GMR Hyderabad International Airport, Shamshabad, Hyderabad, Telangana 501218",
    coordinates: { lat: 17.2403, lng: 78.4294 },
    roomTypes: hyderabadRoomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Rajiv Gandhi International Airport", "Wonderla Amusement Park", "Mrugavani National Park"]
  },
  {
    id: 205,
    name: "Ramoji Film City Resort",
    destinationId: 100,
    destination: "Hyderabad",
    rating: 4.3,
    reviewCount: 3654,
    pricePerNight: 3500,
    originalPrice: 4000,
    discount: 13,
    crimeLevel: "moderate",
    safetyScore: 8.0,
    images: [
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Theme Park Access", "Restaurant", "Bar", "Pool", "Adventure Sports", "Film City Tours"],
    description: "Entertainment resort within Ramoji Film City offering unique film-themed experiences",
    address: "Ramoji Film City, Abdullahpurmet, Hyderabad, Telangana 501512",
    coordinates: { lat: 17.2543, lng: 78.6808 },
    roomTypes: hyderabadRoomTypes,
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Ramoji Film City", "Ananthagiri Hills", "Keesaragutta Temple"]
  }
];

export const hyderabadTourPackages: TourPackage[] = [
  {
    id: 1,
    name: "Hyderabad Heritage Tour",
    duration: "3 Days 2 Nights",
    price: 8500,
    originalPrice: 10000,
    discount: 15,
    description: "Explore the rich heritage of Hyderabad with visits to iconic monuments and palaces",
    inclusions: ["Accommodation", "Breakfast", "Guided Tours", "Transportation"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Old City Tour",
        activities: ["Check-in at hotel", "Charminar visit", "Laad Bazaar shopping", "Mecca Masjid", "Traditional dinner"]
      },
      {
        day: 2,
        title: "Forts & Museums",
        activities: ["Golconda Fort", "Qutb Shahi Tombs", "Salar Jung Museum", "Hussain Sagar Lake", "Lumbini Park"]
      },
      {
        day: 3,
        title: "Modern Hyderabad",
        activities: ["Ramoji Film City", "Birla Mandir", "Tank Bund", "Departure"]
      }
    ],
    images: ["https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    rating: 4.6,
    reviewCount: 1234,
    destinations: ["Hyderabad"],
    safetyScore: 8.0
  },
  {
    id: 2,
    name: "Telangana Temple Trail",
    duration: "5 Days 4 Nights",
    price: 15000,
    originalPrice: 18000,
    discount: 17,
    description: "Spiritual journey through ancient temples and sacred sites of Telangana",
    inclusions: ["Accommodation", "All Meals", "Guided Tours", "Transportation", "Temple Donations"],
    itinerary: [
      {
        day: 1,
        title: "Arrival Hyderabad",
        activities: ["Airport pickup", "Birla Mandir", "Jagannath Temple", "Hotel check-in"]
      },
      {
        day: 2,
        title: "Warangal Temples",
        activities: ["Drive to Warangal", "Thousand Pillar Temple", "Bhadrakali Temple", "Warangal Fort"]
      },
      {
        day: 3,
        title: "Bhadrachalam",
        activities: ["Drive to Bhadrachalam", "Sri Rama Temple", "Parnasala", "River Godavari"]
      },
      {
        day: 4,
        title: "Karimnagar & Return",
        activities: ["Vemulawada Temple", "Kondagattu Temple", "Return to Hyderabad"]
      },
      {
        day: 5,
        title: "Departure",
        activities: ["Keesaragutta Temple", "Shopping", "Airport drop"]
      }
    ],
    images: ["https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    rating: 4.8,
    reviewCount: 876,
    destinations: ["Hyderabad", "Warangal", "Bhadrachalam", "Karimnagar"],
    safetyScore: 8.5
  }
];

export const hyderabadRestaurants = [
  {
    id: 1,
    name: "Paradise Biryani",
    cuisine: "Hyderabadi",
    rating: 4.5,
    priceRange: "₹₹",
    specialty: "Hyderabadi Biryani",
    location: "Multiple locations",
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: 2,
    name: "Bawarchi",
    cuisine: "Hyderabadi",
    rating: 4.3,
    priceRange: "₹₹",
    specialty: "Mutton Biryani",
    location: "RTC X Roads",
    coordinates: { lat: 17.4239, lng: 78.4738 }
  },
  {
    id: 3,
    name: "Shah Ghouse",
    cuisine: "Hyderabadi",
    rating: 4.4,
    priceRange: "₹₹",
    specialty: "Chicken Biryani",
    location: "Tolichowki",
    coordinates: { lat: 17.3616, lng: 78.4747 }
  }
];