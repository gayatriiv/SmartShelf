import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  description,
  color = 'blue'
}: MetricCardProps) {
  const colorClasses = {
    blue: 'text-blue-700 bg-blue-100 border-blue-400',
    green: 'text-green-700 bg-green-100 border-green-400',
    orange: 'text-orange-700 bg-orange-100 border-orange-400',
    purple: 'text-purple-700 bg-purple-100 border-purple-400',
    red: 'text-red-700 bg-red-100 border-red-400'
  };

  const changeColors = {
    positive: 'text-green-900 bg-green-100 border-green-400',
    negative: 'text-red-900 bg-red-100 border-red-400',
    neutral: 'text-gray-900 bg-gray-100 border-gray-400'
  };

  return (
    <div className="metric-card hover-lift">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${colorClasses[color]}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-sm font-bold force-visible-secondary">{title}</p>
          </div>
          
          <div className="mb-2">
            <p className="text-2xl font-black force-visible">{value}</p>
            {description && (
              <p className="text-xs mt-1 force-visible-secondary font-bold">{description}</p>
            )}
          </div>

          {change && (
            <div className="flex items-center">
              <span className={`status-badge border-2 font-bold ${changeColors[changeType]}`}>
                {change}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}