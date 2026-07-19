import Container from '../../common/Container';
import servicesData from '../../../data/services.json';

/**
 * ServicesHero — Banner ("Service") + intro (badge, title, description).
 */
function ServicesHero() {
  const { hero } = servicesData;

  if (!hero || hero.enabled === false) return null;

  const pageTitle = hero.pageTitle || 'Service';

  return (
    <section aria-labelledby="services-page-title" className="relative w-full">
      {/* Banner */}
      <div
        className={[
          'relative z-0 w-full overflow-hidden',
          'bg-gradient-to-b from-teal-50/70 via-teal-50/30 to-surface-page',
          'dark:from-teal-950/30 dark:via-theme-page dark:to-theme-page',
          'pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 md:pb-24',
          'transition-colors duration-250',
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          className="absolute left-4 top-10 sm:left-8 sm:top-14 w-6 h-6 text-accent-500/40 dark:text-accent-400/25 hidden md:block pointer-events-none select-none"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <polyline points="3 17 9 11 15 17 21 11" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="absolute left-12 top-1/2 w-3.5 h-3.5 text-brand-pink/35 dark:text-brand-pink/20 rotate-12 hidden lg:block pointer-events-none select-none"
        >
          <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
            <path d="M8 2 L14 14 H2 Z" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="absolute left-20 bottom-28 w-3 h-3 text-violet-500/30 dark:text-violet-400/20 -rotate-6 hidden lg:block pointer-events-none select-none"
        >
          <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
            <path d="M8 2 L14 14 H2 Z" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="absolute right-10 top-12 sm:right-16 sm:top-16 w-12 h-4 bg-brand-orange/35 dark:bg-brand-orange/20 rounded-full rotate-45 hidden md:block pointer-events-none select-none"
        />

        <div
          aria-hidden="true"
          className="absolute right-24 top-28 w-2.5 h-2.5 rounded-full bg-violet-500/35 dark:bg-violet-400/20 hidden lg:block pointer-events-none select-none"
        />

        <div
          aria-hidden="true"
          className="absolute right-8 top-24 w-8 h-8 border-2 border-brand-pink/30 dark:border-brand-pink/20 rounded-sm rotate-45 hidden lg:block pointer-events-none select-none"
        />

        <Container className="relative z-10 flex flex-col items-center text-center">
          <h1
            id="services-page-title"
            className="font-heading font-black tracking-tight text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-ink-primary dark:text-theme-heading leading-tight text-balance px-2"
          >
            {pageTitle}
          </h1>

          <div className="brand-underline mt-5 md:mt-6" aria-hidden="true" />
        </Container>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full overflow-hidden leading-none"
        >
          <svg
            className="relative block w-full h-12 sm:h-16 md:h-20 text-surface-page dark:text-theme-page"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,45 L1440,80 L0,80 Z"
            />
          </svg>
        </div>
      </div>

      {/* Intro — badge + title + description */}
      <div
        className={[
          'relative z-10 w-full',
          'bg-surface-page dark:bg-theme-page',
          'pt-2 sm:pt-4 pb-10 sm:pb-12 md:pb-14',
          'transition-colors duration-250',
        ].join(' ')}
      >
        <Container className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {hero.badge && (
            <span
              className={[
                'inline-flex items-center',
                'px-3.5 py-1.5',
                'rounded-md',
                'text-xs font-bold tracking-wide',
                'text-white',
                'bg-brand-orange',
                'shadow-sm',
                'mb-5 sm:mb-6',
              ].join(' ')}
            >
              {hero.badge}
            </span>
          )}

          {hero.title && (
            <>
              <h2
                id="services-hero-title"
                className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl text-ink-primary dark:text-theme-heading tracking-tight leading-snug text-balance px-2"
              >
                {hero.title}
              </h2>
              <div className="brand-underline mt-4 sm:mt-5" aria-hidden="true" />
            </>
          )}

          {hero.description && (
            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-ink-muted dark:text-theme-muted leading-relaxed max-w-2xl px-2">
              {hero.description}
            </p>
          )}
        </Container>
      </div>
    </section>
  );
}

export default ServicesHero;
