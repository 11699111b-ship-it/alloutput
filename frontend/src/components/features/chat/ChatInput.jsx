import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import useChatStore from '../../../stores/chatStore';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading, currentConversation } = useChatStore();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput('');
    
    await sendMessage(message, currentConversation);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative bg-surface rounded-xl border border-border focus-within:border-primary transition-colors">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me something about this page"
          rows={1}
          className="w-full px-4 py-3 bg-transparent resize-none focus:outline-none text-text-primary placeholder:text-text-muted max-h-32"
          style={{ minHeight: '52px' }}
          disabled={isLoading}
          data-testid="chat-input"
        />
        
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            type="button"
            className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-text-primary"
            title="Attach file"
            data-testid="attach-button"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-text-primary"
            title="Voice input"
            data-testid="voice-button"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 bg-primary hover:bg-primary-hover rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
            data-testid="send-button"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      
      {isLoading && (
        <div className="mt-2 text-sm text-text-secondary">
          <span className="inline-block animate-pulse">Thinking...</span>
        </div>
      )}
    </form>
  );
}