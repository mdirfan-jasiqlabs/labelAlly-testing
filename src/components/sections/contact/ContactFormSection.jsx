import Container from '../../common/Container';
import ContactInfoPanel from './ContactInfoPanel';
import ContactFormCard from './ContactFormCard';
import ContactDetailsStrip from './ContactDetailsStrip';
import {
  contactFormSectionData,
  getPanelContactMethods,
  getStripContactMethods,
} from '../../../data/contactData';

/**
 * ContactFormSection — Heading + info panel + form + details strip.
 * Content from contactFormSectionData; verified channels from footer.json.
 * No map / iframe / map-related UI.
 */
function ContactFormSection() {
  const section = contactFormSectionData;

  if (!section?.enabled) return null;

  const { heading, infoPanel, form } = section;
  const panelChannels = getPanelContactMethods(section);
  const stripChannels = getStripContactMethods(section);

  return (
    <section
      aria-labelledby="contact-form-section-heading"
      className={[
        'relative w-full overflow-x-clip',
        'bg-surface-page dark:bg-theme-page',
        'section-spacing',
        'transition-colors duration-250 motion-reduce:transition-none',
      ].join(' ')}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-3 top-8 w-14 h-14 sm:left-4 sm:top-10 sm:w-20 sm:h-20 text-ink-muted opacity-20 dark:opacity-10 hidden sm:block">
          <div className="w-full h-full rounded-full bg-dot-grid" />
        </div>
        <div className="absolute right-4 top-14 w-16 h-16 sm:right-6 sm:top-16 sm:w-24 sm:h-24 text-ink-muted opacity-20 dark:opacity-10 hidden md:block">
          <div className="w-full h-full rounded-full bg-dot-grid" />
        </div>
        <div className="absolute left-8 top-28 w-5 h-12 bg-brand-orange/20 dark:bg-brand-orange/15 rounded-full -rotate-45 hidden lg:block" />
        <div className="absolute right-16 top-24 w-4 h-4 text-brand-pink/30 dark:text-brand-pink/20 rotate-12 hidden lg:block">
          <svg viewBox="0 0 16 16" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2 L14 14 H2 Z" />
          </svg>
        </div>
        <div className="absolute left-1/4 bottom-32 w-10 h-1 bg-brand-green/25 dark:bg-brand-green/15 -rotate-12 hidden lg:block rounded-full" />
        <div className="absolute right-1/3 top-40 w-5 h-5 text-accent-500/25 dark:text-accent-400/15 hidden md:block">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full">
            <polyline points="3 17 9 11 15 17 21 11" />
          </svg>
        </div>
        <div className="absolute right-10 bottom-40 w-4 h-4 text-brand-blue/20 dark:text-brand-blue/15 rotate-45 hidden lg:block">
          <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
            <path d="M8 2 L14 14 H2 Z" />
          </svg>
        </div>
      </div>

      <Container size="2xl" className="relative z-10">
        {heading?.enabled !== false && (
          <header className="flex flex-col items-center text-center section-heading-stack max-w-3xl mx-auto px-1">
            {heading.badge && (
              <span
                className={[
                  'inline-flex items-center',
                  'px-3.5 py-1.5',
                  'rounded-md',
                  'text-xs font-bold tracking-wide uppercase',
                  'text-white',
                  'bg-gradient-to-r from-brand-orange to-brand-pink',
                  'shadow-sm',
                  'mb-5 sm:mb-6',
                ].join(' ')}
              >
                {heading.badge}
              </span>
            )}

            <h2
              id="contact-form-section-heading"
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-heading text-ink-primary dark:text-theme-heading leading-tight tracking-tight text-balance"
            >
              {heading.title}
            </h2>

            <div className="brand-underline mt-4 sm:mt-5" aria-hidden="true" />

            {heading.description && (
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-ink-muted dark:text-theme-muted leading-relaxed max-w-2xl">
                {heading.description}
              </p>
            )}
          </header>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          <div className="xl:col-span-4 min-w-0">
            <ContactInfoPanel infoPanel={infoPanel} channels={panelChannels} />
          </div>
          <div className="xl:col-span-8 min-w-0">
            <ContactFormCard formConfig={form} />
          </div>
        </div>

        {stripChannels.length > 0 && (
          <div className="mt-8 sm:mt-10 md:mt-12">
            <ContactDetailsStrip channels={stripChannels} />
          </div>
        )}
      </Container>
    </section>
  );
}

export default ContactFormSection;
