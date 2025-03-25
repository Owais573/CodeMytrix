
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import GlassmorphicCard from './common/GlassmorphicCard';
import { ArrowUpRight, History } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PromptHistoryProps {
  onSelectPrompt?: (prompt: string, language: string) => void;
}

const PromptHistory: React.FC<PromptHistoryProps> = ({ onSelectPrompt }) => {
  const { user } = useAuth();

  const { data: prompts, isLoading } = useQuery({
    queryKey: ['promptHistory', user?.id],
    queryFn: async () => {
      // Don't fetch if no user is logged in
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('prompt_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user, // Only run query if user exists
  });

  if (isLoading) {
    return (
      <GlassmorphicCard className="p-4 animate-pulse">
        <div className="h-20 bg-primary/10 rounded"></div>
      </GlassmorphicCard>
    );
  }

  return (
    <GlassmorphicCard className="p-4 bg-background/40 dark:bg-card/20">
      <div className="flex items-center mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Recent Prompts</h3>
        </div>
      </div>
      <div className="space-y-3">
        {prompts?.map((prompt) => (
          <div
            key={prompt.id}
            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors relative"
          >
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => onSelectPrompt && onSelectPrompt(prompt.prompt, prompt.language)}
            >
              <p className="text-sm text-foreground/80 line-clamp-2">{prompt.prompt}</p>
              <span className="text-xs text-primary mt-1 inline-block">
                {prompt.language}
              </span>
            </div>
            <ArrowUpRight 
              className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" 
              onClick={() => onSelectPrompt && onSelectPrompt(prompt.prompt, prompt.language)}
            />
          </div>
        ))}
        {(!prompts || prompts.length === 0) && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No prompts yet. Start generating some code!
          </p>
        )}
      </div>
    </GlassmorphicCard>
  );
};

export default PromptHistory;
