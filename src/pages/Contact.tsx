import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Zap, Mail } from "lucide-react";
import GlassmorphicCard from "@/components/common/GlassmorphicCard";
const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Detect system theme preference and check localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Set initial state based on localStorage or system preference
    const shouldBeDark = savedTheme === 'dark' || savedTheme === null && prefersDark;
    setIsDarkMode(shouldBeDark);

    // Apply the theme to the document
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
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
  return <div className="flex flex-col min-h-screen">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <div className="flex-grow pt-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contact Us</h1>
          
          <GlassmorphicCard className="p-8 mb-12 animate-fade-in">
            <div className="space-y-6">
              <p className="text-lg text-foreground/90">
                Feel free to reach out with any questions or feedback!
              </p>
              
              <div className="flex items-center justify-center my-10">
                <a href="mailto:contact@supdevx.com" className="flex items-center gap-3 text-primary hover:text-accent transition-colors group">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-8 w-8" />
                  </div>
                  <span className="text-xl font-medium">contact@supdevx.com</span>
                </a>
              </div>
              
              <div className="text-muted-foreground">
                <p>Our team is always here to help you with any questions or support you need.</p>
                <p className="mt-2">We typically respond within 24 hours.</p>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="mb-4 md:mb-0 flex items-center gap-2 cursor-pointer animate-fade-in hover:scale-105 transition-transform">
            <div className="bg-primary rounded-lg p-1.5">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-medium tracking-tight">
              <span className="text-primary font-semibold">Code</span>
              <span className="font-light">Mytrix</span>
            </span>
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <div className="text-sm text-muted-foreground animate-fade-in">
              &copy; {new Date().getFullYear()} CodeMytrix. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Contact;