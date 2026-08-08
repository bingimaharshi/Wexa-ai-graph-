import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Clock, Star, TrendingUp } from 'lucide-react';
import { AIService } from '../services/aiService';
import { useStore } from '../store/useStore';
import { hotels } from '../data/mockData';

const AIRecommendations: React.FC = () => {
  const { user, searchFilters } = useStore();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [pricingAnalysis, setPricingAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.location || searchFilters.destination) {
      generateRecommendations();
    }
  }, [user?.location, searchFilters.destination]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const location = user?.location || { city: searchFilters.destination, state: '', country: '' };
      const userPreferences = {
        budget: searchFilters.maxPrice || 10000,
        safetyPreference: searchFilters.safetyScore || 7,
        groupSize: searchFilters.guests || 2,
        interests: ['culture', 'food', 'history'] // Could be expanded based on user profile
      };

      const recs = await AIService.generateTravelRecommendations(userPreferences, location);
      setRecommendations(recs);

      // Get pricing analysis for a sample hotel
      if (searchFilters.destination) {
        const relevantHotels = hotels.filter(h => 
          h.destination.toLowerCase().includes(searchFilters.destination.toLowerCase())
        );
        
        if (relevantHotels.length > 0) {
          const sampleHotel = relevantHotels[0];
          const marketData = {
            averagePrice: relevantHotels.reduce((sum, h) => sum + h.pricePerNight, 0) / relevantHotels.length,
            occupancy: 75,
            season: 'peak',
            events: ['Local Festival', 'Conference Season']
          };

          const analysis = await AIService.analyzePricing(sampleHotel, marketData);
          setPricingAnalysis(analysis);
        }
      }
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      setRecommendations([
        'Explore local markets for authentic experiences',
        'Visit popular attractions during off-peak hours',
        'Try regional cuisine at highly-rated restaurants',
        'Use public transportation for cost-effective travel',
        'Book accommodations with good safety ratings'
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Travel Recommendations</h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-gray-600">Generating personalized recommendations...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Travel Recommendations */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              Personalized Travel Tips
            </h4>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Analysis */}
          {pricingAnalysis && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Smart Pricing Insights
              </h4>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">₹{pricingAnalysis.optimizedPrice}</div>
                    <div className="text-sm text-gray-600">AI Optimized Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹{pricingAnalysis.savings}</div>
                    <div className="text-sm text-gray-600">Potential Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{Math.round(pricingAnalysis.confidence * 100)}%</div>
                    <div className="text-sm text-gray-600">Confidence Score</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900">Pricing Factors</h5>
                  {Object.entries(pricingAnalysis.factors).map(([factor, value]) => (
                    <div key={factor} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">
                        {factor.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(value as number) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium w-8">{Math.round((value as number) * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-gray-900 mb-2">AI Recommendations</h5>
                  <ul className="space-y-1">
                    {pricingAnalysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <Star className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Best Time to Book */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              Optimal Booking Time
            </h4>
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Current Booking Score</span>
                <span className="text-lg font-bold text-orange-600">8.5/10</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Great time to book! Prices are 15% below average and availability is good.
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-medium text-gray-700">Price Trend:</span>
                  <span className="text-green-600 ml-1">↓ Decreasing</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Demand:</span>
                  <span className="text-yellow-600 ml-1">→ Moderate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;