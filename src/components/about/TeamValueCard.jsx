import { Users, Lightbulb, ShieldCheck, Handshake } from 'lucide-react';

const ICON_MAP = {
  users: Users,
  lightbulb: Lightbulb,
  'shield-check': ShieldCheck,
  handshake: Handshake,
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
    iconSurface: 'bg-accent-50 dark:bg-accent-950/20 border-accent-100/60 dark:border-accent-900/30',
    icon: 'text-accent-600 dark:text-accent-400',
    line: 'bg-accent-500 dark:bg-accent-400',
  },
  cyan: {
    iconSurface: 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-100/60 dark:border-cyan-900/30',
    icon: 'text-cyan-600 dark:text-cyan-400',
    line: 'bg-cyan-500 dark:bg-cyan-400',
  },
};

/**
 * TeamValueCard — Reusable value card for the Creative Team section.
 */
function TeamValueCard({ value }) {
  if (!value?.enabled) return null;

  const IconComponent = ICON_MAP[value.icon];
  const accent = ACCENT_STYLES[value.accent] ?? ACCENT_STYLES.rose;

  return (
    <article
      className={[
        'group h-full flex flex-col',
        'rounded-2xl md:rounded-3xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/70 dark:border-theme-border/50',
        'shadow-sm dark:shadow-theme',
        'p-5 sm:p-6',
        'transition-all duration-300 ease-out',
        'motion-reduce:transition-none',
        'hover:-translate-y-0.5 hover:shadow-card',
        'motion-reduce:hover:translate-y-0',
      ].join(' ')}
    >
      <div
        aria-hidden="true"
        className={[
          'flex items-center justify-center shrink-0',
          'w-14 h-14 md:w-16 md:h-16',
          'rounded-2xl border',
          accent.iconSurface,
          'mb-4 md:mb-5',
        ].join(' ')}
      >
        {IconComponent && (
          <IconComponent
            size={28}
            strokeWidth={1.75}
            className={['w-7 h-7 md:w-8 md:h-8', accent.icon].join(' ')}
          />
        )}
      </div>

      <h4 className="font-heading font-bold text-base sm:text-lg text-ink-primary dark:text-theme-heading leading-snug mb-2.5">
        {value.title}
      </h4>

      <div
        aria-hidden="true"
        className={['w-10 h-0.5 rounded-full mb-3', accent.line].join(' ')}
      />

      <p className="text-[0.88rem] sm:text-sm leading-relaxed text-ink-secondary dark:text-theme-body flex-1">
        {value.description}
      </p>
    </article>
  );
}

export default TeamValueCard;
