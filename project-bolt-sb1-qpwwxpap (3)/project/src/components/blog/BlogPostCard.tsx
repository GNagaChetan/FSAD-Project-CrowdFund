import React from 'react';
import { BlogPost } from '../../types';
import { Card, CardContent, CardImage } from '../ui/Card';
import { formatDate } from '../../lib/utils';

interface BlogPostCardProps {
  post: BlogPost;
  onClick?: () => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  onClick,
}) => {
  return (
    <Card 
      hover 
      className="h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <CardImage 
        src={post.coverImage} 
        alt={post.title} 
      />
      <CardContent className="flex-grow">
        <div className="text-xs text-gray-500 mb-2">
          {formatDate(post.createdAt)}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center mt-auto pt-4">
          <div className="text-sm">
            <span className="text-gray-500">By </span>
            <span className="font-medium">{post.author}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};