import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ModernMetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  trend?: number[];
  gradient: string;
  iconColor?: string;
}

export default function ModernMetricsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  description,
  trend,
  gradient,
  iconColor = 'text-white'
}: ModernMetricsCardProps) {
  const changeColors = {
    positive: 'text-green-100 bg-green-500/20',
    negative: 'text-red-100 bg-red-500/20',
    neutral: 'text-white/80 bg-white/10'
  };

  return (
    <div className={`metric-widget ${gradient} relative group cursor-pointer transform transition-all duration-300 hover:scale-105`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <Icon className="w-full h-full" />
      </div>
      
      {/* Floating icon */}
      <div className="absolute top-4 right-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="mb-4">
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-heading font-bold text-white mb-1">{value}</p>
          {description && (
            <p className="text-white/60 text-xs">{description}</p>
          )}
        </div>

        {change && (
          <div className="flex items-center justify-between">
            <span className={`status-pill ${changeColors[changeType]} border border-white/20`}>
              {change}
            </span>
            
            {/* Mini trend visualization */}
            {trend && (
              <div className="flex items-end space-x-1 h-8">
                {trend.slice(-6).map((value, index) => (
                  <div
                    key={index}
                    className="bg-white/30 rounded-sm w-2 transition-all duration-300 hover:bg-white/50"
                    style={{ height: `${(value / Math.max(...trend)) * 100}%` }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-widget" />
    </div>
  );
}