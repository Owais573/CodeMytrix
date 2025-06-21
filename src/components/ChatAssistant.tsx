
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import GlassmorphicCard from "./common/GlassmorphicCard";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatAssistantProps {
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  className?: string;
}

// Hardcoded API key for Together.xyz (same as used in CodeGenerator.tsx)
const TOGETHER_API_KEY = "Enter_Your_Together_API_KEY";

const ChatAssistant: React.FC<ChatAssistantProps> = ({
  onSendMessage,
  isTyping = false,
  className,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your coding assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const fetchAIResponse = async (userMessage: string) => {
    setIsFetching(true);
    try {
      // Prepare the messages for the Together.xyz API
      const apiMessages = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content
      }));
      
      // Add the new user message
      apiMessages.push({
        role: "user",
        content: userMessage
      });

      // Call Together.xyz API
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
          messages: apiMessages,
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          max_tokens: 1024,
          repetition_penalty: 1,
          stop: ["<|eot_id|>", "<|eom_id|>"]
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.choices && data.choices[0]?.message?.content) {
        const aiResponse = data.choices[0].message.content;
        
        // Add AI's response to messages
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString() + "-ai",
            content: aiResponse.trim(),
            isUser: false
          }
        ]);
      } else {
        console.error("Together.xyz API error:", data);
        // Add a fallback error message
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString() + "-error",
            content: "Sorry, I encountered an issue. Please try again.",
            isUser: false
          }
        ]);
      }
    } catch (error) {
      console.error("Error calling Together.xyz API:", error);
      // Add a fallback error message for network issues
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + "-error",
          content: "Sorry, I couldn't connect to the AI service. Please check your connection and try again.",
          isUser: false
        }
      ]);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    // Add user message to the chat
    setMessages((prev) => [...prev, newMessage]);
    
    // Notify parent component
    onSendMessage(input);
    
    // Fetch AI response
    fetchAIResponse(input);
    
    // Clear the input field
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <Button
        className={cn(
          "fixed z-10 w-12 h-12 rounded-full shadow-lg transition-all duration-300",
          isOpen
            ? "bottom-[380px] right-6"
            : "bottom-6 right-6 hover:scale-105"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-[360px] z-10 transition-all duration-300 transform",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
          className
        )}
      >
        <GlassmorphicCard className="overflow-hidden" intense>
          <div className="flex items-center justify-between p-3 border-b border-border/50">
            <div className="flex items-center space-x-2">
              <Bot size={18} className="text-primary" />
              <h3 className="text-sm font-medium">Coding Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>

          <div className="h-[300px] overflow-y-auto p-3 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {(isTyping || isFetching) && (
              <div className="flex justify-start">
                <div className="bg-secondary max-w-[80%] px-4 py-2 rounded-lg text-secondary-foreground">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-pulse delay-75" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border/50">
            <div className="flex items-end space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about coding..."
                className="min-h-[60px] resize-none"
                disabled={isFetching}
              />
              <Button onClick={handleSend} disabled={input.trim() === "" || isFetching}>
                <Send size={16} />
              </Button>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </>
  );
};

export default ChatAssistant;
