/**
 * PartnerLogoCard — Premium surface card for a single platform logo.
 * Size variants use a static Tailwind class map for production-safe builds.
 */

const LOGO_SIZE_STYLES = {
  compact:
    'max-h-logo-compact md:max-h-[3.75rem] lg:max-h-[4.25rem] max-w-logo-compact md:max-w-[8rem] lg:max-w-[9rem]',
  standard:
    'max-h-logo-standard md:max-h-[4.75rem] lg:max-h-[5.5rem] max-w-logo-standard md:max-w-[11rem] lg:max-w-[12rem]',
  wide:
    'max-h-logo-wide md:max-h-[4rem] lg:max-h-[4.75rem] max-w-logo-wide md:max-w-[13rem] lg:max-w-[14rem]',
  extraWide:
    'max-h-logo-wide md:max-h-[4rem] lg:max-h-[4.75rem] max-w-logo-extra-wide md:max-w-[15rem] lg:max-w-[16rem]',
};

function PartnerLogoCard({ partner }) {
  if (!partner?.enabled) return null;

  const sizeClass = LOGO_SIZE_STYLES[partner.size] ?? LOGO_SIZE_STYLES.standard;

  return (
    <article
      className={[
        'group h-full',
        'min-h-partner-card sm:min-h-partner-card-md md:min-h-[10rem] lg:min-h-[11.5rem]',
        'flex items-center justify-center',
        'rounded-2xl',
        'bg-theme-logoCard',
        'border border-theme-logoCardBorder',
        'shadow-sm dark:shadow-theme',
        'px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-9 lg:px-10 lg:py-11',
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
