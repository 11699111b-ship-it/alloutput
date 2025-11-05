import React from 'react';
import { Briefcase, Heart, FileText, Share2, BarChart3 } from 'lucide-react';

const specialistConfig = {
  nova: {
    name: 'Nova',
    role: 'Product Manager',
    icon: Briefcase,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  harper: {
    name: 'Harper',
    role: 'Personal Brand Counselor',
    icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10'
  },
  remy: {
    name: 'Remy',
    role: 'Content Writer',
    icon: FileText,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  lennon: {
    name: 'Lennon',
    role: 'Social Media Manager',
    icon: Share2,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  emmerson: {
    name: 'Emmerson',
    role: 'Data Analyst',
    icon: BarChart3,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  }
};

export default function SpecialistBadge({ specialistId }) {
  const specialist = specialistConfig[specialistId];
  
  if (!specialist) return null;
  
  const Icon = specialist.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${specialist.bgColor} border border-gray-700`}>
      <Icon className={`w-4 h-4 ${specialist.color}`} />
      <span className="text-sm font-medium text-white">{specialist.name}</span>
      <span className="text-xs text-gray-400">• {specialist.role}</span>
    </div>
  );
}
