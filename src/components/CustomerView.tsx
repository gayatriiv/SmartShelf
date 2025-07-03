import React from 'react';
import { Product } from '../types';
import { Tag, Clock, Star, ShoppingCart, Zap, Percent, TrendingUp } from 'lucide-react';

interface CustomerViewProps {
  products: Product[];
}

export default function CustomerView({ products }: CustomerViewProps) {
  // Filter and sort products for customer view
  const flashDeals = products
    .filter(p => p.priceChangePercentage < -10)
    .sort((a, b) => a.priceChangePercentage - b.priceChangePercentage)
    .slice(0, 6);

  const featuredProducts = products
    .filter(p => p.status === 'fresh' && p.salesVelocity > 0.2)
    .slice(0, 8);

  const getDiscountLabel = (priceChange: number) => {
    if (priceChange <= -20) return 'Hot Deal';
    if (priceChange <= -10) return 'Flash Sale';
    return 'Sale';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Zap className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Smart Savings Today
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: 'var(--text-secondary)' }}>
          AI-powered deals on fresh products. Save money, reduce waste, shop smarter.
        </p>
        <div className="flex justify-center space-x-4">
          <span className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium border border-orange-200">
            🔥 Flash Deals Available
          </span>
          <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
            🌱 Fresh Products
          </span>
          <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
            ♻️ Eco-Friendly
          </span>
        </div>
      </div>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-md">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>⚡ Flash Deals</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Limited time offers - AI optimized pricing</p>
            </div>
            <span className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-200">
              <Clock className="h-4 w-4 inline mr-1" />
              Limited Time
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashDeals.map((product) => (
              <div key={product.id} className="card overflow-hidden hover-lift">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 gradient-bg p-12 flex items-center justify-center">
                    <div className="text-6xl">
                      {product.category === 'produce' ? '🥬' : 
                       product.category === 'bakery' ? '🥖' : 
                       product.category === 'dairy' ? '🥛' : 
                       product.category === 'deli' ? '🥪' : '🐟'}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg">
                      <Percent className="h-3 w-3 inline mr-1" />
                      {Math.abs(product.priceChangePercentage)}% OFF
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-red-600 px-3 py-2 rounded-lg text-sm font-medium border-2 border-red-200 shadow-lg">
                      {getDiscountLabel(product.priceChangePercentage)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
                  <p className="text-sm mb-4 capitalize px-3 py-1 rounded-full inline-block" 
                     style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {product.category}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                        ${product.currentPrice.toFixed(2)}
                      </span>
                      <span className="text-lg line-through" style={{ color: 'var(--text-tertiary)' }}>
                        ${product.basePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Expires in</div>
                      <div className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-200">
                        {product.daysToExpiry} days
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full btn-primary flex items-center justify-center space-x-2 py-3">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Featured Fresh Products</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Premium quality items at optimal prices</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card overflow-hidden hover-lift">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-green-100 to-blue-100 p-8 flex items-center justify-center">
                <div className="text-4xl">
                  {product.category === 'produce' ? '🥬' : 
                   product.category === 'bakery' ? '🥖' : 
                   product.category === 'dairy' ? '🥛' : 
                   product.category === 'deli' ? '🥪' : '🐟'}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
                <p className="text-sm mb-3 capitalize px-2 py-1 rounded-full inline-block text-xs"
                   style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {product.category}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    ${product.currentPrice.toFixed(2)}
                  </span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                    Fresh
                  </span>
                </div>
                
                <button className="w-full btn-secondary py-2 flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}