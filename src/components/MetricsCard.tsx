import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  trend?: number[];
}

export default function MetricsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  description,
  trend 
}: MetricsCardProps) {
  const changeColors = {
    positive: 'text-success-600 bg-success-50',
    negative: 'text-alert-600 bg-alert-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  return (
    <div className="card card-hover p-6 interactive">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon className="h-5 w-5 text-primary-500" />
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-3xl font-heading font-bold text-charcoal">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>

          {change && (
            <div className="flex items-center space-x-2">
              <span className={`status-pill ${changeColors[changeType]}`}>
                {change}
              </span>
            </div>
          )}
        </div>

        {/* Mini trend chart placeholder */}
        {trend && (
          <div className="w-16 h-12 flex items-end space-x-1">
            {trend.slice(-8).map((value, index) => (
              <div
                key={index}
                className="bg-primary-200 rounded-sm flex-1"
                style={{ height: `${(value / Math.max(...trend)) * 100}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}