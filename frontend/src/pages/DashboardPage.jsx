import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { LogOut, User } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, loadUser, isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      loadUser();
    }
  }, [isAuthenticated, navigate, loadUser]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center">
        <p className="text-[#9ca3af]">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0f0f10] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#e5e7eb]">
            Welcome to AllOutputs
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#2d2d2f] text-[#e5e7eb] hover:bg-[#1a1a1b]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <Card className="p-8 bg-[#1a1a1b] border-[#2d2d2f]">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-[#4f46e5] flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#e5e7eb]">{user.name}</h2>
              <p className="text-[#9ca3af]">{user.email}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[#2d2d2f]">
              <span className="text-[#9ca3af]">Subscription Tier:</span>
              <span className="text-[#e5e7eb] font-medium capitalize">{user.subscription_tier}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-[#2d2d2f]">
              <span className="text-[#9ca3af]">Account ID:</span>
              <span className="text-[#e5e7eb] font-mono text-sm">{user.id}</span>
            </div>
            
            {user.usage_stats && (
              <div className="flex justify-between items-center py-3">
                <span className="text-[#9ca3af]">Total Queries:</span>
                <span className="text-[#e5e7eb] font-medium">{user.usage_stats.total_queries || 0}</span>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#e5e7eb] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-[#0f0f10] border-[#2d2d2f] hover:border-[#4f46e5] transition-colors cursor-pointer">
                <h4 className="text-[#e5e7eb] font-medium mb-2">Start Chat</h4>
                <p className="text-[#9ca3af] text-sm">Begin a conversation with AI</p>
              </Card>
              
              <Card className="p-4 bg-[#0f0f10] border-[#2d2d2f] hover:border-[#4f46e5] transition-colors cursor-pointer">
                <h4 className="text-[#e5e7eb] font-medium mb-2">AI Specialists</h4>
                <p className="text-[#9ca3af] text-sm">Get specialized help</p>
              </Card>
              
              <Card className="p-4 bg-[#0f0f10] border-[#2d2d2f] hover:border-[#4f46e5] transition-colors cursor-pointer">
                <h4 className="text-[#e5e7eb] font-medium mb-2">Prompts Library</h4>
                <p className="text-[#9ca3af] text-sm">Browse prompt templates</p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
