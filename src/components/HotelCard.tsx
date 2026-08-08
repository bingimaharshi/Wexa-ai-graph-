import React from 'react';
import { Star, MapPin, Shield, Wifi, Car, Utensils, Waves } from 'lucide-react';
import { Hotel } from '../types';
import { getCrimeColor, getCrimeLabel } from '../data/mockData';

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect }) => {
  const amenityIcons = {
    'Free WiFi': Wifi,
    'Valet Parking': Car,
    'Restaurant': Utensils,
    'Spa': Waves,
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(hotel)}
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

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{hotel.rating}</span>
            <span className="text-xs text-gray-500">({hotel.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{hotel.destination}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrimeColor(hotel.crimeLevel)}`}>
            {getCrimeLabel(hotel.crimeLevel)} Crime
          </span>
          <span className="text-xs text-gray-500">Safety Score: {hotel.safetyScore}/10</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {hotel.amenities.slice(0, 4).map((amenity, index) => {
            const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
            return (
              <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                {Icon && <Icon className="h-3 w-3" />}
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            {hotel.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${hotel.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-gray-900">
              ${hotel.pricePerNight}
            </span>
            <span className="text-sm text-gray-500">per night</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;