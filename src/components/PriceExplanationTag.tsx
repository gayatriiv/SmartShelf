import React from 'react';
import { Brain, TrendingUp, TrendingDown, Clock, Cloud, Calendar, Users } from 'lucide-react';

interface PriceExplanationTagProps {
  product: {
    name: string;
    priceChangePercentage: number;
    daysToExpiry: number;
    salesVelocity: number;
    inventoryCount: number;
  };
  weather?: {
    condition: string;
    impact: number;
  };
  event?: {
    name: string;
    impact: number;
  };
}

export default function PriceExplanationTag({ product, weather, event }: PriceExplanationTagProps) {
  const generateExplanation = () => {
    const factors = [];
    
    // Expiry factor
    if (product.daysToExpiry <= 2) {
      factors.push({
        icon: Clock,
        text: `Expires in ${product.daysToExpiry} days`,
        impact: 'high',
        color: 'text-red-700'
      });
    } else if (product.daysToExpiry <= 5) {
      factors.push({
        icon: Clock,
        text: `Expires in ${product.daysToExpiry} days`,
        impact: 'medium',
        color: 'text-yellow-700'
      });
    }

    // Inventory factor
    if (product.inventoryCount > 80) {
      factors.push({
        icon: TrendingDown,
        text: 'High inventory',
        impact: 'medium',
        color: 'text-orange-700'
      });
    } else if (product.inventoryCount < 20) {
      factors.push({
        icon: TrendingUp,
        text: 'Low stock',
        impact: 'medium',
        color: 'text-blue-700'
      });
    }

    // Sales velocity factor
    if (product.salesVelocity > 0.3) {
      factors.push({
        icon: Users,
        text: 'High demand',
        impact: 'high',
        color: 'text-green-700'
      });
    } else if (product.salesVelocity < 0.15) {
      factors.push({
        icon: Users,
        text: 'Low demand',
        impact: 'medium',
        color: 'text-red-700'
      });
    }

    // Weather factor
    if (weather && weather.impact !== 1.0) {
      factors.push({
        icon: Cloud,
        text: `${weather.condition} weather`,
        impact: weather.impact > 1 ? 'positive' : 'negative',
        color: weather.impact > 1 ? 'text-green-700' : 'text-blue-700'
      });
    }

    // Event factor
    if (event && event.impact !== 1.0) {
      factors.push({
        icon: Calendar,
        text: event.name,
        impact: event.impact > 1 ? 'positive' : 'negative',
        color: event.impact > 1 ? 'text-purple-700' : 'text-gray-700'
      });
    }

    return factors;
  };

  const factors = generateExplanation();
  const isIncrease = product.priceChangePercentage > 0;
  const isDecrease = product.priceChangePercentage < 0;

  if (Math.abs(product.priceChangePercentage) < 1) {
    return null; // No significant price change
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-4 max-w-sm">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <Brain className="h-3 w-3 text-blue-700" />
        </div>
        <h4 className="font-bold text-blue-900 text-sm">AI Price Explanation</h4>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center space-x-2">
          {isIncrease && <TrendingUp className="h-4 w-4 text-red-600" />}
          {isDecrease && <TrendingDown className="h-4 w-4 text-green-600" />}
          <span className={`font-bold text-sm ${isIncrease ? 'text-red-700' : 'text-green-700'}`}>
            {isIncrease ? 'Price Increased' : 'Price Reduced'} by {Math.abs(product.priceChangePercentage)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-700 mb-2">Key factors:</p>
        {factors.slice(0, 3).map((factor, index) => {
          const Icon = factor.icon;
          return (
            <div key={index} className="flex items-center space-x-2">
              <Icon className={`h-3 w-3 ${factor.color}`} />
              <span className={`text-xs font-bold ${factor.color}`}>{factor.text}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-600 font-bold">
          AI optimized for {isIncrease ? 'maximum profit' : 'faster sales'}
        </p>
      </div>
    </div>
  );
}