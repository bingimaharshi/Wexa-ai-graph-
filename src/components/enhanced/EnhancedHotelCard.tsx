import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Shield, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  Heart,
  Share2,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Hotel } from '../../types';
import { getCrimeColor, getCrimeLabel } from '../../data/mockData';
import { SafetyBadge } from '../ui/Badge';

interface EnhancedHotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
  index?: number;
}

const EnhancedHotelCard: React.FC<EnhancedHotelCardProps> = ({ hotel, onSelect, index = 0 }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);

  const amenityIcons = {
    'Free WiFi': Wifi,
    'Valet Parking': Car,
    'Restaurant': Utensils,
    'Spa': Waves,
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: `Check out ${hotel.name} in ${hotel.destination}`,
        url: window.location.href,
      });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-500"
      onClick={() => onSelect(hotel)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <motion.img 
          src={hotel.images[imageIndex]} 
          alt={hotel.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
          }}
        />
        
        {/* Image Navigation Dots */}
        {hotel.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {hotel.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  idx === imageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <motion.button
            onClick={handleLike}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </motion.button>
          <motion.button
            onClick={handleShare}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </motion.button>
        </div>

        {/* Discount Badge */}
        {hotel.discount && (
          <motion.div
            className="absolute top-3 left-3 bg-gradient-to-r from-accent-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {hotel.discount}% OFF
          </motion.div>
        )}

        {/* Safety Score */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
          <SafetyBadge level={hotel.crimeLevel} score={hotel.safetyScore} />
        </div>

        {/* Quick View Button */}
        <motion.div
          className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.button
            className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="h-4 w-4" />
            Quick View
          </motion.button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <motion.h3 
              className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-1"
              layoutId={`hotel-title-${hotel.id}`}
            >
              {hotel.name}
            </motion.h3>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{hotel.destination}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{hotel.rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({hotel.reviewCount})</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity, index) => {
            const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
            return (
              <motion.div 
                key={index} 
                className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg text-xs text-gray-600 dark:text-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                {Icon && <Icon className="h-3 w-3" />}
                <span>{amenity}</span>
              </motion.div>
            );
          })}
          {hotel.amenities.length > 4 && (
            <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-lg text-xs font-medium">
              +{hotel.amenities.length - 4} more
            </div>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {hotel.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {hotel.destination === 'Hyderabad' ? '₹' : '$'}{hotel.originalPrice}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {hotel.destination === 'Hyderabad' ? '₹' : '$'}{hotel.pricePerNight}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">per night</span>
            </div>
          </div>
          
          <motion.button 
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Additional Info */}
        <motion.div 
          className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
        >
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Free cancellation</span>
            <span>Instant confirmation</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedHotelCard;