import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillBadge from '@/components/PillBadge';

gsap.registerPlugin(ScrollTrigger);

const architectureServices = [
  {
    icon: '/icons/service-villa.png',
    title: 'Modern Villas',
    description: 'Designing modern villas and luxury homes involves creating spacious, elegant residences that blend comfort with architectural excellence.',
  },
  {
    icon: '/icons/service-facade.png',
    title: 'Facade Design',
    description: 'Facade design focuses on the exterior appearance of a building. It enhances the visual identity through thoughtful selection of materials, textures, and architectural elements.',
  },
  {
    icon: '/icons/service-management.png',
    title: 'Project Management',
    description: 'Construction project management ensures that every stage is executed efficiently. It involves planning, budgeting, coordination, site supervision, and quality control.',
  },
];

const interiorServices = [
  {
    icon: '/icons/service-turnkey.png',
    title: 'Turnkey Solution',
    description: 'A turnkey interior solution offers end-to-end project execution, covering design, material sourcing, manufacturing, installation, and final styling.',
  },
  {
    icon: '/icons/service-kitchen.png',
    title: 'Modular Kitchen',
    description: 'Modular kitchens are designed for efficiency, organization, and modern living. They feature customized cabinets, smart storage, and sleek finishes.',
  },
  {
    icon: '/icons/service-wardrobe.png',
    title: 'Modular Wardrobe',
    description: 'Modular wardrobes provide customized storage solutions designed to suit individual lifestyle needs with organized compartments.',
  },
  {
    icon: '/icons/service-renovation.png',
    title: 'Home Renovation',
    description: 'Home renovation services transform existing spaces to improve functionality, comfort, and aesthetics with modern design sensibilities.',
  },
];

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div
      className="bg-white border border-light-border rounded-2xl p-8 lg:p-10 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,30,30,0.08)] hover:border-champagne-gold/40 group"
      data-reveal
    >
      <img src={icon} alt={title} className="w-12 h-12 mb-6 object-contain" />
      <h3 className="text-xl lg:text-2xl font-medium text-charcoal tracking-tight mb-4">{title}</h3>
      <div className="w-full h-px bg-light-border mb-4" />
      <p className="text-warm-grey text-sm lg:text-base leading-relaxed mb-6">{description}</p>
      <span className="inline-flex items-center text-xs font-medium tracking-[0.08em] uppercase text-champagne-gold link-underline cursor-pointer">
        Learn More
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-2">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}

export default function Services() {
  const archRef = useRef<HTMLDivElement>(null);
  const intRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Architecture cards
      gsap.utils.toArray<HTMLElement>('[data-arch-reveal]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: archRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });

      // Interior cards
      gsap.utils.toArray<HTMLElement>('[data-int-reveal]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: intRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="bg-cream py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        {/* Architecture Design */}
        <div ref={archRef} className="mb-20 lg:mb-28">
          <div className="mb-10" data-arch-reveal>
            <PillBadge text="Our Services" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-medium text-charcoal tracking-tight mb-5" data-arch-reveal>
            Architecture Design
          </h2>
          <p className="text-warm-grey text-lg lg:text-xl font-light leading-relaxed max-w-[800px]" data-arch-reveal>
            Architectural design is the foundation of every successful project. It focuses on planning functional layouts, aesthetic structures, and efficient use of space.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {architectureServices.map((service) => (
              <div key={service.title} data-arch-reveal>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>

        {/* Interior Design */}
        <div ref={intRef}>
          <div className="mb-10" data-int-reveal>
            <PillBadge text="Interior Design" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-medium text-charcoal tracking-tight mb-5" data-int-reveal>
            Interior Design
          </h2>
          <p className="text-warm-grey text-lg lg:text-xl font-light leading-relaxed max-w-[800px]" data-int-reveal>
            Interior design focuses on creating functional, comfortable, and visually appealing spaces that reflect the client's lifestyle and personality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {interiorServices.map((service) => (
              <div key={service.title} data-int-reveal>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
