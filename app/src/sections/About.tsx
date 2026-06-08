import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillBadge from '@/components/PillBadge';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slides in from left
      gsap.fromTo(
        '.about-image',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Text elements stagger in from right
      gsap.utils.toArray<HTMLElement>('.about-text-item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
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
    <section
      id="about"
      ref={sectionRef}
      className="bg-soft-cream py-20 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div className="about-image">
            <img
              src="/images/about-studio.jpg"
              alt="Build Your Home Interiors Studio"
              className="w-full rounded-2xl shadow-[0_30px_80px_rgba(30,30,30,0.1)] object-cover"
              style={{ aspectRatio: '3/4' }}
            />
          </div>

          {/* Right - Text */}
          <div>
            <div className="about-text-item mb-8">
              <PillBadge text="About Us" />
            </div>

            <h2 className="about-text-item text-3xl lg:text-5xl font-medium text-charcoal tracking-tight leading-tight mb-8">
              Leading <span className="text-champagne-gold">Interior</span> Design Studio
            </h2>

            <p className="about-text-item text-warm-grey text-lg lg:text-xl font-light leading-relaxed mb-6">
              Founded with a passion for transforming spaces, we are a design-focused studio specializing in architecture, interior design, and project execution. Based in Pune, our practice is dedicated to creating thoughtfully designed spaces that combine functionality, aesthetics, and innovation.
            </p>

            <p className="about-text-item text-warm-grey text-base leading-relaxed mb-6">
              With a team of passionate professionals, we work closely with clients to transform ideas into well-crafted environments. Our approach emphasizes careful planning, creative thinking, and attention to detail to ensure that every project reflects the client's vision while maintaining the highest design and quality standards.
            </p>

            <p className="about-text-item text-warm-grey text-base leading-relaxed mb-8">
              We offer expertise across architectural design, interior design, turnkey solutions, construction management, and design consultancy. From concept development to final execution, our goal is to deliver spaces that are practical, elegant, and timeless.
            </p>

            <a
              href="#contact"
              className="about-text-item inline-flex items-center gap-3 text-charcoal text-xs font-medium tracking-[0.08em] uppercase"
            >
              <span className="link-underline">Know More</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
