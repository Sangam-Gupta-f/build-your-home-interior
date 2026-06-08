import { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
        style={{ height: 80 }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-tight">
            <span className={`text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-white'}`}>
              BUILD YOUR HOME
            </span>
            <span className={`text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-white'}`}>
              INTERIORS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium tracking-[0.06em] nav-link-underline transition-colors duration-300 ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden lg:inline-flex items-center px-7 py-3 bg-charcoal text-white text-xs font-medium tracking-[0.08em] uppercase rounded-full hover:bg-champagne-gold transition-colors duration-300"
            >
              Get a Quote
            </a>
            <a
              href="https://www.instagram.com/buildyourhomeinteriors"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${scrolled ? 'text-charcoal hover:text-champagne-gold' : 'text-white hover:text-champagne-gold'}`}
            >
              <Instagram size={20} />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-white'}`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-charcoal transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col h-full px-8 py-6">
          <div className="flex justify-end">
            <button onClick={() => setMenuOpen(false)} className="text-white">
              <X size={28} />
            </button>
          </div>
          <div className="flex flex-col items-start justify-center flex-1 gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white text-3xl font-medium tracking-tight"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50 + 200}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
