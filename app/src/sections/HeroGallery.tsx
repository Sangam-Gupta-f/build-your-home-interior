import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    image: '/images/hero-interior-1.jpg',
    tagline: 'ELEVATED LIVING THROUGH DESIGN',
    title: 'Ultra Luxury Residence, Hyderabad',
    description: 'A refined residential interior crafted to deliver a sophisticated and immersive living experience through premium materials, bespoke detailing, and carefully layered spatial elements.',
  },
  {
    image: '/images/hero-interior-2.jpg',
    tagline: 'TIMELESS ELEGANCE',
    title: 'The Pearl Suite, Pune',
    description: 'A master bedroom sanctuary where traditional craftsmanship meets contemporary comfort, creating a serene retreat with warm wood tones and ambient lighting.',
  },
  {
    image: '/images/hero-interior-3.jpg',
    tagline: 'CULINARY PERFECTION',
    title: 'Gourmet Kitchen, Mumbai',
    description: 'A modern kitchen designed for the culinary enthusiast, featuring marble countertops, brass accents, and smart storage solutions that blend beauty with functionality.',
  },
  {
    image: '/images/hero-interior-4.jpg',
    tagline: 'GRAND ENTERTAINING',
    title: 'The Royal Dining, Delhi NCR',
    description: 'An expansive dining space that celebrates togetherness, with a statement chandelier, floor-to-ceiling views, and furnishings that exude understated luxury.',
  },
  {
    image: '/images/hero-interior-5.jpg',
    tagline: 'INSPIRED WORKSPACES',
    title: 'Executive Study, Goa',
    description: 'A thoughtfully designed home office that fosters creativity and focus, with rich wood textures, curated bookshelves, and abundant natural light.',
  },
];

export default function HeroGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === slides.length) {
          setLoaded(true);
        }
      };
    });
    // Fallback: show after 3s even if not all loaded
    const timeout = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const animateTextIn = useCallback((index: number) => {
    const slide = slides[index];
    if (!textRef.current) return;

    const tagline = textRef.current.querySelector('[data-tagline]');
    const title = textRef.current.querySelector('[data-title]');
    const desc = textRef.current.querySelector('[data-desc]');
    const cta = textRef.current.querySelector('[data-cta]');

    if (tagline) tagline.textContent = slide.tagline;
    if (title) title.textContent = slide.title;
    if (desc) desc.textContent = slide.description;

    gsap.set([tagline, title, desc, cta], { opacity: 0, y: 20 });

    const tl = gsap.timeline();
    tl.to(tagline, { opacity: 0.85, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to(desc, { opacity: 0.8, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .to(cta, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

    return tl;
  }, []);

  const transitionTo = useCallback((nextIndex: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const currentLayer = currentIndexRef.current % 2 === 0 ? layerARef.current : layerBRef.current;
    const nextLayer = currentIndexRef.current % 2 === 0 ? layerBRef.current : layerARef.current;

    if (!currentLayer || !nextLayer) {
      isAnimatingRef.current = false;
      return;
    }

    // Set next image
    const nextImg = nextLayer.querySelector('img');
    if (nextImg) nextImg.src = slides[nextIndex].image;

    // Kill any running timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        currentIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      },
    });

    timelineRef.current = tl;

    // Text out
    tl.to(textRef.current?.children || [], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
      stagger: 0.05,
    });

    // Image transition
    tl.set(nextLayer, {
      clipPath: 'inset(100% 0% 0%)',
      scale: 1.15,
      zIndex: 2,
    }, '>');

    tl.to(currentLayer, {
      clipPath: 'inset(0% 0% 100%)',
      scale: 1.15,
      duration: 1.2,
      ease: 'none',
    }, '<');

    tl.to(nextLayer, {
      clipPath: 'inset(0%)',
      scale: 1,
      duration: 1.2,
      ease: 'none',
    }, '<');

    tl.set(currentLayer, { zIndex: 1 });
    tl.set(nextLayer, { zIndex: 2 });

    // Text in
    tl.call(() => animateTextIn(nextIndex), [], '+=0.1');
  }, [animateTextIn]);

  // Entrance animation
  useEffect(() => {
    if (!loaded) return;

    // Set initial image
    if (layerARef.current) {
      const img = layerARef.current.querySelector('img');
      if (img) img.src = slides[0].image;
    }

    const tl = gsap.timeline();

    // Initial fade in
    if (layerARef.current) {
      tl.fromTo(
        layerARef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
      );
    }

    // Text entrance
    const taglineEl = textRef.current?.querySelector('[data-tagline]');
    const titleEl = textRef.current?.querySelector('[data-title]');
    const descEl = textRef.current?.querySelector('[data-desc]');
    const ctaEl = textRef.current?.querySelector('[data-cta]');

    if (taglineEl) {
      tl.fromTo(taglineEl, { opacity: 0, y: 20 }, { opacity: 0.85, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.6');
    }
    if (titleEl) {
      tl.fromTo(titleEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
    }
    if (descEl) {
      tl.fromTo(descEl, { opacity: 0, y: 15 }, { opacity: 0.8, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4');
    }
    if (ctaEl) {
      tl.fromTo(ctaEl, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    }
  }, [loaded]);

  // Auto-advance
  useEffect(() => {
    if (!loaded) return;

    intervalRef.current = setInterval(() => {
      const next = (currentIndexRef.current + 1) % slides.length;
      transitionTo(next);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loaded, transitionTo]);

  if (!loaded) {
    return (
      <div className="w-full h-screen bg-charcoal flex items-center justify-center">
        <div className="text-white/50 text-sm tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-charcoal">
      {/* Image Layer A */}
      <div
        ref={layerARef}
        className="absolute inset-0 will-change-[clip-path,transform]"
        style={{ clipPath: 'inset(0%)', zIndex: 2 }}
      >
        <img
          src=""
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(30,30,30,0.55) 0%, rgba(30,30,30,0.15) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Image Layer B */}
      <div
        ref={layerBRef}
        className="absolute inset-0 will-change-[clip-path,transform]"
        style={{ clipPath: 'inset(100% 0% 0%)', zIndex: 1 }}
      >
        <img
          src=""
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(30,30,30,0.55) 0%, rgba(30,30,30,0.15) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="absolute bottom-20 left-6 lg:left-16 z-10 max-w-[700px]"
      >
        <p data-tagline className="text-white text-xs tracking-[0.12em] font-medium mb-4 opacity-0">
          {slides[0].tagline}
        </p>
        <h1 data-title className="text-white text-4xl lg:text-6xl font-normal tracking-tight leading-[0.95] mb-6 opacity-0">
          {slides[0].title}
        </h1>
        <p data-desc className="text-white/80 text-base lg:text-lg font-light leading-relaxed max-w-[520px] mb-6 opacity-0">
          {slides[0].description}
        </p>
        <a
          href="#projects"
          data-cta
          className="inline-flex items-center gap-3 text-white text-xs tracking-[0.08em] font-medium uppercase group opacity-0"
        >
          <span className="link-underline">Read More</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Slide Counter */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i !== activeIndex) transitionTo(i);
            }}
            className={`text-xs font-medium transition-all duration-300 ${
              i === activeIndex ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
        <div className="w-px h-8 bg-white/20 my-1" />
        <span className="text-white/40 text-xs">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
