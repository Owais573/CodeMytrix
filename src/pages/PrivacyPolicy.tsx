import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Zap } from "lucide-react";

const PrivacyPolicy = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark || document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <div className="flex-grow pt-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Privacy Policy</h1>
          
          <div className="space-y-6 text-foreground/80">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                At CodeMytrix, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our code generation service.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you have read, understood, and agreed to the practices described in this policy.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <h3 className="text-lg font-medium">2.1 Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc pl-5">
                <li>Email address and basic profile information when you register for an account</li>
                <li>Authentication details necessary to maintain your account security</li>
                <li>Billing information if you subscribe to our premium services</li>
              </ul>
              
              <h3 className="text-lg font-medium">2.2 Usage Information</h3>
              <p>We also collect information about your interactions with our service:</p>
              <ul className="list-disc pl-5">
                <li>Prompts you enter into our code generation tool</li>
                <li>The code generated based on your requests</li>
                <li>Features and pages you access</li>
                <li>Actions you perform on our platform</li>
                <li>Device information, including IP address, browser type, and operating system</li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-5">
                <li>To provide, maintain, and improve our service</li>
                <li>To process and complete your transactions</li>
                <li>To personalize your experience and deliver content relevant to your preferences</li>
                <li>To train and improve our AI models to generate better code</li>
                <li>To monitor and analyze usage patterns and trends</li>
                <li>To communicate with you about service-related announcements</li>
                <li>To detect, investigate, and prevent fraudulent transactions and unauthorized access</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. How We Share Your Information</h2>
              <p>
                We may share your information with third parties in the following circumstances:
              </p>
              <ul className="list-disc pl-5">
                <li>With service providers who perform services on our behalf</li>
                <li>When required by law or to respond to legal process</li>
                <li>To protect the rights, property, or safety of our users or the public</li>
                <li>In connection with a merger, sale, or acquisition of all or a portion of our company</li>
              </ul>
              <p>
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Your Rights and Choices</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-5">
                <li>Access to the personal information we have about you</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information in certain circumstances</li>
                <li>Objection to or restriction of certain processing activities</li>
                <li>Data portability to transfer your information to another service</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Children's Privacy</h2>
              <p>
                Our service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website with a new effective date. Your continued use of the service after the changes indicates your acceptance of the updated policy.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p>
                Email: privacy@codemytrix.com
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
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
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

export default PrivacyPolicy;
