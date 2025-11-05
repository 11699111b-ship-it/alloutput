import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../stores/authStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email should look like name@example.com';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/app/dashboard');
    } else {
      toast.error(result.error || 'Login failed. Please check your credentials.');
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#e5e7eb] mb-2">
            Welcome back
          </h1>
          <p className="text-[#9ca3af]">
            Sign in to your AllOutputs account
          </p>
        </div>
        
        <Card className="p-8 bg-[#1a1a1b] border-[#2d2d2f]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#e5e7eb]">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`bg-[#0f0f10] border-[#2d2d2f] text-[#e5e7eb] ${errors.email ? 'border-[#ef4444]' : ''}`}
              />
              {errors.email && (
                <p className="text-[#ef4444] text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-[#e5e7eb]">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`bg-[#0f0f10] border-[#2d2d2f] text-[#e5e7eb] ${errors.password ? 'border-[#ef4444]' : ''}`}
              />
              {errors.password && (
                <p className="text-[#ef4444] text-sm mt-1">{errors.password}</p>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[#9ca3af]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#4f46e5] hover:text-[#818cf8] font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
