
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';

interface CommentFormProps {
  postId: string;
  onSubmit: (postId: string, content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    onSubmit(postId, content);
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="Ajouter un commentaire..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-xs py-1 h-8"
      />
      <Button 
        type="submit" 
        size="sm" 
        disabled={!content.trim() || isSubmitting}
        className="h-8 w-8 p-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default CommentForm;
