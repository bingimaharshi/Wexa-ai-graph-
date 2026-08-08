import { LocationData, WeatherData } from '../types';

export class LocationService {
  private static watchId: number | null = null;

  static async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          try {
            const locationData = await this.reverseGeocode(latitude, longitude);
            resolve({
              lat: latitude,
              lng: longitude,
              city: locationData.city,
              state: locationData.state,
              country: locationData.country,
              accuracy: accuracy || 0
            });
          } catch (error) {
            // Fallback to coordinates only
            resolve({
              lat: latitude,
              lng: longitude,
              city: 'Unknown',
              state: 'Unknown',
              country: 'Unknown',
              accuracy: accuracy || 0
            });
          }
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  static async reverseGeocode(lat: number, lng: number): Promise<{
    city: string;
    state: string;
    country: string;
  }> {
    try {
      // Using a free geocoding service (in production, use a reliable paid service)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }

      const data = await response.json();
      
      return {
        city: data.city || data.locality || 'Unknown',
        state: data.principalSubdivision || 'Unknown',
        country: data.countryName || 'Unknown'
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      
      // Fallback for Hyderabad coordinates
      if (Math.abs(lat - 17.3850) < 0.5 && Math.abs(lng - 78.4867) < 0.5) {
        return {
          city: 'Hyderabad',
          state: 'Telangana',
          country: 'India'
        };
      }
      
      throw error;
    }
  }

  static watchLocation(callback: (location: LocationData) => void): void {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported');
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        try {
          const locationData = await this.reverseGeocode(latitude, longitude);
          callback({
            lat: latitude,
            lng: longitude,
            city: locationData.city,
            state: locationData.state,
            country: locationData.country,
            accuracy: accuracy || 0
          });
        } catch (error) {
          callback({
            lat: latitude,
            lng: longitude,
            city: 'Unknown',
            state: 'Unknown',
            country: 'Unknown',
            accuracy: accuracy || 0
          });
        }
      },
      (error) => {
        console.error('Location watch error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 // 1 minute
      }
    );
  }

  static stopWatchingLocation(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  static calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  static async getWeatherData(lat: number, lng: number): Promise<WeatherData> {
    try {
      // Using OpenWeatherMap API (you'll need to add your API key)
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY || 'demo-key';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }

      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        condition: data.weather[0].main,
        forecast: [] // Would need additional API call for forecast
      };
    } catch (error) {
      console.error('Weather data error:', error);
      
      // Fallback weather data for Hyderabad
      return {
        temperature: 28,
        humidity: 65,
        condition: 'Clear',
        forecast: []
      };
    }
  }

  static async findNearbyHotels(
    lat: number,
    lng: number,
    radius: number = 10
  ): Promise<any[]> {
    // This would integrate with your hotel database
    // For now, return mock data based on location
    
    if (Math.abs(lat - 17.3850) < 0.5 && Math.abs(lng - 78.4867) < 0.5) {
      // Return Hyderabad hotels if near Hyderabad
      return [
        { id: 200, distance: 2.5 },
        { id: 201, distance: 5.1 },
        { id: 202, distance: 8.3 }
      ];
    }
    
    return [];
  }
}