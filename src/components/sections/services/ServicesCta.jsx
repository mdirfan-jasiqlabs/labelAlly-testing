import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../common/Container';
import Button from '../../common/Button';
import servicesData from '../../../data/services.json';
import { MotionSection } from '../../motion';

/**
 * ServicesCta — Final call-to-action block on the Services page.
 * Content from services.json; styling uses semantic Tailwind tokens only.
 */
function ServicesCta() {
  const { cta } = servicesData;

  if (!cta || cta.enabled === false) return null;
  if (!cta.heading || !cta.primaryCta) return null;

  return (
    <section
      role="region"
      aria-labelledby="services-cta-heading"
      className="relative w-full overflow-hidden bg-surface-muted dark:bg-theme-section section-spacing border-t border-theme-border/40 dark:border-theme-border/50 transition-colors duration-250"
    >
      <Container size="2xl" className="relative z-10">
        <MotionSection
          className={[
            'mx-auto max-w-3xl',
            'flex flex-col items-center text-center',
            'gap-5 sm:gap-6',
            'rounded-2xl md:rounded-3xl',
            'bg-surface-card dark:bg-theme-card',
            'border border-theme-border/60 dark:border-theme-border/50',
            'shadow-sm dark:shadow-theme',
            'px-6 py-12 sm:px-10 sm:py-14 md:px-14 md:py-16',
          ].join(' ')}
        >
          <h2
            id="services-cta-heading"
            className="font-heading font-black tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl md:text-[2.5rem] text-ink-primary dark:text-theme-heading max-w-xl text-balance"
          >
            {cta.heading}
          </h2>

          <div
            aria-hidden="true"
            className="h-1 w-16 sm:w-20 bg-gradient-to-r from-amber-400 via-pink-500 to-teal-400 rounded-full"
          />

          {cta.description && (
            <p className="text-[0.92rem] sm:text-base md:text-lg leading-relaxed text-ink-secondary dark:text-theme-body max-w-lg">
              {cta.description}
            </p>
          )}

          <div className="mt-2 sm:mt-3 w-full sm:w-auto">
            <Button
              as={Link}
              to={cta.primaryCta.href}
              aria-label={cta.primaryCta.ariaLabel}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight size={18} aria-hidden="true" />}
            >
              {cta.primaryCta.label}
            </Button>
          </div>
        </MotionSection>
      </Container>
    </section>
  );
}

export default ServicesCta;
