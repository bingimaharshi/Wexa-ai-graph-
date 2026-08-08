export interface Destination {
  id: number;
  name: string;
  country: string;
  state?: string;
  crimeLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  safetyScore: number;
  description: string;
  image: string;
  popularAttractions: string[];
  bestTimeToVisit: string;
  averageTemp: string;
  currency: string;
  language: string;
  timeZone: string;
  coordinates?: { lat: number; lng: number };
}

export interface Hotel {
  id: number;
  name: string;
  destinationId: number;
  destination: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  discount?: number;
  crimeLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  safetyScore: number;
  images: string[];
  amenities: string[];
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  roomTypes: RoomType[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    pets: boolean;
    smoking: boolean;
  };
  nearby: string[];
}

export interface RoomType {
  id: number;
  name: string;
  capacity: number;
  size: string;
  price: number;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface Attraction {
  id: number;
  name: string;
  type: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  entryFee: { indian: number; foreign: number };
  timings: string;
  rating: number;
  safetyScore: number;
  image: string;
  nearbyHotels: number[];
}

export interface TourPackage {
  id: number;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  inclusions: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  images: string[];
  rating: number;
  reviewCount: number;
  destinations: string[];
  safetyScore: number;
}

export interface BookingRequest {
  hotelId: number;
  roomTypeId: number;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Booking {
  id: number;
  hotelId: number;
  hotelName: string;
  roomTypeId: number;
  roomTypeName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  location?: {
    lat: number;
    lng: number;
    city: string;
    state: string;
    country: string;
  };
}

export interface SearchFilters {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  amenities?: string[];
  crimeLevel?: string[];
  safetyScore?: number;
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
}

export interface PricingAnalysis {
  basePrice: number;
  optimizedPrice: number;
  factors: {
    demand: number;
    seasonality: number;
    safety: number;
    competition: number;
    location: number;
  };
  recommendations: string[];
  savings: number;
  confidence: number;
}

export interface SafetyAnalysis {
  overallScore: number;
  crimeLevel: string;
  factors: {
    criminalActivity: number;
    politicalStability: number;
    naturalDisasters: number;
    healthSafety: number;
    transportSafety: number;
  };
  recommendations: string[];
  alerts: string[];
  lastUpdated: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  forecast: {
    date: string;
    high: number;
    low: number;
    condition: string;
  }[];
}

export interface LocationData {
  lat: number;
  lng: number;
  city: string;
  state: string;
  country: string;
  accuracy: number;
}