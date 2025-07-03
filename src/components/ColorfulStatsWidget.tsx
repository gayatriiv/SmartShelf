import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ColorfulStatsWidgetProps {
  title: string;
  value: string | number;
  percentage: number;
  trend: 'up' | 'down' | 'neutral';
  color: 'green' | 'purple' | 'blue' | 'orange' | 'pink' | 'cyan';
  subtitle?: string;
}

export default function ColorfulStatsWidget({
  title,
  value,
  percentage,
  trend,
  color,
  subtitle
}: ColorfulStatsWidgetProps) {
  const colorClasses = {
    green: 'widget-success',
    purple: 'widget-purple', 
    blue: 'widget-primary',
    orange: 'widget-orange',
    pink: 'widget-pink',
    cyan: 'widget-cyan'
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={`gradient-card ${colorClasses[color]} p-6 text-white relative overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/20 -translate-y-6 translate-x-6" />
        <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/10 translate-y-4 -translate-x-4" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white/80 text-sm font-medium mb-1">{title}</h3>
            <div className="text-3xl font-heading font-bold text-white">{value}</div>
            {subtitle && (
              <p className="text-white/60 text-xs mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <TrendIcon className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">
              {percentage > 0 ? '+' : ''}{percentage}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(Math.abs(percentage), 100)}%` }}
          />
        </div>
        
        <div className="text-white/70 text-xs">
          {trend === 'up' ? 'Trending upward' : trend === 'down' ? 'Needs attention' : 'Stable performance'}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-widget" />
    </div>
  );
}