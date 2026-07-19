import Container from '../../common/Container';
import PartnerLogoCard from './PartnerLogoCard';
import servicesData from '../../../data/services.json';
import platformsData from '../../../data/platformsSection.json';

/**
 * DigitalPartnersSection — Centered partners heading with premium logo-card grid.
 * Reuses shared platform assets/data from platformsSection.json.
 */
function DigitalPartnersSection() {
  const { partnersSection } = servicesData;

  if (!partnersSection?.enabled || !platformsData?.enabled) return null;

  const { badge, heading, description } = partnersSection;

  const enabledPartners = (platformsData.platforms ?? [])
    .filter((platform) => platform.enabled)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (enabledPartners.length === 0) return null;

  return (
    <section
      role="region"
      aria-labelledby="digital-partners-heading"
      className="relative w-full overflow-hidden bg-surface-page dark:bg-theme-section section-spacing border-t border-neutral-100 dark:border-theme-border/50 transition-colors duration-250"
    >
      <Container size="2xl" className="relative z-10">
        {/* ── Centered Heading Group ── */}
        <div className="flex flex-col items-center text-center section-heading-stack">
          {badge?.enabled && badge.text && (
            <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-accent-500 dark:bg-accent-600 mb-5 md:mb-6 shadow-sm select-none">
              {badge.text}
            </span>
          )}

          {heading && (
            <h2
              id="digital-partners-heading"
              className="font-heading font-black tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-5xl text-ink-primary dark:text-theme-heading max-w-4xl text-balance"
            >
              {heading}
            </h2>
          )}

          <div
            aria-hidden="true"
            className="h-1 w-20 bg-gradient-to-r from-amber-400 via-pink-500 to-teal-400 rounded-full mt-5 md:mt-6"
          />

          {description && (
            <p className="mt-6 md:mt-8 text-[0.92rem] sm:text-base leading-relaxed text-ink-secondary dark:text-theme-body max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* ── Partner Logo Grid ── */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 list-none p-0 m-0 max-w-5xl mx-auto">
          {enabledPartners.map((partner) => (
            <li key={partner.id} className="h-full min-w-0">
              <PartnerLogoCard partner={partner} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default DigitalPartnersSection;
