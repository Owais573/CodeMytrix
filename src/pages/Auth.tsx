
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import GlassmorphicCard from '@/components/common/GlassmorphicCard';
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft, Moon, Sun, Zap } from 'lucide-react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the URL has a signup parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('signup') === 'true') {
      setIsSignUp(true);
    }
  }, [location]);

  // Detect system theme preference and check localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set initial state based on localStorage or system preference
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    setIsDarkMode(shouldBeDark);
    
    // Apply the theme to the document
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
    setIsDarkMode(newTheme);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account.",
        });
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-background/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 animate-fade-in hover:scale-105 transition-transform">
            <div className="bg-primary rounded-lg p-1.5">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-medium tracking-tight">
              <span className="text-primary font-semibold animate-pulse-subtle">Code</span>
              <span className="font-light">Mytrix</span>
            </span>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="animate-fade-in"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/80 pt-24 pb-20">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/45de36ff-90bf-4258-ac11-650cbdac148c.png')] bg-cover bg-center opacity-5 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 z-0"></div>
        
        <GlassmorphicCard className="w-full max-w-md p-8 border border-white/20 backdrop-blur-xl bg-background/20 dark:bg-card/40 shadow-xl z-10 animate-slide-in">
          <div className="mb-6 text-center">
            <div className="h-16 w-16 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
              {isSignUp ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm animate-fade-in">
              {isSignUp ? 'Sign up to start generating code' : 'Sign in to continue your work'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative animate-fade-in">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-background/30 dark:bg-background/10 border-white/20 dark:border-white/10 focus:border-primary/50 transition-all hover:border-primary/30"
                required
              />
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: "50ms" }}>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-background/30 dark:bg-background/10 border-white/20 dark:border-white/10 focus:border-primary/50 transition-all hover:border-primary/30"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity h-12 animate-fade-in hover:scale-[1.02] active:scale-[0.98] transition-transform" 
              style={{ animationDelay: "100ms" }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <div className="relative my-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card/70 px-3 py-1 text-muted-foreground backdrop-blur-sm rounded-full">
                  Or
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="inline-flex items-center text-primary hover:text-accent transition-colors text-sm gap-1 animate-fade-in hover:scale-105 transition-transform"
              style={{ animationDelay: "200ms" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
          
          <Link
            to="/"
            className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto block animate-fade-in hover:underline"
            style={{ animationDelay: "250ms" }}
          >
            Return to home page
          </Link>
        </GlassmorphicCard>
      </div>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <Link 
            to="/" 
            className="mb-4 md:mb-0 flex items-center gap-2 cursor-pointer animate-fade-in hover:scale-105 transition-transform" 
          >
            <div className="bg-primary rounded-lg p-1.5">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-medium tracking-tight">
              <span className="text-primary font-semibold">Code</span>
              <span className="font-light">Mytrix</span>
            </span>
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/contact" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <div className="text-sm text-muted-foreground animate-fade-in">
              &copy; {new Date().getFullYear()} CodeMytrix. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
