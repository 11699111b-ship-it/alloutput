import { create } from 'zustand';
import api from '../utils/api';

const useChatStore = create((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  selectedModel: 'gpt-4o-mini',
  isLoading: false,
  isStreaming: false,
  error: null,
  
  // Available models
  models: {
    basic: [
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', tier: 'free' },
      { id: 'gemini-flash', name: 'Gemini Flash', provider: 'Google', tier: 'free' },
    ],
    advanced: [
      { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', tier: 'pro' },
      { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', tier: 'pro' },
      { id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', tier: 'pro' },
    ],
  },
  
  // Set selected model
  setSelectedModel: (modelId) => {
    set({ selectedModel: modelId });
  },
  
  // Send message
  sendMessage: async (message, conversationId = null) => {
    set({ isLoading: true, error: null });
    
    try {
      const { selectedModel, messages } = get();
      
      // Add user message to UI immediately
      const userMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      
      set({ messages: [...get().messages, userMessage] });
      
      // Send to backend
      const response = await api.post('/api/chat', {
        conversation_id: conversationId,
        model: selectedModel,
        message: message,
        stream: false,
      });
      
      const data = response.data.data;
      
      // Add AI response
      const aiMessage = {
        id: data.message_id,
        role: 'assistant',
        content: data.response,
        model: data.model,
        timestamp: new Date().toISOString(),
        tokens_used: data.tokens_used,
      };
      
      set({ 
        messages: [...get().messages, aiMessage],
        currentConversation: data.conversation_id,
        isLoading: false,
      });
      
      // Reload conversations
      get().loadConversations();
      
    } catch (error) {
      console.error('Send message error:', error);
      set({ 
        error: error.response?.data?.error?.message || 'Failed to send message',
        isLoading: false,
      });
    }
  },
  
  // Load conversations
  loadConversations: async () => {
    try {
      const response = await api.get('/api/conversations');
      const data = response.data.data;
      set({ conversations: data.conversations });
    } catch (error) {
      console.error('Load conversations error:', error);
    }
  },
  
  // Load specific conversation
  loadConversation: async (conversationId) => {
    set({ isLoading: true });
    
    try {
      const response = await api.get(`/api/conversations/${conversationId}`);
      const data = response.data.data;
      
      set({ 
        currentConversation: conversationId,
        messages: data.messages,
        isLoading: false,
      });
    } catch (error) {
      console.error('Load conversation error:', error);
      set({ isLoading: false });
    }
  },
  
  // Start new conversation
  newConversation: () => {
    set({ 
      currentConversation: null,
      messages: [],
      error: null,
    });
  },
  
  // Delete conversation
  deleteConversation: async (conversationId) => {
    try {
      await api.delete(`/api/conversations/${conversationId}`);
      
      // Remove from list
      set({ 
        conversations: get().conversations.filter(c => c.id !== conversationId),
      });
      
      // If current conversation, clear it
      if (get().currentConversation === conversationId) {
        get().newConversation();
      }
    } catch (error) {
      console.error('Delete conversation error:', error);
    }
  },
  
  // Compare models
  compareModels: async (message, models) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.post('/api/chat/compare', {
        message,
        models,
      });
      
      const data = response.data.data;
      return data.comparisons;
      
    } catch (error) {
      console.error('Compare models error:', error);
      set({ 
        error: error.response?.data?.error?.message || 'Failed to compare models',
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useChatStore;