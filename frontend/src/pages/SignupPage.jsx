import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../stores/authStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email should look like name@example.com';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Use at least 8 characters (the longer, the better)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await signup(email, password, name);
    
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/app/chat');
    } else {
      toast.error(result.error || 'Signup failed. Please try again.');
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
            Create your account
          </h1>
          <p className="text-[#9ca3af]">
            Start using AllOutputs today
          </p>
        </div>
        
        <Card className="p-8 bg-[#1a1a1b] border-[#2d2d2f]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#e5e7eb]">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`bg-[#0f0f10] border-[#2d2d2f] text-[#e5e7eb] ${errors.name ? 'border-[#ef4444]' : ''}`}
              />
              {errors.name && (
                <p className="text-[#ef4444] text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
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
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[#9ca3af]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#4f46e5] hover:text-[#818cf8] font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
