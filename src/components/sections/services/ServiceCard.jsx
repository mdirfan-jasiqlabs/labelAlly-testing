import { Globe, PlayCircle, Shield, Fingerprint, Tv, TrendingUp, Users, Megaphone, DollarSign } from 'lucide-react';

const ICON_MAP = {
  Globe,
  PlayCircle,
  Shield,
  Fingerprint,
  Tv,
  TrendingUp,
  Users,
  Megaphone,
  DollarSign,
};

const ACCENT_STYLES = {
  rose: {
    iconSurface: 'bg-pink-50 dark:bg-pink-950/20 border-pink-100/60 dark:border-pink-900/30',
    icon: 'text-pink-600 dark:text-pink-400',
    line: 'bg-pink-500 dark:bg-pink-400',
  },
  emerald: {
    iconSurface: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/60 dark:border-emerald-900/30',
    icon: 'text-emerald-600 dark:text-emerald-400',
    line: 'bg-emerald-500 dark:bg-emerald-400',
  },
  amber: {
    iconSurface: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100/60 dark:border-amber-900/30',
    icon: 'text-amber-600 dark:text-amber-400',
    line: 'bg-amber-500 dark:bg-amber-400',
  },
  cyan: {
    iconSurface: 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-100/60 dark:border-cyan-900/30',
    icon: 'text-cyan-600 dark:text-cyan-400',
    line: 'bg-cyan-500 dark:bg-cyan-400',
  },
};

/**
 * ServiceCard — Reusable service card with icon, title, and description.
 * Uses accent system for visual variety across services.
 */
function ServiceCard({ service }) {
  if (!service?.enabled) return null;

  const IconComponent = ICON_MAP[service.icon];
  const accent = ACCENT_STYLES[service.accent] ?? ACCENT_STYLES.rose;

  return (
    <article className="group h-full flex flex-row items-start gap-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-theme-card border border-neutral-200/80 dark:border-theme-border/50 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover">
      {/* Icon Surface */}
      <div
        aria-hidden="true"
        className={[
          'flex items-center justify-center shrink-0',
          'w-14 h-14 sm:w-16 sm:h-16',
          'rounded-2xl border',
          accent.iconSurface,
        ].join(' ')}
      >
        {IconComponent && (
          <IconComponent
            size={28}
            strokeWidth={1.75}
            className={['w-7 h-7 sm:w-8 sm:h-8', accent.icon].join(' ')}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <h3 className="font-heading font-bold text-lg sm:text-xl text-neutral-900 dark:text-theme-heading leading-snug">
          {service.title}
        </h3>

        {/* Accent Line */}
        <div
          aria-hidden="true"
          className={['w-10 h-0.5 rounded-full', accent.line].join(' ')}
        />

        <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-theme-body">
          {service.description}
        </p>
      </div>
    </article>
  );
}

export default ServiceCard;
