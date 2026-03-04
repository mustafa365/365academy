import { Github, Twitter, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  Product: ['Courses', 'Leaderboard', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Contact'],
};

export function Footer() {
  return (
    <footer className="relative w-full bg-dark/80 backdrop-blur-sm py-16 z-70">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* Logo & Tagline */}
          <div className="lg:w-1/3">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">3</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                365Academy
              </span>
            </a>
            <p className="text-white/50 leading-relaxed">
              Free forever. No credit card required.
            </p>
            <p className="text-white/50 leading-relaxed mt-2">
              Master SQL and Azure through hands-on learning.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 lg:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-display font-semibold text-white mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a 
                        href={`#${link.toLowerCase()}`}
                        className="text-sm text-white/50 hover:text-violet-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white/40">
            © 2025 365Academy. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-violet-600/20 flex items-center justify-center transition-colors"
            >
              <Twitter className="w-5 h-5 text-white/50 hover:text-violet-400" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-violet-600/20 flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-5 h-5 text-white/50 hover:text-violet-400" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-violet-600/20 flex items-center justify-center transition-colors"
            >
              <Github className="w-5 h-5 text-white/50 hover:text-violet-400" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-violet-600/20 flex items-center justify-center transition-colors"
            >
              <Youtube className="w-5 h-5 text-white/50 hover:text-violet-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
