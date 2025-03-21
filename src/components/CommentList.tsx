
import React from 'react';
import { Comment, getUserById } from '@/utils/mockData';
import CommentItem from './CommentItem';
import { Separator } from "@/components/ui/separator";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-2">
        <p className="text-xs text-muted-foreground">Aucun commentaire pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {comments.map((comment, index) => (
        <React.Fragment key={comment.id}>
          <CommentItem 
            comment={comment} 
            user={getUserById(comment.userId)} 
          />
          {index < comments.length - 1 && <Separator className="my-1" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CommentList;
