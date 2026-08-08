import { Destination, Hotel, RoomType } from '../types';
import { hyderabadDestinations, hyderabadHotels } from './hyderabadData';

export const destinations: Destination[] = [
  ...hyderabadDestinations,
  {
    id: 1,
    name: "Paris",
    country: "France",
    crimeLevel: "low",
    safetyScore: 8.5,
    description: "The City of Light, known for its art, fashion, and romance",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Arc de Triomphe"],
    bestTimeToVisit: "April to June, September to November",
    averageTemp: "15°C (59°F)",
    currency: "EUR",
    language: "French",
    timeZone: "CET (UTC+1)",
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    crimeLevel: "very_low",
    safetyScore: 9.2,
    description: "A vibrant metropolis blending traditional culture with modern innovation",
    image: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Tokyo Skytree", "Senso-ji Temple", "Shibuya Crossing", "Imperial Palace"],
    bestTimeToVisit: "March to May, September to November",
    averageTemp: "16°C (61°F)",
    currency: "JPY",
    language: "Japanese",
    timeZone: "JST (UTC+9)",
    coordinates: { lat: 35.6762, lng: 139.6503 }
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    crimeLevel: "moderate",
    safetyScore: 7.8,
    description: "The Big Apple, a cultural and financial hub with iconic landmarks",
    image: "https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Statue of Liberty", "Central Park", "Times Square", "Empire State Building"],
    bestTimeToVisit: "April to June, September to November",
    averageTemp: "13°C (55°F)",
    currency: "USD",
    language: "English",
    timeZone: "EST (UTC-5)",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 4,
    name: "Dubai",
    country: "UAE",
    crimeLevel: "very_low",
    safetyScore: 9.0,
    description: "A luxury destination known for its modern architecture and shopping",
    image: "https://images.pexels.com/photos/1449824/pexels-photo-1449824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall", "Desert Safari"],
    bestTimeToVisit: "November to March",
    averageTemp: "26°C (79°F)",
    currency: "AED",
    language: "Arabic",
    timeZone: "GST (UTC+4)",
    coordinates: { lat: 25.2048, lng: 55.2708 }
  },
  {
    id: 5,
    name: "London",
    country: "UK",
    crimeLevel: "low",
    safetyScore: 8.2,
    description: "Historic capital with royal palaces, museums, and cultural landmarks",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Big Ben", "Tower Bridge", "British Museum", "Buckingham Palace"],
    bestTimeToVisit: "May to September",
    averageTemp: "12°C (54°F)",
    currency: "GBP",
    language: "English",
    timeZone: "GMT (UTC+0)",
    coordinates: { lat: 51.5074, lng: -0.1278 }
  },
  {
    id: 6,
    name: "Rome",
    country: "Italy",
    crimeLevel: "moderate",
    safetyScore: 7.5,
    description: "The Eternal City with ancient history and magnificent architecture",
    image: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popularAttractions: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"],
    bestTimeToVisit: "April to June, September to October",
    averageTemp: "16°C (61°F)",
    currency: "EUR",
    language: "Italian",
    timeZone: "CET (UTC+1)",
    coordinates: { lat: 41.9028, lng: 12.4964 }
  }
];

const roomTypes: RoomType[] = [
  {
    id: 1,
    name: "Standard Room",
    capacity: 2,
    size: "25 sqm",
    price: 150,
    amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar"],
    images: ["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    available: true
  },
  {
    id: 2,
    name: "Deluxe Room",
    capacity: 3,
    size: "35 sqm",
    price: 220,
    amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Balcony", "Room Service"],
    images: ["https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    available: true
  },
  {
    id: 3,
    name: "Suite",
    capacity: 4,
    size: "60 sqm",
    price: 350,
    amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Balcony", "Room Service", "Jacuzzi", "Kitchenette"],
    images: ["https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    available: true
  }
];

export const hotels: Hotel[] = [
  ...hyderabadHotels,
  // Paris Hotels
  {
    id: 1,
    name: "The Ritz Paris",
    destinationId: 1,
    destination: "Paris",
    rating: 4.9,
    reviewCount: 1842,
    pricePerNight: 450,
    originalPrice: 520,
    discount: 13,
    crimeLevel: "low",
    safetyScore: 8.5,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Concierge", "Valet Parking", "Room Service"],
    description: "Experience timeless elegance at The Ritz Paris, where luxury meets tradition in the heart of the City of Light.",
    address: "15 Place Vendôme, 75001 Paris, France",
    coordinates: { lat: 48.8678, lng: 2.3292 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Louvre Museum", "Tuileries Garden", "Opera House", "Champs-Élysées"]
  },
  {
    id: 2,
    name: "Hotel des Invalides",
    destinationId: 1,
    destination: "Paris",
    rating: 4.6,
    reviewCount: 1256,
    pricePerNight: 320,
    originalPrice: 380,
    discount: 16,
    crimeLevel: "low",
    safetyScore: 8.3,
    images: [
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Restaurant", "Bar", "Concierge", "Laundry", "Room Service"],
    description: "A charming boutique hotel near the famous Invalides, offering authentic Parisian hospitality.",
    address: "7th Arrondissement, Paris, France",
    coordinates: { lat: 48.8566, lng: 2.3122 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: true,
      smoking: false
    },
    nearby: ["Eiffel Tower", "Invalides", "Seine River", "Musée d'Orsay"]
  },
  // Tokyo Hotels
  {
    id: 3,
    name: "Park Hyatt Tokyo",
    destinationId: 2,
    destination: "Tokyo",
    rating: 4.8,
    reviewCount: 2156,
    pricePerNight: 380,
    originalPrice: 420,
    discount: 10,
    crimeLevel: "very_low",
    safetyScore: 9.2,
    images: [
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Business Center", "Laundry", "Room Service"],
    description: "Discover modern luxury with traditional Japanese hospitality at Park Hyatt Tokyo in the prestigious Shinjuku district.",
    address: "3-7-1-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-1055, Japan",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Tokyo Metropolitan Government Building", "Meiji Shrine", "Shibuya", "Harajuku"]
  },
  {
    id: 4,
    name: "Aman Tokyo",
    destinationId: 2,
    destination: "Tokyo",
    rating: 4.7,
    reviewCount: 987,
    pricePerNight: 650,
    originalPrice: 750,
    discount: 13,
    crimeLevel: "very_low",
    safetyScore: 9.1,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Pool", "Concierge", "Butler Service"],
    description: "An urban sanctuary in the heart of Tokyo, combining minimalist design with exceptional service.",
    address: "Otemachi, Chiyoda-ku, Tokyo, Japan",
    coordinates: { lat: 35.6895, lng: 139.7670 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Imperial Palace", "Tokyo Station", "Ginza", "Nihonbashi"]
  },
  // New York Hotels
  {
    id: 5,
    name: "The Plaza New York",
    destinationId: 3,
    destination: "New York",
    rating: 4.7,
    reviewCount: 3421,
    pricePerNight: 525,
    originalPrice: 595,
    discount: 12,
    crimeLevel: "moderate",
    safetyScore: 7.8,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Shopping", "Concierge", "Valet Parking"],
    description: "An iconic New York landmark offering unparalleled luxury and sophistication in the heart of Manhattan.",
    address: "768 5th Ave, New York, NY 10019, USA",
    coordinates: { lat: 40.7648, lng: -73.9754 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "4:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 72 hours before check-in",
      pets: true,
      smoking: false
    },
    nearby: ["Central Park", "Times Square", "Fifth Avenue", "Broadway"]
  },
  {
    id: 6,
    name: "The St. Regis New York",
    destinationId: 3,
    destination: "New York",
    rating: 4.5,
    reviewCount: 2876,
    pricePerNight: 475,
    originalPrice: 550,
    discount: 14,
    crimeLevel: "moderate",
    safetyScore: 7.9,
    images: [
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Butler Service", "Concierge", "Business Center"],
    description: "Timeless elegance in Midtown Manhattan with legendary butler service and refined accommodations.",
    address: "2 E 55th St, New York, NY 10022, USA",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: true,
      smoking: false
    },
    nearby: ["Central Park", "Museum of Modern Art", "Rockefeller Center", "Fifth Avenue"]
  },
  // Dubai Hotels
  {
    id: 7,
    name: "Burj Al Arab Jumeirah",
    destinationId: 4,
    destination: "Dubai",
    rating: 4.9,
    reviewCount: 2847,
    pricePerNight: 850,
    originalPrice: 950,
    discount: 11,
    crimeLevel: "very_low",
    safetyScore: 9.0,
    images: [
      "https://images.pexels.com/photos/1449824/pexels-photo-1449824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Beach Access", "Butler Service", "Helicopter Pad"],
    description: "Experience the pinnacle of luxury at Dubai's most iconic hotel, where extravagance meets Arabian hospitality.",
    address: "Jumeirah Beach Rd, Dubai, UAE",
    coordinates: { lat: 25.1413, lng: 55.1853 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Jumeirah Beach", "Dubai Mall", "Burj Khalifa", "Wild Wadi Waterpark"]
  },
  {
    id: 8,
    name: "Atlantis The Palm",
    destinationId: 4,
    destination: "Dubai",
    rating: 4.6,
    reviewCount: 4521,
    pricePerNight: 420,
    originalPrice: 480,
    discount: 13,
    crimeLevel: "very_low",
    safetyScore: 8.9,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Water Park", "Aquarium", "Restaurant", "Bar", "Beach Access", "Spa", "Kids Club"],
    description: "A spectacular resort on Palm Jumeirah featuring an aquarium, water park, and world-class dining.",
    address: "Crescent Rd, Dubai, UAE",
    coordinates: { lat: 25.1308, lng: 55.1173 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: false,
      smoking: false
    },
    nearby: ["Palm Jumeirah", "Dubai Marina", "JBR Beach", "Dubai Mall"]
  },
  // London Hotels
  {
    id: 9,
    name: "The Savoy London",
    destinationId: 5,
    destination: "London",
    rating: 4.8,
    reviewCount: 3156,
    pricePerNight: 395,
    originalPrice: 450,
    discount: 12,
    crimeLevel: "low",
    safetyScore: 8.2,
    images: [
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Theatre", "Concierge", "Butler Service"],
    description: "A legendary hotel on the Strand, offering timeless luxury and impeccable service in the heart of London.",
    address: "Strand, London WC2R 0EU, UK",
    coordinates: { lat: 51.5101, lng: -0.1197 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: true,
      smoking: false
    },
    nearby: ["Covent Garden", "Thames River", "Westminster", "London Eye"]
  },
  // Rome Hotels
  {
    id: 10,
    name: "Hotel de Russie Rome",
    destinationId: 6,
    destination: "Rome",
    rating: 4.6,
    reviewCount: 2234,
    pricePerNight: 340,
    originalPrice: 390,
    discount: 13,
    crimeLevel: "moderate",
    safetyScore: 7.5,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Bar", "Garden", "Concierge", "Room Service"],
    description: "An elegant retreat between Piazza del Popolo and the Spanish Steps, featuring beautiful gardens and refined Italian style.",
    address: "Via del Babuino 9, 00187 Rome, Italy",
    coordinates: { lat: 41.9109, lng: 12.4818 },
    roomTypes: roomTypes,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: true,
      smoking: false
    },
    nearby: ["Spanish Steps", "Piazza del Popolo", "Villa Borghese", "Trevi Fountain"]
  }
];

export const getCrimeColor = (level: string) => {
  const colors = {
    very_low: 'text-green-600 bg-green-100',
    low: 'text-green-500 bg-green-50',
    moderate: 'text-yellow-600 bg-yellow-100',
    high: 'text-orange-600 bg-orange-100',
    very_high: 'text-red-600 bg-red-100'
  };
  return colors[level as keyof typeof colors] || colors.moderate;
};

export const getCrimeLabel = (level: string) => {
  const labels = {
    very_low: 'Very Low',
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    very_high: 'Very High'
  };
  return labels[level as keyof typeof labels] || 'Moderate';
};