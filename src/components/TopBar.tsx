import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface TopBarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onLogout: () => void;
  userEmail?: string;
  onSearch?: (term: string) => void;
}

export default function TopBar({ isDark, onThemeToggle, onLogout, userEmail, onSearch }: TopBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="card border-b rounded-none px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </form>
        </div>

        {/* Center - AI Active Toggle */}
        <div className="hidden md:flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full pulse-gentle" />
          <span className="text-sm font-medium text-green-800">AI Active</span>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />

          {/* Notifications */}
          <button className="relative p-2 transition-colors rounded-lg" style={{ color: 'var(--text-secondary)' }}>
            <Bell className="h-5 w-5" />
            <span className="notification-badge">3</span>
          </button>

          {/* User profile */}
          <div className="relative">
            <div 
              className="flex items-center space-x-3 cursor-pointer rounded-lg px-3 py-2 transition-colors group" 
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {userEmail?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Store Manager</p>
              </div>
              <ChevronDown className="h-4 w-4" style={{ color: 'var(--text-tertiary)' }} />
            </div>
            
            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }}>
                <div className="py-2">
                  <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {userEmail || 'demo@smartretail.ai'}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Store Manager</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}