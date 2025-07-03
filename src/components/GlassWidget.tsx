import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface GlassWidgetProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function GlassWidget({
  title,
  value,
  icon: Icon,
  subtitle,
  children,
  className = ''
}: GlassWidgetProps) {
  return (
    <div className={`glass-card p-6 relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${className}`}>
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-widget">
        <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full animate-bounce" />
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce-slow" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white/90 text-sm font-medium">{title}</h3>
              {subtitle && (
                <p className="text-white/60 text-xs">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-2xl font-heading font-bold text-white mb-4">
          {value}
        </div>

        {children}
      </div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </div>
  );
}