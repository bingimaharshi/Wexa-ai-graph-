import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Star, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Award, 
  Navigation, 
  Brain, 
  Zap,
  ArrowRight,
  Play,
  ChevronDown,
  Globe,
  Clock,
  Heart
} from 'lucide-react';
import EnhancedSearchBar from './EnhancedSearchBar';
import LocationTracker from '../LocationTracker';
import AIRecommendations from '../AIRecommendations';
import EnhancedHotelCard from './EnhancedHotelCard';
import { destinations, hotels } from '../../data/mockData';
import { hyderabadAttractions, hyderabadTourPackages } from '../../data/hyderabadData';
import { getCrimeColor, getCrimeLabel } from '../../data/mockData';
import { LocationService } from '../../services/locationService';
import { useStore } from '../../store/useStore';
import { useInView } from 'react-intersection-observer';

const EnhancedLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserLocation, updateSearchFilters } = useStore();
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [showLocationFeatures, setShowLocationFeatures] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });
  const [hotelsRef, hotelsInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    LocationService.getCurrentLocation()
      .then(location => {
        updateUserLocation(location);
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Tourdim's AI recommendations helped me find the perfect hotel in Hyderabad. The safety analysis gave me confidence to travel solo!",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
    },
    {
      name: "Raj Patel",
      location: "Mumbai, India",
      rating: 5,
      text: "The ML-powered safety features are incredible. I saved 20% on my booking with their smart pricing optimization.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
    },
    {
      name: "Emily Chen",
      location: "Singapore",
      rating: 5,
      text: "Best travel platform I've used! The GPS-based recommendations and real-time safety updates are game-changers.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers", icon: Users },
    { number: "15%", label: "Average Savings", icon: TrendingUp },
    { number: "95%", label: "Safety Satisfaction", icon: Shield },
    { number: "24/7", label: "AI Support", icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-secondary-600/10 to-accent-500/20" />
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Logo Animation */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.div 
                className="bg-gradient-to-r from-primary-900 to-secondary-600 p-4 rounded-2xl shadow-2xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="h-12 w-12 text-white" />
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold font-display bg-gradient-to-r from-primary-900 via-secondary-600 to-accent-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Tourdim
              </motion.h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-4 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Discover safe, curated travel experiences with{' '}
              <span className="bg-gradient-to-r from-accent-500 to-secondary-600 bg-clip-text text-transparent font-bold">
                AI-powered pricing
              </span>{' '}
              and real-time safety insights
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Explore Hyderabad & Telangana with ML-powered safety analysis and GPS-based recommendations
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { icon: Brain, text: "AI-Powered" },
                { icon: Shield, text: "ML Safety" },
                { icon: Navigation, text: "GPS Tracking" },
                { icon: Zap, text: "Instant Booking" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="h-4 w-4 text-primary-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-5xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <EnhancedSearchBar onSearch={handleSearch} />
            {searchInitiated && (
              <motion.p
                className="mt-4 text-red-600 text-center font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Please select a destination to continue your search
              </motion.p>
            )}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-gray-400" />
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </motion.div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Location Features */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-gray-100 mb-4">
              Smart Travel Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the future of travel with our AI-powered recommendations and real-time safety analysis
            </p>
          </motion.div>

          <div className="text-center mb-8">
            <motion.button
              onClick={() => setShowLocationFeatures(!showLocationFeatures)}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-2xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation className="h-6 w-6" />
              {showLocationFeatures ? 'Hide' : 'Show'} Smart Features
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>

          {showLocationFeatures && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LocationTracker />
              <AIRecommendations />
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-gray-100 mb-4">
              Why Choose Tourdim?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the future of travel booking with our innovative features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "ML Safety Analysis",
                description: "Advanced machine learning algorithms analyze real-time safety data for informed decisions",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
              },
              {
                icon: Brain,
                title: "AI-Powered Pricing",
                description: "Smart pricing optimization using OpenAI GPT-4 for maximum savings and value",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
              },
              {
                icon: Navigation,
                title: "GPS Location Services",
                description: "Real-time location tracking with personalized recommendations based on your current position",
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
              },
              {
                icon: Zap,
                title: "Complete Booking System",
                description: "End-to-end booking experience like MakeMyTrip with secure payments and instant confirmations",
                color: "from-orange-500 to-orange-600",
                bgColor: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgColor} hover:shadow-2xl transition-all duration-500 group overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-16 h-16 mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section ref={hotelsRef} className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={hotelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-gray-100 mb-4">
              Featured Hotels
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our most popular luxury accommodations worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <EnhancedHotelCard
                key={hotel.id}
                hotel={hotel}
                onSelect={(hotel) => navigate(`/hotel/${hotel.id}`)}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/search')}
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Hotels
              <ArrowRight className="h-5 w-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-gray-100 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of satisfied customers who trust Tourdim
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 md:p-12 shadow-2xl"
              key={activeTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[activeTestimonial].location}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === activeTestimonial
                      ? 'bg-primary-600 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 via-secondary-600 to-accent-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of travelers who trust Tourdim for safe, smart, and affordable travel experiences
            </p>
            <motion.button
              onClick={() => navigate('/search')}
              className="bg-white text-primary-900 px-12 py-4 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Exploring
              <ArrowRight className="h-6 w-6 ml-2 inline" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedLandingPage;