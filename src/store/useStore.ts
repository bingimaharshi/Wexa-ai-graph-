import { create } from 'zustand';
import { User, Booking, SearchFilters, LocationData } from '../types';

interface StoreState {
  user: User | null;
  bookings: Booking[];
  searchFilters: SearchFilters;
  isAuthenticated: boolean;
  userLocation: LocationData | null;
  setUser: (user: User | null) => void;
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  updateUserLocation: (location: LocationData) => void;
  logout: () => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  bookings: [],
  searchFilters: {
    destination: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 2,
  },
  isAuthenticated: false,
  userLocation: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  updateSearchFilters: (filters) => set((state) => ({ 
    searchFilters: { ...state.searchFilters, ...filters } 
  })),
  updateUserLocation: (location) => set((state) => ({
    userLocation: location,
    user: state.user ? { ...state.user, location } : null
  })),
  logout: () => set({ user: null, isAuthenticated: false, bookings: [], userLocation: null }),
}));