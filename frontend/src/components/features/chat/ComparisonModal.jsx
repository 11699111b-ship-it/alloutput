import React, { useState } from 'react';
import { X, Loader2, Check } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const AI_MODELS = {
  basic: [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', tier: 'free' },
    { id: 'gemini-flash', name: 'Gemini Flash', provider: 'Google', tier: 'free' },
  ],
  advanced: [
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', tier: 'pro' },
    { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', tier: 'pro' },
    { id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', tier: 'pro' },
  ],
};

export default function ComparisonModal({ isOpen, onClose, userTier = 'free' }) {
  const [selectedModels, setSelectedModels] = useState([]);
  const [query, setQuery] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [results, setResults] = useState([]);

  const toggleModel = (modelId) => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter(id => id !== modelId));
    } else {
      if (selectedModels.length >= 3) {
        toast.error('You can compare up to 3 models at once');
        return;
      }
      setSelectedModels([...selectedModels, modelId]);
    }
  };

  const handleCompare = async () => {
    if (selectedModels.length < 2) {
      toast.error('Please select at least 2 models to compare');
      return;
    }

    if (!query.trim()) {
      toast.error('Please enter a query');
      return;
    }

    setIsComparing(true);
    setResults([]);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BACKEND_URL}/api/chat/compare`,
        {
          models: selectedModels,
          message: query.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setResults(response.data.data.responses);
        toast.success('Comparison complete!');
      }
    } catch (error) {
      console.error('Comparison error:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to compare models');
    } finally {
      setIsComparing(false);
    }
  };

  const handleReset = () => {
    setSelectedModels([]);
    setQuery('');
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Compare AI Models</h2>
            <p className="text-text-secondary text-sm mt-1">
              Select 2-3 models and get side-by-side responses
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-elevated rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {results.length === 0 ? (
            /* Selection View */
            <div className="space-y-6">
              {/* Model Selection */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Select Models ({selectedModels.length}/3)
                </h3>

                {/* Basic Models */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-text-secondary mb-3">
                    Basic Models (Free)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {AI_MODELS.basic.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => toggleModel(model.id)}
                        className={`p-4 rounded-lg border transition-all text-left ${
                          selectedModels.includes(model.id)
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-text-primary">{model.name}</div>
                            <div className="text-sm text-text-muted">{model.provider}</div>
                          </div>
                          {selectedModels.includes(model.id) && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Models */}
                <div>
                  <h4 className="text-sm font-medium text-text-secondary mb-3">
                    Advanced Models {userTier === 'free' && '(Pro Only 🔒)'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {AI_MODELS.advanced.map((model) => {
                      const isLocked = userTier === 'free';
                      return (
                        <button
                          key={model.id}
                          onClick={() => !isLocked && toggleModel(model.id)}
                          disabled={isLocked}
                          className={`p-4 rounded-lg border transition-all text-left ${
                            isLocked
                              ? 'border-border opacity-50 cursor-not-allowed'
                              : selectedModels.includes(model.id)
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-text-primary flex items-center gap-2">
                                {model.name}
                                {isLocked && <span className="text-xs">🔒</span>}
                              </div>
                              <div className="text-sm text-text-muted">{model.provider}</div>
                            </div>
                            {selectedModels.includes(model.id) && (
                              <Check className="w-5 h-5 text-primary" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Query Input */}
              {selectedModels.length >= 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Enter Your Query
                  </h3>
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={4}
                  />
                </div>
              )}
            </div>
          ) : (
            /* Results View */
            <div>
              <div className="mb-4">
                <div className="text-sm text-text-secondary mb-2">Query:</div>
                <div className="p-4 bg-background rounded-lg text-text-primary">{query}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result, index) => (
                  <Card key={index} className="p-6 bg-background border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold text-text-primary">{result.model}</div>
                      <div className="text-xs text-text-muted">
                        {result.response_time?.toFixed(2)}s
                      </div>
                    </div>

                    <div className="text-sm text-text-primary whitespace-pre-wrap mb-4">
                      {result.response}
                    </div>

                    <div className="text-xs text-text-muted border-t border-border pt-3">
                      {result.tokens_used} tokens
                    </div>
                  </Card>
                ))}
              </div>

              {/* Vote Section */}
              <div className="mt-6 p-4 bg-surface-elevated rounded-lg">
                <div className="text-sm font-medium text-text-primary mb-3">
                  Which response was most helpful?
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.map((result, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="border-border hover:bg-primary hover:text-white"
                    >
                      {result.model}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            {results.length > 0
              ? 'Comparison complete'
              : selectedModels.length > 0
              ? `${selectedModels.length} model${selectedModels.length > 1 ? 's' : ''} selected`
              : 'Select at least 2 models'}
          </div>
          <div className="flex gap-3">
            {results.length > 0 ? (
              <>
                <Button variant="outline" onClick={handleReset}>
                  New Comparison
                </Button>
                <Button onClick={onClose} className="bg-primary hover:bg-primary-hover">
                  Done
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCompare}
                  disabled={selectedModels.length < 2 || !query.trim() || isComparing}
                  className="bg-primary hover:bg-primary-hover disabled:opacity-50"
                >
                  {isComparing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Comparing...
                    </>
                  ) : (
                    'Compare Models'
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
