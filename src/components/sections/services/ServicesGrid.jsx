import { useState } from 'react';
import Container from '../../common/Container';
import ServiceCard from './ServiceCard';
import ServicesControls from './ServicesControls';
import servicesData from '../../../data/services.json';

/**
 * ServicesGrid — Service cards with batch Show More / Show Less controls.
 */
function ServicesGrid() {
  const { list } = servicesData;
  const controls = list?.controls;
  const items = list?.items ?? [];
  const batchSize = controls?.batchSize ?? 3;
  const showMoreLabel = controls?.showMoreLabel ?? 'Show More';
  const showLessLabel = controls?.showLessLabel ?? 'Show Less';

  const enabledServices = items.filter((item) => item.enabled);
  const totalServices = enabledServices.length;

  const [visibleCount, setVisibleCount] = useState(batchSize);

  if (!list) return null;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, totalServices));
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => {
      if (prev <= batchSize) return batchSize;
      const previousBoundary = Math.ceil((prev - batchSize) / batchSize) * batchSize;
      return Math.max(batchSize, previousBoundary);
    });
  };

  const visibleServices = enabledServices.slice(0, visibleCount);
  const showControls = totalServices > batchSize;

  return (
    <section
      aria-labelledby="services-list-heading"
      className={[
        'relative w-full',
        'bg-surface-page dark:bg-theme-page',
        'pt-2 sm:pt-4 md:pt-6',
        'pb-14 sm:pb-16 md:pb-20 lg:pb-24',
        'transition-colors duration-250',
      ].join(' ')}
    >
      <h2 id="services-list-heading" className="sr-only">
        {list.heading || 'Services'}
      </h2>

      <Container>
        <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8 list-none p-0 m-0">
          {visibleServices.map((service) => (
            <li key={service.id} className="h-full min-w-0">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        {showControls && (
          <ServicesControls
            visibleCount={visibleCount}
            totalCount={totalServices}
            batchSize={batchSize}
            showMoreLabel={showMoreLabel}
            showLessLabel={showLessLabel}
            onShowMore={handleShowMore}
            onShowLess={handleShowLess}
          />
        )}
      </Container>
    </section>
  );
}

export default ServicesGrid;
