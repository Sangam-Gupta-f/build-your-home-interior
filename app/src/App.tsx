import Navigation from '@/sections/Navigation';
import HeroGallery from '@/sections/HeroGallery';
import Services from '@/sections/Services';
import About from '@/sections/About';
import Process from '@/sections/Process';
import StoryCTA from '@/sections/StoryCTA';
import Projects from '@/sections/Projects';
import Testimonials from '@/sections/Testimonials';
import Blog from '@/sections/Blog';
import Footer from '@/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';

export default function App() {
  return (
    <div className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <HeroGallery />
        <Services />
        <About />
        <Process />
        <StoryCTA />
        <Projects />
        <Testimonials />
        <Blog />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons */}
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}
