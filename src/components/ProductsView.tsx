import React, { useState } from 'react';
import { Product } from '../types';
import { Package, Search, Plus, BarChart3, TrendingUp, Users, X, Save } from 'lucide-react';
import ProductTable from './ProductTable';
import MetricCard from './MetricCard';

interface ProductsViewProps {
  products: Product[];
  onProductUpdate: (products: Product[]) => void;
}

interface ProductFormData {
  name: string;
  category: string;
  inventoryCount: number;
  expiryDate: string;
  basePrice: number;
  competitorPrice: number;
}

export default function ProductsView({ products, onProductUpdate }: ProductsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'produce',
    inventoryCount: 0,
    expiryDate: '',
    basePrice: 0,
    competitorPrice: 0
  });

  const categories = ['all', 'produce', 'bakery', 'dairy', 'deli', 'seafood'];
  const statuses = ['all', 'fresh', 'expiring', 'urgent'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAcceptPrice = (productId: string) => {
    console.log('Accept price for product:', productId);
  };

  const handleOverridePrice = (productId: string) => {
    console.log('Override price for product:', productId);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || formData.inventoryCount <= 0 || formData.basePrice <= 0) {
      alert('Please fill in all required fields with valid values');
      return;
    }

    const expiryDate = new Date(formData.expiryDate);
    const today = new Date();
    const daysToExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const status = daysToExpiry <= 2 ? 'urgent' : daysToExpiry <= 5 ? 'expiring' : 'fresh';
    
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      inventoryCount: formData.inventoryCount,
      expiryDate: formData.expiryDate,
      basePrice: formData.basePrice,
      currentPrice: formData.basePrice,
      salesVelocity: Math.random() * 0.3 + 0.1, // Random initial velocity
      competitorPrice: formData.competitorPrice || formData.basePrice * 1.1,
      daysToExpiry,
      demandScore: Math.random(),
      priceChangePercentage: 0,
      status
    };

    onProductUpdate([...products, newProduct]);
    setShowAddForm(false);
    setFormData({
      name: '',
      category: 'produce',
      inventoryCount: 0,
      expiryDate: '',
      basePrice: 0,
      competitorPrice: 0
    });
  };

  const getStatusStats = () => {
    return {
      fresh: products.filter(p => p.status === 'fresh').length,
      expiring: products.filter(p => p.status === 'expiring').length,
      urgent: products.filter(p => p.status === 'urgent').length,
      total: products.length
    };
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Product Management
          </h1>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Comprehensive inventory management with AI-powered insights
          </p>
        </div>

        {/* Stats Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Products"
            value={stats.total}
            change="+8 this hour"
            changeType="positive"
            icon={Package}
            color="blue"
          />
          <MetricCard
            title="Fresh Items"
            value={stats.fresh}
            change="Good condition"
            changeType="positive"
            icon={BarChart3}
            color="green"
          />
          <MetricCard
            title="Expiring Soon"
            value={stats.expiring}
            change="Needs attention"
            changeType="neutral"
            icon={TrendingUp}
            color="orange"
          />
          <MetricCard
            title="Urgent Items"
            value={stats.urgent}
            change="Immediate action"
            changeType="negative"
            icon={Users}
            color="red"
          />
        </div>

        {/* Filters and Search */}
        <div className="card p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <ProductTable 
          products={filteredProducts}
          onAcceptPrice={handleAcceptPrice}
          onOverridePrice={handleOverridePrice}
        />

        {/* Add Product Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
              {/* Close Button */}
              <button
                onClick={() => setShowAddForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Add New Product</h2>
                <p className="text-blue-100">Add a product to your inventory</p>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)', 
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)', 
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                      required
                    >
                      <option value="produce">Produce</option>
                      <option value="bakery">Bakery</option>
                      <option value="dairy">Dairy</option>
                      <option value="deli">Deli</option>
                      <option value="seafood">Seafood</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                        Inventory Count *
                      </label>
                      <input
                        type="number"
                        value={formData.inventoryCount}
                        onChange={(e) => setFormData({...formData, inventoryCount: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        style={{ 
                          backgroundColor: 'var(--bg-primary)', 
                          borderColor: 'var(--border-primary)',
                          color: 'var(--text-primary)'
                        }}
                        placeholder="0"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                        Base Price *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.basePrice}
                        onChange={(e) => setFormData({...formData, basePrice: parseFloat(e.target.value) || 0})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        style={{ 
                          backgroundColor: 'var(--bg-primary)', 
                          borderColor: 'var(--border-primary)',
                          color: 'var(--text-primary)'
                        }}
                        placeholder="0.00"
                        min="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Expiry Date *
                    </label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)', 
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Competitor Price (Optional)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.competitorPrice}
                      onChange={(e) => setFormData({...formData, competitorPrice: parseFloat(e.target.value) || 0})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)', 
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="0.00"
                      min="0"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Add Product</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}