import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Zap, Palette, Save } from 'lucide-react';
import MetricCard from './MetricCard';

export default function SettingsView() {
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    expiryWarnings: true,
    lowStock: true,
    aiRecommendations: true,
    systemUpdates: false
  });

  const [aiSettings, setAiSettings] = useState({
    aggressiveness: 'moderate',
    autoAccept: false,
    confidenceThreshold: 85,
    updateFrequency: 'hourly'
  });

  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@smartretail.com',
    role: 'Store Manager',
    timezone: 'America/New_York'
  });

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            System Settings
          </h1>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Configure your AI retail platform preferences and system behavior
          </p>
        </div>

        {/* System Status Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="System Health"
            value="99.8%"
            change="Platform uptime"
            changeType="positive"
            icon={Shield}
            color="green"
          />
          <MetricCard
            title="AI Performance"
            value="94.2%"
            change="Model accuracy"
            changeType="positive"
            icon={Zap}
            color="blue"
          />
          <MetricCard
            title="Data Sync"
            value="Real-time"
            change="Live updates"
            changeType="positive"
            icon={Settings}
            color="purple"
          />
          <MetricCard
            title="Security Score"
            value="A+"
            change="Security rating"
            changeType="positive"
            icon={Shield}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Profile Settings</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Manage your account information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Role</label>
                <select
                  value={profile.role}
                  onChange={(e) => setProfile({...profile, role: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="Store Manager">Store Manager</option>
                  <option value="Assistant Manager">Assistant Manager</option>
                  <option value="Inventory Specialist">Inventory Specialist</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
                <Bell className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Control what alerts you receive</p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {key === 'priceAlerts' && 'Get notified when prices are optimized'}
                      {key === 'expiryWarnings' && 'Alerts for products nearing expiry'}
                      {key === 'lowStock' && 'Notifications for low inventory levels'}
                      {key === 'aiRecommendations' && 'AI-generated suggestions and insights'}
                      {key === 'systemUpdates' && 'Platform updates and maintenance notices'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* AI Configuration */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
                <Zap className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>AI Configuration</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Customize AI behavior and automation</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Pricing Aggressiveness</label>
                <select
                  value={aiSettings.aggressiveness}
                  onChange={(e) => setAiSettings({...aiSettings, aggressiveness: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Confidence Threshold: {aiSettings.confidenceThreshold}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={aiSettings.confidenceThreshold}
                  onChange={(e) => setAiSettings({...aiSettings, confidenceThreshold: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Minimum confidence level for automatic price adjustments
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Update Frequency</label>
                <select
                  value={aiSettings.updateFrequency}
                  onChange={(e) => setAiSettings({...aiSettings, updateFrequency: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="realtime">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Auto-Accept Recommendations</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Automatically apply high-confidence suggestions</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiSettings.autoAccept}
                    onChange={(e) => setAiSettings({...aiSettings, autoAccept: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* System Preferences */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center border border-green-200">
                <Palette className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>System Preferences</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Customize your platform experience</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Theme</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}>
                  <option value="light">Light (Current)</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Language</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Currency</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button className="btn-primary flex items-center space-x-2 px-8 py-3">
            <Save className="h-5 w-5" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}