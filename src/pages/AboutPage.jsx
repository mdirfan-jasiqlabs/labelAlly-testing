import AboutHero        from '../components/sections/about/AboutHero';
import CompanyOverview from '../components/sections/about/CompanyOverview';
import MissionVision   from '../components/sections/about/MissionVision';
import CoreValues      from '../components/sections/about/CoreValues';
import AboutCta        from '../components/sections/about/AboutCta';
import SEO             from '../components/common/SEO';

/**
 * AboutPage — Route: /about
 *
 * Renders the full About page layout.
 * Content is sourced from src/data/about.json.
 */
function AboutPage() {
  return (
    <main aria-label="About LabelAlly Entertainment">
      <SEO
        title="About LabelAlly Entertainment | Music Industry Solutions"
        description="Learn about LabelAlly Entertainment and our approach to supporting artists, labels, and content owners with digital distribution, rights management, and revenue growth."
        canonical="https://label-ally-testing.vercel.app/about"
      />
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <CoreValues />
      <AboutCta />
    </main>
  );
}

export default AboutPage;
