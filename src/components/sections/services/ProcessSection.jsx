import Container from '../../common/Container';
import ProcessImage from './ProcessImage';
import ProcessTimeline from './ProcessTimeline';
import ProcessHighlights from './ProcessHighlights';
import servicesData from '../../../data/services.json';
import { MotionItem } from '../../motion';

/**
 * ProcessSection — How It Works section with organic image and vertical timeline.
 */
function ProcessSection() {
  const { process } = servicesData;

  if (!process?.enabled) return null;

  return (
    <section
      role="region"
      aria-labelledby="process-heading"
      className="relative section-spacing bg-surface-muted dark:bg-theme-section overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute left-[5%] top-[10%] w-32 h-32 opacity-[0.12] dark:opacity-[0.06] hidden lg:block pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
          backgroundSize: '8px 8px',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-[8%] bottom-[15%] w-24 h-24 opacity-[0.10] dark:opacity-[0.05] hidden lg:block pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
          backgroundSize: '10px 10px',
        }}
      />

      <Container size="2xl" className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <MotionItem
            standalone
            variant="scale"
            className="w-full lg:w-[48%] flex justify-center lg:justify-start"
          >
            <ProcessImage />
          </MotionItem>

          <div className="w-full lg:w-[52%]">
            <ProcessTimeline />
          </div>
        </div>

        <MotionItem standalone className="mt-16 lg:mt-20">
          <ProcessHighlights />
        </MotionItem>
      </Container>
    </section>
  );
}

export default ProcessSection;
