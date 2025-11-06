import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Briefcase, Heart, FileText, Share2, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const specialists = [
  {
    id: 'nova',
    name: 'Nova',
    role: 'Product Manager',
    description: 'He can help you with writing PRDs and New Product Features',
    icon: Briefcase,
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    capabilities: [
      'Writing comprehensive PRDs',
      'Defining new product features',
      'Creating user stories',
      'Planning product roadmaps'
    ]
  },
  {
    id: 'harper',
    name: 'Harper',
    role: 'Personal Brand Counselor',
    description: 'He can help you write Cover Letters, Resumes & LinkedIn Bios',
    icon: Heart,
    color: 'from-pink-500 to-purple-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
    capabilities: [
      'Resume optimization',
      'Cover letter crafting',
      'LinkedIn profile enhancement',
      'Personal brand strategy'
    ]
  },
  {
    id: 'remy',
    name: 'Remy',
    role: 'Content Writer',
    description: 'He can help you with writing Emails, Blog Posts & Newsletters',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    capabilities: [
      'Email composition',
      'Blog post writing',
      'Newsletter creation',
      'Long-form content'
    ]
  },
  {
    id: 'lennon',
    name: 'Lennon',
    role: 'Social Media Manager',
    description: 'He can help you with Instagram posts & Social Strategies',
    icon: Share2,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    capabilities: [
      'Instagram post creation',
      'Social media strategy',
      'Content calendar planning',
      'Engagement optimization'
    ]
  },
  {
    id: 'emmerson',
    name: 'Emmerson',
    role: 'Data Analyst',
    description: 'He can help you with Data Analysis, Insights & Reports',
    icon: BarChart3,
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    capabilities: [
      'Data analysis',
      'Insight generation',
      'Report creation',
      'Trend identification'
    ]
  }
];

export default function SpecialistsPage() {
  const navigate = useNavigate();

  const handleSpecialistClick = (specialistId) => {
    navigate(`/app/chat?specialist=${specialistId}`);
  };

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-4xl font-bold mb-2">AI Specialists</h1>
          <p className="text-gray-400 text-lg">
            Delegate tasks to specialized AI experts tailored for your needs
          </p>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialists.map((specialist, index) => {
            const Icon = specialist.icon;
            return (
              <motion.button
                key={specialist.id}
                onClick={() => handleSpecialistClick(specialist.id)}
                className="text-left p-8 rounded-2xl hover:scale-[1.02] transition-all group relative overflow-hidden shadow-lg border border-white/5"
                style={{
                  background: `linear-gradient(135deg, ${
                    specialist.id === 'nova' ? '#f97316, #ea580c' :
                    specialist.id === 'harper' ? '#ec4899, #d946ef, #a855f7' :
                    specialist.id === 'remy' ? '#3b82f6, #2563eb, #06b6d4' :
                    specialist.id === 'lennon' ? '#8b5cf6, #7c3aed, #6d28d9' :
                    '#0ea5e9, #0284c7, #0369a1'
                  })`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.4)' }}
              >
                {/* Content */}
                <div className="relative z-10">
                  {/* Name and Role */}
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{specialist.name}</h3>
                    <p className="text-white/90 font-medium text-lg">{specialist.role}</p>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {specialist.description}
                  </p>

                  {/* Capabilities */}
                  <div className="space-y-2.5">
                    {specialist.capabilities.slice(0, 3).map((capability, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <span>{capability}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm text-white font-medium flex items-center gap-2">
                      Start chatting
                      <ChevronLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
