import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, Zap, Users, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Free Forever',
    price: '$0',
    period: '/mo',
    description: 'Perfect for getting started',
    icon: Zap,
    features: [
      'All core lessons + quizzes',
      'Community support',
      'Progress tracking',
      '1 workspace',
    ],
    cta: 'Start learning',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/mo',
    description: 'Best for serious learners',
    icon: Users,
    features: [
      'Everything in Free',
      'Advanced labs + certifications',
      'Priority support',
      'Offline downloads',
      'API access',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Teams',
    price: 'Custom',
    period: '',
    description: 'For organizations',
    icon: Building2,
    features: [
      'Everything in Pro',
      'Unlimited members',
      'Admin dashboards',
      'SSO + advanced security',
      'Dedicated support',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

export function Pricing() {
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
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Headline animation
      scrollTl.fromTo(headline,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.to(headline,
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Cards staggered animation
      const cardElements = cards.querySelectorAll('.pricing-card');
      cardElements.forEach((card, i) => {
        // Entrance
        scrollTl.fromTo(card,
          { y: '70vh', scale: 0.94, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          i * 0.08
        );

        // Exit
        scrollTl.to(card,
          { y: '-16vh', opacity: 0, ease: 'power2.in' },
          0.70 + i * 0.03
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-50"
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-10">
          <h2 className="font-display font-bold text-display-2 text-white">
            Start free, scale as you <span className="italic text-violet-400">grow</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            No hidden fees. Cancel or pause anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div 
          ref={cardsRef}
          className="flex flex-wrap justify-center gap-6 lg:gap-8"
        >
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-card relative glass-card rounded-3xl p-6 w-[320px] flex flex-col ${
                plan.highlighted 
                  ? 'border-violet-500/50 shadow-glow scale-105' 
                  : ''
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-violet-600 text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                plan.highlighted ? 'bg-violet-600' : 'bg-white/10'
              }`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>

              {/* Plan name */}
              <h3 className="font-display font-bold text-xl text-white mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-white/50 mb-4">{plan.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-bold text-4xl text-white">
                  {plan.price}
                </span>
                <span className="text-white/50">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                className={`w-full py-3 rounded-xl font-medium btn-hover ${
                  plan.highlighted 
                    ? 'bg-violet-600 hover:bg-violet-500 text-white' 
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
