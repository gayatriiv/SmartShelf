import { Product } from '../types';

export interface AIRecommendation {
  id: string;
  type: 'pricing' | 'transfer' | 'promotion' | 'restock' | 'markdown';
  title: string;
  description: string;
  impact: string;
  urgency: 'low' | 'medium' | 'high';
  confidence: number;
  productIds?: string[];
  suggestedAction?: string;
}

export function generateAIRecommendations(products: Product[]): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];

  // Analyze products for various recommendation types
  products.forEach((product) => {
    // High inventory + low sales velocity = markdown recommendation
    if (product.inventoryCount > 80 && product.salesVelocity < 0.15) {
      recommendations.push({
        id: `markdown-${product.id}`,
        type: 'markdown',
        title: 'Markdown Opportunity',
        description: `${product.name} has high inventory (${product.inventoryCount} units) with low sales velocity. Consider a 15-20% markdown to accelerate sales.`,
        impact: `Est. $${Math.round(product.currentPrice * product.inventoryCount * 0.15)} revenue recovery`,
        urgency: 'medium',
        confidence: 85,
        productIds: [product.id],
        suggestedAction: 'Apply 15-20% markdown'
      });
    }

    // Expiring products = urgent pricing recommendation
    if (product.daysToExpiry <= 2 && product.status === 'urgent') {
      recommendations.push({
        id: `urgent-${product.id}`,
        type: 'pricing',
        title: 'Urgent Price Reduction',
        description: `${product.name} expires in ${product.daysToExpiry} days. Immediate 30-40% discount recommended to prevent total loss.`,
        impact: `Prevent $${Math.round(product.currentPrice * product.inventoryCount)} loss`,
        urgency: 'high',
        confidence: 95,
        productIds: [product.id],
        suggestedAction: 'Apply 30-40% discount immediately'
      });
    }

    // Low inventory + high sales velocity = restock recommendation
    if (product.inventoryCount < 20 && product.salesVelocity > 0.25) {
      recommendations.push({
        id: `restock-${product.id}`,
        type: 'restock',
        title: 'Restock Alert',
        description: `${product.name} is running low (${product.inventoryCount} units) with high demand. Restock recommended to avoid stockouts.`,
        impact: `Prevent lost sales of $${Math.round(product.currentPrice * 50)}`,
        urgency: 'high',
        confidence: 90,
        productIds: [product.id],
        suggestedAction: 'Order 50-100 units'
      });
    }
  });

  // Category-based recommendations
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach((category) => {
    const categoryProducts = products.filter(p => p.category === category);
    const avgSalesVelocity = categoryProducts.reduce((sum, p) => sum + p.salesVelocity, 0) / categoryProducts.length;
    
    if (avgSalesVelocity < 0.15) {
      recommendations.push({
        id: `category-promo-${category}`,
        type: 'promotion',
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Category Promotion`,
        description: `${category} category showing low sales velocity (${(avgSalesVelocity * 100).toFixed(1)}%). Bundle promotion or category discount recommended.`,
        impact: `Est. 25% sales increase`,
        urgency: 'medium',
        confidence: 78,
        productIds: categoryProducts.map(p => p.id),
        suggestedAction: 'Create category bundle or 10-15% discount'
      });
    }
  });

  // Dynamic pricing recommendations based on competitor analysis
  const competitorAnalysis = products.filter(p => p.competitorPrice && Math.abs(p.currentPrice - p.competitorPrice) > 0.5);
  if (competitorAnalysis.length > 0) {
    recommendations.push({
      id: 'competitor-pricing',
      type: 'pricing',
      title: 'Competitive Pricing Adjustment',
      description: `${competitorAnalysis.length} products have significant price gaps with competitors. Adjust pricing to maintain competitiveness.`,
      impact: `Est. 10-15% sales increase`,
      urgency: 'medium',
      confidence: 82,
      productIds: competitorAnalysis.map(p => p.id),
      suggestedAction: 'Align with competitor pricing'
    });
  }

  // Cross-selling opportunities
  const highPerformers = products.filter(p => p.salesVelocity > 0.3);
  const lowPerformers = products.filter(p => p.salesVelocity < 0.15);
  
  if (highPerformers.length > 0 && lowPerformers.length > 0) {
    recommendations.push({
      id: 'cross-sell-opportunity',
      type: 'promotion',
      title: 'Cross-Selling Opportunity',
      description: `Bundle high-performing items with slower-moving inventory to boost overall sales velocity.`,
      impact: `Est. 20% increase in slow-moving items`,
      urgency: 'low',
      confidence: 75,
      productIds: [...highPerformers.slice(0, 2).map(p => p.id), ...lowPerformers.slice(0, 3).map(p => p.id)],
      suggestedAction: 'Create product bundles'
    });
  }

  // Sort by urgency and confidence
  return recommendations
    .sort((a, b) => {
      const urgencyOrder = { high: 3, medium: 2, low: 1 };
      if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      }
      return b.confidence - a.confidence;
    })
    .slice(0, 5); // Limit to top 5 recommendations
}

export function updateRecommendationsBasedOnActions(
  recommendations: AIRecommendation[],
  acceptedIds: string[]
): AIRecommendation[] {
  return recommendations.filter(rec => !acceptedIds.includes(rec.id));
}