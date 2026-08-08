import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertCircle, Loader } from 'lucide-react';
import { LocationService } from '../services/locationService';
import { MLSafetyService } from '../services/mlSafetyService';
import { LocationData, SafetyAnalysis } from '../types';
import { useStore } from '../store/useStore';

const LocationTracker: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [safetyAnalysis, setSafetyAnalysis] = useState<SafetyAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUserLocation } = useStore();

  useEffect(() => {
    // Initialize ML model
    MLSafetyService.initializeModel();
  }, []);

  const getCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const currentLocation = await LocationService.getCurrentLocation();
      setLocation(currentLocation);
      updateUserLocation(currentLocation);

      // Analyze safety for current location
      if (currentLocation.city.toLowerCase().includes('hyderabad')) {
        const safetyFeatures = MLSafetyService.getHyderabadSafetyFeatures();
        const analysis = await MLSafetyService.predictSafety(safetyFeatures);
        setSafetyAnalysis(analysis);
      } else {
        // Generic safety analysis for other locations
        const analysis = await MLSafetyService.predictSafety({
          crimeRate: 0.4,
          policePresence: 0.6,
          economicIndex: 0.7,
          educationLevel: 0.7,
          infrastructure: 0.6,
          healthcare: 0.7,
          tourismDensity: 0.5,
          politicalStability: 0.8,
          naturalDisasterRisk: 0.3,
          timeOfDay: 0.5
        });
        setSafetyAnalysis(analysis);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  const getSafetyColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Navigation className="h-5 w-5 text-blue-600" />
          Current Location & Safety
        </h3>
        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          {isLoading ? 'Getting Location...' : 'Get Location'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {location && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Location Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">City:</span> {location.city}</p>
                <p><span className="font-medium">State:</span> {location.state}</p>
                <p><span className="font-medium">Country:</span> {location.country}</p>
                <p><span className="font-medium">Coordinates:</span> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                <p><span className="font-medium">Accuracy:</span> ±{Math.round(location.accuracy)}m</p>
              </div>
            </div>

            {safetyAnalysis && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Safety Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Safety Score</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(safetyAnalysis.overallScore)}`}>
                      {safetyAnalysis.overallScore}/10
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Crime Level</span>
                    <span className="text-xs font-medium text-gray-700 capitalize">
                      {safetyAnalysis.crimeLevel.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {safetyAnalysis && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Safety Factors</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(safetyAnalysis.factors).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 capitalize mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            value >= 8 ? 'bg-green-500' : value >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${value * 10}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{value.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {safetyAnalysis.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Safety Recommendations</h4>
                  <ul className="space-y-1">
                    {safetyAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {safetyAnalysis.alerts.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    Safety Alerts
                  </h4>
                  <ul className="space-y-1">
                    {safetyAnalysis.alerts.map((alert, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-orange-700 bg-orange-50 p-2 rounded">
                        <span className="h-1.5 w-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                        {alert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationTracker;