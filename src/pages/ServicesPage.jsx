import ServicesHero from '../components/sections/services/ServicesHero';
import ServicesGrid from '../components/sections/services/ServicesGrid';
import ProcessSection from '../components/sections/services/ProcessSection';
import ServicesCta  from '../components/sections/services/ServicesCta';
import SEO          from '../components/common/SEO';

/**
 * ServicesPage — Route: /services
 *
 * Renders the full Services page layout.
 * Content is sourced from src/data/services.json.
 */
function ServicesPage() {
  return (
    <main aria-label="LabelAlly Entertainment Services">
      <SEO
        title="Music Distribution & Rights Management Services | LabelAlly"
        description="Explore LabelAlly Entertainment services, including music distribution, YouTube management, Content ID, rights management, OTT distribution, and revenue optimization."
        canonical="https://label-ally-testing.vercel.app/services"
      />
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <ServicesCta />
    </main>
  );
}

export default ServicesPage;
