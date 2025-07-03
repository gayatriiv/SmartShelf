import React from 'react';
import { Cloud, Sun, CloudRain, Calendar, Thermometer, MapPin } from 'lucide-react';
import { WeatherData, LocalEvent } from '../types';

interface EnvironmentalFactorsProps {
  weather: WeatherData;
  event: LocalEvent;
}

export default function EnvironmentalFactors({ weather, event }: EnvironmentalFactorsProps) {
  const getWeatherConfig = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return {
          icon: Sun,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'rainy':
        return {
          icon: CloudRain,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'cloudy':
        return {
          icon: Cloud,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
      default:
        return {
          icon: Cloud,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const getEventTypeConfig = (type: string) => {
    switch (type) {
      case 'festival':
        return {
          color: 'bg-purple-50 text-purple-700 border-purple-200',
          emoji: '🎉'
        };
      case 'weekend':
        return {
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          emoji: '🎯'
        };
      case 'holiday':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          emoji: '🎊'
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          emoji: '📅'
        };
    }
  };

  const weatherConfig = getWeatherConfig(weather.condition);
  const eventConfig = getEventTypeConfig(event.type);
  const WeatherIcon = weatherConfig.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weather Impact Card */}
      <div className={`card ${weatherConfig.borderColor} ${weatherConfig.bgColor} border-2`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 ${weatherConfig.bgColor} rounded-lg flex items-center justify-center border ${weatherConfig.borderColor}`}>
              <WeatherIcon className={`h-5 w-5 ${weatherConfig.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Weather Impact</h3>
              <p className="text-sm text-gray-600">Current conditions affecting demand</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
              <span className="text-sm font-medium text-gray-600">Condition</span>
              <span className="text-sm font-semibold text-gray-900 capitalize">{weather.condition}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Temperature</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{weather.temperature}°C</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
              <span className="text-sm font-medium text-gray-600">Demand Impact</span>
              <span className={`text-sm font-semibold ${
                weather.impact > 1 ? 'text-green-600' : 
                weather.impact < 1 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {weather.impact > 1 ? '+' : ''}{((weather.impact - 1) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Local Events Card */}
      <div className="card border-2 border-blue-200 bg-blue-50">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Local Events</h3>
              <p className="text-sm text-gray-600">Events influencing customer behavior</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{eventConfig.emoji}</span>
                <span className="text-sm font-medium text-gray-600">Current Event</span>
              </div>
              <span className={`status-badge border ${eventConfig.color}`}>
                {event.name}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Event Type</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 capitalize">{event.type}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
              <span className="text-sm font-medium text-gray-600">Demand Impact</span>
              <span className={`text-sm font-semibold ${
                event.impact > 1 ? 'text-green-600' : 
                event.impact < 1 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {event.impact > 1 ? '+' : ''}{((event.impact - 1) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}