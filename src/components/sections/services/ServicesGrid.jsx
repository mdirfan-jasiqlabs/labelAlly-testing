import { useState } from 'react';
import Container from '../../common/Container';
import ServiceCard from './ServiceCard';
import ServicesControls from './ServicesControls';
import servicesData from '../../../data/services.json';
import { MotionStagger, MotionItem } from '../../motion';

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
        'pb-7 sm:pb-8 md:pb-10 lg:pb-12',
        'transition-colors duration-250',
      ].join(' ')}
    >
      <h2 id="services-list-heading" className="sr-only">
        {list.heading || 'Services'}
      </h2>

      <Container>
        <MotionStagger
          as="ul"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8 list-none p-0 m-0"
          stagger={0.08}
        >
          {visibleServices.map((service) => (
            <MotionItem key={service.id} as="li" className="h-full min-w-0">
              <ServiceCard service={service} />
            </MotionItem>
          ))}
        </MotionStagger>

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
