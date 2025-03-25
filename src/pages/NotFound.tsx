
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Search, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/lovable-uploads/45de36ff-90bf-4258-ac11-650cbdac148c.png')] bg-cover bg-center opacity-[0.03] z-0"></div>
      
      {/* Animated code-like elements */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="text-6xl md:text-9xl font-bold text-primary/5 animate-pulse-subtle">
          {'</>'}
        </div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-md w-full mx-auto p-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link to="/" className="mb-6 flex items-center gap-2 animate-fade-in hover:scale-105 transition-transform">
            <div className="bg-primary rounded-lg p-1.5">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-medium tracking-tight">
              <span className="text-primary font-semibold">Code</span>
              <span className="font-light">Mytrix</span>
            </span>
          </Link>
          
          {/* Error indicator */}
          <div className="mb-4 p-3 rounded-full bg-destructive/10 animate-fade-in">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          
          {/* Error code and message */}
          <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">404</h1>
          <p className="text-xl text-foreground/80 mb-2">Page Not Found</p>
          <p className="text-sm text-muted-foreground mb-8">
            The requested URL <span className="font-mono bg-background/80 text-primary px-2 py-0.5 rounded">{location.pathname}</span> could not be found
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              variant="default" 
              size="lg" 
              className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90" 
              asChild
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full flex items-center gap-2" 
              asChild
            >
              <Link to="/contact">
                <Search className="h-4 w-4" />
                Help & Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 px-4 text-center text-sm text-muted-foreground">
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
