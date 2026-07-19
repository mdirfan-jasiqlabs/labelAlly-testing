import { useState } from 'react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import ServiceCard from './ServiceCard';
import ServicesControls from './ServicesControls';
import servicesData from '../../../data/services.json';

/**
 * ServicesGrid — Displays the detailed grid of services with batch-based Show More/Less controls.
 */
function ServicesGrid() {
  const { list } = servicesData;

  if (!list) return null;

  const { controls, items } = list;
  const batchSize = controls?.batchSize ?? 3;
  const showMoreLabel = controls?.showMoreLabel ?? 'Show More';
  const showLessLabel = controls?.showLessLabel ?? 'Show Less';

  // Filter enabled services
  const enabledServices = items.filter((item) => item.enabled);
  const totalServices = enabledServices.length;

  // State for visible service count
  const [visibleCount, setVisibleCount] = useState(batchSize);

  // Handle Show More
  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, totalServices));
  };

  // Handle Show Less with batch boundary logic
  const handleShowLess = () => {
    setVisibleCount((prev) => {
      if (prev <= batchSize) return batchSize;

      // Calculate previous batch boundary
      const previousBoundary = Math.ceil((prev - batchSize) / batchSize) * batchSize;
      return Math.max(batchSize, previousBoundary);
    });
  };

  // Get visible services
  const visibleServices = enabledServices.slice(0, visibleCount);

  // If fewer than 3 enabled services, show all without controls
  if (totalServices <= batchSize) {
    return (
      <section
        aria-labelledby="services-list-heading"
        className="py-16 md:py-24 bg-white dark:bg-theme-section border-t border-neutral-100 dark:border-theme-border/30"
      >
        <Container>
          <SectionHeading
            titleAs="h2"
            title={list.heading}
            description={list.description}
            align="center"
            className="mb-14"
          />

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none p-0 m-0">
            {visibleServices.map((service) => (
              <li key={service.id} className="h-full">
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="services-list-heading"
      className="py-16 md:py-24 bg-white dark:bg-theme-section border-t border-neutral-100 dark:border-theme-border/30"
    >
      <Container>
        <SectionHeading
          titleAs="h2"
          title={list.heading}
          description={list.description}
          align="center"
          className="mb-14"
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none p-0 m-0">
          {visibleServices.map((service) => (
            <li key={service.id} className="h-full">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        <ServicesControls
          visibleCount={visibleCount}
          totalCount={totalServices}
          batchSize={batchSize}
          showMoreLabel={showMoreLabel}
          showLessLabel={showLessLabel}
          onShowMore={handleShowMore}
          onShowLess={handleShowLess}
        />
      </Container>
    </section>
  );
}

export default ServicesGrid;
