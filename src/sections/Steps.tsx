import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Code, CheckCircle, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Learn',
    description: 'Watch bite-sized lessons built for real-world skills.',
    icon: Play,
  },
  {
    number: '02',
    title: 'Practice',
    description: 'Write real SQL and deploy Azure resources hands-on.',
    icon: Code,
  },
  {
    number: '03',
    title: 'Quiz',
    description: 'Test your knowledge with instant feedback.',
    icon: CheckCircle,
  },
  {
    number: '04',
    title: 'Certify',
    description: 'Prep for AZ-104 and stand out to employers.',
    icon: Award,
  },
];

export function Steps() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Headline animation
      scrollTl.fromTo(headline,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.to(headline,
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Cards staggered animation
      const cardElements = cards.querySelectorAll('.step-card');
      cardElements.forEach((card, i) => {
        const startPct = i * 0.05;

        // Entrance
        scrollTl.fromTo(card,
          { y: '60vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          startPct
        );

        // Exit
        scrollTl.to(card,
          { y: '-18vh', scale: 0.98, opacity: 0, ease: 'power2.in' },
          0.70 + i * 0.02
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-20"
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16">
          <h2 className="font-display font-bold text-display-2 text-white">
            From <span className="italic text-violet-400">zero</span> to job-ready
          </h2>
          <h2 className="font-display font-bold text-display-2 text-white">
            in four simple steps
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            A clear path from your first lesson to your first job interview.
          </p>
        </div>

        {/* Step Cards */}
        <div 
          ref={cardsRef}
          className="flex flex-wrap justify-center gap-6 lg:gap-8"
        >
          {steps.map((step, index) => (
            <div 
              key={index}
              className="step-card glass-card rounded-3xl p-6 w-[280px] h-[320px] flex flex-col card-hover"
            >
              {/* Step number */}
              <span className="font-mono text-xs text-violet-400 tracking-wider">
                STEP {step.number}
              </span>

              {/* Icon */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-violet-400" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
