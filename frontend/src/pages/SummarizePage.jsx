import React, { useState } from 'react';
import { ChevronLeft, Link, FileText, Type } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import api from '../utils/api';
import { toast } from 'sonner';

export default function SummarizePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inputType, setInputType] = useState(searchParams.get('type') || 'url');
  const [inputValue, setInputValue] = useState('');
  const [length, setLength] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSummarize = async () => {
    if (!inputValue.trim()) {
      toast.error('Please enter content to summarize');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await api.post('/api/tools/summarize', {
        type: inputType,
        content: inputValue,
        length: length
      });

      setResult(response.data.data.summary);
      toast.success('Summary generated successfully!');
    } catch (err) {
      console.error('Summarization error:', err);
      toast.error(err.response?.data?.detail || 'Failed to generate summary');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Key Points:\n${result.key_points.join('\n')}\n\nSummary:\n${result.detailed_summary}\n\nTakeaways:\n${result.takeaways.join('\n')}`;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => navigate('/app/chat')}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Chat
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Summarize Content</h1>
          <p className="text-gray-400 text-lg">
            Get concise summaries of articles, videos, documents, and more
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <Tabs value={inputType} onValueChange={setInputType}>
            <TabsList className="mb-4">
              <TabsTrigger value="url">
                <Link className="w-4 h-4 mr-2" />
                URL
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="w-4 h-4 mr-2" />
                Text
              </TabsTrigger>
              <TabsTrigger value="file">
                <FileText className="w-4 h-4 mr-2" />
                File
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url">
              <input
                type="url"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <p className="text-sm text-gray-400 mt-2">
                Enter a URL to an article, blog post, or webpage
              </p>
            </TabsContent>

            <TabsContent value="text">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Paste your text here..."
                rows={8}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <p className="text-sm text-gray-400 mt-2">
                Paste any text content you want to summarize
              </p>
            </TabsContent>

            <TabsContent value="file">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-gray-800/50">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="mb-2 text-gray-300">File upload coming soon!</p>
                <p className="text-sm text-gray-400">
                  Supports PDF, DOCX, TXT (max 10MB)
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Length Options */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Summary Length
            </label>
            <div className="flex gap-3">
              {['short', 'medium', 'long'].map((option) => (
                <button
                  key={option}
                  onClick={() => setLength(option)}
                  className={`flex-1 p-3 rounded-lg border transition ${
                    length === option
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-gray-700 hover:border-blue-500/50 text-gray-300'
                  }`}
                >
                  <p className="font-medium capitalize">{option}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {option === 'short' && '~100 words'}
                    {option === 'medium' && '~250 words'}
                    {option === 'long' && '~500 words'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Summarize Button */}
          <Button
            onClick={handleSummarize}
            disabled={!inputValue.trim() || isLoading || inputType === 'file'}
            className="w-full mt-6"
            size="lg"
          >
            {isLoading ? 'Summarizing...' : 'Summarize'}
          </Button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Summary</h2>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                Copy
              </Button>
            </div>

            {/* Key Points */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Key Points</h3>
              <ul className="space-y-2">
                {result.key_points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="flex-1 text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Detailed Summary</h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {result.detailed_summary}
              </div>
            </div>

            {/* Takeaways */}
            {result.takeaways && result.takeaways.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Key Takeaways</h3>
                <ul className="space-y-2">
                  {result.takeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500">✓</span>
                      <span className="flex-1 text-gray-300">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
