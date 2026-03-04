import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Database, Cloud, ClipboardCheck, Send, Mic, Paperclip } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const widget = widgetRef.current;
    const microcopy = microcopyRef.current;

    if (!section || !headline || !subheadline || !widget || !microcopy) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.2 });

      // Headline words animation
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(words, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' }
      );

      // Subheadline
      loadTl.fromTo(subheadline,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // Widget
      loadTl.fromTo(widget,
        { y: 60, scale: 0.98, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.3'
      );

      // Pills inside widget
      const pills = widget.querySelectorAll('.pill');
      loadTl.fromTo(pills,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        '-=0.4'
      );

      // Microcopy
      loadTl.fromTo(microcopy,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headline, subheadline, widget, microcopy], { 
              opacity: 1, 
              y: 0, 
              scale: 1 
            });
          }
        }
      });

      // ENTRANCE (0-30%): Hold position (already visible from load animation)
      // SETTLE (30-70%): Hold position
      // EXIT (70-100%): Elements exit

      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(subheadline,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(widget,
        { y: 0, scale: 1, opacity: 1 },
        { y: '10vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(microcopy,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="font-display font-bold text-display-1 text-white text-center max-w-[88vw] mt-[-8vh]"
        >
          <span className="word inline-block">The </span>
          <span className="word inline-block italic text-violet-400">fastest </span>
          <span className="word inline-block">way </span>
          <span className="word inline-block">to </span>
          <span className="word inline-block">launch </span>
          <span className="word inline-block">your </span>
          <span className="word inline-block">tech </span>
          <span className="word inline-block italic text-violet-400">career</span>
        </h1>

        {/* Subheadline */}
        <p 
          ref={subheadlineRef}
          className="mt-6 text-lg md:text-xl text-white/60 text-center max-w-[56vw] leading-relaxed"
        >
          Master SQL and Azure through hands-on lessons, interactive exercises, and real-world scenarios — completely free.
        </p>

        {/* Hero Widget */}
        <div 
          ref={widgetRef}
          className="mt-12 w-full max-w-[980px] glass-card rounded-3xl widget-shadow p-6"
        >
          {/* Input area */}
          <div className="relative">
            <textarea
              placeholder="What do you want to learn today?"
              className="w-full h-24 bg-transparent text-white text-lg placeholder:text-white/30 resize-none outline-none pr-12"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Mic className="w-5 h-5 text-white/50" />
              </button>
              <button className="w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center transition-colors">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-4" />

          {/* Quick action pills */}
          <div className="flex flex-wrap gap-3">
            <button className="pill flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              <Database className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white/80">SQL Basics</span>
            </button>
            <button className="pill flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              <Cloud className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white/80">Azure Fundamentals</span>
            </button>
            <button className="pill flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              <ClipboardCheck className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white/80">Practice Quiz</span>
            </button>
            <button className="pill flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white/80">Surprise Me</span>
            </button>
            <button className="pill w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
              <Paperclip className="w-4 h-4 text-white/50" />
            </button>
          </div>
        </div>

        {/* Microcopy */}
        <p 
          ref={microcopyRef}
          className="mt-8 text-sm text-white/40 text-center"
        >
          365Academy uses interactive exercises to help you learn faster.
        </p>
      </div>
    </section>
  );
}
