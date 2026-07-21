import Container from '../../common/Container';
import contactData from '../../../data/contact.json';
import { MotionSection } from '../../motion';

/**
 * ContactBanner — Premium Contact page hero with decorations and soft wave edge.
 */
function ContactBanner() {
  const { banner } = contactData;

  if (!banner?.enabled) return null;

  return (
    <section
      role="banner"
      aria-labelledby="contact-page-title"
      className={[
        'relative z-0 w-full overflow-hidden',
        'bg-gradient-to-b from-teal-50/40 via-surface-page to-surface-page',
        'dark:from-teal-950/25 dark:via-theme-page dark:to-theme-page',
        'section-spacing-hero contact-banner-overlap',
        'transition-colors duration-250',
      ].join(' ')}
    >
      {/* ── Decorative shapes (lg+, reduced on smaller screens) ── */}
      <div
        aria-hidden="true"
        className="contact-deco-zigzag w-6 h-6 text-accent-500/30 dark:text-accent-400/20 hidden lg:block pointer-events-none select-none"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <polyline points="3 17 9 11 15 17 21 11" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="contact-deco-capsule-left w-5 h-14 bg-teal-500/20 dark:bg-teal-400/15 rounded-full -rotate-45 hidden lg:block pointer-events-none select-none"
      />

      <div
        aria-hidden="true"
        className="contact-deco-triangle-left w-4 h-4 text-pink-500/25 dark:text-pink-400/15 rotate-12 hidden lg:block pointer-events-none select-none"
      >
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
          <path d="M8 2 L14 14 H2 Z" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="contact-deco-capsule-right w-14 h-5 bg-accent-500/25 dark:bg-accent-400/15 rounded-full rotate-45 hidden lg:block pointer-events-none select-none"
      />

      <div
        aria-hidden="true"
        className="contact-deco-outline-right w-9 h-9 border-2 border-pink-500/25 dark:border-pink-400/15 rounded-sm rotate-45 hidden lg:block pointer-events-none select-none"
      />

      <div
        aria-hidden="true"
        className="contact-deco-triangle-right w-3.5 h-3.5 text-teal-500/25 dark:text-teal-400/15 -rotate-45 hidden lg:block pointer-events-none select-none"
      >
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
          <path d="M8 2 L14 14 H2 Z" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="contact-deco-triangle-center w-3 h-3 text-teal-500/20 dark:text-teal-400/10 hidden md:block pointer-events-none select-none"
      >
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
          <path d="M8 2 L14 14 H2 Z" />
        </svg>
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <MotionSection className="flex flex-col items-center text-center w-full">
          <h1
            id="contact-page-title"
            className="font-heading font-black tracking-tight text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-ink-primary dark:text-theme-heading leading-tight text-balance px-2"
          >
            {banner.title}
          </h1>

          <div
            aria-hidden="true"
            className="brand-underline mt-5 md:mt-6"
          />

          {banner.supportingText && (
            <p className="mt-5 md:mt-6 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest text-ink-secondary dark:text-theme-body max-w-2xl leading-relaxed px-2">
              {banner.supportingText}
            </p>
          )}
        </MotionSection>
      </Container>

      {/* Soft curved lower edge — stays behind overlapping cards */}
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
    </section>
  );
}

export default ContactBanner;
