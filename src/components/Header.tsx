import React from 'react';
import { ShoppingCart, TrendingUp, Leaf } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Header({ activeView, onViewChange }: HeaderProps) {
  const views = [
    { id: 'dashboard', label: 'Manager Dashboard', icon: TrendingUp },
    { id: 'customer', label: 'Customer View', icon: ShoppingCart },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-xl font-bold text-gray-900">SmartRetail AI</h1>
            <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Dynamic Pricing Platform
            </span>
          </div>
          
          <nav className="flex space-x-1">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => onViewChange(view.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === view.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {view.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}