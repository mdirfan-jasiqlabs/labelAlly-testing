import { Landmark, Building2, MapPin, Phone } from 'lucide-react';

const ICON_MAP = {
  landmark: Landmark,
  building: Building2,
  'map-pin': MapPin,
};

const ACCENT_STYLES = {
  rose: {
    glow: 'bg-pink-400/25 dark:bg-pink-500/20',
    iconSurface: 'bg-pink-50 dark:bg-pink-950/40',
    icon: 'text-pink-600 dark:text-pink-400',
  },
  cyan: {
    glow: 'bg-cyan-400/25 dark:bg-cyan-500/20',
    iconSurface: 'bg-cyan-50 dark:bg-cyan-950/40',
    icon: 'text-cyan-600 dark:text-cyan-400',
  },
  emerald: {
    glow: 'bg-emerald-400/25 dark:bg-emerald-500/20',
    iconSurface: 'bg-emerald-50 dark:bg-emerald-950/40',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
};

/**
 * OfficeCard — Premium office location card matching Contact reference.
 */
function OfficeCard({ office }) {
  if (!office?.enabled) return null;

  const IconComponent = ICON_MAP[office.icon] ?? Landmark;
  const accent = ACCENT_STYLES[office.accent] ?? ACCENT_STYLES.rose;

  const phoneDisplay = office.phone?.display;
  const phoneHref = office.phone?.href;

  return (
    <article
      className={[
        'group h-full flex flex-col items-center text-center',
        'rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/80 dark:border-theme-border/50',
        'shadow-sm dark:shadow-theme',
        'px-6 py-8 sm:px-7 sm:py-9',
        'transition-shadow duration-300 ease-out',
        'motion-reduce:transition-none',
        'motion-safe:hover:shadow-card',
      ].join(' ')}
    >
      {/* Soft glow + icon surface */}
      <div
        aria-hidden="true"
        className="relative flex items-center justify-center mb-5 sm:mb-6"
      >
        <span
          className={[
            'absolute inset-0 scale-125 rounded-full blur-md',
            accent.glow,
          ].join(' ')}
        />
        <div
          className={[
            'relative flex items-center justify-center',
            'w-16 h-16 sm:w-[4.25rem] sm:h-[4.25rem]',
            'rounded-full',
            accent.iconSurface,
          ].join(' ')}
        >
          <IconComponent
            size={28}
            strokeWidth={1.6}
            className={['w-7 h-7 sm:w-8 sm:h-8', accent.icon].join(' ')}
          />
        </div>
      </div>

      <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink-primary dark:text-theme-heading leading-none">
        {office.city}
      </h3>

      <div
        aria-hidden="true"
        className="h-0.5 w-10 sm:w-12 rounded-full mt-3 mb-4 bg-gradient-to-r from-amber-400 via-pink-500 to-teal-400"
      />

      {office.address && (
        <p className="text-sm leading-relaxed text-ink-muted dark:text-theme-muted mb-6 sm:mb-8 max-w-none sm:max-w-xs flex-1">
          {office.address}
        </p>
      )}

      {phoneDisplay && phoneHref && (
        <a
          href={phoneHref}
          aria-label={`Call ${office.city} office at ${phoneDisplay}`}
          className="mt-auto inline-flex items-center justify-center gap-2 text-sm font-medium text-ink-secondary dark:text-theme-body hover:text-ink-primary dark:hover:text-theme-heading transition-colors duration-250 motion-reduce:transition-none focus-ring rounded-md px-1 py-1"
        >
          <Phone
            size={15}
            strokeWidth={2.25}
            aria-hidden="true"
            className={['shrink-0', accent.icon].join(' ')}
          />
          <span className="break-all sm:whitespace-nowrap">{phoneDisplay}</span>
        </a>
      )}
    </article>
  );
}

export default OfficeCard;
