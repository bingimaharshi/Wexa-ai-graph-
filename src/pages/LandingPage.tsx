import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Star, MapPin, Sparkles, TrendingUp, Users, Award, Navigation, Brain, Zap } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import LocationTracker from '../components/LocationTracker';
import AIRecommendations from '../components/AIRecommendations';
import { destinations, hotels } from '../data/mockData';
import { hyderabadAttractions, hyderabadTourPackages } from '../data/hyderabadData';
import { getCrimeColor, getCrimeLabel } from '../data/mockData';
import { LocationService } from '../services/locationService';
import { useStore } from '../store/useStore';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserLocation, updateSearchFilters } = useStore();
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [showLocationFeatures, setShowLocationFeatures] = useState(false);

  useEffect(() => {
    // Try to get user's location on page load
    LocationService.getCurrentLocation()
      .then(location => {
        updateUserLocation(location);
        // If user is in Hyderabad, suggest Hyderabad destinations
        if (location.city.toLowerCase().includes('hyderabad')) {
          updateSearchFilters({ destination: 'Hyderabad' });
        }
      })
      .catch(error => {
        console.log('Location access denied or failed:', error);
      });
  }, []);

  const handleSearch = (filters: any) => {
    if (filters.destination) {
      navigate('/search', { state: { filters } });
    } else {
      setSearchInitiated(true);
    }
  };

  const featuredHotels = hotels.slice(0, 6);
  const topDestinations = destinations.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tourdim
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-4">
                Discover safe, curated travel experiences with AI-powered pricing and real-time safety insights
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Explore Hyderabad & Telangana with ML-powered safety analysis and GPS-based recommendations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <SearchBar onSearch={handleSearch} />
              {searchInitiated && (
                <p className="mt-4 text-red-600 text-center">
                  Please select a destination to continue your search
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI & Location Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowLocationFeatures(!showLocationFeatures)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <Navigation className="h-5 w-5" />
              {showLocationFeatures ? 'Hide' : 'Show'} Smart Features
            </button>
          </div>

          {showLocationFeatures && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            >
              <LocationTracker />
              <AIRecommendations />
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tourdim?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of travel booking with our innovative features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
            >
              <div className="bg-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ML Safety Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                Advanced machine learning algorithms analyze real-time safety data for informed decisions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300"
            >
              <div className="bg-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI-Powered Pricing
              </h3>
              <p className="text-gray-600 text-sm">
                Smart pricing optimization using OpenAI GPT-4 for maximum savings and value
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300"
            >
              <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Navigation className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                GPS Location Services
              </h3>
              <p className="text-gray-600 text-sm">
                Real-time location tracking with personalized recommendations based on your current position
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300"
            >
              <div className="bg-orange-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Complete Booking System
              </h3>
              <p className="text-gray-600 text-sm">
                End-to-end booking experience like MakeMyTrip with secure payments and instant confirmations
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hyderabad Special Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Hyderabad & Telangana
            </h2>
            <p className="text-xl text-gray-600">
              Discover the City of Pearls with our comprehensive tourism guide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Top Attractions */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Must-Visit Attractions</h3>
              <div className="space-y-4">
                {hyderabadAttractions.slice(0, 4).map((attraction, index) => (
                  <motion.div
                    key={attraction.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate('/search', { state: { filters: { destination: 'Hyderabad' } } })}
                  >
                    <div className="flex items-start gap-4">
                      <img 
                        src={attraction.image} 
                        alt={attraction.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{attraction.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>₹{attraction.entryFee.indian} (Indian)</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400" />
                            {attraction.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-green-600" />
                            {attraction.safetyScore}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tour Packages */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Tour Packages</h3>
              <div className="space-y-4">
                {hyderabadTourPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.duration}</p>
                      </div>
                      <div className="text-right">
                        {pkg.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice}</span>
                        )}
                        <div className="text-xl font-bold text-gray-900">₹{pkg.price}</div>
                        {pkg.discount && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            {pkg.discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          {pkg.rating} ({pkg.reviewCount} reviews)
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3 text-green-600" />
                          Safety: {pkg.safetyScore}/10
                        </span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Hotels
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular luxury accommodations worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => navigate(`/hotel/${hotel.id}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <img 
                    src={hotel.images[0]} 
                    alt={hotel.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {hotel.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      {hotel.discount}% OFF
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{hotel.safetyScore}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{hotel.destination}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrimeColor(hotel.crimeLevel)}`}>
                      {getCrimeLabel(hotel.crimeLevel)} Crime
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      {hotel.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {hotel.destination === 'Hyderabad' ? '₹' : '$'}{hotel.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-gray-900">
                        {hotel.destination === 'Hyderabad' ? '₹' : '$'}{hotel.pricePerNight}
                      </span>
                      <span className="text-sm text-gray-500">per night</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Explore the world's most captivating travel destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => navigate('/search', { state: { filters: { destination: destination.name } } })}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{destination.safetyScore}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-semibold mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-2">
                      {destination.country}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrimeColor(destination.crimeLevel)}`}>
                      {getCrimeLabel(destination.crimeLevel)} Crime
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-12 w-12" />
              </div>
              <div className="text-3xl font-bold mb-2">15% Average</div>
              <div className="text-lg">Savings with AI Pricing</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12" />
              </div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-lg">Happy Travelers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Award className="h-12 w-12" />
              </div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-lg">Safety Satisfaction</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Brain className="h-12 w-12" />
              </div>
              <div className="text-3xl font-bold mb-2">AI-Powered</div>
              <div className="text-lg">Smart Recommendations</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;