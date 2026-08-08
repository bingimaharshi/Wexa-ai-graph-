import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ArrowUpDown, MapPin } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import { Hotel } from '../types';
import { hotels } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchFilters, updateSearchFilters } = useStore();
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Get filters from location state or store
    const initialFilters = location.state?.filters || searchFilters;
    setCurrentFilters(initialFilters);
    filterHotels(initialFilters, sortBy);
  }, [location, searchFilters]);

  useEffect(() => {
    filterHotels(currentFilters, sortBy);
  }, [sortBy]);

  const filterHotels = (searchFilters: any, currentSort: string = sortBy) => {
    console.log('Filtering with:', searchFilters);
    let filtered = [...hotels]; // Create a copy of the hotels array

    // Filter by destination - more flexible matching
    if (searchFilters.destination) {
      const searchTerm = searchFilters.destination.toLowerCase();
      filtered = filtered.filter(hotel => 
        hotel.destination.toLowerCase().includes(searchTerm) ||
        hotel.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    if (searchFilters.minPrice !== undefined && searchFilters.minPrice !== null) {
      filtered = filtered.filter(hotel => hotel.pricePerNight >= searchFilters.minPrice);
    }
    if (searchFilters.maxPrice !== undefined && searchFilters.maxPrice !== null) {
      filtered = filtered.filter(hotel => hotel.pricePerNight <= searchFilters.maxPrice);
    }

    // Filter by rating
    if (searchFilters.rating !== undefined && searchFilters.rating !== null) {
      filtered = filtered.filter(hotel => hotel.rating >= searchFilters.rating);
    }

    // Filter by safety score
    if (searchFilters.safetyScore !== undefined && searchFilters.safetyScore !== null) {
      filtered = filtered.filter(hotel => hotel.safetyScore >= searchFilters.safetyScore);
    }

    // Sort hotels
    switch (currentSort) {
      case 'price-low':
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'safety':
        filtered.sort((a, b) => b.safetyScore - a.safetyScore);
        break;
      default:
        // Keep original order for recommended
        break;
    }

    console.log('Filtered hotels:', filtered);
    setFilteredHotels(filtered);
  };

  const handleSearch = (newFilters: any) => {
    console.log('New search filters:', newFilters);
    setCurrentFilters(newFilters);
    updateSearchFilters(newFilters);
    filterHotels(newFilters, sortBy);
  };

  const handleHotelSelect = (hotel: Hotel) => {
    navigate(`/hotel/${hotel.id}`);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    filterHotels(currentFilters, newSortBy);
  };

  const handleQuickFilter = (filterType: string, value: any) => {
    const newFilters = { ...currentFilters, [filterType]: value };
    setCurrentFilters(newFilters);
    updateSearchFilters(newFilters);
    filterHotels(newFilters, sortBy);
  };

  const clearFilters = () => {
    const clearedFilters = {
      destination: currentFilters.destination || '', // Keep destination
      checkInDate: currentFilters.checkInDate || '',
      checkOutDate: currentFilters.checkOutDate || '',
      guests: currentFilters.guests || 2,
    };
    setCurrentFilters(clearedFilters);
    updateSearchFilters(clearedFilters);
    filterHotels(clearedFilters, sortBy);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {currentFilters.destination || 'All destinations'} • {filteredHotels.length} hotels found
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
          
          <SearchBar onSearch={handleSearch} showFullForm={true} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all
                </button>
              </div>
              
              {/* Sort Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="safety">Safest First</option>
                </select>
              </div>

              {/* Quick Filters */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Safety Level</h4>
                  <div className="space-y-2">
                    {[
                      { value: 9, label: 'Very Safe (9+)', color: 'text-green-600' },
                      { value: 8, label: 'Safe (8+)', color: 'text-green-500' },
                      { value: 7, label: 'Moderate (7+)', color: 'text-yellow-600' },
                      { value: 6, label: 'Basic (6+)', color: 'text-orange-600' },
                    ].map((safety) => (
                      <label key={safety.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="safety"
                          value={safety.value}
                          checked={currentFilters.safetyScore === safety.value}
                          onChange={(e) => handleQuickFilter('safetyScore', parseInt(e.target.value))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`text-sm ${safety.color}`}>
                          {safety.label}
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="safety"
                        checked={!currentFilters.safetyScore}
                        onChange={() => handleQuickFilter('safetyScore', undefined)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Any safety level</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Star Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={currentFilters.rating === rating}
                          onChange={(e) => handleQuickFilter('rating', parseInt(e.target.value))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {rating}+ stars
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={!currentFilters.rating}
                        onChange={() => handleQuickFilter('rating', undefined)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Any rating</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { min: 0, max: 200, label: 'Under $200' },
                      { min: 200, max: 400, label: '$200 - $400' },
                      { min: 400, max: 600, label: '$400 - $600' },
                      { min: 600, max: 9999, label: '$600+' },
                    ].map((price) => (
                      <label key={`${price.min}-${price.max}`} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={currentFilters.minPrice === price.min && 
                                   (price.max === 9999 ? !currentFilters.maxPrice : currentFilters.maxPrice === price.max)}
                          onChange={() => handleQuickFilter('minPrice', price.min) || 
                                     handleQuickFilter('maxPrice', price.max === 9999 ? undefined : price.max)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {price.label}
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={!currentFilters.minPrice && !currentFilters.maxPrice}
                        onChange={() => {
                          handleQuickFilter('minPrice', undefined);
                          handleQuickFilter('maxPrice', undefined);
                        }}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Any price</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Showing {filteredHotels.length} results
                </span>
              </div>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="text-gray-500 text-lg mb-2">No hotels found</div>
                  <p className="text-gray-400 mb-4">
                    Try adjusting your search criteria or clearing filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard 
                    key={hotel.id} 
                    hotel={hotel} 
                    onSelect={handleHotelSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;