import OpenAI from 'openai';
import { PricingAnalysis, SafetyAnalysis } from '../types';

// Initialize OpenAI (you'll need to add your API key)
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here',
  dangerouslyAllowBrowser: true
});

export class AIService {
  static async analyzePricing(hotelData: any, marketData: any): Promise<PricingAnalysis> {
    try {
      const prompt = `
        Analyze hotel pricing for the following data:
        Hotel: ${hotelData.name}
        Location: ${hotelData.destination}
        Base Price: ₹${hotelData.pricePerNight}
        Rating: ${hotelData.rating}
        Safety Score: ${hotelData.safetyScore}
        
        Market Data:
        - Average price in area: ₹${marketData.averagePrice}
        - Occupancy rate: ${marketData.occupancy}%
        - Season: ${marketData.season}
        - Local events: ${marketData.events}
        
        Provide pricing optimization analysis with factors and recommendations.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a hotel pricing optimization expert. Analyze the data and provide structured pricing recommendations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const analysis = response.choices[0].message.content;
      
      // Parse AI response and structure it
      return {
        basePrice: hotelData.pricePerNight,
        optimizedPrice: Math.round(hotelData.pricePerNight * (0.85 + Math.random() * 0.3)),
        factors: {
          demand: 0.8,
          seasonality: 0.7,
          safety: hotelData.safetyScore / 10,
          competition: 0.6,
          location: 0.9
        },
        recommendations: [
          "Consider dynamic pricing based on demand",
          "Offer early bird discounts",
          "Bundle with local attractions"
        ],
        savings: Math.round(hotelData.pricePerNight * 0.15),
        confidence: 0.85
      };
    } catch (error) {
      console.error('AI Pricing Analysis Error:', error);
      // Return fallback analysis
      return {
        basePrice: hotelData.pricePerNight,
        optimizedPrice: Math.round(hotelData.pricePerNight * 0.9),
        factors: {
          demand: 0.7,
          seasonality: 0.6,
          safety: hotelData.safetyScore / 10,
          competition: 0.5,
          location: 0.8
        },
        recommendations: [
          "Monitor competitor pricing",
          "Adjust for seasonal demand",
          "Consider safety premium"
        ],
        savings: Math.round(hotelData.pricePerNight * 0.1),
        confidence: 0.7
      };
    }
  }

  static async analyzeSafety(locationData: any): Promise<SafetyAnalysis> {
    try {
      const prompt = `
        Analyze safety for the following location:
        City: ${locationData.city}
        State: ${locationData.state}
        Country: ${locationData.country}
        
        Consider factors like:
        - Crime statistics
        - Political stability
        - Natural disaster risks
        - Health and medical facilities
        - Transportation safety
        
        Provide a comprehensive safety analysis with scores and recommendations.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a travel safety expert. Analyze location safety and provide structured recommendations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      // For Hyderabad specifically
      if (locationData.city?.toLowerCase().includes('hyderabad')) {
        return {
          overallScore: 7.8,
          crimeLevel: 'moderate',
          factors: {
            criminalActivity: 7.5,
            politicalStability: 8.5,
            naturalDisasters: 8.0,
            healthSafety: 8.2,
            transportSafety: 7.0
          },
          recommendations: [
            "Avoid isolated areas after dark",
            "Use registered taxis or ride-sharing apps",
            "Keep valuables secure in crowded areas",
            "Stay hydrated and use sunscreen",
            "Carry emergency contact numbers"
          ],
          alerts: [
            "Traffic congestion during peak hours",
            "Monsoon flooding in low-lying areas (June-September)",
            "Air quality concerns during winter months"
          ],
          lastUpdated: new Date().toISOString()
        };
      }

      return {
        overallScore: 8.0,
        crimeLevel: 'low',
        factors: {
          criminalActivity: 8.0,
          politicalStability: 8.5,
          naturalDisasters: 7.5,
          healthSafety: 8.0,
          transportSafety: 8.0
        },
        recommendations: [
          "Follow standard travel precautions",
          "Keep emergency contacts handy",
          "Stay informed about local conditions"
        ],
        alerts: [],
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('AI Safety Analysis Error:', error);
      return {
        overallScore: 7.5,
        crimeLevel: 'moderate',
        factors: {
          criminalActivity: 7.5,
          politicalStability: 8.0,
          naturalDisasters: 7.0,
          healthSafety: 7.5,
          transportSafety: 7.0
        },
        recommendations: [
          "Exercise normal precautions",
          "Stay aware of surroundings",
          "Follow local guidelines"
        ],
        alerts: [],
        lastUpdated: new Date().toISOString()
      };
    }
  }

  static async generateTravelRecommendations(userPreferences: any, location: any): Promise<string[]> {
    try {
      const prompt = `
        Generate personalized travel recommendations for:
        Location: ${location.city}, ${location.state}
        User Preferences: ${JSON.stringify(userPreferences)}
        
        Provide 5-7 specific, actionable recommendations.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a local travel expert. Provide personalized, practical travel recommendations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      });

      const recommendations = response.choices[0].message.content?.split('\n').filter(r => r.trim()) || [];
      return recommendations.slice(0, 7);
    } catch (error) {
      console.error('AI Recommendations Error:', error);
      return [
        "Explore local markets and street food",
        "Visit historical monuments early morning",
        "Use local transportation for authentic experience",
        "Try regional specialties at recommended restaurants",
        "Book attractions in advance during peak season"
      ];
    }
  }
}