export interface Product {
  id: string;
  name: string;
  category: string;
  inventoryCount: number;
  expiryDate: string;
  basePrice: number;
  currentPrice: number;
  salesVelocity: number;
  competitorPrice: number;
  daysToExpiry: number;
  demandScore: number;
  priceChangePercentage: number;
  status: 'fresh' | 'expiring' | 'urgent';
}

export interface WeatherData {
  condition: 'sunny' | 'rainy' | 'cloudy';
  temperature: number;
  impact: number;
}

export interface LocalEvent {
  name: string;
  type: 'festival' | 'weekend' | 'holiday' | 'none';
  impact: number;
}

export interface SustainabilityMetrics {
  wasteReduced: number;
  profitImprovement: number;
  co2Saved: number;
  flashDealConversions: number;
  totalItemsOptimized: number;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  products: Product[];
}