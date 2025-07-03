import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Zap, Clock, Percent, ShoppingCart, Star, TrendingDown, Timer } from 'lucide-react';

interface FlashDealsPageProps {
  products: Product[];
}

export default function FlashDealsPage({ products }: FlashDealsPageProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products for flash deals (significant discounts)
  const flashDeals = products
    .filter(p => p.priceChangePercentage < -10)
    .sort((a, b) => a.priceChangePercentage - b.priceChangePercentage)
    .slice(0, 12);

  const getDiscountLabel = (priceChange: number) => {
    if (priceChange <= -30) return { label: 'MEGA DEAL', color: 'bg-red-600' };
    if (priceChange <= -20) return { label: 'HOT DEAL', color: 'bg-orange-500' };
    if (priceChange <= -10) return { label: 'FLASH SALE', color: 'bg-yellow-500' };
    return { label: 'SALE', color: 'bg-blue-500' };
  };

  const getSavingsAmount = (basePrice: number, currentPrice: number) => {
    return (basePrice - currentPrice).toFixed(2);
  };

  if (flashDeals.length === 0) {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 force-visible">⚡ Flash Deals</h1>
            <p className="text-lg force-visible-secondary">AI-powered deals on fresh products</p>
          </div>

          {/* Empty State */}
          <div className="card p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gray-300">
              <Zap className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 force-visible">No Flash Deals Available</h3>
            <p className="text-lg mb-6 force-visible-secondary max-w-md mx-auto">
              Flash deals will appear here when our AI identifies products that need quick price reductions to prevent waste.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 max-w-lg mx-auto">
              <h4 className="font-bold text-blue-900 mb-2">How Flash Deals Work:</h4>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• AI monitors product expiry dates</li>
                <li>• Automatic discounts prevent waste</li>
                <li>• Customers get great deals</li>
                <li>• You recover value instead of losing it</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-12 w-12 animate-pulse" />
              <h1 className="text-5xl font-black">FLASH DEALS</h1>
              <Zap className="h-12 w-12 animate-pulse" />
            </div>
            <p className="text-xl mb-6">AI-Powered Savings • Fresh Products • Limited Time</p>
            
            {/* Countdown Timer */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Timer className="h-5 w-5" />
                <span className="font-bold">Deals refresh in:</span>
              </div>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-black">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  </div>
                  <div className="text-xs mt-1">HOURS</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  </div>
                  <div className="text-xs mt-1">MINS</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-black">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  </div>
                  <div className="text-xs mt-1">SECS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {flashDeals.map((product) => {
            const discountInfo = getDiscountLabel(product.priceChangePercentage);
            const savings = getSavingsAmount(product.basePrice, product.currentPrice);
            
            return (
              <div key={product.id} className="card overflow-hidden hover-lift group">
                {/* Product Image Area */}
                <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-8 h-48 flex items-center justify-center">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.category === 'produce' ? '🥬' : 
                     product.category === 'bakery' ? '🥖' : 
                     product.category === 'dairy' ? '🥛' : 
                     product.category === 'deli' ? '🥪' : '🐟'}
                  </div>
                  
                  {/* Discount Badge */}
                  <div className={`absolute top-3 left-3 ${discountInfo.color} text-white px-3 py-1 rounded-full text-xs font-black shadow-lg`}>
                    {discountInfo.label}
                  </div>
                  
                  {/* Percentage Off */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-lg font-black">{Math.abs(product.priceChangePercentage)}%</div>
                      <div className="text-xs">OFF</div>
                    </div>
                  </div>
                  
                  {/* Urgency Indicator */}
                  <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{product.daysToExpiry} days left</span>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 force-visible">{product.name}</h3>
                  <p className="text-sm force-visible-secondary capitalize mb-4 bg-gray-100 px-2 py-1 rounded-full inline-block">
                    {product.category}
                  </p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl font-black text-red-600">
                        ${product.currentPrice.toFixed(2)}
                      </span>
                      <span className="text-lg line-through text-gray-500">
                        ${product.basePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold inline-flex items-center space-x-1">
                      <TrendingDown className="h-4 w-4" />
                      <span>Save ${savings}</span>
                    </div>
                  </div>
                  
                  {/* Stock Info */}
                  <div className="mb-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="force-visible-secondary font-bold">Stock:</span>
                      <span className="force-visible font-bold">{product.inventoryCount} units</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((product.inventoryCount / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 group">
                    <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 border-2 border-green-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">🌱 Eco-Friendly Shopping</h3>
            <p className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
              Every flash deal purchase helps reduce food waste and supports sustainable shopping. 
              You save money while helping the environment!
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-green-700">
                <Star className="h-4 w-4" />
                <span className="font-bold">Reduce Waste</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-700">
                <Star className="h-4 w-4" />
                <span className="font-bold">Save Money</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-700">
                <Star className="h-4 w-4" />
                <span className="font-bold">Fresh Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}