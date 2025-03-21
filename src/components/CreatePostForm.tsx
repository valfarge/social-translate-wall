
import React, { useState, useRef, useEffect } from 'react';
import { Image, Send, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { toast } from "sonner";

interface CreatePostFormProps {
  onPostCreated: (content: string, imageUrl?: string) => void;
  className?: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated, className }) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !imageUrl) {
      toast.error("Votre message est vide.");
      return;
    }
    
    onPostCreated(content, imageUrl || undefined);
    setContent('');
    setImageUrl(null);
    setIsPreviewVisible(false);
    textareaRef.current?.blur();
    setIsFocused(false);
    toast.success("Message publié avec succès !");
  };
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("L'image est trop volumineuse. Maximum 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
        setIsPreviewVisible(true);
        setIsFocused(true);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setImageUrl(null);
    setIsPreviewVisible(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);
  
  return (
    <Card className={cn("overflow-hidden w-full max-w-2xl glass-card transition-all duration-300", className)}>
      <form onSubmit={handleSubmit}>
        <CardContent className={cn("p-4 transition-all duration-300", isFocused ? "pb-1" : "")}>
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 border-2 border-white/30">
              <img src="https://i.pravatar.cc/150?img=2" alt="User avatar" />
            </Avatar>
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                placeholder="Quoi de neuf ?"
                className={cn(
                  "w-full resize-none border-none focus-visible:ring-0 p-2 text-base", 
                  "bg-secondary/50 placeholder:text-muted-foreground",
                  "min-h-[40px] transition-all duration-300",
                  isFocused ? "min-h-[80px]" : ""
                )}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  if (!content && !imageUrl) setIsFocused(false);
                }}
              />
              
              {isPreviewVisible && imageUrl && (
                <div className="relative mt-2 rounded-md overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt="Aperçu" 
                    className="w-full max-h-64 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full h-8 w-8 bg-black/70 hover:bg-black/90"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        {(isFocused || content || imageUrl) && (
          <CardFooter className="px-4 py-3 flex justify-between items-center animate-slide-in border-t border-border/10">
            <div className="flex gap-1">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-9 w-9"
                onClick={handleImageClick}
              >
                <Image className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                className="text-sm"
                onClick={() => {
                  setContent('');
                  setImageUrl(null);
                  setIsPreviewVisible(false);
                  setIsFocused(false);
                }}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="text-sm rounded-full px-4 bg-primary hover:bg-primary/90"
                disabled={!content.trim() && !imageUrl}
              >
                <span className="mr-1">Publier</span>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        )}
      </form>
    </Card>
  );
};

export default CreatePostForm;
