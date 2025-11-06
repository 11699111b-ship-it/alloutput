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
      <div className="relative bg-[#2d2d2f] rounded-xl border border-[#404040] focus-within:border-[#4f46e5] transition-all shadow-lg">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me something about this page"
          rows={3}
          className="w-full px-5 py-4 bg-transparent resize-none focus:outline-none text-gray-200 placeholder:text-gray-500 max-h-48 text-base"
          style={{ minHeight: '120px' }}
          disabled={isLoading}
          data-testid="chat-input"
        />
        
        <div className="absolute right-4 bottom-4 flex items-center gap-2">
          <button
            type="button"
            className="p-2.5 hover:bg-[#3d3d3f] rounded-lg transition-colors text-gray-400 hover:text-gray-300"
            title="Attach file"
            data-testid="attach-button"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            className="p-2.5 hover:bg-[#3d3d3f] rounded-lg transition-colors text-gray-400 hover:text-gray-300"
            title="Voice input"
            data-testid="voice-button"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-[#4f46e5] hover:bg-[#4338ca] rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            title="Send message"
            data-testid="send-button"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      
      {isLoading && (
        <div className="mt-3 text-sm text-gray-400 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#4f46e5] rounded-full animate-pulse"></div>
          <span>Thinking...</span>
        </div>
      )}
    </form>
  );
}