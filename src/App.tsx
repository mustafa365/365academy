import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FluidBackground } from './components/FluidBackground';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Steps } from './sections/Steps';
import { CourseLibrary } from './sections/CourseLibrary';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all sections to mount and ScrollTriggers to initialize
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Fluid background with cursor ripple effect */}
      <FluidBackground />
      
      {/* Content layers above background */}
      <div className="relative z-10">
        <Navigation />
        
        <main className="relative">
          {/* Pinned sections with z-index stacking */}
          <div className="relative z-10">
            <Hero />
          </div>
          <div className="relative z-20">
            <Steps />
          </div>
          <div className="relative z-30">
            <CourseLibrary />
          </div>
          <div className="relative z-40">
            <Testimonials />
          </div>
          <div className="relative z-50">
            <Pricing />
          </div>
          
          {/* Flowing sections */}
          <div className="relative z-60">
            <FAQ />
          </div>
          <div className="relative z-70">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
