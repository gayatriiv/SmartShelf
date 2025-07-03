import { Product, WeatherData, LocalEvent } from '../types';

export function calculateDemandScore(
  product: Product,
  weather: WeatherData,
  localEvent: LocalEvent,
  historicalSales: number[]
): number {
  // Base demand from historical sales velocity
  let demandScore = product.salesVelocity;
  
  // Weather impact
  demandScore *= weather.impact;
  
  // Local event impact
  demandScore *= localEvent.impact;
  
  // Category-specific weather adjustments
  if (weather.condition === 'sunny' && product.category === 'produce') {
    demandScore *= 1.15; // Higher demand for fresh produce on sunny days
  }
  
  if (weather.condition === 'rainy' && product.category === 'bakery') {
    demandScore *= 1.1; // Comfort food demand on rainy days
  }
  
  // Normalize to 0-1 range
  return Math.min(Math.max(demandScore, 0), 1);
}

export function calculateDynamicPrice(
  product: Product,
  weather: WeatherData,
  localEvent: LocalEvent
): { newPrice: number; priceChangePercentage: number; reasoning: string[] } {
  const reasoning: string[] = [];
  let priceMultiplier = 1.0;
  
  // Calculate updated demand score
  const demandScore = calculateDemandScore(product, weather, localEvent, []);
  
  // Expiry urgency discount
  const urgencyDiscount = Math.max(0, (5 - product.daysToExpiry) * 0.08);
  if (urgencyDiscount > 0) {
    priceMultiplier -= urgencyDiscount;
    reasoning.push(`${(urgencyDiscount * 100).toFixed(1)}% discount due to expiry urgency`);
  }
  
  // Inventory pressure
  const inventoryPressure = Math.max(0, (product.inventoryCount - 50) * 0.002);
  if (inventoryPressure > 0) {
    priceMultiplier -= inventoryPressure;
    reasoning.push(`${(inventoryPressure * 100).toFixed(1)}% discount due to high inventory`);
  }
  
  // Competitor pricing factor
  const competitorFactor = (product.competitorPrice - product.basePrice) / product.basePrice * 0.3;
  priceMultiplier += competitorFactor;
  if (competitorFactor !== 0) {
    reasoning.push(`${competitorFactor > 0 ? '+' : ''}${(competitorFactor * 100).toFixed(1)}% adjustment based on competitor pricing`);
  }
  
  // Demand-based pricing
  const demandAdjustment = (demandScore - 0.5) * 0.15;
  priceMultiplier += demandAdjustment;
  if (demandAdjustment > 0) {
    reasoning.push(`+${(demandAdjustment * 100).toFixed(1)}% increase due to high demand`);
  } else if (demandAdjustment < 0) {
    reasoning.push(`${(demandAdjustment * 100).toFixed(1)}% decrease due to low demand`);
  }
  
  // Weather impact
  if (weather.impact !== 1.0) {
    const weatherAdjustment = (weather.impact - 1.0) * 0.1;
    priceMultiplier += weatherAdjustment;
    reasoning.push(`${weatherAdjustment > 0 ? '+' : ''}${(weatherAdjustment * 100).toFixed(1)}% due to ${weather.condition} weather`);
  }
  
  // Event impact
  if (localEvent.impact !== 1.0) {
    const eventAdjustment = (localEvent.impact - 1.0) * 0.1;
    priceMultiplier += eventAdjustment;
    reasoning.push(`${eventAdjustment > 0 ? '+' : ''}${(eventAdjustment * 100).toFixed(1)}% due to ${localEvent.name}`);
  }
  
  // Ensure minimum price (80% of base price) and maximum (150% of base price)
  priceMultiplier = Math.max(0.8, Math.min(1.5, priceMultiplier));
  
  const newPrice = parseFloat((product.basePrice * priceMultiplier).toFixed(2));
  const priceChangePercentage = parseFloat(((newPrice - product.basePrice) / product.basePrice * 100).toFixed(1));
  
  return {
    newPrice,
    priceChangePercentage,
    reasoning
  };
}

export function generateTransferRecommendations(stores: any[]): any[] {
  const recommendations = [];
  
  // Find products with high inventory and low demand in one store
  // and high demand in another store
  for (const store of stores) {
    for (const product of store.products) {
      if (product.inventoryCount > 70 && product.demandScore < 0.4) {
        // Look for stores with high demand for similar products
        const targetStores = stores.filter(s => s.id !== store.id);
        for (const targetStore of targetStores) {
          const similarProduct = targetStore.products.find(p => 
            p.category === product.category && p.demandScore > 0.7
          );
          
          if (similarProduct) {
            recommendations.push({
              id: `transfer-${Math.random().toString(36).substr(2, 9)}`,
              fromStore: store.name,
              toStore: targetStore.name,
              product: product.name,
              quantity: Math.floor(product.inventoryCount * 0.3),
              reason: 'High inventory + low demand → High demand location',
              urgency: product.daysToExpiry <= 3 ? 'high' : 'medium'
            });
          }
        }
      }
    }
  }
  
  return recommendations.slice(0, 5); // Limit to 5 recommendations
}