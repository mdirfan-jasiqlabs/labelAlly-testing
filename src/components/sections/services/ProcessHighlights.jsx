import { Users, ShieldCheck, Globe, BarChart2 } from 'lucide-react';
import servicesData from '../../../data/services.json';

const ICON_MAP = {
  users: Users,
  'shield-check': ShieldCheck,
  globe: Globe,
  'bar-chart-2': BarChart2,
};

const ACCENT_STYLES = {
  rose: {
    iconSurface: 'bg-pink-50 dark:bg-pink-950/20 border-pink-100/60 dark:border-pink-900/30',
    icon: 'text-pink-600 dark:text-pink-400',
  },
  emerald: {
    iconSurface: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/60 dark:border-emerald-900/30',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    iconSurface: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100/60 dark:border-amber-900/30',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  cyan: {
    iconSurface: 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-100/60 dark:border-cyan-900/30',
    icon: 'text-cyan-600 dark:text-cyan-400',
  },
};

/**
 * ProcessHighlights — Bottom highlight strip with 4 feature items.
 */
function ProcessHighlights() {
  const { process } = servicesData;

  if (!process?.highlights) return null;

  const enabledHighlights = process.highlights.filter((item) => item.enabled);

  return (
    <div className="bg-surface-card dark:bg-theme-card rounded-2xl md:rounded-3xl border border-theme-border/80 dark:border-theme-border/50 shadow-sm p-6 md:p-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 list-none p-0 m-0">
        {enabledHighlights.map((highlight, index) => {
          const IconComponent = ICON_MAP[highlight.icon];
          const accent = ACCENT_STYLES[highlight.accent] ?? ACCENT_STYLES.rose;

          return (
            <li
              key={highlight.id}
              className={[
                'flex flex-col items-center text-center gap-4',
                index < enabledHighlights.length - 1 && index < 3
                  ? 'lg:border-r lg:border-theme-border/60 dark:lg:border-theme-border/40'
                  : '',
                index < enabledHighlights.length - 2 && index < 2
                  ? 'sm:border-r sm:border-theme-border/60 dark:sm:border-theme-border/40'
                  : '',
              ].filter(Boolean).join(' ')}
            >
              {/* Icon */}
              <div
                aria-hidden="true"
                className={[
                  'flex items-center justify-center',
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

              {/* Title */}
              <h4 className="font-heading font-bold text-base sm:text-lg text-ink-primary dark:text-theme-heading leading-snug">
                {highlight.title}
              </h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProcessHighlights;
