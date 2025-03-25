
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import CodeGenerator from "@/components/CodeGenerator";
import ChatAssistant from "@/components/ChatAssistant";
import { toast } from "@/hooks/use-toast";
import { Code, Cpu, Lock, Zap } from "lucide-react";
import GlassmorphicCard from "@/components/common/GlassmorphicCard";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Link, useLocation } from "react-router-dom";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  
  // Refs for scrolling to sections
  const featuresRef = useRef<HTMLElement>(null);
  const languagesRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    setIsDarkMode(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Scroll to section based on hash in URL
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the # character
      const section = document.getElementById(sectionId);
      
      if (section) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location.hash]);

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

  const handleChatMessage = (message: string) => {
    console.log("Message received in parent component:", message);
  };

  return (
    <>
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <main className="min-h-screen">
        <HeroGeometric 
          badge="AI-Powered Code Generation"
          title1="Transform your ideas into"
          title2="perfect code"
        />

        <section className="py-16 px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <CodeGenerator className="mt-8 animate-fade-in" />
          </div>
        </section>

        <section id="features" ref={featuresRef} className="py-16 px-6 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform offers everything you need to accelerate
                your development workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Code className="h-8 w-8 text-primary" />}
                title="Multi-Language Support"
                description="Generate code in JavaScript, TypeScript, Python, Go, Rust, Java, C#, Ruby, C, C++, PHP, Kotlin, and Swift."
                delay={0}
              />
              <FeatureCard
                icon={<Cpu className="h-8 w-8 text-primary" />}
                title="AI-Powered Optimization"
                description="Our AI ensures your code is optimized, readable, and follows best practices."
                delay={100}
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Instant Generation"
                description="Get high-quality code in seconds, no matter the complexity of your request."
                delay={200}
              />
              <FeatureCard
                icon={<Lock className="h-8 w-8 text-primary" />}
                title="Secure & Private"
                description="Your code and prompts are processed securely and never stored permanently."
                delay={300}
              />
            </div>
          </div>
        </section>

        <section id="languages" ref={languagesRef} className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Supported Languages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Generate code in all major programming languages with equal quality and optimization.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <LanguageCard name="JavaScript" color="bg-yellow-400" delay={0} />
              <LanguageCard name="TypeScript" color="bg-blue-500" delay={50} />
              <LanguageCard name="Python" color="bg-green-500" delay={100} />
              <LanguageCard name="Go" color="bg-cyan-500" delay={150} />
              <LanguageCard name="Rust" color="bg-orange-500" delay={200} />
              <LanguageCard name="Java" color="bg-red-500" delay={250} />
              <LanguageCard name="C#" color="bg-purple-500" delay={300} />
              <LanguageCard name="Ruby" color="bg-red-600" delay={350} />
              <LanguageCard name="C" color="bg-blue-600" delay={400} />
              <LanguageCard name="C++" color="bg-blue-700" icon="C+" delay={450} />
              <LanguageCard name="PHP" color="bg-indigo-600" delay={500} />
              <LanguageCard name="Kotlin" color="bg-purple-600" icon="KT" delay={550} />
              <LanguageCard name="Swift" color="bg-orange-600" icon="SW" delay={600} />
            </div>
          </div>
        </section>

        <section id="faq" ref={faqRef} className="py-16 px-6 bg-secondary/50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our AI code generator.
              </p>
            </div>

            <div className="space-y-6">
              <FAQItem 
                question="How accurate is the generated code?"
                answer="Our AI generates high-quality, optimized code that follows best practices. While the code is thoroughly tested, we recommend reviewing it for your specific use case before production deployment."
                delay={0}
              />
              <FAQItem 
                question="Can I request specific coding styles or patterns?"
                answer="Yes! You can specify coding styles, design patterns, or frameworks in your prompt, and our AI will follow those guidelines when generating code."
                delay={100}
              />
              <FAQItem 
                question="Does it work for complex algorithms and systems?"
                answer="Absolutely. Our AI can handle everything from simple utility functions to complex algorithms and system designs. The more details you provide in your prompt, the better the results."
                delay={200}
              />
              <FAQItem 
                question="Is my code secure and private?"
                answer="We prioritize security and privacy. Your prompts and generated code are not stored permanently and are processed in a secure environment."
                delay={300}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <Link 
            to="/" 
            className="mb-4 md:mb-0 flex items-center gap-2 cursor-pointer animate-fade-in hover:scale-105 transition-transform" 
          >
            <div className="bg-primary rounded-lg p-1.5 animate-pulse-subtle">
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

      <ChatAssistant onSendMessage={handleChatMessage} isTyping={isTyping} />
    </>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  delay?: number
}) => (
  <GlassmorphicCard 
    className="p-6 h-full transition-transform hover:scale-105 animate-fade-in" 
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </GlassmorphicCard>
);

const LanguageCard = ({ 
  name, 
  color, 
  icon, 
  delay = 0
}: { 
  name: string, 
  color: string, 
  icon?: string,
  delay?: number
}) => (
  <GlassmorphicCard 
    className="p-4 text-center hover:scale-110 transition-transform duration-200 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-white font-medium mx-auto mb-3`}>
      {icon || name.substring(0, 2)}
    </div>
    <div className="font-medium">{name}</div>
  </GlassmorphicCard>
);

const FAQItem = ({ 
  question, 
  answer, 
  delay = 0 
}: { 
  question: string, 
  answer: string, 
  delay?: number 
}) => (
  <GlassmorphicCard 
    className="p-5 hover:scale-[1.02] transition-transform animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <h4 className="text-lg font-medium mb-2">{question}</h4>
    <p className="text-muted-foreground">{answer}</p>
  </GlassmorphicCard>
);

export default Index;
