import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PillBadge from '@/components/PillBadge';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Build Your Home Interiors completely reimagined our apartment with luxury residential interiors that feel both elegant and practical. The attention to detail, especially in the bespoke furniture, makes the house feel truly personal and well curated.',
    author: 'Ms. Devanshi Kapoor',
  },
  {
    quote: 'My experience with Build Your Home Interiors has been nothing short of wonderful. The skilled designers ensured the incorporation of my taste and vision with precision. My home now looks flawless and pretty, like a picture.',
    author: 'Mr. Sidhant Gupta',
  },
  {
    quote: 'Working with Build Your Home Interiors was an impeccable experience. The experts were professional and top-notch from the word Go. Right from conceptualization and design to execution, my experience was hassle-free and great.',
    author: 'Mr. Prem K Rewari',
  },
  {
    quote: 'Our new home reflects premium residential design at its finest. The team created modern, timeless interiors with thoughtful storage and functional layouts, which perfectly suit our lifestyle. I would definitely recommend them.',
    author: 'Mr. Yuvraj Sharma',
  },
  {
    quote: 'We, as a family, have been super happy with the interiors done by Build Your Home Interiors. Our project was completed and handed over before the proposed date, and it was finished perfectly.',
    author: 'Mrs. Neelam Jolly',
  },
  {
    quote: 'Getting the remodelling done for our duplex house was exciting but also challenging. I am so relieved that professional designers from Build Your Home Interiors came through. I love how my home looks.',
    author: 'Mr. Manoj Kumar',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const animateTo = useCallback((nextIndex: number) => {
    if (!quoteRef.current) return;

    const tl = gsap.timeline();
    tl.to(quoteRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(nextIndex);
      },
    });

    tl.fromTo(
      quoteRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      '+=0.1'
    );
  }, []);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % testimonials.length;
    animateTo(next);
  }, [activeIndex, animateTo]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length;
    animateTo(prev);
  }, [activeIndex, animateTo]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        if (quoteRef.current) {
          gsap.to(quoteRef.current, {
            opacity: 0,
            x: -30,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              // state update will happen in the next tick
            },
          });
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 }
          );
        }
        return next;
      });
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-left',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.testimonials-right',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-soft-cream py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-16 items-center">
          {/* Left - Title */}
          <div className="testimonials-left">
            <div className="mb-8">
              <PillBadge text="Testimonials" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-medium text-charcoal tracking-tight mb-6">
              What Our <span className="text-champagne-gold">Clients</span> Say
            </h2>
            <p className="text-warm-grey text-base leading-relaxed">
              Our greatest achievement is client satisfaction. Explore the stories behind the spaces we've transformed.
            </p>
          </div>

          {/* Right - Carousel */}
          <div className="testimonials-right relative">
            {/* Decorative quote */}
            <span className="absolute -top-8 left-0 text-[120px] font-light text-champagne-gold/20 leading-none select-none">
              &ldquo;
            </span>

            <div ref={quoteRef} className="relative z-10 pt-12">
              <p className="text-charcoal text-lg lg:text-xl font-light italic leading-relaxed mb-8">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-champagne-gold" />
                <span className="text-warm-grey text-sm font-medium tracking-wide">
                  {testimonials[activeIndex].author}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full border border-light-border flex items-center justify-center text-charcoal hover:border-champagne-gold hover:text-champagne-gold transition-colors duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full border border-light-border flex items-center justify-center text-charcoal hover:border-champagne-gold hover:text-champagne-gold transition-colors duration-300"
              >
                <ChevronRight size={18} />
              </button>
              <div className="ml-4 flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => animateTo(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'bg-champagne-gold w-6' : 'bg-light-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
