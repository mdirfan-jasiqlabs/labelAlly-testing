import HeroSection         from '../components/sections/home/HeroSection';
import PlatformStrip       from '../components/sections/home/PlatformStrip';
import AboutSection        from '../components/sections/home/AboutSection';
import ServicesSection     from '../components/sections/home/ServicesSection';
import HowItWorksSection   from '../components/sections/home/HowItWorksSection';

/**
 * HomePage — Route: /
 *
 * Phase 4 Complete: All five homepage sections in final order.
 *
 * Section order:
 * 1. HeroSection        — above-the-fold hero
 * 2. PlatformStrip      — distribution platform names
 * 3. AboutSection       — company intro + 4 service value cards
 * 4. ServicesSection    — 6 services card grid
 * 5. HowItWorksSection  — 4-step process + CTA
 */
function HomePage() {
  return (
    <main aria-label="LabelAlly Entertainment homepage">
      <HeroSection />
      <PlatformStrip />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
    </main>
  );
}

export default HomePage;
