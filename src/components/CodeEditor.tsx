
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  code: string;
  language: string;
  isLoading?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Code copied successfully",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fileExtension = getFileExtension(language);
    const blob = new Blob([code], { type: "text/plain" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `code-snippet.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    
    toast({
      title: "Downloaded",
      description: `Code saved as code-snippet.${fileExtension}`,
    });
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      go: "go",
      rust: "rs",
      java: "java",
      csharp: "cs",
      ruby: "rb",
      c: "c",
      cpp: "cpp",
      php: "php",
      kotlin: "kt",
      swift: "swift",
    };
    return extensions[lang] || "txt";
  };

  return (
    <div className="editor-container glass">
      <div className="flex items-center justify-between p-2 border-b border-border/50">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-xs text-foreground/60 font-medium">
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
            disabled={isLoading}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleDownload}
            disabled={isLoading}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <pre
        className={cn(
          "p-4 font-mono text-sm overflow-auto max-h-[500px] transition-opacity",
          isLoading ? "opacity-50" : "opacity-100"
        )}
      >
        {isLoading ? (
          <div className="h-32 w-full loading-shimmer rounded-md"></div>
        ) : (
          <code className="whitespace-pre-wrap break-words">{code}</code>
        )}
      </pre>
    </div>
  );
};

export default CodeEditor;
