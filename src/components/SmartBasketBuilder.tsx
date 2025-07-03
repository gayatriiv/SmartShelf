import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Plus, Minus, ChefHat, Clock, Users, Leaf } from 'lucide-react';

interface SmartBasketBuilderProps {
  products: Product[];
}

interface MealPlan {
  id: string;
  name: string;
  description: string;
  servings: number;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  ingredients: {
    productId: string;
    quantity: number;
    unit: string;
  }[];
}

export default function SmartBasketBuilder({ products }: SmartBasketBuilderProps) {
  const [selectedMealPlan, setSelectedMealPlan] = useState<string | null>(null);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [servings, setServings] = useState(4);

  const mealPlans: MealPlan[] = [
    {
      id: 'fresh-salad',
      name: 'Garden Fresh Salad',
      description: 'A vibrant mix of fresh greens, vegetables, and protein',
      servings: 4,
      prepTime: '15 min',
      difficulty: 'Easy',
      tags: ['Healthy', 'Quick', 'Vegetarian'],
      ingredients: [
        { productId: 'produce', quantity: 2, unit: 'cups' },
        { productId: 'dairy', quantity: 1, unit: 'cup' }
      ]
    },
    {
      id: 'hearty-sandwich',
      name: 'Artisan Sandwich Platter',
      description: 'Gourmet sandwiches with fresh bread and premium fillings',
      servings: 4,
      prepTime: '20 min',
      difficulty: 'Easy',
      tags: ['Quick', 'Filling', 'Customizable'],
      ingredients: [
        { productId: 'bakery', quantity: 1, unit: 'loaf' },
        { productId: 'deli', quantity: 0.5, unit: 'lb' },
        { productId: 'dairy', quantity: 1, unit: 'pack' }
      ]
    },
    {
      id: 'seafood-special',
      name: 'Fresh Catch Special',
      description: 'Premium seafood with seasonal vegetables',
      servings: 4,
      prepTime: '30 min',
      difficulty: 'Medium',
      tags: ['Premium', 'Protein-Rich', 'Omega-3'],
      ingredients: [
        { productId: 'seafood', quantity: 1.5, unit: 'lbs' },
        { productId: 'produce', quantity: 3, unit: 'cups' }
      ]
    }
  ];

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
  };

  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const buildMealPlanCart = (mealPlan: MealPlan) => {
    const newCart: {[key: string]: number} = {};
    
    mealPlan.ingredients.forEach(ingredient => {
      const categoryProducts = getProductsByCategory(ingredient.productId);
      if (categoryProducts.length > 0) {
        // Select the best product from category (highest sales velocity)
        const bestProduct = categoryProducts.sort((a, b) => b.salesVelocity - a.salesVelocity)[0];
        const adjustedQuantity = Math.ceil((ingredient.quantity * servings) / mealPlan.servings);
        newCart[bestProduct.id] = adjustedQuantity;
      }
    });
    
    setCart(newCart);
    setSelectedMealPlan(mealPlan.id);
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.currentPrice * quantity : 0);
    }, 0);
  };

  const getCartItems = () => {
    return Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return product ? { product, quantity } : null;
    }).filter(Boolean);
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 force-visible">Smart Basket Builder</h1>
            <p className="text-lg force-visible-secondary">AI-powered meal planning with your inventory</p>
          </div>

          <div className="card p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gray-300">
              <ChefHat className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 force-visible">No Products Available</h3>
            <p className="text-lg mb-6 force-visible-secondary max-w-md mx-auto">
              Add products to your inventory to start building smart meal plans and shopping baskets.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ChefHat className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 force-visible">Smart Basket Builder</h1>
          <p className="text-lg force-visible-secondary">AI-powered meal planning with your fresh inventory</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Meal Plans */}
          <div className="xl:col-span-2 space-y-6">
            {/* Servings Selector */}
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4 force-visible">Plan for how many people?</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold force-visible">{servings}</span>
                  <span className="force-visible-secondary">people</span>
                </div>
                <button
                  onClick={() => setServings(servings + 1)}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Meal Plan Options */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold force-visible">Choose a Meal Plan</h3>
              {mealPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`card p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedMealPlan === plan.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => buildMealPlanCart(plan)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold force-visible mb-2">{plan.name}</h4>
                      <p className="force-visible-secondary mb-3">{plan.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 font-bold">{plan.prepTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-700 font-bold">{plan.servings} servings</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          plan.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          plan.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {plan.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <button className="btn-primary px-4 py-2">
                      Build Basket
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {plan.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Individual Products */}
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4 force-visible">Or Add Individual Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.slice(0, 8).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {product.category === 'produce' ? '🥬' : 
                         product.category === 'bakery' ? '🥖' : 
                         product.category === 'dairy' ? '🥛' : 
                         product.category === 'deli' ? '🥪' : '🐟'}
                      </div>
                      <div>
                        <div className="font-bold text-sm force-visible">{product.name}</div>
                        <div className="text-sm text-green-600 font-bold">${product.currentPrice.toFixed(2)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="card p-6 h-fit sticky top-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center border-2 border-green-400">
                <ShoppingCart className="h-4 w-4 text-green-700" />
              </div>
              <h3 className="text-lg font-bold force-visible">Your Smart Basket</h3>
            </div>

            {Object.keys(cart).length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="force-visible-secondary">Your basket is empty</p>
                <p className="text-sm force-visible-secondary">Choose a meal plan or add individual items</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {getCartItems().map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg">
                          {product.category === 'produce' ? '🥬' : 
                           product.category === 'bakery' ? '🥖' : 
                           product.category === 'dairy' ? '🥛' : 
                           product.category === 'deli' ? '🥪' : '🐟'}
                        </div>
                        <div>
                          <div className="font-bold text-sm force-visible">{product.name}</div>
                          <div className="text-sm text-green-600 font-bold">${product.currentPrice.toFixed(2)} each</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-bold force-visible w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold force-visible">Total:</span>
                    <span className="text-xl font-bold text-green-600">${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <button className="w-full btn-primary py-3 mb-3">
                    Proceed to Checkout
                  </button>
                  
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 text-green-700">
                      <Leaf className="h-4 w-4" />
                      <span className="text-sm font-bold">Eco-Friendly Choice!</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      This basket helps reduce food waste and supports sustainable shopping.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}