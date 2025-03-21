
import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, MessageSquare, ChevronDown } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'glass border-b border-gray-200 dark:border-gray-800 shadow-sm py-2' 
          : 'bg-transparent py-4',
        className
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            SocialWall
          </h1>
        </div>

        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Rechercher..." 
              className="pl-9 w-full bg-gray-100 dark:bg-gray-800/60 border-none focus-visible:ring-1 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            aria-label="Search"
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            aria-label="Messages"
          >
            <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>

          <div className="hidden md:flex items-center gap-2 ml-1">
            <Avatar className="h-8 w-8 border-2 border-primary/10">
              <img src="https://i.pravatar.cc/150?img=2" alt="User avatar" />
            </Avatar>
            <span className="text-sm font-medium hidden lg:inline-block">Alex Dubois</span>
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card absolute top-full left-0 right-0 animate-slide-in z-50 px-4 py-4">
          <div className="space-y-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Rechercher..." 
                className="pl-9 w-full focus-visible:ring-1"
              />
            </div>
            <div className="flex items-center gap-2 py-2">
              <Avatar className="h-8 w-8 border-2 border-primary/10">
                <img src="https://i.pravatar.cc/150?img=2" alt="User avatar" />
              </Avatar>
              <span className="text-sm font-medium">Alex Dubois</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
