import React, { useState } from 'react';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Recycle, 
  Target, 
  Zap, 
  Globe,
  Activity
} from 'lucide-react';
import { Product, WeatherData, LocalEvent, SustainabilityMetrics } from '../types';
import { calculateDynamicPrice } from '../utils/pricingEngine';
import { AIRecommendation } from '../utils/aiRecommendations';
import MetricCard from './MetricCard';
import ProductTable from './ProductTable';
import RecommendationPanel from './RecommendationPanel';
import EnvironmentalFactors from './EnvironmentalFactors';

interface ModernDashboardViewProps {
  products: Product[];
  weather: WeatherData;
  event: LocalEvent;
  sustainability: SustainabilityMetrics;
  onProductUpdate: (products: Product[]) => void;
  aiRecommendations: AIRecommendation[];
  onAcceptRecommendation: (id: string) => void;
  onDismissRecommendation: (id: string) => void;
}

export default function ModernDashboardView({ 
  products, 
  weather, 
  event, 
  sustainability,
  onProductUpdate,
  aiRecommendations,
  onAcceptRecommendation,
  onDismissRecommendation
}: ModernDashboardViewProps) {
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
  const optimizedItems = products.filter(p => Math.abs(p.priceChangePercentage) > 5).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 force-visible">
          AI-Powered Retail Intelligence
        </h1>
        <p className="max-w-2xl mx-auto force-visible-secondary text-lg">
          Real-time inventory optimization with dynamic pricing and sustainability insights
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Products"
          value={products.length}
          icon={Package}
          description="Items under AI management"
          color="blue"
          change="+8 this hour"
          changeType="positive"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${Math.round(totalRevenue).toLocaleString()}`}
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          description="Projected based on velocity"
          color="green"
        />
        <MetricCard
          title="AI Optimizations"
          value={optimizedItems}
          change="+8 this hour"
          changeType="positive"
          icon={Zap}
          description="Active price adjustments"
          color="purple"
        />
        <MetricCard
          title="Expiring Soon"
          value={expiringProducts}
          change={expiringProducts > 5 ? "High alert" : "Normal"}
          changeType={expiringProducts > 5 ? "negative" : "positive"}
          icon={AlertTriangle}
          description="Items need attention"
          color="orange"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Waste Reduction"
          value={`${Math.round(sustainability.wasteReduced)}%`}
          icon={Recycle}
          description="vs traditional methods"
          color="green"
          change="+5% this week"
          changeType="positive"
        />
        <MetricCard
          title="Profit Boost"
          value={`${Math.round(sustainability.profitImprovement)}%`}
          icon={TrendingUp}
          description="margin improvement"
          color="blue"
          change="+2.1% this week"
          changeType="positive"
        />
        <MetricCard
          title="Flash Deals"
          value={sustainability.flashDealConversions}
          icon={Target}
          description="successful conversions"
          color="purple"
          change="+15 today"
          changeType="positive"
        />
        <MetricCard
          title="CO₂ Saved"
          value={`${Math.round(sustainability.co2Saved)} kg`}
          icon={Globe}
          description="environmental impact"
          color="green"
          change="+12 kg today"
          changeType="positive"
        />
      </div>

      {/* Environmental Factors */}
      <EnvironmentalFactors weather={weather} event={event} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ProductTable 
            products={productsWithDynamicPricing}
            onAcceptPrice={handleAcceptPrice}
            onOverridePrice={handleOverridePrice}
          />
        </div>
        <div>
          <RecommendationPanel
            recommendations={aiRecommendations}
            onAccept={onAcceptRecommendation}
            onDismiss={onDismissRecommendation}
          />
        </div>
      </div>
    </div>
  );
}