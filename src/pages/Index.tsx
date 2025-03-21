
import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import CreatePostForm from '@/components/CreatePostForm';
import { initialPosts, getUserById, Post } from '@/utils/mockData';

const Index = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle post creation
  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: (posts.length + 1).toString(),
      userId: "1", // Current user ID
      content,
      createdAt: new Date(),
      likes: 0,
      comments: 0,
    };
    
    setPosts([newPost, ...posts]);
    
    // Scroll to top with animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Simulate loading more posts when scrolling
  const loadMorePosts = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPosts = [...posts];
      
      // Clone some existing posts and modify them slightly
      initialPosts.forEach((post, index) => {
        const clonedPost = { 
          ...post,
          id: `clone-${post.id}-${Date.now()}`,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (index + 1)),
          likes: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 10),
        };
        
        newPosts.push(clonedPost);
      });
      
      setPosts(newPosts);
      setLoading(false);
    }, 1500);
  };
  
  // Detect when user scrolls to bottom to load more
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Load more when user is near bottom
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        loadMorePosts();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, posts]);
  
  // Add entrance animation for the container
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      <main 
        ref={containerRef} 
        className="container mx-auto px-4 pt-24 pb-20 flex flex-col items-center opacity-0 transition-opacity duration-500"
      >
        <div className="w-full max-w-2xl">
          <CreatePostForm onPostCreated={handleCreatePost} className="mb-6" />
          
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                user={getUserById(post.userId)} 
                className="animate-in"
              />
            ))}
            
            {loading && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary/70" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
