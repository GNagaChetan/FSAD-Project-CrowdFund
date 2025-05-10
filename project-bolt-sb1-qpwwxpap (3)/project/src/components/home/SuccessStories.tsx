import React from 'react';
import { BlogPost } from '../../types';
import { BlogPostCard } from '../blog/BlogPostCard';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface SuccessStoriesProps {
  posts: BlogPost[];
  onViewAll?: () => void;
  onPostClick?: (post: BlogPost) => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({
  posts,
  onViewAll,
  onPostClick,
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-2 text-gray-600">Real stories from people who achieved their goals</p>
          </div>
          <Button 
            variant="link" 
            className="mt-4 sm:mt-0"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            onClick={onViewAll}
          >
            View all stories
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onClick={() => onPostClick?.(post)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};