import { create } from 'zustand';
import api from '../utils/api';

const useChatStore = create((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  selectedModel: 'gpt-4o-mini',
  selectedModels: ['gpt-4o-mini'], // NEW: Array of selected models
  multiModelMode: false, // NEW: True when 2+ models selected
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
  
  // Set selected model (legacy - for backwards compatibility)
  setSelectedModel: (modelId) => {
    set({ 
      selectedModel: modelId,
      selectedModels: [modelId],
      multiModelMode: false,
    });
  },
  
  // NEW: Add model to selection (max 3)
  addModel: (modelId) => {
    const { selectedModels } = get();
    
    // Check if already selected
    if (selectedModels.includes(modelId)) {
      return;
    }
    
    // Check max limit (3 models)
    if (selectedModels.length >= 3) {
      return;
    }
    
    const newModels = [...selectedModels, modelId];
    set({ 
      selectedModels: newModels,
      selectedModel: newModels[0], // Keep first as primary
      multiModelMode: newModels.length >= 2,
    });
  },
  
  // NEW: Remove model from selection (ensure at least 1 remains)
  removeModel: (modelId) => {
    const { selectedModels } = get();
    
    // Can't remove if only 1 model
    if (selectedModels.length <= 1) {
      return;
    }
    
    const newModels = selectedModels.filter(id => id !== modelId);
    set({ 
      selectedModels: newModels,
      selectedModel: newModels[0], // Update primary to first remaining
      multiModelMode: newModels.length >= 2,
    });
  },
  
  // NEW: Set multiple models at once
  setModels: (modelIds) => {
    // Validate: at least 1, max 3
    if (modelIds.length === 0 || modelIds.length > 3) {
      return;
    }
    
    set({ 
      selectedModels: modelIds,
      selectedModel: modelIds[0], // First as primary
      multiModelMode: modelIds.length >= 2,
    });
  },
  
  // Send message (supports both single and multi-model mode)
  sendMessage: async (message, conversationId = null) => {
    set({ isLoading: true, error: null });
    
    try {
      const { selectedModel, selectedModels, multiModelMode, messages } = get();
      
      // Add user message to UI immediately
      const userMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      
      set({ messages: [...get().messages, userMessage] });
      
      if (multiModelMode) {
        // Multi-model mode: send to multiple models
        const response = await api.post('/api/chat', {
          conversation_id: conversationId,
          models: selectedModels,
          message: message,
          stream: false,
          multi_model: true,
        });
        
        const data = response.data.data;
        
        // Add multi-model AI response
        const aiMessage = {
          id: data.message_id,
          role: 'assistant',
          multi_model: true,
          responses: data.responses, // Array of responses from each model
          timestamp: new Date().toISOString(),
        };
        
        set({ 
          messages: [...get().messages, aiMessage],
          currentConversation: data.conversation_id,
          isLoading: false,
        });
        
      } else {
        // Single model mode: existing logic
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
      }
      
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