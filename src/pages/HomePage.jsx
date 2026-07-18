import HeroSection         from '../components/sections/home/HeroSection';
import PlatformStrip       from '../components/sections/home/PlatformStrip';
import AboutSection        from '../components/sections/home/AboutSection';
import ServicesSection     from '../components/sections/home/ServicesSection';
import HowItWorksSection   from '../components/sections/home/HowItWorksSection';
import WhyChooseSection     from '../components/sections/home/WhyChooseSection';
import ArtistsSection      from '../components/sections/home/ArtistsSection';

/**
 * HomePage — Route: /
 *
 * Phase 5 Part 1: Renders Hero + Platform Strip + About + Services + How It Works + Why Choose + Artists.
 * The final parts of Phase 5 will add the remaining sections.
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
    </main>
  );
}

export default HomePage;
