import { Product, WeatherData, LocalEvent, Store } from '../types';

const productCategories = ['produce', 'bakery', 'dairy', 'deli', 'seafood'];

const productNames = {
  produce: ['Organic Bananas', 'Fresh Strawberries', 'Avocados', 'Spinach', 'Tomatoes', 'Blueberries', 'Lettuce', 'Carrots'],
  bakery: ['Artisan Bread', 'Croissants', 'Muffins', 'Donuts', 'Bagels', 'Cookies', 'Cake Slices'],
  dairy: ['Organic Milk', 'Greek Yogurt', 'Fresh Cream', 'Cheese Blocks', 'Butter', 'Cottage Cheese'],
  deli: ['Sliced Turkey', 'Ham', 'Roast Beef', 'Chicken Salad', 'Potato Salad', 'Sandwiches'],
  seafood: ['Fresh Salmon', 'Shrimp', 'Cod Fillets', 'Tuna Steaks', 'Crab Meat', 'Lobster Tails']
};

export function generateMockProducts(count: number = 25): Product[] {
  const products: Product[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = productCategories[Math.floor(Math.random() * productCategories.length)];
    const names = productNames[category as keyof typeof productNames];
    const name = names[Math.floor(Math.random() * names.length)];
    
    const daysToExpiry = Math.floor(Math.random() * 10) + 1;
    const basePrice = parseFloat((Math.random() * 20 + 2).toFixed(2));
    const inventoryCount = Math.floor(Math.random() * 100) + 10;
    const salesVelocity = parseFloat((Math.random() * 0.3 + 0.1).toFixed(2));
    const competitorPrice = parseFloat((basePrice * (0.9 + Math.random() * 0.2)).toFixed(2));
    
    const status = daysToExpiry <= 2 ? 'urgent' : daysToExpiry <= 5 ? 'expiring' : 'fresh';
    
    products.push({
      id: `product-${i + 1}`,
      name: `${name} ${i + 1}`,
      category,
      inventoryCount,
      expiryDate: new Date(Date.now() + daysToExpiry * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      basePrice,
      currentPrice: basePrice,
      salesVelocity,
      competitorPrice,
      daysToExpiry,
      demandScore: Math.random(),
      priceChangePercentage: 0,
      status
    });
  }
  
  return products;
}

export function generateWeatherData(): WeatherData {
  const conditions: WeatherData['condition'][] = ['sunny', 'rainy', 'cloudy'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    condition,
    temperature: Math.floor(Math.random() * 25) + 15,
    impact: condition === 'sunny' ? 1.1 : condition === 'rainy' ? 0.9 : 1.0
  };
}

export function generateLocalEvent(): LocalEvent {
  const events = [
    { name: 'Weekend Sale', type: 'weekend' as const, impact: 1.2 },
    { name: 'Local Festival', type: 'festival' as const, impact: 1.4 },
    { name: 'Holiday Season', type: 'holiday' as const, impact: 1.3 },
    { name: 'Regular Day', type: 'none' as const, impact: 1.0 }
  ];
  
  return events[Math.floor(Math.random() * events.length)];
}

export function generateMockStores(): Store[] {
  return [
    {
      id: 'store-1',
      name: 'Downtown SuperCenter',
      location: 'Downtown District',
      products: generateMockProducts(15)
    },
    {
      id: 'store-2',
      name: 'Westside Market',
      location: 'West Side',
      products: generateMockProducts(12)
    },
    {
      id: 'store-3',
      name: 'Northpark Branch',
      location: 'North Park',
      products: generateMockProducts(18)
    }
  ];
}