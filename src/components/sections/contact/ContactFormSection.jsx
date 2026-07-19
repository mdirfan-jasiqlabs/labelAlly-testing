import Container from '../../common/Container';
import ContactInfoPanel from './ContactInfoPanel';
import ContactFormCard from './ContactFormCard';
import {
  contactFormSectionData,
  getPanelContactMethods,
} from '../../../data/contactData';

/**
 * ContactFormSection — Heading + info panel + form.
 * Bottom contact strip removed (duplicate of left panel channels).
 */
function ContactFormSection() {
  const section = contactFormSectionData;

  if (!section?.enabled) return null;

  const { heading, infoPanel, form } = section;
  const panelChannels = getPanelContactMethods(section);

  return (
    <section
      aria-labelledby="contact-form-section-heading"
      className={[
        'relative w-full overflow-x-clip',
        'bg-surface-page dark:bg-theme-page',
        'py-12 sm:py-16 md:py-20 lg:py-24',
        'transition-colors duration-250 motion-reduce:transition-none',
      ].join(' ')}
    >
      {/* Soft wash — light mode only (avoids white haze in dark mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 sm:h-64 bg-gradient-to-b from-neutral-100/70 via-surface-page to-transparent dark:hidden"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-2 top-6 w-12 h-12 sm:left-4 sm:top-10 sm:w-20 sm:h-20 text-ink-muted opacity-20 dark:opacity-[0.07] hidden xs:block">
          <div className="w-full h-full rounded-full bg-dot-grid" />
        </div>
        <div className="absolute right-2 top-10 w-14 h-14 sm:right-6 sm:top-16 sm:w-24 sm:h-24 text-ink-muted opacity-20 dark:opacity-[0.07] hidden sm:block">
          <div className="w-full h-full rounded-full bg-dot-grid" />
        </div>
        <div className="absolute left-6 top-24 w-4 h-10 bg-brand-green/25 dark:bg-brand-green/10 rounded-full -rotate-45 hidden md:block" />
        <div className="absolute left-16 top-36 w-5 h-5 text-accent-500/35 dark:text-accent-400/15 hidden lg:block">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full">
            <polyline points="3 17 9 11 15 17 21 11" />
          </svg>
        </div>
        <div className="absolute right-10 top-28 w-3.5 h-3.5 text-brand-pink/30 dark:text-brand-pink/15 rotate-12 hidden md:block">
          <svg viewBox="0 0 16 16" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2 L14 14 H2 Z" />
          </svg>
        </div>
        <div className="absolute right-20 top-40 w-10 h-3.5 bg-brand-orange/25 dark:bg-brand-orange/10 rounded-full rotate-45 hidden lg:block" />
        <div className="absolute right-1/4 top-52 w-3.5 h-3.5 text-brand-blue/20 dark:text-brand-blue/10 rotate-45 hidden lg:block">
          <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
            <path d="M8 2 L14 14 H2 Z" />
          </svg>
        </div>
      </div>

      <Container size="2xl" className="relative z-10">
        {heading?.enabled !== false && (
          <header className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-1">
            {heading.badge && (
              <span
                className={[
                  'inline-flex items-center',
                  'px-4 py-1.5',
                  'rounded-full',
                  'text-[11px] sm:text-xs font-bold tracking-wide uppercase',
                  'text-white',
                  'bg-gradient-to-r from-brand-orange to-brand-pink',
                  'shadow-sm',
                  'mb-4 sm:mb-5',
                ].join(' ')}
              >
                {heading.badge}
              </span>
            )}

            <h2
              id="contact-form-section-heading"
              className="text-[1.65rem] leading-tight xs:text-3xl sm:text-4xl lg:text-[2.65rem] font-bold font-heading text-ink-primary dark:text-theme-heading tracking-tight text-balance"
            >
              {heading.title}
            </h2>

            <div className="brand-underline mt-3.5 sm:mt-4" aria-hidden="true" />

            {heading.description && (
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-ink-muted dark:text-theme-muted leading-relaxed max-w-xl sm:max-w-2xl">
                {heading.description}
              </p>
            )}
          </header>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 xl:gap-8 items-stretch">
          <div className="lg:col-span-4 min-w-0 order-1">
            <ContactInfoPanel infoPanel={infoPanel} channels={panelChannels} />
          </div>
          <div className="lg:col-span-8 min-w-0 order-2">
            <ContactFormCard formConfig={form} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactFormSection;
