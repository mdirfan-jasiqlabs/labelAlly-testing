import HeroSection         from '../components/sections/home/HeroSection';
import PlatformStrip       from '../components/sections/home/PlatformStrip';
import AboutSection        from '../components/sections/home/AboutSection';
import HowItWorksSection   from '../components/sections/home/HowItWorksSection';
import ArtistsSection      from '../components/sections/home/ArtistsSection';
import WhatWeDoSection     from '../components/sections/home/WhatWeDoSection';
import AnalyticsSection    from '../components/sections/home/AnalyticsSection';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';
import FinalCtaSection     from '../components/sections/home/FinalCtaSection';
import SEO                 from '../components/common/SEO';

/**
 * HomePage — Route: /
 *
 * Phase 5 Complete: Renders all homepage sections in sequence.
 * Section order:
 * 1. HeroSection
 * 2. PlatformStrip
 * 3. AboutSection
 * 4. HowItWorksSection
 * 5. ArtistsSection
 * 6. WhatWeDoSection
 * 7. AnalyticsSection
 * 8. TestimonialsSection
 * 9. FinalCtaSection
 */
function HomePage() {
  return (
    <main aria-label="LabelAlly Entertainment homepage">
      <SEO
        title=""
        description="Grow your music business with professional music distribution, YouTube channel management, content rights management, Content ID, OTT distribution, and revenue optimization services."
        canonical="https://label-ally-testing.vercel.app/"
        type="website"
      />
      <HeroSection />
      <PlatformStrip />
      <AboutSection />
      <HowItWorksSection />
      <ArtistsSection />
      <WhatWeDoSection />
      <AnalyticsSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </main>
  );
}

export default HomePage;
