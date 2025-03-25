
import React from "react";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  highlightBorder?: boolean;
  intense?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className,
  highlightBorder = false,
  intense = false,
  onClick,
  style,
}) => {
  return (
    <div className="relative">
      {/* Main card component */}
      <div
        className={cn(
          "rounded-lg transition-all duration-300 relative",
          "bg-background/60 dark:bg-card/30 backdrop-blur-md border",
          highlightBorder ? "border-primary/20" : "border-white/[0.08] dark:border-border/50",
          intense ? "shadow-md" : "shadow-sm",
          onClick && "cursor-pointer hover:shadow-md hover:scale-105 hover:border-primary/30",
          className
        )}
        onClick={onClick}
        style={style}
      >
        {children}
      </div>
    </div>
  );
};

export default GlassmorphicCard;
