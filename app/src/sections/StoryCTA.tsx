import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillBadge from '@/components/PillBadge';

gsap.registerPlugin(ScrollTrigger);

export default function StoryCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Left text staggers in
      gsap.utils.toArray<HTMLElement>('.story-text-item').forEach((el, i) => {
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
              start: 'top 70%',
              once: true,
            },
          }
        );
      });

      // Right image scales in
      gsap.fromTo(
        '.story-image',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
        style={{
          backgroundImage: 'url(/images/story-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-overlay-dark" />

      {/* Content */}
      <div className="relative z-10 py-32 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text */}
            <div>
              <div className="story-text-item mb-8">
                <PillBadge text="Our Story" variant="dark" />
              </div>
              <h2 className="story-text-item text-3xl lg:text-5xl font-medium text-white tracking-tight leading-tight mb-8">
                Where <span className="text-champagne-gold">Spaces Inspire</span>, And <span className="text-champagne-gold">Design Comes Alive</span>
              </h2>
              <p className="story-text-item text-white/85 text-lg lg:text-xl font-light leading-relaxed mb-8">
                Every space has a story, and our journey began with a passion for transforming ideas into meaningful environments. What started as a vision to create thoughtful and well-designed spaces has evolved into a practice focused on delivering architecture and interiors that balance functionality, aesthetics, and innovation.
              </p>
              <p className="story-text-item text-white/85 text-base leading-relaxed mb-10">
                We believe that great design goes beyond appearance. It is about creating environments that enhance everyday living, reflect individuality, and stand the test of time. Through collaboration, careful planning, and dedicated execution, we strive to turn every vision into a space that truly feels like home.
              </p>
              <a
                href="#contact"
                className="story-text-item inline-flex items-center gap-3 text-white text-xs font-medium tracking-[0.08em] uppercase"
              >
                <span className="link-underline">Get A Quote</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Right - Image */}
            <div className="story-image flex justify-center lg:justify-end">
              <img
                src="/images/story-room.jpg"
                alt="Luxury Interior"
                className="rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] max-w-[480px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
