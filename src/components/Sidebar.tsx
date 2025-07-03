import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Leaf, 
  Settings, 
  ShoppingCart,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customer', label: 'Customer View', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 card border-r rounded-none h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center shadow-md">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold gradient-text">SmartRetail AI</h1>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Dynamic Pricing Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full sidebar-item ${
                    isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Eco Impact Badge */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Eco Impact</span>
          </div>
          <p className="text-xs text-green-700">18% waste reduction this month</p>
          <div className="mt-2 w-full bg-green-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-3/4 transition-all duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
}