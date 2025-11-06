import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Lock } from 'lucide-react';
import useChatStore from '../../../stores/chatStore';
import useAuthStore from '../../../stores/authStore';

export default function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { selectedModel, models, setSelectedModel } = useChatStore();
  const { user } = useAuthStore();
  
  const isPro = user?.subscription_tier === 'pro';
  
  // Get current model info
  const allModels = [...models.basic, ...models.advanced];
  const currentModel = allModels.find(m => m.id === selectedModel) || models.basic[0];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleModelSelect = (modelId, tier) => {
    if (tier === 'pro' && !isPro) {
      alert('Please upgrade to Pro to access advanced models');
      return;
    }
    
    setSelectedModel(modelId);
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2f] border border-[#404040] rounded-lg hover:bg-[#3d3d3f] transition-colors"
        data-testid="model-selector"
      >
        <span className="text-sm font-medium text-gray-200">{currentModel.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-72 bg-[#1a1a1b] border border-[#404040] rounded-lg shadow-2xl z-50 overflow-hidden"
          data-testid="model-dropdown"
        >
          {/* Basic Models */}
          <div className="p-2 border-b border-[#2d2d2f]">
            <div className="text-xs font-semibold text-gray-500 uppercase px-2 py-1.5 tracking-wide">
              Basic Models (Free)
            </div>
            {models.basic.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id, model.tier)}
                className={`w-full text-left px-3 py-2.5 rounded hover:bg-[#2d2d2f] transition-colors ${
                  selectedModel === model.id ? 'bg-[#2d2d2f]' : ''
                }`}
                data-testid={`model-option-${model.id}`}
              >
                <div className="font-medium text-sm text-gray-200">{model.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{model.provider}</div>
              </button>
            ))}
          </div>
          
          {/* Advanced Models */}
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase px-2 py-1.5 flex items-center gap-1.5 tracking-wide">
              Advanced Models (Pro)
              {!isPro && <Lock className="w-3 h-3" />}
            </div>
            {models.advanced.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id, model.tier)}
                className={`w-full text-left px-3 py-2.5 rounded hover:bg-[#2d2d2f] transition-colors ${
                  selectedModel === model.id ? 'bg-[#2d2d2f]' : ''
                } ${!isPro ? 'opacity-50' : ''}`}
                data-testid={`model-option-${model.id}`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-200">{model.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{model.provider}</div>
                  </div>
                  {!isPro && <Lock className="w-4 h-4 text-gray-600" />}
                </div>
              </button>
            ))}
          </div>
          
          {!isPro && (
            <div className="p-3 border-t border-[#2d2d2f] bg-[#4f46e5]/10">
              <button className="text-sm text-[#4f46e5] hover:text-[#6366f1] font-medium transition-colors">
                🚀 Upgrade to Pro
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}