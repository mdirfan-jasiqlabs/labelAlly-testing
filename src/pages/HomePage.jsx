import HeroSection         from '../components/sections/home/HeroSection';
import PlatformStrip       from '../components/sections/home/PlatformStrip';
import AboutSection        from '../components/sections/home/AboutSection';
import ServicesSection     from '../components/sections/home/ServicesSection';
import HowItWorksSection   from '../components/sections/home/HowItWorksSection';
import WhyChooseSection    from '../components/sections/home/WhyChooseSection';
import ArtistsSection      from '../components/sections/home/ArtistsSection';
import AnalyticsSection    from '../components/sections/home/AnalyticsSection';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';

/**
 * HomePage — Route: /
 *
 * Phase 5 Part 2: Renders Hero + Platform Strip + About + Services + How It Works + Why Choose + Artists + Analytics + Testimonials.
 * Part 3 will append the final CTA section.
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
    </main>
  );
}

export default HomePage;
