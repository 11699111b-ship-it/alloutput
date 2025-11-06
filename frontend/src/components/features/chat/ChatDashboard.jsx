import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Video, Globe, FileText, Send, Sparkles, Zap } from 'lucide-react';
import useAuthStore from '../../../stores/authStore';
import useChatStore from '../../../stores/chatStore';
import ModelSelector from './ModelSelector';
import ChatInput from './ChatInput';
import ComparisonModal from './ComparisonModal';

export default function ChatDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { sendMessage } = useChatStore();
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  
  const quickActions = [
    {
      id: 1,
      icon: Zap,
      label: 'Compare Models',
      description: 'Compare responses side-by-side',
      color: 'from-indigo-500 to-purple-500',
      onClick: () => setShowComparisonModal(true)
    },
    {
      id: 2,
      icon: Video,
      label: 'Summarize Video',
      description: 'Get key insights from videos',
      color: 'from-blue-500 to-cyan-500',
      onClick: () => navigate('/app/tools/summarize?type=video')
    },
    {
      id: 3,
      icon: Globe,
      label: 'Summarize Webpage',
      description: 'Extract main points from articles',
      color: 'from-green-500 to-emerald-500',
      onClick: () => navigate('/app/tools/summarize?type=url')
    },
    {
      id: 4,
      icon: FileText,
      label: 'Summarize Document',
      description: 'Condense PDFs and docs',
      color: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/app/tools/summarize?type=file')
    },
    {
      id: 5,
      icon: MessageSquare,
      label: 'Chat with Webpage',
      description: 'Ask questions about any page',
      color: 'from-pink-500 to-rose-500',
      onClick: () => {
        // TODO: Implement Chat with Webpage feature
        console.log('Chat with Webpage - Coming soon');
      }
    },
    {
      id: 6,
      icon: Send,
      label: 'LinkedIn Post',
      description: 'Create professional posts',
      color: 'from-cyan-500 to-blue-500',
      onClick: () => navigate('/app/tools/generate-post?platform=linkedin')
    },
    {
      id: 7,
      icon: Send,
      label: 'X Post',
      description: 'Craft engaging tweets',
      color: 'from-orange-500 to-red-500',
      onClick: () => navigate('/app/tools/generate-post?platform=twitter')
    },
    {
      id: 8,
      icon: Sparkles,
      label: 'View All Agents',
      description: 'Meet AI specialists',
      color: 'from-yellow-500 to-amber-500',
      onClick: () => navigate('/app/specialists')
    },
  ];
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Greeting */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Hi {user?.name || 'there'}, How Can I help you Today?
          </h1>
        </div>
        
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className="flex flex-col items-center p-6 rounded-2xl bg-surface hover:bg-surface-elevated transition-all duration-200 hover:scale-105 group"
                data-testid={`quick-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-center">{action.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* Model Selector and Input */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <ModelSelector />
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-4 py-2 border border-border rounded-lg hover:bg-surface transition-colors text-sm font-medium"
              data-testid="compare-model-button"
            >
              Compare Model
            </button>
          </div>
          
          <button
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            data-testid="history-button"
          >
            History
          </button>
          
          {/* Chat Input */}
          <ChatInput />
        </div>
        
        {/* Upgrade Banner */}
        <div className="mt-8 text-center">
          <button className="text-primary hover:text-primary-light transition-colors text-sm font-medium">
            🚀 Upgrade to Pro
          </button>
        </div>
      </div>
      
      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        userTier={user?.subscription_tier || 'free'}
      />
    </div>
  );
}