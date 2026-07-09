import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import toast from 'react-hot-toast';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    const res = await register(username, email, password);
    setLoading(false);
    if (res.success) {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  const handleOAuth = (provider) => {
    toast.success(`Registering via ${provider}...`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 bg-dot-pattern">
        <div className="w-full max-w-md px-6">
          <div className="glass-card p-8 flex flex-col gap-6 w-full text-left">
            
            {/* Header info */}
            <div className="flex flex-col gap-2 items-center text-center">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-black text-text-primary mt-2">Get Started</h1>
              <p className="text-xs text-text-secondary">
                Create a developer account to save generated prompt files and templates.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200/50 rounded-xl text-danger text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Register form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Full Username"
                placeholder="DeveloperName"
                icon={User}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Email Address"
                placeholder="you@domain.com"
                icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Create Password"
                placeholder="••••••••"
                icon={Lock}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="gradient"
                className="w-full justify-center mt-2"
                isLoading={loading}
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 w-full">
              <div className="h-[1px] bg-border-color/50 flex-grow" />
              <span className="text-[10px] uppercase font-bold text-text-tertiary">or continue with</span>
              <div className="h-[1px] bg-border-color/50 flex-grow" />
            </div>

            {/* OAuth options */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full justify-center text-xs"
                onClick={() => handleOAuth('Google')}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center text-xs"
                onClick={() => handleOAuth('GitHub')}
              >
                GitHub
              </Button>
            </div>

            {/* Footer switcher */}
            <p className="text-xs text-center text-text-secondary mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 font-bold hover:underline">
                Sign in instead
              </Link>
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RegisterPage;
