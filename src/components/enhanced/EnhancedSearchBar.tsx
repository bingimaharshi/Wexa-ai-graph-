import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Users, 
  MapPin, 
  Filter,
  X,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { destinations } from '../../data/mockData';

interface EnhancedSearchBarProps {
  onSearch: (filters: any) => void;
  showFullForm?: boolean;
  className?: string;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ 
  onSearch, 
  showFullForm = false,
  className = ''
}) => {
  const { searchFilters, updateSearchFilters } = useStore();
  const [localFilters, setLocalFilters] = useState(searchFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchFilters(localFilters);
    onSearch(localFilters);
  };

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleDestinationChange = (value: string) => {
    updateFilter('destination', value);
    
    if (value.length > 0) {
      const suggestions = destinations
        .filter(dest => 
          dest.name.toLowerCase().includes(value.toLowerCase()) ||
          dest.country.toLowerCase().includes(value.toLowerCase())
        )
        .map(dest => `${dest.name}, ${dest.country}`)
        .slice(0, 5);
      
      setDestinationSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const popularDestinations = [
    'Hyderabad, India',
    'Paris, France',
    'Tokyo, Japan',
    'Dubai, UAE',
    'New York, USA'
  ];

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
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Where to?
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={localFilters.destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search destinations..."
                className="input-field pl-12 pr-4"
              />
              
              {/* Destination Suggestions */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-60 overflow-y-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {destinationSuggestions.length > 0 ? (
                      <>
                        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Suggestions</h4>
                        </div>
                        {destinationSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            onClick={() => {
                              updateFilter('destination', suggestion.split(',')[0]);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                            whileHover={{ x: 4 }}
                          >
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</span>
                          </motion.button>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Popular Destinations
                          </h4>
                        </div>
                        {popularDestinations.map((destination, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            onClick={() => {
                              updateFilter('destination', destination.split(',')[0]);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                            whileHover={{ x: 4 }}
                          >
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{destination}</span>
                          </motion.button>
                        ))}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={localFilters.checkInDate}
                onChange={(e) => updateFilter('checkInDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="input-field pl-12 pr-4"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={localFilters.checkOutDate}
                onChange={(e) => updateFilter('checkOutDate', e.target.value)}
                min={localFilters.checkInDate || new Date().toISOString().split('T')[0]}
                className="input-field pl-12 pr-4"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Guests
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={localFilters.guests}
                onChange={(e) => updateFilter('guests', parseInt(e.target.value))}
                className="input-field pl-12 pr-4 appearance-none"
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

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">
              {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
            </span>
          </motion.button>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Best time to book: Now</span>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {(showAdvanced || showFullForm) && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Price Range (per night)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minPrice || ''}
                    onChange={(e) => updateFilter('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="input-field text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxPrice || ''}
                    onChange={(e) => updateFilter('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={localFilters.rating || ''}
                  onChange={(e) => updateFilter('rating', e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="input-field"
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
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Safety Level
                </label>
                <select
                  value={localFilters.safetyScore || ''}
                  onChange={(e) => updateFilter('safetyScore', e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="input-field"
                >
                  <option value="">Any safety level</option>
                  <option value="9">9+ Very Safe</option>
                  <option value="8">8+ Safe</option>
                  <option value="7">7+ Moderately Safe</option>
                  <option value="6">6+ Basic Safety</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Button */}
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-900 via-secondary-600 to-accent-500 text-white font-bold py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={!localFilters.destination}
        >
          <Search className="h-6 w-6" />
          Search Hotels
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </form>

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </motion.div>
  );
};

export default EnhancedSearchBar;