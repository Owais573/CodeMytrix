
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Zap, User, LogOut, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Handle section navigation - go to home page first if not there
  const navigateToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      // If already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 animate-fade-in hover:scale-105 transition-transform duration-200">
          <div className="bg-primary rounded-lg p-1.5 animate-pulse-subtle">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-medium tracking-tight">
            <span className="text-primary font-semibold">Code</span>
            <span className="font-light">Mytrix</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 animate-fade-in">
          <button
            onClick={() => navigateToSection("features")}
            className="text-sm text-foreground/80 hover:text-primary transition-colors relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Features
          </button>
          <button
            onClick={() => navigateToSection("languages")}
            className="text-sm text-foreground/80 hover:text-primary transition-colors relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Languages
          </button>
          <button
            onClick={() => navigateToSection("faq")}
            className="text-sm text-foreground/80 hover:text-primary transition-colors relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            FAQ
          </button>
          <Link
            to="/contact"
            className="text-sm text-foreground/80 hover:text-primary transition-colors relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left flex items-center gap-1"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Contact
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="ml-2 hover:rotate-12 transition-transform"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Authentication UI */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 hover:scale-105 transition-transform">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-fade-in">
                <DropdownMenuItem className="text-muted-foreground">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:text-destructive transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth")}
                className="text-foreground/90 hover:scale-105 transition-transform"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/auth?signup=true")}
                className="bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90 hover:scale-105 transition-transform animate-pulse-subtle"
              >
                Get Started
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="mr-2 hover:rotate-12 transition-transform"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hover:rotate-12 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-lg shadow-md py-4 px-6 border-t border-border/50 animate-slide-in">
          <nav className="flex flex-col items-center space-y-4">
            <button
              onClick={() => navigateToSection("features")}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => navigateToSection("languages")}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              Languages
            </button>
            <button
              onClick={() => navigateToSection("faq")}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <Link
              to="/contact"
              className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Contact
            </Link>
            
            {/* Mobile Authentication UI */}
            {user ? (
              <>
                <div className="py-2 text-sm text-center text-muted-foreground">
                  {user.email}
                </div>
                <Button 
                  variant="ghost" 
                  className="justify-center text-destructive hover:text-destructive/80 transition-colors"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 pt-2">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/auth")}
                  className="hover:translate-y-1 transition-transform"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleNavigation("/auth?signup=true")}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] transition-transform"
                >
                  Get Started
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
