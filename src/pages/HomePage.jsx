import HeroSection         from '../components/sections/home/HeroSection';
import PlatformStrip       from '../components/sections/home/PlatformStrip';
import AboutSection        from '../components/sections/home/AboutSection';
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
 * 4. HowItWorksSection
 * 5. ArtistsSection
 * 6. WhatWeDoSection
 * 7. ServicesSection
 * 8. TestimonialsSection
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
      <HowItWorksSection />
      <ArtistsSection />
      <WhatWeDoSection />
      <ServicesSection />
      <TestimonialsSection />
    </main>
  );
}

export default HomePage;
