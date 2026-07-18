import AboutHero        from '../components/sections/about/AboutHero';
import CompanyOverview from '../components/sections/about/CompanyOverview';
import MissionVision   from '../components/sections/about/MissionVision';
import CoreValues      from '../components/sections/about/CoreValues';
import AboutCta        from '../components/sections/about/AboutCta';

/**
 * AboutPage — Route: /about
 *
 * Renders the full About page layout.
 * Content is sourced from src/data/about.json.
 */
function AboutPage() {
  return (
    <main aria-label="About LabelAlly Entertainment">
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <CoreValues />
      <AboutCta />
    </main>
  );
}

export default AboutPage;
