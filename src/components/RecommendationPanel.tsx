import React from 'react';
import { Brain, ArrowRight, CheckCircle, Zap, Target, TrendingUp, Package, Tag, RotateCcw } from 'lucide-react';
import { AIRecommendation } from '../utils/aiRecommendations';

interface RecommendationPanelProps {
  recommendations: AIRecommendation[];
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
}

export default function RecommendationPanel({ 
  recommendations, 
  onAccept, 
  onDismiss 
}: RecommendationPanelProps) {
  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return {
          color: 'bg-red-100 text-red-900 border-red-400',
          label: 'High Priority'
        };
      case 'medium':
        return {
          color: 'bg-yellow-100 text-yellow-900 border-yellow-400',
          label: 'Medium Priority'
        };
      case 'low':
        return {
          color: 'bg-green-100 text-green-900 border-green-400',
          label: 'Low Priority'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-900 border-gray-400',
          label: 'Normal'
        };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'pricing':
        return {
          icon: Brain,
          color: 'text-blue-800',
          bgColor: 'bg-blue-100 border-blue-400'
        };
      case 'transfer':
        return {
          icon: ArrowRight,
          color: 'text-purple-800',
          bgColor: 'bg-purple-100 border-purple-400'
        };
      case 'promotion':
        return {
          icon: Zap,
          color: 'text-orange-800',
          bgColor: 'bg-orange-100 border-orange-400'
        };
      case 'restock':
        return {
          icon: Package,
          color: 'text-green-800',
          bgColor: 'bg-green-100 border-green-400'
        };
      case 'markdown':
        return {
          icon: Tag,
          color: 'text-red-800',
          bgColor: 'bg-red-100 border-red-400'
        };
      default:
        return {
          icon: Target,
          color: 'text-gray-800',
          bgColor: 'bg-gray-100 border-gray-400'
        };
    }
  };

  return (
    <div className="card">
      <div className="px-6 py-4 border-b-2 bg-blue-100 border-blue-400">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-blue-900">AI Recommendations</h3>
            <p className="text-sm text-blue-800 font-bold">Smart suggestions to optimize performance</p>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {recommendations.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-400">
              <CheckCircle className="h-8 w-8 text-green-700" />
            </div>
            <h4 className="text-lg font-black mb-2 force-visible">All Caught Up!</h4>
            <p className="mb-1 force-visible-secondary font-bold">All recommendations have been implemented.</p>
            <p className="text-sm force-visible-secondary font-bold">New AI suggestions will appear here automatically.</p>
          </div>
        ) : (
          <div className="divide-y-2" style={{ borderColor: 'var(--border-primary)' }}>
            {recommendations.map((rec) => {
              const typeConfig = getTypeConfig(rec.type);
              const urgencyConfig = getUrgencyConfig(rec.urgency);
              const TypeIcon = typeConfig.icon;
              
              return (
                <div key={rec.id} className="p-6 transition-colors" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 ${typeConfig.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 border-2`}>
                      <TypeIcon className={`h-4 w-4 ${typeConfig.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-black force-visible">{rec.title}</h4>
                        <span className={`status-badge border-2 font-black ${urgencyConfig.color} ml-2 flex-shrink-0`}>
                          {urgencyConfig.label}
                        </span>
                      </div>
                      
                      <p className="text-sm mb-3 leading-relaxed force-visible-secondary font-bold">{rec.description}</p>
                      
                      {rec.suggestedAction && (
                        <div className="mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs font-bold text-gray-700">
                            <RotateCcw className="h-3 w-3 inline mr-1" />
                            Suggested Action: {rec.suggestedAction}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-700" />
                            <span className="text-sm font-black text-green-700">{rec.impact}</span>
                          </div>
                          <div className="text-xs force-visible-secondary font-black">
                            {rec.confidence}% confidence
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onAccept(rec.id)}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-black px-4 py-2 rounded-lg transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => onDismiss(rec.id)}
                          className="text-xs font-black px-4 py-2 rounded-lg transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-400"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}