import HeroSection         from '../components/sections/home/HeroSection';
import PlatformStrip       from '../components/sections/home/PlatformStrip';
import AboutSection        from '../components/sections/home/AboutSection';
import ServicesSection     from '../components/sections/home/ServicesSection';
import HowItWorksSection   from '../components/sections/home/HowItWorksSection';
import WhyChooseSection    from '../components/sections/home/WhyChooseSection';
import ArtistsSection      from '../components/sections/home/ArtistsSection';
import AnalyticsSection    from '../components/sections/home/AnalyticsSection';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';
import FinalCtaSection     from '../components/sections/home/FinalCtaSection';

/**
 * HomePage — Route: /
 *
 * Phase 5 Complete: Renders all ten homepage sections in sequence.
 * Section order:
 * 1. HeroSection
 * 2. PlatformStrip
 * 3. AboutSection
 * 4. ServicesSection
 * 5. HowItWorksSection
 * 6. WhyChooseSection
 * 7. ArtistsSection
 * 8. AnalyticsSection
 * 9. TestimonialsSection
 * 10. FinalCtaSection
 */
function HomePage() {
  return (
    <main aria-label="LabelAlly Entertainment homepage">
      <HeroSection />
      <PlatformStrip />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <ArtistsSection />
      <AnalyticsSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </main>
  );
}

export default HomePage;
