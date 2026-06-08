import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillBadge from '@/components/PillBadge';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: '1', title: 'Meet Your Designer', description: 'We begin with a conversation to understand your ideas, priorities, and how you want the space to function.' },
  { number: '2', title: 'Understand the Site', description: 'We study the site conditions, measurements, and project requirements to create a clear project brief.' },
  { number: '3', title: 'Shape the Design Vision', description: 'Layouts, spatial planning, and the overall design direction begin to take form.' },
  { number: '4', title: 'Refine the Details', description: 'Materials, finishes, and design elements are carefully selected to bring the concept together.' },
  { number: '5', title: 'Bring the Design to Life', description: 'Detailed drawings guide execution while our team coordinates with vendors and monitors the progress.' },
  { number: '6', title: 'Move In with Confidence', description: 'Once everything is complete, we hand over the space and remain available for any support you may need.' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header elements
      gsap.utils.toArray<HTMLElement>('.process-header-item').forEach((el, i) => {
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

      // Process cards stagger
      gsap.utils.toArray<HTMLElement>('.process-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.process-grid',
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
    <section id="process" ref={sectionRef} className="bg-cream py-20 lg:py-32">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="process-header-item flex justify-center mb-8">
            <PillBadge text="Our Process" />
          </div>
          <h2 className="process-header-item text-3xl lg:text-5xl font-medium text-charcoal tracking-tight mb-6">
            What We <span className="text-champagne-gold">Do</span>
          </h2>
          <p className="process-header-item text-warm-grey text-lg lg:text-xl font-light leading-relaxed max-w-[720px] mx-auto">
            At Build Your Home Interiors, we are committed to delivering a seamless, personalized, and high-quality design experience. Our client-focused approach ensures that every project is executed with creativity, precision, and professionalism.
          </p>
        </div>

        {/* Process Grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-card bg-white border border-light-border rounded-2xl p-8 lg:p-10 text-center"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full border-2 border-champagne-gold flex items-center justify-center mb-6">
                <span className="text-4xl lg:text-6xl font-light text-champagne-gold">{step.number}</span>
              </div>
              <h3 className="text-lg lg:text-xl font-medium text-charcoal mb-3">{step.title}</h3>
              <p className="text-warm-grey text-sm lg:text-base leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
