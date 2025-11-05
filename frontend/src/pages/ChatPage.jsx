import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useChatStore from '../stores/chatStore';
import useAuthStore from '../stores/authStore';
import ChatDashboard from '../components/features/chat/ChatDashboard';
import ChatInterface from '../components/features/chat/ChatInterface';

export default function ChatPage() {
  const { messages, currentConversation } = useChatStore();
  const { user } = useAuthStore();
  
  // Show dashboard when no messages, otherwise show chat
  const showDashboard = messages.length === 0 && !currentConversation;
  
  return (
    <div className="h-screen flex flex-col bg-background">
      {showDashboard ? (
        <ChatDashboard />
      ) : (
        <ChatInterface />
      )}
    </div>
  );
}