import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Lock } from 'lucide-react';
import useChatStore from '../../../stores/chatStore';
import useAuthStore from '../../../stores/authStore';

export default function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingModel, setIsAddingModel] = useState(false);
  const dropdownRef = useRef(null);
  const { selectedModels, models, addModel, removeModel, setSelectedModel } = useChatStore();
  const { user } = useAuthStore();
  
  const isPro = user?.subscription_tier === 'pro';
  const allModels = [...models.basic, ...models.advanced];
  
  // Get model details for selected models
  const selectedModelDetails = selectedModels.map(id => 
    allModels.find(m => m.id === id)
  ).filter(Boolean);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsAddingModel(false);
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
    
    if (isAddingModel) {
      // Adding an additional model
      addModel(modelId);
      setIsAddingModel(false);
      setIsOpen(false);
    } else {
      // Replacing the first model (single-model mode)
      setSelectedModel(modelId);
      setIsOpen(false);
    }
  };
  
  const handleRemoveModel = (modelId, e) => {
    e.stopPropagation();
    removeModel(modelId);
  };
  
  const handleAddModelClick = () => {
    if (selectedModels.length < 3) {
      setIsAddingModel(true);
      setIsOpen(true);
    }
  };
  
  return (
    <div className="relative flex items-center gap-2 flex-wrap" ref={dropdownRef}>
      {/* Model Chips */}
      {selectedModelDetails.map((model, index) => (
        <button
          key={model.id}
          onClick={() => {
            if (selectedModels.length === 1) {
              // If only one model, clicking opens selector to change it
              setIsAddingModel(false);
              setIsOpen(!isOpen);
            }
          }}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#2d2d2f] border border-[#404040] rounded-lg hover:bg-[#3d3d3f] transition-colors group"
          data-testid={`model-chip-${model.id}`}
        >
          <span className="text-sm font-medium text-gray-200">{model.name}</span>
          {selectedModels.length > 1 && (
            <X 
              className="w-3.5 h-3.5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
              onClick={(e) => handleRemoveModel(model.id, e)}
            />
          )}
        </button>
      ))}
      
      {/* Add Model Button */}
      {selectedModels.length < 3 && (
        <button
          onClick={handleAddModelClick}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#2d2d2f] border border-[#404040] border-dashed rounded-lg hover:bg-[#3d3d3f] hover:border-primary transition-colors"
          data-testid="add-model-button"
        >
          <Plus className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">
            Add Model ({selectedModels.length}/3)
          </span>
        </button>
      )}
      
      {/* Dropdown for model selection */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-72 bg-[#1a1a1b] border border-[#404040] rounded-lg shadow-2xl z-50 overflow-hidden"
          data-testid="model-dropdown"
        >
          {/* Header */}
          <div className="p-3 border-b border-[#2d2d2f]">
            <div className="text-sm font-medium text-gray-200">
              {isAddingModel ? 'Add Another Model' : 'Select Model'}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {isAddingModel 
                ? `${selectedModels.length} of 3 models selected`
                : 'Choose an AI model'
              }
            </div>
          </div>
          
          {/* Basic Models */}
          <div className="p-2 border-b border-[#2d2d2f]">
            <div className="text-xs font-semibold text-gray-500 uppercase px-2 py-1.5 tracking-wide">
              Basic Models (Free)
            </div>
            {models.basic.map((model) => {
              const isSelected = selectedModels.includes(model.id);
              return (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model.id, model.tier)}
                  disabled={isSelected}
                  className={`w-full text-left px-3 py-2.5 rounded transition-colors ${
                    isSelected 
                      ? 'bg-primary/10 cursor-not-allowed opacity-50' 
                      : 'hover:bg-[#2d2d2f]'
                  }`}
                  data-testid={`model-option-${model.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-200">{model.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{model.provider}</div>
                    </div>
                    {isSelected && (
                      <span className="text-xs text-primary">Selected</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Advanced Models */}
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase px-2 py-1.5 flex items-center gap-1.5 tracking-wide">
              Advanced Models (Pro)
              {!isPro && <Lock className="w-3 h-3" />}
            </div>
            {models.advanced.map((model) => {
              const isSelected = selectedModels.includes(model.id);
              const isDisabled = isSelected || (!isPro);
              
              return (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model.id, model.tier)}
                  disabled={isDisabled}
                  className={`w-full text-left px-3 py-2.5 rounded transition-colors ${
                    isDisabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-[#2d2d2f]'
                  } ${isSelected ? 'bg-primary/10' : ''}`}
                  data-testid={`model-option-${model.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-200 flex items-center gap-2">
                        {model.name}
                        {!isPro && <Lock className="w-3 h-3 text-gray-600" />}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{model.provider}</div>
                    </div>
                    {isSelected && (
                      <span className="text-xs text-primary">Selected</span>
                    )}
                  </div>
                </button>
              );
            })}
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