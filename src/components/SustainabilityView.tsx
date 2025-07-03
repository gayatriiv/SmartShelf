import React from 'react';
import { SustainabilityMetrics } from '../types';
import { Leaf, TrendingUp, Recycle, Award, BarChart3, Target, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import MetricCard from './MetricCard';

interface SustainabilityViewProps {
  metrics: SustainabilityMetrics;
}

export default function SustainabilityView({ metrics }: SustainabilityViewProps) {
  const wasteData = [
    { month: 'Jan', traditional: 28, aiOptimized: 18 },
    { month: 'Feb', traditional: 32, aiOptimized: 16 },
    { month: 'Mar', traditional: 35, aiOptimized: 20 },
    { month: 'Apr', traditional: 30, aiOptimized: 15 },
    { month: 'May', traditional: 25, aiOptimized: 12 },
    { month: 'Jun', traditional: 29, aiOptimized: 14 }
  ];

  const profitData = [
    { month: 'Jan', baseline: 100, optimized: 108 },
    { month: 'Feb', baseline: 100, optimized: 111 },
    { month: 'Mar', baseline: 100, optimized: 109 },
    { month: 'Apr', baseline: 100, optimized: 115 },
    { month: 'May', baseline: 100, optimized: 118 },
    { month: 'Jun', baseline: 100, optimized: 112 }
  ];

  const impactData = [
    { name: 'Waste Reduced', value: 35, color: '#10b981' },
    { name: 'Revenue Optimized', value: 45, color: '#3b82f6' },
    { name: 'Customer Satisfaction', value: 20, color: '#8b5cf6' }
  ];

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 force-visible">
            Sustainability Impact Dashboard
          </h1>
          <p className="max-w-2xl mx-auto mb-6 force-visible-secondary text-lg">
            Track environmental benefits and business impact of AI-powered retail optimization
          </p>
          <div className="flex justify-center space-x-4">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border-2 border-green-400">
              🌍 Environmental Leader
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border-2 border-blue-400">
              📈 Revenue Optimizer
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold border-2 border-purple-400">
              ♻️ Waste Reducer
            </span>
          </div>
        </div>

        {/* Stats Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Waste Reduced"
            value={`${Math.round(metrics.wasteReduced)}%`}
            change="Food waste prevention"
            changeType="positive"
            icon={Recycle}
            color="green"
          />
          <MetricCard
            title="Profit Improvement"
            value={`${Math.round(metrics.profitImprovement)}%`}
            change="Revenue optimization"
            changeType="positive"
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="CO₂ Saved"
            value={`${Math.round(metrics.co2Saved)} kg`}
            change="Carbon footprint reduction"
            changeType="positive"
            icon={Globe}
            color="green"
          />
          <MetricCard
            title="Flash Deal Success"
            value={metrics.flashDealConversions}
            change="Customer engagement"
            changeType="positive"
            icon={Target}
            color="purple"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Waste Reduction Chart */}
          <div className="xl:col-span-2 card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center border-2 border-green-400">
                <Recycle className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold force-visible">Food Waste Reduction</h3>
                <p className="text-sm force-visible-secondary">Traditional vs AI-optimized waste levels</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--text-primary)" 
                  style={{ fontSize: '14px', fontWeight: 'bold', fill: 'var(--text-primary)' }} 
                />
                <YAxis 
                  stroke="var(--text-primary)" 
                  style={{ fontSize: '14px', fontWeight: 'bold', fill: 'var(--text-primary)' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    border: '2px solid var(--border-primary)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontWeight: 'bold'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="traditional" 
                  stroke="#ef4444" 
                  strokeWidth={4}
                  name="Traditional Method"
                  dot={{ fill: '#ef4444', strokeWidth: 3, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="aiOptimized" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  name="AI Optimized"
                  dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm mt-4 bg-green-100 p-4 rounded-lg border-2 border-green-400 text-green-800 font-bold">
              📊 Percentage of products going to waste per month - AI optimization shows consistent 40-50% reduction
            </p>
          </div>

          {/* Impact Distribution */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-400">
                <Target className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold force-visible">Impact Distribution</h3>
                <p className="text-sm force-visible-secondary">Key improvement areas</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={impactData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {impactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    border: '2px solid var(--border-primary)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontWeight: 'bold'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {impactData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border-2" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-bold force-visible">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold force-visible">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profit Optimization Chart */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-400">
              <BarChart3 className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold force-visible">Profit Optimization Performance</h3>
              <p className="text-sm force-visible-secondary">Baseline vs AI-optimized revenue performance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--text-primary)" 
                style={{ fontSize: '14px', fontWeight: 'bold', fill: 'var(--text-primary)' }} 
              />
              <YAxis 
                stroke="var(--text-primary)" 
                style={{ fontSize: '14px', fontWeight: 'bold', fill: 'var(--text-primary)' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  border: '2px solid var(--border-primary)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontWeight: 'bold'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="baseline" 
                stackId="1"
                stroke="#9ca3af" 
                fill="#f3f4f6"
                name="Baseline Performance"
              />
              <Area 
                type="monotone" 
                dataKey="optimized" 
                stackId="2"
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.4}
                name="AI Optimized Performance"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-sm mt-4 bg-blue-100 p-4 rounded-lg border-2 border-blue-400 text-blue-800 font-bold">
            📈 Relative profit performance (baseline = 100%) - Consistent 8-18% improvement with AI optimization
          </p>
        </div>

        {/* Bottom Impact Summary */}
        <div className="card p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-400">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>
              Year-to-Date Impact Summary
            </h3>
            <p className="font-bold text-lg" style={{ color: '#374151' }}>Comprehensive view of our sustainability and business achievements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border-4 border-gray-400">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-400">
                <Target className="h-8 w-8 text-green-700" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">2,450 kg</h4>
              <p className="font-bold text-gray-800">Food waste prevented this year</p>
              <p className="text-sm text-green-700 mt-2 font-bold">↑ 45% vs last year</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border-4 border-gray-400">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-blue-400">
                <Globe className="h-8 w-8 text-blue-700" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">5.8 tons</h4>
              <p className="font-bold text-gray-800">CO₂ emissions avoided</p>
              <p className="text-sm text-blue-700 mt-2 font-bold">↑ 38% vs last year</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border-4 border-gray-400">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-purple-400">
                <Award className="h-8 w-8 text-purple-700" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">$47,200</h4>
              <p className="font-bold text-gray-800">Additional revenue generated</p>
              <p className="text-sm text-purple-700 mt-2 font-bold">↑ 28% vs last year</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl max-w-3xl mx-auto font-bold" style={{ color: '#1f2937' }}>
              <strong className="text-gray-900 font-black">SmartRetail AI</strong> has successfully achieved a{' '}
              <span className="text-green-700 font-black text-2xl">18% reduction</span> in food waste
              while increasing profits by{' '}
              <span className="text-blue-700 font-black text-2xl">12.5%</span>,
              demonstrating that sustainability and profitability go hand in hand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}