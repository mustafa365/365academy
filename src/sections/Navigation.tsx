import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="w-full px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">3</span>
            </div>
            <span className="font-display font-bold text-lg text-white group-hover:text-violet-400 transition-colors">
              365Academy
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#courses" className="text-sm text-white/70 hover:text-white transition-colors link-underline">
              Courses
            </a>
            <a href="#leaderboard" className="text-sm text-white/70 hover:text-white transition-colors link-underline">
              Leaderboard
            </a>
            <a href="#donate" className="text-sm text-white/70 hover:text-white transition-colors link-underline">
              Donate
            </a>
            <a href="#signin" className="text-sm text-white/70 hover:text-white transition-colors link-underline">
              Sign In
            </a>
          </div>

          {/* CTA */}
          <Button 
            className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl font-medium btn-hover"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
