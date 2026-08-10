import ServicesHero from '../components/sections/services/ServicesHero';
import ServicesGrid from '../components/sections/services/ServicesGrid';
import ProcessSection from '../components/sections/services/ProcessSection';
import DigitalPartnersSection from '../components/sections/services/DigitalPartnersSection';
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
        title="YouTube Channel Management & Music Services | LabelAlly"
        description="Explore LabelAlly Entertainment services including YouTube channel management, rights management, monetization support, and music distribution management for artists and labels."
        canonical="/services"
      />
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <DigitalPartnersSection />
      <ServicesCta />
    </main>
  );
}

export default ServicesPage;
