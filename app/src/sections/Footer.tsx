import { Phone, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-deep-espresso py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex flex-col leading-tight mb-4">
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-white">
                BUILD YOUR HOME
              </span>
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-white">
                INTERIORS
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
              We transform your vision into beautifully crafted spaces.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Pune &middot; Mumbai &middot; Goa &middot; Delhi NCR &middot; Hyderabad
            </p>
          </div>

          {/* Column 2 - Collabs */}
          <div>
            <h4 className="text-champagne-gold text-xs font-medium tracking-[0.08em] uppercase mb-5">
              Collabs
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-white/70 text-sm hover:text-champagne-gold hover:opacity-100 transition-colors duration-300 cursor-pointer link-underline">
                  Design Partner
                </span>
              </li>
              <li>
                <span className="text-white/70 text-sm hover:text-champagne-gold hover:opacity-100 transition-colors duration-300 cursor-pointer link-underline">
                  Vendor Registration
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h4 className="text-champagne-gold text-xs font-medium tracking-[0.08em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-white/70 text-sm hover:text-champagne-gold transition-colors duration-300 link-underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/70 text-sm hover:text-champagne-gold transition-colors duration-300 link-underline">
                  Projects
                </a>
              </li>
              <li>
                <a href="#process" className="text-white/70 text-sm hover:text-champagne-gold transition-colors duration-300 link-underline">
                  Process
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div>
            <h4 className="text-champagne-gold text-xs font-medium tracking-[0.08em] uppercase mb-5">
              Connect With Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+918005124778"
                  className="flex items-center gap-3 text-white text-sm hover:text-champagne-gold transition-colors duration-300"
                >
                  <Phone size={16} />
                  +91 8005124778
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/buildyourhomeinteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white text-sm hover:text-champagne-gold transition-colors duration-300"
                >
                  <Instagram size={16} />
                  @buildyourhomeinteriors
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs tracking-wide">
            &copy; 2025 Build Your Home Interiors. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs hover:text-white/70 transition-colors duration-300 cursor-pointer">
              Terms & Conditions
            </span>
            <span className="text-white/20">&middot;</span>
            <span className="text-white/40 text-xs hover:text-white/70 transition-colors duration-300 cursor-pointer">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
