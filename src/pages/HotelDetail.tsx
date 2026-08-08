import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Shield, 
  Wifi, 
  Car, 
  Utensils, 
  Waves, 
  Calendar,
  Users,
  CreditCard,
  Check
} from 'lucide-react';
import { Hotel, BookingRequest } from '../types';
import { hotels } from '../data/mockData';
import SafetyIndicator from '../components/SafetyIndicator';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { searchFilters, addBooking, isAuthenticated } = useStore();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState(0);
  const [bookingDetails, setBookingDetails] = useState({
    checkInDate: searchFilters.checkInDate || '',
    checkOutDate: searchFilters.checkOutDate || '',
    guests: searchFilters.guests || 2,
    userDetails: {
      name: '',
      email: '',
      phone: ''
    }
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (id) {
      const foundHotel = hotels.find(h => h.id === parseInt(id));
      if (foundHotel) {
        setHotel(foundHotel);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (!bookingDetails.checkInDate || !bookingDetails.checkOutDate) return 0;
    const checkIn = new Date(bookingDetails.checkInDate);
    const checkOut = new Date(bookingDetails.checkOutDate);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomPrice = hotel.roomTypes[selectedRoomType]?.price || 0;
    return nights * roomPrice;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please log in to make a booking');
      return;
    }

    if (!bookingDetails.checkInDate || !bookingDetails.checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (calculateNights() <= 0) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const booking = {
        id: Date.now(),
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomTypeId: hotel.roomTypes[selectedRoomType].id,
        roomTypeName: hotel.roomTypes[selectedRoomType].name,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        guests: bookingDetails.guests,
        totalPrice: calculateTotal(),
        status: 'confirmed' as const,
        createdAt: new Date().toISOString(),
        userDetails: bookingDetails.userDetails
      };

      addBooking(booking);
      toast.success('Booking confirmed successfully!');
      navigate('/bookings');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const amenityIcons = {
    'Free WiFi': Wifi,
    'Valet Parking': Car,
    'Restaurant': Utensils,
    'Spa': Waves,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Information */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={hotel.images[selectedImageIndex]} 
                  alt={hotel.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {hotel.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          selectedImageIndex === index ? 'border-blue-500' : 'border-white'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold">{hotel.rating}</span>
                      <span className="text-gray-600">({hotel.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Safety: {hotel.safetyScore}/10</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {hotel.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${hotel.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-gray-900">
                      ${hotel.pricePerNight}
                    </span>
                  </div>
                  <span className="text-gray-600">per night</span>
                  {hotel.discount && (
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium mt-1">
                      {hotel.discount}% OFF
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-6">{hotel.description}</p>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {hotel.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                    return (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Nearby Attractions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Nearby Attractions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {hotel.nearby.map((attraction, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Hotel Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Check-in:</span> {hotel.policies.checkIn}
                  </div>
                  <div>
                    <span className="font-medium">Check-out:</span> {hotel.policies.checkOut}
                  </div>
                  <div>
                    <span className="font-medium">Pets:</span> {hotel.policies.pets ? 'Allowed' : 'Not allowed'}
                  </div>
                  <div>
                    <span className="font-medium">Smoking:</span> {hotel.policies.smoking ? 'Allowed' : 'Not allowed'}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Cancellation:</span> {hotel.policies.cancellation}
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Information */}
            <SafetyIndicator 
              crimeLevel={hotel.crimeLevel}
              safetyScore={hotel.safetyScore}
              showDetails={true}
            />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Your Stay</h3>
              
              {/* Room Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Room Type
                </label>
                <div className="space-y-3">
                  {hotel.roomTypes.map((room, index) => (
                    <div
                      key={room.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedRoomType === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedRoomType(index)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{room.name}</h4>
                          <p className="text-sm text-gray-600">
                            {room.capacity} guests • {room.size}
                          </p>
                        </div>
                        <span className="font-bold text-blue-600">${room.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={bookingDetails.checkInDate}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, checkInDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={bookingDetails.checkOutDate}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, checkOutDate: e.target.value }))}
                        min={bookingDetails.checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <select
                      value={bookingDetails.guests}
                      onChange={(e) => setBookingDetails(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
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

                {/* Price Summary */}
                {bookingDetails.checkInDate && bookingDetails.checkOutDate && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        ${hotel.roomTypes[selectedRoomType]?.price} × {calculateNights()} nights
                      </span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Guest Details */}
                {showBookingForm && (
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900">Guest Details</h4>
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={bookingDetails.userDetails.name}
                        onChange={(e) => setBookingDetails(prev => ({
                          ...prev,
                          userDetails: { ...prev.userDetails, name: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={bookingDetails.userDetails.email}
                        onChange={(e) => setBookingDetails(prev => ({
                          ...prev,
                          userDetails: { ...prev.userDetails, email: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={bookingDetails.userDetails.phone}
                        onChange={(e) => setBookingDetails(prev => ({
                          ...prev,
                          userDetails: { ...prev.userDetails, phone: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type={showBookingForm ? "submit" : "button"}
                  onClick={() => !showBookingForm && setShowBookingForm(true)}
                  disabled={isProcessing || (!bookingDetails.checkInDate || !bookingDetails.checkOutDate)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : showBookingForm ? (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Confirm Booking
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" />
                      Book Now
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;