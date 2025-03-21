
import React from 'react';
import { X } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface TranslationOverlayProps {
  translation: string;
  language: string;
  onClose: () => void;
  className?: string;
}

const TranslationOverlay: React.FC<TranslationOverlayProps> = ({ 
  translation, 
  language, 
  onClose, 
  className 
}) => {
  return (
    <Card className={cn(
      "mt-3 p-3 bg-secondary/50 backdrop-blur-sm border border-border/40 relative animate-scale-in",
      className
    )}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <Badge variant="outline" className="text-xs px-2 py-0 bg-primary/5">
          {language}
        </Badge>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 rounded-full hover:bg-destructive/10" 
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      <p className="text-sm">{translation}</p>
    </Card>
  );
};

export default TranslationOverlay;
