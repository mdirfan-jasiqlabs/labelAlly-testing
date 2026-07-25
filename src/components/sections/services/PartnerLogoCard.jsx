/**
 * PartnerLogoCard — Premium surface card for a single platform logo.
 * All logos share one optical size so icons + wordmarks align evenly.
 */

const LOGO_SIZE_CLASS =
  'h-10 sm:h-11 md:h-12 lg:h-14 w-auto max-w-[11rem] sm:max-w-[12rem] md:max-w-[13rem] lg:max-w-[14rem]';

function PartnerLogoCard({ partner }) {
  if (!partner?.enabled) return null;

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
          'object-contain object-center select-none pointer-events-none',
          LOGO_SIZE_CLASS,
        ].join(' ')}
      />
    </article>
  );
}

export default PartnerLogoCard;
