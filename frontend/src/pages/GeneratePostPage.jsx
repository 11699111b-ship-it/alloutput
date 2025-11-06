import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Copy, RefreshCw, Loader2, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export default function GeneratePostPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get('platform') || 'linkedin';
  
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [variants, setVariants] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'inspirational', label: 'Inspirational' },
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', chars: platform === 'twitter' ? '280' : '150-200' },
    { value: 'medium', label: 'Medium', chars: platform === 'twitter' ? '280' : '300-400' },
    { value: 'long', label: 'Long', chars: platform === 'twitter' ? '280 (thread)' : '500+' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setVariants([]);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BACKEND_URL}/api/tools/generate-post`,
        {
          platform,
          topic: topic.trim(),
          tone,
          length,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setVariants(response.data.data.variants);
        toast.success('Posts generated successfully!');
      }
    } catch (error) {
      console.error('Generate post error:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to generate post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (content, index) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/app/chat')}
            className="flex items-center text-text-secondary hover:text-text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </button>
          <h1 className="text-3xl font-bold text-text-primary">
            Generate {platform === 'linkedin' ? 'LinkedIn' : 'X (Twitter)'} Post
          </h1>
          <p className="text-text-secondary mt-2">
            Create engaging {platform === 'linkedin' ? 'professional' : 'social media'} content with AI
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-6 bg-surface border-border mb-6">
          <div className="space-y-6">
            {/* Platform Display */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Platform
              </label>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate('/app/tools/generate-post?platform=linkedin')}
                  variant={platform === 'linkedin' ? 'default' : 'outline'}
                  className={platform === 'linkedin' ? 'bg-primary' : ''}
                >
                  LinkedIn
                </Button>
                <Button
                  onClick={() => navigate('/app/tools/generate-post?platform=twitter')}
                  variant={platform === 'twitter' ? 'default' : 'outline'}
                  className={platform === 'twitter' ? 'bg-primary' : ''}
                >
                  X (Twitter)
                </Button>
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Topic or Theme *
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={`e.g., "AI productivity tips for remote workers" or "Product launch announcement"`}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {toneOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTone(option.value)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      tone === option.value
                        ? 'bg-primary border-primary text-white'
                        : 'bg-background border-border text-text-secondary hover:border-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Length Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Length
              </label>
              <div className="flex flex-wrap gap-2">
                {lengthOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLength(option.value)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      length === option.value
                        ? 'bg-primary border-primary text-white'
                        : 'bg-background border-border text-text-secondary hover:border-primary'
                    }`}
                  >
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs opacity-75">{option.chars} chars</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className="w-full bg-primary hover:bg-primary-hover text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Posts
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {variants.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Generated Variants ({variants.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {variants.map((variant, index) => (
                <Card key={variant.id} className="p-6 bg-surface border-border">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-text-secondary">
                      Variant {index + 1}
                    </span>
                    <button
                      onClick={() => handleCopy(variant.content, index)}
                      className="p-2 hover:bg-surface-elevated rounded-lg transition-colors"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4 text-text-secondary" />
                      )}
                    </button>
                  </div>

                  <div className="mb-4 text-text-primary whitespace-pre-wrap text-sm leading-relaxed">
                    {variant.content}
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-muted border-t border-border pt-3">
                    <span>{variant.character_count} characters</span>
                    {variant.hashtags && variant.hashtags.length > 0 && (
                      <span className="text-primary">
                        {variant.hashtags.length} hashtags
                      </span>
                    )}
                  </div>

                  {variant.hashtags && variant.hashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {variant.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-background rounded-full text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Regenerate Button */}
            <div className="mt-6 text-center">
              <Button
                onClick={handleGenerate}
                variant="outline"
                disabled={isLoading}
                className="border-border text-text-primary hover:bg-surface"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New Variants
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && variants.length === 0 && (
          <Card className="p-12 bg-surface border-border text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-surface-elevated rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Ready to Create
              </h3>
              <p className="text-text-secondary">
                Fill in the details above and click "Generate Posts" to create {platform === 'linkedin' ? 'professional LinkedIn content' : 'engaging tweets'}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
