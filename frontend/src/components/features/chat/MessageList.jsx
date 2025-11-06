import React from 'react';
import Message from './Message';
import MultiResponseMessage from './MultiResponseMessage';

export default function MessageList({ messages }) {
  return (
    <div className="space-y-6" data-testid="message-list">
      {messages.map((message) => {
        // Check if this is a multi-model response
        if (message.role === 'assistant' && message.multi_model && message.responses) {
          return <MultiResponseMessage key={message.id} message={message} />;
        }
        
        // Standard single-model message
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
}