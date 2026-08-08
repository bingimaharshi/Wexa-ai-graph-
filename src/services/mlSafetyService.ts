import * as tf from '@tensorflow/tfjs';
import { SafetyAnalysis } from '../types';

export class MLSafetyService {
  private static model: tf.LayersModel | null = null;
  private static isModelLoaded = false;

  static async initializeModel(): Promise<void> {
    if (this.isModelLoaded) return;

    try {
      // Create a simple neural network for safety prediction
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [10], units: 64, activation: 'relu' }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({ units: 32, activation: 'relu' }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({ units: 16, activation: 'relu' }),
          tf.layers.dense({ units: 1, activation: 'sigmoid' })
        ]
      });

      this.model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
      });

      // Train with mock data (in production, use real crime/safety data)
      await this.trainModel();
      this.isModelLoaded = true;
      console.log('ML Safety Model initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ML model:', error);
      this.isModelLoaded = false;
    }
  }

  private static async trainModel(): Promise<void> {
    if (!this.model) return;

    // Mock training data - in production, use real crime statistics
    const trainingData = this.generateMockTrainingData();
    
    const xs = tf.tensor2d(trainingData.features);
    const ys = tf.tensor2d(trainingData.labels);

    await this.model.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      verbose: 0
    });

    xs.dispose();
    ys.dispose();
  }

  private static generateMockTrainingData() {
    const features: number[][] = [];
    const labels: number[][] = [];

    // Generate 1000 mock data points
    for (let i = 0; i < 1000; i++) {
      const feature = [
        Math.random(), // Crime rate
        Math.random(), // Police presence
        Math.random(), // Economic index
        Math.random(), // Education level
        Math.random(), // Infrastructure quality
        Math.random(), // Healthcare access
        Math.random(), // Tourism density
        Math.random(), // Political stability
        Math.random(), // Natural disaster risk
        Math.random()  // Time of day factor
      ];

      // Simple safety calculation for training
      const safetyScore = (
        feature[1] * 0.2 + // Police presence
        feature[2] * 0.15 + // Economic index
        feature[3] * 0.1 + // Education
        feature[4] * 0.15 + // Infrastructure
        feature[5] * 0.1 + // Healthcare
        feature[7] * 0.15 + // Political stability
        (1 - feature[0]) * 0.1 + // Inverse crime rate
        (1 - feature[8]) * 0.05 // Inverse disaster risk
      );

      features.push(feature);
      labels.push([safetyScore > 0.6 ? 1 : 0]);
    }

    return { features, labels };
  }

  static async predictSafety(locationFeatures: {
    crimeRate: number;
    policePresence: number;
    economicIndex: number;
    educationLevel: number;
    infrastructure: number;
    healthcare: number;
    tourismDensity: number;
    politicalStability: number;
    naturalDisasterRisk: number;
    timeOfDay: number;
  }): Promise<SafetyAnalysis> {
    if (!this.isModelLoaded || !this.model) {
      await this.initializeModel();
    }

    try {
      const inputFeatures = [
        locationFeatures.crimeRate,
        locationFeatures.policePresence,
        locationFeatures.economicIndex,
        locationFeatures.educationLevel,
        locationFeatures.infrastructure,
        locationFeatures.healthcare,
        locationFeatures.tourismDensity,
        locationFeatures.politicalStability,
        locationFeatures.naturalDisasterRisk,
        locationFeatures.timeOfDay
      ];

      const prediction = this.model!.predict(tf.tensor2d([inputFeatures])) as tf.Tensor;
      const safetyProbability = await prediction.data();
      const safetyScore = safetyProbability[0] * 10; // Scale to 0-10

      prediction.dispose();

      return {
        overallScore: Math.round(safetyScore * 10) / 10,
        crimeLevel: this.getCrimeLevel(locationFeatures.crimeRate),
        factors: {
          criminalActivity: (1 - locationFeatures.crimeRate) * 10,
          politicalStability: locationFeatures.politicalStability * 10,
          naturalDisasters: (1 - locationFeatures.naturalDisasterRisk) * 10,
          healthSafety: locationFeatures.healthcare * 10,
          transportSafety: locationFeatures.infrastructure * 10
        },
        recommendations: this.generateRecommendations(safetyScore, locationFeatures),
        alerts: this.generateAlerts(locationFeatures),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('ML Safety Prediction Error:', error);
      return this.getFallbackSafetyAnalysis();
    }
  }

  private static getCrimeLevel(crimeRate: number): string {
    if (crimeRate < 0.2) return 'very_low';
    if (crimeRate < 0.4) return 'low';
    if (crimeRate < 0.6) return 'moderate';
    if (crimeRate < 0.8) return 'high';
    return 'very_high';
  }

  private static generateRecommendations(safetyScore: number, features: any): string[] {
    const recommendations: string[] = [];

    if (features.crimeRate > 0.5) {
      recommendations.push("Avoid displaying expensive items in public");
      recommendations.push("Stay in well-lit, populated areas");
    }

    if (features.policePresence < 0.5) {
      recommendations.push("Keep emergency contact numbers handy");
      recommendations.push("Inform someone about your travel plans");
    }

    if (features.infrastructure < 0.5) {
      recommendations.push("Use reliable transportation services");
      recommendations.push("Carry backup communication devices");
    }

    if (features.naturalDisasterRisk > 0.5) {
      recommendations.push("Check weather conditions regularly");
      recommendations.push("Know evacuation routes");
    }

    if (safetyScore < 6) {
      recommendations.push("Consider traveling in groups");
      recommendations.push("Purchase comprehensive travel insurance");
    }

    return recommendations.slice(0, 5);
  }

  private static generateAlerts(features: any): string[] {
    const alerts: string[] = [];

    if (features.crimeRate > 0.7) {
      alerts.push("High crime rate area - exercise extreme caution");
    }

    if (features.naturalDisasterRisk > 0.6) {
      alerts.push("Elevated natural disaster risk - monitor weather conditions");
    }

    if (features.politicalStability < 0.4) {
      alerts.push("Political instability reported - avoid large gatherings");
    }

    return alerts;
  }

  private static getFallbackSafetyAnalysis(): SafetyAnalysis {
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

  // Hyderabad-specific safety analysis
  static getHyderabadSafetyFeatures() {
    return {
      crimeRate: 0.45, // Moderate crime rate
      policePresence: 0.7, // Good police presence
      economicIndex: 0.75, // Strong IT economy
      educationLevel: 0.8, // High education levels
      infrastructure: 0.65, // Developing infrastructure
      healthcare: 0.7, // Good healthcare facilities
      tourismDensity: 0.6, // Moderate tourism
      politicalStability: 0.8, // Stable political environment
      naturalDisasterRisk: 0.3, // Low natural disaster risk
      timeOfDay: 0.5 // Neutral time factor
    };
  }
}