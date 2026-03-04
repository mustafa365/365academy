import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { name: 'Speed', values: [95, 60, 70, 45] },
  { name: 'Quality', values: [92, 55, 65, 50] },
  { name: 'Consistency', values: [90, 50, 60, 55] },
];

const labels = ['365Academy', 'Traditional', 'Video', 'Docs'];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const comparison = comparisonRef.current;
    const testimonial = testimonialRef.current;

    if (!section || !comparison || !testimonial) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Comparison block entrance
      scrollTl.fromTo(comparison,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Comparison exit
      scrollTl.to(comparison,
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Progress bars
      const bars = comparison.querySelectorAll('.progress-fill');
      bars.forEach((bar, i) => {
        scrollTl.fromTo(bar,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none' },
          0.05 + i * 0.02
        );
      });

      // Testimonial card entrance
      scrollTl.fromTo(testimonial,
        { x: '60vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Testimonial exit
      scrollTl.to(testimonial,
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-40"
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 max-w-7xl w-full">
          
          {/* Comparison Block */}
          <div ref={comparisonRef} className="w-full lg:w-[45%]">
            <h2 className="font-display font-bold text-display-3 text-white mb-8">
              A learning experience that <span className="italic text-violet-400">stands out</span>
            </h2>

            <div className="space-y-6">
              {metrics.map((metric, mi) => (
                <div key={mi}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/70">{metric.name}</span>
                  </div>
                  <div className="space-y-2">
                    {metric.values.map((value, vi) => (
                      <div key={vi} className="flex items-center gap-3">
                        <span className="text-xs text-white/40 w-20">{labels[vi]}</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`progress-fill h-full rounded-full ${
                              vi === 0 ? 'bg-violet-500' : 'bg-white/20'
                            }`}
                            style={{ width: `${value}%`, transformOrigin: 'left' }}
                          />
                        </div>
                        <span className="text-xs text-white/40 w-8 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Card */}
          <div 
            ref={testimonialRef}
            className="w-full lg:w-[45%] glass-card rounded-3xl p-8 relative"
          >
            <Quote className="w-10 h-10 text-violet-500/30 mb-4" />
            
            <blockquote className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
              "I went from zero SQL knowledge to passing my AZ-104 in 8 weeks. The hands-on labs made all the difference."
            </blockquote>

            <div className="flex items-center gap-4">
              <img 
                src="/avatar_ahmed.jpg" 
                alt="Ahmed R."
                className="w-14 h-14 rounded-full object-cover border-2 border-violet-500/30"
              />
              <div>
                <p className="font-display font-semibold text-white">Ahmed R.</p>
                <p className="text-sm text-white/50">Cloud Support Engineer</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
