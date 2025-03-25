
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Zap } from "lucide-react";

const TermsOfService = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <div className="flex-grow pt-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Terms of Service</h1>
          
          <div className="space-y-6 text-foreground/80">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using CodeMytrix, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>
                CodeMytrix provides an AI-powered code generation service that assists users in creating code snippets based on natural language prompts. The service is provided on an "as is" and "as available" basis.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. User Registration and Accounts</h2>
              <p>
                Some features of our service may require registration. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. User Content</h2>
              <p>
                When you provide prompts and generate code using our service, you retain ownership of your prompts and the code generated at your request. However, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and process your prompts to provide and improve our services.
              </p>
              <p>
                You are solely responsible for the content of your prompts and for any consequences that may result from using the generated code in your projects.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Acceptable Use</h2>
              <p>
                You agree not to use CodeMytrix to:
              </p>
              <ul className="list-disc pl-5">
                <li>Generate code for illegal, harmful, or malicious purposes</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the intellectual property rights of others</li>
                <li>Submit prompts containing sensitive personal information</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the integrity or performance of our service</li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property</h2>
              <p>
                The CodeMytrix service, including its interface, features, and underlying technology, is owned by us and is protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THE ACCURACY, QUALITY, SECURITY, OR RELIABILITY OF THE GENERATED CODE.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Modification of Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of the service after changes indicates your acceptance of the modified terms.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">10. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
            </section>
            
            <p className="pt-8 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
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

export default TermsOfService;
