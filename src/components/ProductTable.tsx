import React from 'react';
import { Product } from '../types';
import { TrendingUp, TrendingDown, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onAcceptPrice?: (productId: string) => void;
  onOverridePrice?: (productId: string) => void;
}

export default function ProductTable({ products, onAcceptPrice, onOverridePrice }: ProductTableProps) {
  const getStatusConfig = (status: Product['status']) => {
    switch (status) {
      case 'fresh':
        return {
          color: 'bg-green-100 text-green-900 border-green-400',
          icon: CheckCircle,
          label: 'Fresh'
        };
      case 'expiring':
        return {
          color: 'bg-yellow-100 text-yellow-900 border-yellow-400',
          icon: Clock,
          label: 'Expiring Soon'
        };
      case 'urgent':
        return {
          color: 'bg-red-100 text-red-900 border-red-400',
          icon: AlertTriangle,
          label: 'Urgent'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-900 border-gray-400',
          icon: Clock,
          label: 'Unknown'
        };
    }
  };

  const getPriceChangeConfig = (change: number) => {
    if (change > 0) {
      return {
        icon: TrendingUp,
        color: 'text-red-900',
        bgColor: 'bg-red-100 border-red-400'
      };
    }
    if (change < 0) {
      return {
        icon: TrendingDown,
        color: 'text-green-900',
        bgColor: 'bg-green-100 border-green-400'
      };
    }
    return null;
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'produce': return '🥬';
      case 'bakery': return '🥖';
      case 'dairy': return '🥛';
      case 'deli': return '🥪';
      case 'seafood': return '🐟';
      default: return '📦';
    }
  };

  if (products.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gray-300">
          <AlertTriangle className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold mb-4 force-visible">No Products Found</h3>
        <p className="text-lg mb-6 force-visible-secondary max-w-md mx-auto">
          Add your first product to start managing your inventory with AI-powered insights.
        </p>
        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 max-w-lg mx-auto">
          <h4 className="font-bold text-blue-900 mb-2">Get started by adding products with:</h4>
          <ul className="text-sm text-blue-800 space-y-1 text-left">
            <li>• Product name and category</li>
            <li>• Current inventory count</li>
            <li>• Base pricing information</li>
            <li>• Expiry dates for freshness tracking</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b-2" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
        <h3 className="text-lg font-bold force-visible">Product Inventory</h3>
        <p className="text-sm force-visible-secondary">Real-time inventory with AI-powered pricing</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b-2" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-black force-visible uppercase tracking-wider">
                Product Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-black force-visible uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-black force-visible uppercase tracking-wider">
                Inventory
              </th>
              <th className="px-6 py-3 text-left text-xs font-black force-visible uppercase tracking-wider">
                Original Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-black force-visible uppercase tracking-wider">
                AI Optimized
              </th>
              <th className="px-6 py-3 text-left text-xs font-black force-visible uppercase tracking-wider">
                Price Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-black force-visible uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }}>
            {products.map((product) => {
              const statusConfig = getStatusConfig(product.status);
              const priceConfig = getPriceChangeConfig(product.priceChangePercentage);
              const StatusIcon = statusConfig.icon;
              
              return (
                <tr key={product.id} className="transition-colors hover:opacity-80">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-400">
                        <span className="text-lg">
                          {getCategoryEmoji(product.category)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold force-visible">{product.name}</div>
                        <div className="text-sm force-visible-secondary capitalize">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`status-badge border-2 font-bold ${statusConfig.color}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold force-visible">{product.inventoryCount} units</div>
                    <div className="text-xs force-visible-secondary font-bold">{product.daysToExpiry} days remaining</div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold line-through force-visible-secondary">
                      ${product.basePrice.toFixed(2)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-lg font-black force-visible">
                      ${product.currentPrice.toFixed(2)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {priceConfig && (
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full border-2 font-bold ${priceConfig.bgColor}`}>
                        <priceConfig.icon className={`h-3 w-3 ${priceConfig.color}`} />
                        <span className={`text-xs font-black ${priceConfig.color}`}>
                          {product.priceChangePercentage > 0 ? '+' : ''}{product.priceChangePercentage}%
                        </span>
                      </div>
                    )}
                    {!priceConfig && (
                      <span className="text-xs text-gray-500 font-bold">No change</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {onAcceptPrice && (
                        <button
                          onClick={() => onAcceptPrice(product.id)}
                          className="text-xs font-black text-green-900 hover:text-green-800 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-full transition-colors border-2 border-green-400"
                        >
                          Accept
                        </button>
                      )}
                      {onOverridePrice && (
                        <button
                          onClick={() => onOverridePrice(product.id)}
                          className="text-xs font-black text-gray-900 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors border-2 border-gray-400"
                        >
                          Override
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}