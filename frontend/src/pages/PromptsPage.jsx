import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart3, FileText, Target, Mail, Lightbulb, Code, Database } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All Prompts', icon: null },
  { id: 'marketing', label: 'Marketing', icon: Target },
  { id: 'business', label: 'Business', icon: BarChart3 },
  { id: 'career', label: 'Career', icon: FileText },
  { id: 'content', label: 'Content Writing', icon: FileText },
  { id: 'creative', label: 'Creative', icon: Lightbulb },
  { id: 'tech', label: 'Tech', icon: Code },
  { id: 'data', label: 'Data', icon: Database },
];

const prompts = [
  {
    id: 1,
    title: 'Writing Video Descriptions',
    description: 'Crafts compelling content tailored to target audience preferences.',
    category: 'marketing',
    icon: '📊',
    gradient: 'from-purple-600 to-purple-800'
  },
  {
    id: 2,
    title: 'Writing Email Newsletters',
    description: 'Provides targeted marketing solutions to meet specific business goals.',
    category: 'marketing',
    icon: '📊',
    gradient: 'from-orange-600 to-red-700'
  },
  {
    id: 3,
    title: 'Website Wizard',
    description: 'Create one page website based on user specifications.',
    category: 'tech',
    icon: '🎨',
    gradient: 'from-blue-600 to-blue-800'
  },
  {
    id: 4,
    title: 'Test website for cross-browser compatibility',
    description: 'Provides strategies for creating and enhancing mobile and web applications.',
    category: 'tech',
    icon: '💻',
    gradient: 'from-teal-600 to-cyan-700'
  },
  {
    id: 5,
    title: 'SMS Marketing',
    description: 'Focuses on customer acquisition and retention through strategic marketing.',
    category: 'marketing',
    icon: '📱',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 6,
    title: 'SEO Strategy Guide',
    description: 'This prompt helps you enhance your website\'s search engine ranking.',
    category: 'content',
    icon: '🎯',
    gradient: 'from-amber-700 to-orange-800'
  },
  {
    id: 7,
    title: 'Responding To Customer Emails',
    description: 'Develops high-converting ad campaigns across various platforms.',
    category: 'business',
    icon: '📧',
    gradient: 'from-blue-700 to-indigo-800'
  },
  {
    id: 8,
    title: 'Precision CV Tailoring for Job Applications',
    description: 'This title emphasizes the focus on fine-tuning the CV specifically.',
    category: 'career',
    icon: '💼',
    gradient: 'from-cyan-600 to-teal-700'
  },
  {
    id: 9,
    title: 'Optimize website speed',
    description: 'Guides the development and optimization of responsive websites.',
    category: 'tech',
    icon: '⚡',
    gradient: 'from-purple-700 to-indigo-800'
  },
  {
    id: 10,
    title: 'Novel Idea Generator',
    description: 'This prompt helps you overcome writer\'s block by generating detailed.',
    category: 'creative',
    icon: '📚',
    gradient: 'from-orange-700 to-red-800'
  },
  {
    id: 11,
    title: 'Newsletter Content Creator',
    description: 'This prompt is designed to help you create a professional weekly newsletter.',
    category: 'content',
    icon: '📰',
    gradient: 'from-blue-600 to-cyan-700'
  },
  {
    id: 12,
    title: 'LinkedIn Content Expert',
    description: 'This prompt guides you in creating a professional and educational post.',
    category: 'content',
    gradient: 'from-teal-600 to-cyan-700',
    icon: '💼'
  },
];

export default function PromptsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter prompts
  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPrompts = filteredPrompts.slice(startIndex, startIndex + itemsPerPage);

  const handlePromptClick = (prompt) => {
    // Navigate to chat with the prompt pre-filled
    navigate(`/app/chat?prompt=${prompt.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/app/chat')}
            className="text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </Button>
          <h1 className="text-2xl font-semibold text-white">Prompts</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Category Filters + Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#4f46e5]/20 border border-[#4f46e5]/50 text-white'
                    : 'bg-[#2d2d2f] border border-[#404040] text-gray-400 hover:bg-[#3d3d3f] hover:text-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 bg-[#2d2d2f] border border-[#404040] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4f46e5] transition-colors"
            />
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {displayedPrompts.map((prompt, index) => (
            <motion.button
              key={prompt.id}
              onClick={() => handlePromptClick(prompt)}
              className={`text-left p-6 rounded-xl bg-gradient-to-br ${prompt.gradient} hover:scale-[1.02] transition-all group relative overflow-hidden shadow-lg min-h-[200px]`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }}
            >
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl">
                    {prompt.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white capitalize">
                    {prompt.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {prompt.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                  {prompt.description}
                </p>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-[#2d2d2f] border border-[#404040] text-gray-400 hover:text-white hover:bg-[#3d3d3f] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              // Show first, last, current, and adjacent pages
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#4f46e5] text-white'
                        : 'bg-[#2d2d2f] border border-[#404040] text-gray-400 hover:text-white hover:bg-[#3d3d3f]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return <span key={pageNum} className="text-gray-600">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-[#2d2d2f] border border-[#404040] text-gray-400 hover:text-white hover:bg-[#3d3d3f] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
