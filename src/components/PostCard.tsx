
import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, MoreHorizontal, Languages } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from '@/hooks/useTranslation';
import { Post, User, formatDate } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import TranslationOverlay from './TranslationOverlay';

interface PostCardProps {
  post: Post;
  user: User;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, user, className }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translation, setTranslation] = useState<{ text: string; language: string } | null>(null);
  const { translateText, isTranslating } = useTranslation();

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleTranslate = async () => {
    if (translation) {
      setShowTranslation(true);
      return;
    }
    
    try {
      const result = await translateText(post.content);
      setTranslation({
        text: result.translatedText,
        language: result.language
      });
      setShowTranslation(true);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md w-full max-w-2xl glass-card", className)}>
      <CardHeader className="px-4 py-3 flex flex-row items-center gap-3 space-y-0">
        <Avatar className="h-10 w-10 border-2 border-white/30">
          <img src={user.avatar} alt={user.name} />
        </Avatar>
        <div className="flex flex-col gap-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{user.name}</p>
            <span className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto rounded-full h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="px-4 py-2 relative">
        {post.content && (
          <p className="text-sm leading-relaxed whitespace-pre-line animate-in">
            {post.content}
          </p>
        )}
        
        {post.imageUrl && (
          <div className={cn("mt-2 rounded-lg overflow-hidden", post.content ? "mt-3" : "mt-0")}>
            <img 
              src={post.imageUrl} 
              alt="Post image" 
              className="w-full object-cover rounded-lg max-h-96" 
            />
          </div>
        )}
        
        {showTranslation && translation && (
          <TranslationOverlay 
            translation={translation.text} 
            language={translation.language}
            onClose={() => setShowTranslation(false)}
          />
        )}
      </CardContent>
      
      <div className="px-4 py-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{likesCount} j'aime</span>
          <span>{post.comments} commentaires</span>
        </div>
      </div>
      
      <Separator />
      
      <CardFooter className="px-2 py-1 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex-1 gap-1 rounded-full", liked && "text-red-500")} 
          onClick={handleLike}
        >
          <Heart className={cn("h-4 w-4", liked ? "fill-red-500" : "")} />
          <span className="text-xs">J'aime</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-1 gap-1 rounded-full">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">Commenter</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-1 gap-1 rounded-full">
          <Share2 className="h-4 w-4" />
          <span className="text-xs">Partager</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex-1 gap-1 rounded-full", showTranslation && "bg-primary/10")}
          onClick={handleTranslate}
          disabled={isTranslating}
        >
          <Languages className="h-4 w-4" />
          <span className="text-xs">{isTranslating ? "..." : "Traduire"}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
