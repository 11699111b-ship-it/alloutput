import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MultiResponseMessage({ message }) {
  const { responses, timestamp } = message;
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedWinner, setSelectedWinner] = useState(null);
  
  const handleCopy = (content, index) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  const handleVote = (modelName) => {
    setSelectedWinner(modelName);
    // TODO: Send vote to backend for analytics
  };
  
  // Determine grid columns based on number of responses
  const gridCols = responses.length === 2 
    ? 'md:grid-cols-2' 
    : responses.length === 3 
    ? 'lg:grid-cols-3 md:grid-cols-2' 
    : 'grid-cols-1';
  
  return (
    <div className="space-y-4" data-testid="multi-response-message">
      {/* Responses Grid */}
      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {responses.map((response, index) => (
          <div
            key={index}
            className="flex flex-col bg-[#1a1a1b] border border-[#2d2d2f] rounded-lg overflow-hidden"
            data-testid={`response-${index}`}
          >
            {/* Header with model name and metadata */}
            <div className="px-4 py-3 bg-[#2d2d2f] border-b border-[#404040]">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm text-gray-200">
                  {response.model}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{response.response_time?.toFixed(1)}s</span>
                  <span>•</span>
                  <span>{response.tokens_used} tokens</span>
                </div>
              </div>
            </div>
            
            {/* Response Content */}
            <div className="flex-1 p-4 overflow-auto">
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-md text-xs"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-[#2d2d2f] px-1.5 py-0.5 rounded text-xs" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {response.response}
                </ReactMarkdown>
              </div>
            </div>
            
            {/* Actions */}
            <div className="px-4 py-3 border-t border-[#2d2d2f] flex items-center gap-2">
              <button
                onClick={() => handleCopy(response.response, index)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#2d2d2f] rounded transition-colors"
                data-testid={`copy-button-${index}`}
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              
              <button
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#2d2d2f] rounded transition-colors"
                data-testid={`regenerate-button-${index}`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Voting Section */}
      <div className="p-4 bg-[#1a1a1b] border border-[#2d2d2f] rounded-lg">
        <div className="text-sm font-medium text-gray-200 mb-3">
          Which response was most helpful?
        </div>
        <div className="flex flex-wrap gap-2">
          {responses.map((response, index) => (
            <button
              key={index}
              onClick={() => handleVote(response.model)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedWinner === response.model
                  ? 'bg-primary text-white'
                  : 'bg-[#2d2d2f] text-gray-300 hover:bg-[#3d3d3f] border border-[#404040]'
              }`}
              data-testid={`vote-button-${index}`}
            >
              {response.model}
            </button>
          ))}
        </div>
        {selectedWinner && (
          <div className="mt-3 text-xs text-green-500">
            Thanks for your feedback! This helps us improve.
          </div>
        )}
      </div>
      
      {/* Timestamp */}
      <div className="text-xs text-gray-500 text-right">
        {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}
