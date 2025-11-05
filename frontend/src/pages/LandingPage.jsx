import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Sparkles, Zap, Brain } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0f0f10]">
      {/* Header */}
      <header className="border-b border-[#2d2d2f] bg-[#0f0f10]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-[#4f46e5]" />
              <span className="ml-2 text-xl font-bold text-[#e5e7eb]">AllOutputs</span>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-[#9ca3af] hover:text-[#e5e7eb] hover:bg-[#1a1a1b]"
              >
                Sign in
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="bg-[#4f46e5] hover:bg-[#4338ca] text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1a1a1b] rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-[#4f46e5]" />
              <span className="text-sm text-[#9ca3af]">Every AI Model. One Platform.</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e5e7eb] mb-6">
              Every AI Model.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#818cf8]">
                One Platform.
              </span>
              <br />
              Infinite Outputs.
            </h1>
            
            <p className="text-xl text-[#9ca3af] mb-10 max-w-3xl mx-auto">
              The only platform where Claude, GPT, Gemini compete for your answer.
              Access multiple premium AI models for just $19/month.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-lg px-8 py-6"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#2d2d2f] text-[#e5e7eb] hover:bg-[#1a1a1b] text-lg px-8 py-6"
              >
                See Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#1a1a1b]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e5e7eb] mb-4">
              Why choose AllOutputs?
            </h2>
            <p className="text-lg text-[#9ca3af]">
              Everything you need in one powerful platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 bg-[#0f0f10] border border-[#2d2d2f] rounded-lg"
            >
              <Zap className="h-10 w-10 text-[#4f46e5] mb-4" />
              <h3 className="text-xl font-semibold text-[#e5e7eb] mb-2">
                Compare AI Models
              </h3>
              <p className="text-[#9ca3af]">
                Get responses from multiple AI models side-by-side and choose the best answer.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-[#0f0f10] border border-[#2d2d2f] rounded-lg"
            >
              <Brain className="h-10 w-10 text-[#4f46e5] mb-4" />
              <h3 className="text-xl font-semibold text-[#e5e7eb] mb-2">
                AI Specialists
              </h3>
              <p className="text-[#9ca3af]">
                Work with specialized AI agents for product management, content writing, and more.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 bg-[#0f0f10] border border-[#2d2d2f] rounded-lg"
            >
              <Sparkles className="h-10 w-10 text-[#4f46e5] mb-4" />
              <h3 className="text-xl font-semibold text-[#e5e7eb] mb-2">
                Save $80/Month
              </h3>
              <p className="text-[#9ca3af]">
                Pay $19/month instead of $100/month for separate ChatGPT, Claude, and Gemini subscriptions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e5e7eb] mb-6">
            Ready to supercharge your productivity?
          </h2>
          <p className="text-lg text-[#9ca3af] mb-8">
            Join thousands of professionals using AllOutputs
          </p>
          <Button
            onClick={() => navigate('/signup')}
            size="lg"
            className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-lg px-8 py-6"
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2d2d2f] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#9ca3af] text-sm">
            © 2025 AllOutputs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
