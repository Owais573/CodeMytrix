
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";
import PromptHistory from "./PromptHistory";
import GlassmorphicCard from "./common/GlassmorphicCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const TOGETHER_API_KEY = "Enter_Your_Together_API_KEY";

interface CodeGeneratorProps {
  className?: string;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ className }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePromptSelect = (selectedPrompt: string, language: string) => {
    setPrompt(selectedPrompt);
    setSelectedLanguage(language);
    generateCode(selectedPrompt, language);
  };

  const generateCode = async (promptText = prompt, language = selectedLanguage) => {
    if (promptText.trim() === "") {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of the code you want to generate",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      if (user) {
        await supabase
          .from('prompt_history')
          .insert({
            prompt: promptText,
            language: language,
            user_id: user.id
          });
      }

      const messages = [
        {
          role: "system",
          content: "You are a helpful coding assistant. Generate clean and efficient code without explanations or markdown."
        },
        {
          role: "user",
          content: `Generate ${language} code for the following: ${promptText}\n\nPlease provide only the code without any explanations or markdown, as I will be directly using the output.`
        }
      ];

      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
          messages: messages,
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          max_tokens: 2048,
          repetition_penalty: 1,
          stop: ["<|eot_id|>", "<|eom_id|>"]
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.choices && data.choices[0]?.message?.content) {
        const codeText = data.choices[0].message.content;
        
        let cleanCode = codeText;
        if (cleanCode.startsWith("```")) {
          const langRegex = new RegExp("^```" + language + "\\n");
          cleanCode = cleanCode.replace(langRegex, "");
          cleanCode = cleanCode.replace(/^```\w*\n/, "");
          cleanCode = cleanCode.replace(/```$/, "");
        }
        
        setGeneratedCode(cleanCode.trim());
        
        toast({
          title: "Code generated",
          description: `Generated ${language} code based on your prompt`,
        });
      } else {
        console.error("Together.xyz API error:", data);
        toast({
          title: "Generation failed",
          description: data.error?.message || "There was an error generating code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Generation failed",
        description: "There was an error connecting to the API. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className={cn(
        "grid gap-6",
        user ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"
      )}>
        <div className={cn(
          user ? "md:col-span-2" : "col-span-1"
        )}>
          <GlassmorphicCard className="p-6 border-2 border-primary/30 shadow-md" intense={true}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center">
                <Code className="mr-2 text-primary" size={28} />
                Describe what you want to create
              </h2>
              <p className="text-sm text-muted-foreground mb-4 ml-9">
                Provide details about the functionality, inputs, outputs, and any specific requirements.
              </p>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg blur opacity-50"></div>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Create a function that calculates the Fibonacci sequence up to n terms..."
                  className="h-32 resize-none bg-background/80 backdrop-blur-sm relative border-primary/20 focus:border-primary/30 transition-all duration-300 focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="mb-6">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
              />
            </div>

            <div className="flex justify-end items-center mb-8">
              <Button
                onClick={() => generateCode()}
                disabled={isGenerating || prompt.trim() === ""}
                className="relative overflow-hidden group bg-primary/90 hover:bg-primary transition-all duration-300 hover:scale-105"
                size="lg"
              >
                <span className="flex items-center">
                  {isGenerating ? "Generating..." : "Generate Code"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                {isGenerating && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></span>
                )}
              </Button>
            </div>

            {generatedCode && (
              <div className="animate-fade-in">
                <h3 className="text-lg font-medium mb-2">Generated Code</h3>
                <CodeEditor
                  code={generatedCode}
                  language={selectedLanguage}
                  isLoading={isGenerating}
                />
              </div>
            )}
          </GlassmorphicCard>
        </div>
        {user && (
          <div className="md:col-span-1">
            <PromptHistory onSelectPrompt={handlePromptSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeGenerator;
