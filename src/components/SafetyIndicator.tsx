import React from 'react';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import { getCrimeColor, getCrimeLabel } from '../data/mockData';

interface SafetyIndicatorProps {
  crimeLevel: string;
  safetyScore: number;
  showDetails?: boolean;
}

const SafetyIndicator: React.FC<SafetyIndicatorProps> = ({ 
  crimeLevel, 
  safetyScore, 
  showDetails = false 
}) => {
  const getIcon = (level: string) => {
    switch (level) {
      case 'very_low':
      case 'low':
        return Shield;
      case 'moderate':
        return AlertTriangle;
      case 'high':
      case 'very_high':
        return AlertCircle;
      default:
        return Shield;
    }
  };

  const Icon = getIcon(crimeLevel);
  
  const getSafetyTips = (level: string) => {
    const tips = {
      very_low: ["Excellent safety record", "Safe to walk alone at night", "Low petty crime rates"],
      low: ["Generally safe destination", "Basic precautions recommended", "Safe for solo travelers"],
      moderate: ["Exercise normal caution", "Avoid isolated areas at night", "Keep valuables secure"],
      high: ["Heightened awareness needed", "Travel in groups when possible", "Use reputable transportation"],
      very_high: ["Exercise extreme caution", "Avoid non-essential travel", "Constant vigilance required"]
    };
    return tips[level as keyof typeof tips] || tips.moderate;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-full ${getCrimeColor(crimeLevel)}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Safety Information</h3>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrimeColor(crimeLevel)}`}>
              {getCrimeLabel(crimeLevel)} Crime Level
            </span>
            <span className="text-sm text-gray-600">
              Safety Score: {safetyScore}/10
            </span>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Safety Tips:</h4>
          <ul className="space-y-1">
            {getSafetyTips(crimeLevel).map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SafetyIndicator;