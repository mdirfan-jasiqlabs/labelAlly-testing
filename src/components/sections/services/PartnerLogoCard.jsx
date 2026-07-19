/**
 * PartnerLogoCard — Premium surface card for a single platform logo.
 * Size variants use a static Tailwind class map for production-safe builds.
 */

const LOGO_SIZE_STYLES = {
  compact: 'max-h-logo-compact max-w-logo-compact',
  standard: 'max-h-logo-standard max-w-logo-standard',
  wide: 'max-h-logo-wide max-w-logo-wide',
  extraWide: 'max-h-logo-wide max-w-logo-extra-wide',
};

function PartnerLogoCard({ partner }) {
  if (!partner?.enabled) return null;

  const sizeClass = LOGO_SIZE_STYLES[partner.size] ?? LOGO_SIZE_STYLES.standard;

  return (
    <article
      className={[
        'group h-full',
        'min-h-partner-card sm:min-h-partner-card-md md:min-h-partner-card-lg',
        'flex items-center justify-center',
        'rounded-2xl',
        'bg-theme-logoCard',
        'border border-theme-logoCardBorder',
        'shadow-sm dark:shadow-theme',
        'px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8',
        'transition-all duration-300 ease-out',
        'motion-reduce:transition-none',
        'hover:-translate-y-0.5 hover:shadow-card',
        'motion-reduce:hover:translate-y-0',
      ].join(' ')}
    >
      <img
        src={partner.logo}
        alt={partner.alt || partner.name}
        width={partner.width || 160}
        height={partner.height || 48}
        loading="lazy"
        decoding="async"
        className={[
          'w-auto object-contain select-none pointer-events-none',
          sizeClass,
        ].join(' ')}
      />
    </article>
  );
}

export default PartnerLogoCard;
