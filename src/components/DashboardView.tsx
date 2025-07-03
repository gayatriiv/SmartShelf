import React, { useState } from 'react';
import { Package, DollarSign, TrendingUp, AlertTriangle, Recycle, Target, Zap } from 'lucide-react';
import { Product, WeatherData, LocalEvent, SustainabilityMetrics } from '../types';
import { calculateDynamicPrice } from '../utils/pricingEngine';
import MetricsCard from './MetricsCard';
import ProductTable from './ProductTable';
import RecommendationPanel from './RecommendationPanel';
import EnvironmentalFactors from './EnvironmentalFactors';

interface DashboardViewProps {
  products: Product[];
  weather: WeatherData;
  event: LocalEvent;
  sustainability: SustainabilityMetrics;
  onProductUpdate: (products: Product[]) => void;
}

export default function DashboardView({ 
  products, 
  weather, 
  event, 
  sustainability,
  onProductUpdate 
}: DashboardViewProps) {
  const [recommendations, setRecommendations] = useState([
    {
      id: '1',
      type: 'pricing' as const,
      title: 'Dynamic Price Optimization',
      description: '12 items need immediate price adjustments due to expiry risk and demand patterns',
      impact: 'Est. $240 revenue increase',
      urgency: 'high' as const,
      confidence: 87
    },
    {
      id: '2',
      type: 'transfer' as const,
      title: 'Inventory Rebalancing',
      description: 'Transfer excess strawberries from Downtown to Westside location based on demand forecast',
      impact: 'Reduce waste by 15%',
      urgency: 'medium' as const,
      confidence: 92
    },
    {
      id: '3',
      type: 'promotion' as const,
      title: 'Flash Sale Campaign',
      description: 'Launch targeted 30% discount on bakery items expiring within 48 hours',
      impact: 'Clear 85% inventory',
      urgency: 'high' as const,
      confidence: 78
    }
  ]);

  const handleAcceptPrice = (productId: string) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const pricingResult = calculateDynamicPrice(product, weather, event);
        return {
          ...product,
          currentPrice: pricingResult.newPrice,
          priceChangePercentage: pricingResult.priceChangePercentage
        };
      }
      return product;
    });
    onProductUpdate(updatedProducts);
  };

  const handleOverridePrice = (productId: string) => {
    console.log('Override price for product:', productId);
  };

  const handleAcceptRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
  };

  const handleDismissRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
  };

  // Calculate dynamic prices for all products
  const productsWithDynamicPricing = products.map(product => {
    const pricingResult = calculateDynamicPrice(product, weather, event);
    return {
      ...product,
      currentPrice: pricingResult.newPrice,
      priceChangePercentage: pricingResult.priceChangePercentage
    };
  });

  // Calculate metrics
  const expiringProducts = products.filter(p => p.daysToExpiry <= 3).length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.currentPrice * p.salesVelocity * 30), 0);
  const avgPriceChange = products.reduce((sum, p) => sum + Math.abs(p.priceChangePercentage), 0) / products.length;
  const optimizedItems = products.filter(p => Math.abs(p.priceChangePercentage) > 5).length;

  return (
    <div className="space-y-8">
      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Products"
          value={products.length}
          icon={Package}
          description="Items under AI management"
          trend={[45, 52, 48, 61, 55, 67, 58, 64]}
        />
        <MetricsCard
          title="Monthly Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          description="Projected based on velocity"
          trend={[100, 108, 105, 115, 112, 125, 118, 130]}
        />
        <MetricsCard
          title="AI Optimizations"
          value={optimizedItems}
          change="+8 this hour"
          changeType="positive"
          icon={Zap}
          description="Active price adjustments"
          trend={[12, 15, 18, 22, 19, 25, 28, 32]}
        />
        <MetricsCard
          title="Expiring Soon"
          value={expiringProducts}
          change={expiringProducts > 5 ? "High alert" : "Normal"}
          changeType={expiringProducts > 5 ? "negative" : "positive"}
          icon={AlertTriangle}
          description="Items need attention"
          trend={[8, 6, 9, 12, 7, 5, 8, 6]}
        />
      </div>

      {/* Environmental Factors */}
      <EnvironmentalFactors weather={weather} event={event} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ProductTable 
            products={productsWithDynamicPricing}
            onAcceptPrice={handleAcceptPrice}
            onOverridePrice={handleOverridePrice}
          />
        </div>
        <div>
          <RecommendationPanel
            recommendations={recommendations}
            onAccept={handleAcceptRecommendation}
            onDismiss={handleDismissRecommendation}
          />
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-charcoal">{sustainability.wasteReduced}%</div>
            <div className="text-sm text-gray-600">Waste Reduced</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-charcoal">{sustainability.profitImprovement}%</div>
            <div className="text-sm text-gray-600">Profit Boost</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-charcoal">{sustainability.flashDealConversions}</div>
            <div className="text-sm text-gray-600">Flash Deals</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-alert-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-heading font-bold text-charcoal">{sustainability.totalItemsOptimized}</div>
            <div className="text-sm text-gray-600">Items Optimized</div>
          </div>
        </div>
      </div>
    </div>
  );
}