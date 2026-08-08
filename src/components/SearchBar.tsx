import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { destinations } from '../data/mockData';

interface SearchBarProps {
  onSearch: (filters: any) => void;
  showFullForm?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, showFullForm = false }) => {
  const { searchFilters, updateSearchFilters } = useStore();
  const [localFilters, setLocalFilters] = useState(searchFilters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting search with filters:', localFilters);
    updateSearchFilters(localFilters);
    onSearch(localFilters);
  };

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    console.log('Updated filter:', key, value, newFilters);
  };

  // Set default dates if not provided
  React.useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (!localFilters.checkInDate) {
      updateFilter('checkInDate', today.toISOString().split('T')[0]);
    }
    if (!localFilters.checkOutDate) {
      updateFilter('checkOutDate', tomorrow.toISOString().split('T')[0]);
    }
  }, []);

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${showFullForm ? 'border border-gray-200' : ''}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                value={localFilters.destination}
                onChange={(e) => updateFilter('destination', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select destination</option>
                {destinations.map(dest => (
                  <option key={dest.id} value={dest.name}>
                    {dest.name}, {dest.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Check-in Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={localFilters.checkInDate}
                onChange={(e) => updateFilter('checkInDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={localFilters.checkOutDate}
                onChange={(e) => updateFilter('checkOutDate', e.target.value)}
                min={localFilters.checkInDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                value={localFilters.guests}
                onChange={(e) => updateFilter('guests', parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {showFullForm && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range (per night)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={localFilters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={localFilters.maxPrice || ''}
                  onChange={(e) => updateFilter('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <select
                value={localFilters.rating || ''}
                onChange={(e) => updateFilter('rating', e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any rating</option>
                <option value="4.5">4.5+ stars</option>
                <option value="4.0">4.0+ stars</option>
                <option value="3.5">3.5+ stars</option>
                <option value="3.0">3.0+ stars</option>
              </select>
            </div>

            {/* Safety Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Safety Level
              </label>
              <select
                value={localFilters.safetyScore || ''}
                onChange={(e) => updateFilter('safetyScore', e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any safety level</option>
                <option value="9">9+ Very Safe</option>
                <option value="8">8+ Safe</option>
                <option value="7">7+ Moderately Safe</option>
                <option value="6">6+ Basic Safety</option>
              </select>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Search className="h-5 w-5" />
          Search Hotels
        </button>
      </form>
    </div>
  );
};

export default SearchBar;