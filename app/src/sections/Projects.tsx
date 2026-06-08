import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillBadge from '@/components/PillBadge';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { image: '/images/project-1.jpg', title: 'The Pearl Residence', location: 'Pune' },
  { image: '/images/project-2.jpg', title: 'Coastal Retreat', location: 'Goa' },
  { image: '/images/project-3.jpg', title: 'Urban Sanctuary', location: 'Mumbai' },
  { image: '/images/project-4.jpg', title: 'The Garden Estate', location: 'Hyderabad' },
  { image: '/images/project-5.jpg', title: 'Metro Heights', location: 'Delhi NCR' },
  { image: '/images/project-6.jpg', title: 'Serenity Villa', location: 'Pune' },
];

function ProjectCard({ image, title, location }: { image: string; title: string; location: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-card relative overflow-hidden rounded-xl cursor-pointer group"
      style={{ aspectRatio: '4/5' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-white text-xl font-medium mb-1">{title}</h3>
        <span className="text-champagne-gold text-xs font-medium tracking-[0.08em] uppercase">
          {location}
        </span>
      </div>
      {/* Hover border */}
      <div className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/40 rounded-xl transition-all duration-500" />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.utils.toArray<HTMLElement>('.projects-header-item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });

      // Cards stagger
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.projects-grid',
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-charcoal py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="projects-header-item flex justify-center mb-8">
            <PillBadge text="Our Projects" variant="dark" />
          </div>
          <h2 className="projects-header-item text-3xl lg:text-5xl font-medium text-white tracking-tight mb-6">
            A Glimpse Into <span className="text-champagne-gold">Our World</span> of Design
          </h2>
          <p className="projects-header-item text-white/70 text-lg lg:text-xl font-light leading-relaxed max-w-[700px] mx-auto">
            Every project originates from a clear vision and a commitment to excellence. Our portfolio represents a carefully curated collection where architectural precision aligns with creative expression.
          </p>
        </div>

        {/* Project Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-xs font-medium tracking-[0.08em] uppercase rounded-full hover:bg-white hover:text-charcoal transition-all duration-300"
          >
            Our Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
