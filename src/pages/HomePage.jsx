import HeroSection         from '../components/sections/home/HeroSection';
import PlatformStrip       from '../components/sections/home/PlatformStrip';
import AboutSection        from '../components/sections/home/AboutSection';
import ContentProductionSection from '../components/sections/home/ContentProductionSection';
import ServicesSection     from '../components/sections/home/ServicesSection';
import HowItWorksSection   from '../components/sections/home/HowItWorksSection';
import ArtistsSection      from '../components/sections/home/ArtistsSection';
import WhatWeDoSection     from '../components/sections/home/WhatWeDoSection';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';
import SEO                 from '../components/common/SEO';

/**
 * HomePage — Route: /
 *
 * Section order:
 * 1. HeroSection
 * 2. PlatformStrip
 * 3. AboutSection
 * 4. ContentProductionSection
 * 5. HowItWorksSection
 * 6. ArtistsSection
 * 7. WhatWeDoSection
 * 8. ServicesSection
 * 9. TestimonialsSection
 */
function HomePage() {
  return (
    <main aria-label="LabelAlly Entertainment homepage">
      <SEO
        description="Grow your music business with professional music distribution, YouTube channel management, content rights management, Content ID, OTT distribution, and revenue optimization services."
        canonical="/"
        type="website"
      />
      <HeroSection />
      <PlatformStrip />
      <AboutSection />
      <ContentProductionSection />
      <HowItWorksSection />
      <ArtistsSection />
      <WhatWeDoSection />
      <ServicesSection />
      <TestimonialsSection />
    </main>
  );
}

export default HomePage;
