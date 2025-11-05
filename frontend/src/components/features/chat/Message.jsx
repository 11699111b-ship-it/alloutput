import React, { useState } from 'react';
import { Copy, Check, RotateCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Message({ message }) {
  const [copied, setCopied] = useState(false);
  
  const isUser = message.role === 'user';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div 
      className={`flex gap-4 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
      data-testid={`message-${message.role}`}
    >
      <div className={`max-w-[80%] ${
        isUser 
          ? 'bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-3'
          : 'bg-surface rounded-2xl rounded-tl-sm px-4 py-3'
      }`}>
        {/* AI Model Badge */}
        {!isUser && message.model && (
          <div className="flex items-center gap-2 mb-2 text-xs text-text-secondary">
            <span className="font-medium">{message.model}</span>
            {message.tokens_used && (
              <span>• {message.tokens_used} tokens</span>
            )}
          </div>
        )}
        
        {/* Message Content */}
        <div className={`prose prose-sm ${
          isUser ? 'prose-invert' : 'prose-invert'
        } max-w-none`}>
          {isUser ? (
            <p className="mb-0">{message.content}</p>
          ) : (
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        
        {/* Action Buttons (for AI messages) */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-background rounded transition-colors text-text-secondary hover:text-text-primary"
              data-testid="copy-message-button"
              title="Copy"
            >
              {copied ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              className="p-1.5 hover:bg-background rounded transition-colors text-text-secondary hover:text-text-primary"
              data-testid="regenerate-button"
              title="Regenerate"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Timestamp */}
        <div className="text-xs text-text-muted mt-2">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}