import AboutPageBanner     from '../components/about/AboutPageBanner';
import AboutIntroSection   from '../components/about/AboutIntroSection';
import MissionVisionSection from '../components/about/MissionVisionSection';
import TeamSection          from '../components/about/TeamSection';
import TestimonialsSection  from '../components/sections/home/TestimonialsSection';
import SEO               from '../components/common/SEO';

/**
 * AboutPage — Route: /about
 *
 * Renders the full About page layout.
 * Content is sourced from src/data/aboutData.js.
 */
function AboutPage() {
  return (
    <main aria-label="About LabelAlly Entertainment">
      <SEO
        title="About LabelAlly Entertainment | Music Industry Solutions"
        description="Learn about LabelAlly Entertainment and our approach to supporting artists, labels, and content owners with digital distribution, rights management, and revenue growth."
        canonical="https://label-ally-testing.vercel.app/about"
      />
      <AboutPageBanner />
      <AboutIntroSection />
      <MissionVisionSection />
      <TeamSection />
      <TestimonialsSection />
    </main>
  );
}

export default AboutPage;
