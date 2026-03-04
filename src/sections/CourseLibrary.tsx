import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    title: 'SQL from Zero to Hero',
    description: 'Database fundamentals + real projects',
    image: '/course_sql.jpg',
    level: 'Beginner',
  },
  {
    title: 'Azure Admin Zero to Hero',
    description: 'AZ-104 prep with hands-on labs',
    image: '/course_azure_admin.jpg',
    level: 'Intermediate',
  },
  {
    title: 'Azure Fundamentals',
    description: 'AZ-900 essentials for beginners',
    image: '/course_azure_fundamentals.jpg',
    level: 'Beginner',
  },
  {
    title: 'Data Analytics Basics',
    description: 'Query, visualize, and tell stories with data',
    image: '/course_data_analytics.jpg',
    level: 'Beginner',
  },
  {
    title: 'Cloud Security Intro',
    description: 'Protect resources and manage identity',
    image: '/course_security.jpg',
    level: 'Intermediate',
  },
  {
    title: 'Interview Prep Kit',
    description: 'SQL + Azure questions employers ask',
    image: '/course_interview.jpg',
    level: 'Advanced',
  },
];

export function CourseLibrary() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const grid = gridRef.current;

    if (!section || !headline || !grid) return;

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

      // Cards animation - slide in from right
      const cards = grid.querySelectorAll('.course-card');
      cards.forEach((card, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const delay = (row * 3 + col) * 0.03;

        // Entrance
        scrollTl.fromTo(card,
          { x: '60vw', rotate: 6, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, ease: 'none' },
          delay
        );

        // Exit
        scrollTl.to(card,
          { x: '-40vw', rotate: -4, opacity: 0, ease: 'power2.in' },
          0.70 + delay * 0.5
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="courses"
      className="relative w-full h-screen overflow-hidden z-30"
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="font-display font-bold text-display-2 text-white">
              Courses that fit your <span className="italic text-violet-400">goals</span>
            </h2>
            <a 
              href="#all-courses" 
              className="hidden md:flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              See all <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Pick a path and start learning — no setup, no credit card.
          </p>
        </div>

        {/* Course Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl"
        >
          {courses.map((course, index) => (
            <div 
              key={index}
              className="course-card group relative glass-card rounded-2xl overflow-hidden cursor-pointer card-hover"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                
                {/* Level badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-violet-600/80 backdrop-blur-sm text-xs font-medium text-white">
                  {course.level}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg text-white mb-1 group-hover:text-violet-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-white/50">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
