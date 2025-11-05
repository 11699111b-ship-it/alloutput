import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import useChatStore from '../../../stores/chatStore';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ModelSelector from './ModelSelector';

export default function ChatInterface() {
  const { messages, newConversation } = useChatStore();
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="h-full flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            className="p-2 hover:bg-surface rounded-lg transition-colors"
            onClick={newConversation}
            data-testid="new-chat-button"
          >
            <Plus className="w-5 h-5" />
          </button>
          <span className="font-medium">New Chat</span>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center text-text-secondary py-12">
              <p>Start a conversation by typing a message below</p>
            </div>
          ) : (
            <MessageList messages={messages} />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="border-t border-border px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-3">
            <ModelSelector />
            <button
              className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-surface transition-colors"
              data-testid="compare-model-button"
            >
              Compare Model
            </button>
          </div>
          <ChatInput />
        </div>
      </div>
    </div>
  );
}