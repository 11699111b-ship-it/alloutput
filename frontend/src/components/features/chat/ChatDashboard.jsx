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
    <div className="h-full flex flex-col items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Greeting */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Hi {user?.name || 'there'}, How Can I help you Today?
          </h1>
        </div>
        
        {/* Quick Actions - Horizontal Row of Small Circles */}
        <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div key={action.id} className="flex flex-col items-center gap-2">
                <button
                  onClick={action.onClick}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2d2d2f] hover:bg-[#3d3d3f] transition-all duration-200 flex items-center justify-center group"
                  data-testid={`quick-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                  title={action.description}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-white transition-colors" />
                </button>
                <span className="text-xs text-gray-400 text-center max-w-[80px] leading-tight">
                  {action.label}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Model Selector and Controls */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <ModelSelector />
          <button
            onClick={() => setShowComparisonModal(true)}
            className="px-4 py-2 bg-[#2d2d2f] hover:bg-[#3d3d3f] rounded-lg transition-colors text-sm font-medium border border-[#404040]"
            data-testid="compare-model-button"
          >
            Compare Model
          </button>
          <button
            className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
            data-testid="history-button"
          >
            History
          </button>
        </div>
        
        {/* Chat Input - Large and Prominent */}
        <div className="mt-8">
          <ChatInput />
        </div>
        
        {/* Upgrade Banner */}
        <div className="text-center pt-4">
          <button className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium inline-flex items-center gap-2">
            <span>🚀</span>
            <span>Upgrade to Pro</span>
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