import ServicesHero from '../components/sections/services/ServicesHero';
import ServicesGrid from '../components/sections/services/ServicesGrid';
import ServicesCta  from '../components/sections/services/ServicesCta';

/**
 * ServicesPage — Route: /services
 *
 * Renders the full Services page layout.
 * Content is sourced from src/data/services.json.
 */
function ServicesPage() {
  return (
    <main aria-label="LabelAlly Entertainment Services">
      <ServicesHero />
      <ServicesGrid />
      <ServicesCta />
    </main>
  );
}

export default ServicesPage;
