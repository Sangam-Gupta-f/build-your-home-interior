import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillBadge from '@/components/PillBadge';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    image: '/images/blog-1.jpg',
    title: 'How Interior Design Transforms Everyday Living',
    excerpt: 'For most homeowners, the excitement of seeing a new design come to life is unparalleled. The right interior can elevate mood, productivity, and comfort...',
  },
  {
    image: '/images/blog-2.jpg',
    title: 'Why Integrated Architecture and Interior Design Matters',
    excerpt: 'Ever felt like you\'re playing a game of telephone between your architect and interior designer? An integrated approach eliminates these communication gaps...',
  },
  {
    image: '/images/blog-3.jpg',
    title: 'How to Choose the Right Interior Design Partner for Your Home',
    excerpt: 'Most homeowners approach the search for an interior designer the wrong way. Here\'s what you should actually look for when selecting a design partner...',
  },
];

function BlogCard({ image, title, excerpt }: { image: string; title: string; excerpt: string }) {
  return (
    <div className="blog-card bg-white border border-light-border rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,30,30,0.08)] transition-all duration-400">
      <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-7">
        <h3 className="text-charcoal text-lg font-medium leading-snug mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-warm-grey text-sm leading-relaxed mb-4 line-clamp-2">
          {excerpt}
        </p>
        <span className="inline-flex items-center text-xs font-medium tracking-[0.08em] uppercase text-champagne-gold link-underline cursor-pointer">
          Read More
        </span>
      </div>
    </div>
  );
}

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.blog-header-item').forEach((el, i) => {
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

      gsap.utils.toArray<HTMLElement>('.blog-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.blog-grid',
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
    <section ref={sectionRef} className="bg-cream py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="blog-header-item flex justify-center mb-8">
            <PillBadge text="Blogs" />
          </div>
          <h2 className="blog-header-item text-3xl lg:text-5xl font-medium text-charcoal tracking-tight">
            Latest <span className="text-champagne-gold">Blogs</span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
