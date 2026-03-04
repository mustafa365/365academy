import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Is 365Academy really free?',
    answer: 'Yes! All core lessons, quizzes, and exercises are completely free. We believe quality education should be accessible to everyone. Our Pro plan adds advanced features like certifications and offline downloads, but you can learn everything you need without paying a dime.',
  },
  {
    question: 'Do I need prior experience?',
    answer: 'Not at all. Our courses are designed for complete beginners. We start from the basics and gradually build up to advanced topics. Whether you\'re switching careers or just starting out, you\'ll find a path that works for you.',
  },
  {
    question: 'Will this help me get certified?',
    answer: 'Absolutely. Our Azure courses are specifically designed to prepare you for Microsoft certifications like AZ-900 and AZ-104. We cover all exam objectives with hands-on labs that mirror real exam scenarios.',
  },
  {
    question: 'What is the XP and level system?',
    answer: 'XP (Experience Points) is our way of tracking your progress. You earn XP by completing lessons, quizzes, and exercises. As you accumulate XP, you level up and unlock new content, badges, and achievements. It makes learning fun and competitive!',
  },
  {
    question: 'Can I download lessons for offline study?',
    answer: 'Offline downloads are available with our Pro plan. This is perfect for learning on the go, during commutes, or when you have limited internet access.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const faq = faqRef.current;
    const waitlist = waitlistRef.current;

    if (!section || !faq || !waitlist) return;

    const ctx = gsap.context(() => {
      // FAQ items animation
      const items = faq.querySelectorAll('.faq-item');
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Waitlist card animation
      gsap.fromTo(waitlist,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: waitlist,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 z-60"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* FAQ Column */}
          <div ref={faqRef} className="flex-1">
            <h2 className="font-display font-bold text-display-3 text-white mb-8">
              Got <span className="italic text-violet-400">questions?</span>
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="faq-item glass-card rounded-2xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left text-white hover:text-violet-400 transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Waitlist Card */}
          <div 
            ref={waitlistRef}
            className="lg:w-[380px] glass-card rounded-3xl p-8 h-fit sticky top-24"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-violet-400" />
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-3">
              Get early access to new courses
            </h3>
            <p className="text-white/50 mb-6 leading-relaxed">
              We're adding Python, Kubernetes, and DevOps tracks. Join the waitlist.
            </p>

            <div className="space-y-3">
              <Input 
                type="email"
                placeholder="you@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-12"
              />
              <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium btn-hover">
                Join waitlist <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <p className="mt-4 text-xs text-white/40">
              We respect your inbox. No spam, just product updates.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
