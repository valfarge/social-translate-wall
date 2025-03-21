
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Comment, User, formatDate } from '@/utils/mockData';

interface CommentItemProps {
  comment: Comment;
  user: User;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, user }) => {
  return (
    <div className="flex gap-2 py-2 animate-in">
      <Avatar className="h-8 w-8 border-2 border-white/30 flex-shrink-0">
        <img src={user.avatar} alt={user.name} />
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-xs leading-relaxed whitespace-pre-line">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
