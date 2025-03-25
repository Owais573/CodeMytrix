
import React from "react";
import { cn } from "@/lib/utils";

interface Language {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelectLanguage: (id: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  const languages: Language[] = [
    { id: "javascript", name: "JavaScript", icon: "JS", color: "bg-yellow-400" },
    { id: "typescript", name: "TypeScript", icon: "TS", color: "bg-blue-500" },
    { id: "python", name: "Python", icon: "PY", color: "bg-green-500" },
    { id: "go", name: "Go", icon: "GO", color: "bg-cyan-500" },
    { id: "rust", name: "Rust", icon: "RS", color: "bg-orange-500" },
    { id: "java", name: "Java", icon: "JV", color: "bg-red-500" },
    { id: "csharp", name: "C#", icon: "C#", color: "bg-purple-500" },
    { id: "ruby", name: "Ruby", icon: "RB", color: "bg-red-600" },
    { id: "c", name: "C", icon: "C", color: "bg-blue-600" },
    { id: "cpp", name: "C++", icon: "C+", color: "bg-blue-700" },
    { id: "php", name: "PHP", icon: "PHP", color: "bg-indigo-600" },
    { id: "kotlin", name: "Kotlin", icon: "KT", color: "bg-purple-600" },
    { id: "swift", name: "Swift", icon: "SW", color: "bg-orange-600" },
  ];

  return (
    <div>
      <div className="text-sm font-medium mb-2">Select Language</div>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelectLanguage(lang.id)}
            className={cn(
              "group relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
              selectedLanguage === lang.id
                ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                : "bg-secondary/50 text-foreground/80 hover:bg-secondary hover:text-foreground"
            )}
          >
            <div className="flex items-center">
              <span
                className={cn(
                  "flex items-center justify-center w-5 h-5 rounded text-xs mr-2 text-white",
                  lang.color
                )}
              >
                {lang.icon}
              </span>
              {lang.name}
            </div>
            <div
              className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                selectedLanguage === lang.id ? "w-full" : "w-0 group-hover:w-1/4"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
