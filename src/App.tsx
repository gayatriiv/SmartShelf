import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ModernDashboardView from './components/ModernDashboardView';
import CustomerView from './components/CustomerView';
import ProductsView from './components/ProductsView';
import AnalyticsView from './components/AnalyticsView';
import SustainabilityView from './components/SustainabilityView';
import SettingsView from './components/SettingsView';
import { Product, WeatherData, LocalEvent, SustainabilityMetrics } from './types';
import { generateWeatherData, generateLocalEvent } from './utils/dataSimulation';
import { generateAIRecommendations, updateRecommendationsBasedOnActions, AIRecommendation } from './utils/aiRecommendations';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeView, setActiveView] = useState('dashboard');
  const [isDark, setIsDark] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [weather, setWeather] = useState<WeatherData>({ condition: 'sunny', temperature: 22, impact: 1.0 });
  const [localEvent, setLocalEvent] = useState<LocalEvent>({ name: 'Regular Day', type: 'none', impact: 1.0 });
  const [sustainability, setSustainability] = useState<SustainabilityMetrics>({
    wasteReduced: 0,
    profitImprovement: 0,
    co2Saved: 0,
    flashDealConversions: 0,
    totalItemsOptimized: 0
  });
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [acceptedRecommendations, setAcceptedRecommendations] = useState<string[]>([]);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (isAuthenticated) {
      // Start with empty products array - AI will suggest adding products
      setProducts([]);
      setWeather(generateWeatherData());
      setLocalEvent(generateLocalEvent());
      
      // Initialize sustainability metrics at zero
      setSustainability({
        wasteReduced: 0,
        profitImprovement: 0,
        co2Saved: 0,
        flashDealConversions: 0,
        totalItemsOptimized: 0
      });

      // Generate initial AI recommendations for empty state
      const initialRecommendations: AIRecommendation[] = [
        {
          id: 'setup-inventory',
          type: 'restock',
          title: 'Set Up Your Inventory',
          description: 'Start by adding your first products to the system. Our AI will begin analyzing and optimizing as soon as you have inventory data.',
          impact: 'Enable AI optimization',
          urgency: 'high',
          confidence: 100,
          suggestedAction: 'Add 10-20 products to get started'
        },
        {
          id: 'configure-categories',
          type: 'pricing',
          title: 'Configure Product Categories',
          description: 'Set up your product categories (produce, bakery, dairy, etc.) to help our AI make better pricing decisions.',
          impact: 'Improve AI accuracy by 25%',
          urgency: 'medium',
          confidence: 95,
          suggestedAction: 'Define your main product categories'
        },
        {
          id: 'enable-dynamic-pricing',
          type: 'pricing',
          title: 'Enable Dynamic Pricing',
          description: 'Turn on AI-powered dynamic pricing to automatically adjust prices based on demand, expiry dates, and market conditions.',
          impact: 'Increase profits by 15-20%',
          urgency: 'medium',
          confidence: 90,
          suggestedAction: 'Enable automatic price optimization'
        }
      ];
      setAiRecommendations(initialRecommendations);

      // Simulate real-time updates
      const interval = setInterval(() => {
        setWeather(generateWeatherData());
        setLocalEvent(generateLocalEvent());
        
        // Only update metrics if we have products
        if (products.length > 0) {
          setSustainability(prev => ({
            wasteReduced: Math.min(25, prev.wasteReduced + Math.random() * 0.5),
            profitImprovement: Math.min(20, prev.profitImprovement + Math.random() * 0.3),
            co2Saved: prev.co2Saved + Math.floor(Math.random() * 3),
            flashDealConversions: prev.flashDealConversions + Math.floor(Math.random() * 2),
            totalItemsOptimized: prev.totalItemsOptimized + Math.floor(Math.random() * 1)
          }));

          // Update AI recommendations based on current products
          setProducts(currentProducts => {
            const newRecommendations = generateAIRecommendations(currentProducts);
            const filteredRecommendations = updateRecommendationsBasedOnActions(newRecommendations, acceptedRecommendations);
            setAiRecommendations(filteredRecommendations);
            return currentProducts;
          });
        }
      }, 45000); // Update every 45 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, acceptedRecommendations, products.length]);

  const handleLogin = (email: string, password: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setActiveView('dashboard');
    setProducts([]);
    setAiRecommendations([]);
    setAcceptedRecommendations([]);
    setGlobalSearchTerm('');
    setSustainability({
      wasteReduced: 0,
      profitImprovement: 0,
      co2Saved: 0,
      flashDealConversions: 0,
      totalItemsOptimized: 0
    });
  };

  const handleProductUpdate = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    // Regenerate recommendations when products change
    if (updatedProducts.length > 0) {
      const newRecommendations = generateAIRecommendations(updatedProducts);
      const filteredRecommendations = updateRecommendationsBasedOnActions(newRecommendations, acceptedRecommendations);
      setAiRecommendations(filteredRecommendations);
    }
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handleGlobalSearch = (term: string) => {
    setGlobalSearchTerm(term);
  };

  const handleAcceptRecommendation = (id: string) => {
    setAcceptedRecommendations(prev => [...prev, id]);
    setAiRecommendations(prev => prev.filter(rec => rec.id !== id));
    
    // Handle specific recommendation actions
    const recommendation = aiRecommendations.find(rec => rec.id === id);
    if (recommendation) {
      if (recommendation.id === 'setup-inventory') {
        // Add some sample products when user accepts inventory setup
        const sampleProducts: Product[] = [
          {
            id: 'product-1',
            name: 'Organic Bananas',
            category: 'produce',
            inventoryCount: 45,
            expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            basePrice: 2.99,
            currentPrice: 2.99,
            salesVelocity: 0.25,
            competitorPrice: 3.19,
            daysToExpiry: 5,
            demandScore: 0.7,
            priceChangePercentage: 0,
            status: 'fresh'
          },
          {
            id: 'product-2',
            name: 'Fresh Strawberries',
            category: 'produce',
            inventoryCount: 30,
            expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            basePrice: 4.99,
            currentPrice: 4.99,
            salesVelocity: 0.18,
            competitorPrice: 5.29,
            daysToExpiry: 3,
            demandScore: 0.6,
            priceChangePercentage: 0,
            status: 'expiring'
          },
          {
            id: 'product-3',
            name: 'Artisan Bread',
            category: 'bakery',
            inventoryCount: 25,
            expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            basePrice: 3.49,
            currentPrice: 3.49,
            salesVelocity: 0.22,
            competitorPrice: 3.79,
            daysToExpiry: 2,
            demandScore: 0.5,
            priceChangePercentage: 0,
            status: 'urgent'
          }
        ];
        setProducts(sampleProducts);
      }
      
      // Update sustainability metrics when recommendations are accepted
      setSustainability(prev => ({
        ...prev,
        totalItemsOptimized: prev.totalItemsOptimized + 1,
        profitImprovement: prev.profitImprovement + Math.random() * 0.5,
        wasteReduced: prev.wasteReduced + Math.random() * 0.3
      }));
    }
  };

  const handleDismissRecommendation = (id: string) => {
    setAiRecommendations(prev => prev.filter(rec => rec.id !== id));
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <ModernDashboardView
            products={products}
            weather={weather}
            event={localEvent}
            sustainability={sustainability}
            onProductUpdate={handleProductUpdate}
            aiRecommendations={aiRecommendations}
            onAcceptRecommendation={handleAcceptRecommendation}
            onDismissRecommendation={handleDismissRecommendation}
          />
        );
      case 'customer':
        return <CustomerView products={products} />;
      case 'products':
        return <ProductsView products={products} onProductUpdate={handleProductUpdate} />;
      case 'analytics':
        return <AnalyticsView products={products} />;
      case 'sustainability':
        return <SustainabilityView metrics={sustainability} />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <ModernDashboardView
            products={products}
            weather={weather}
            event={localEvent}
            sustainability={sustainability}
            onProductUpdate={handleProductUpdate}
            aiRecommendations={aiRecommendations}
            onAcceptRecommendation={handleAcceptRecommendation}
            onDismissRecommendation={handleDismissRecommendation}
          />
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onLogin={() => setShowAuthModal(true)} />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          isDark={isDark} 
          onThemeToggle={handleThemeToggle} 
          onLogout={handleLogout}
          userEmail={userEmail}
          onSearch={handleGlobalSearch}
        />
        <main className="flex-1 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default App;