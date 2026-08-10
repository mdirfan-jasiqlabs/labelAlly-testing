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
import { buildHomepageStructuredData } from '../config/structuredData';

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
        title="LabelAlly Entertainment | YouTube Channel Management & Music Rights"
        description="LabelAlly Entertainment provides YouTube channel management, rights management, monetization support and music distribution management for artists and music labels."
        canonical="/"
        type="website"
        ogTitle="LabelAlly Entertainment"
        ogDescription="YouTube Channel Management, Rights Management, Monetization and Music Distribution Management for artists and music labels."
        jsonLd={buildHomepageStructuredData()}
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
