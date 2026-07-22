import { Link } from 'react-router-dom';
import { ArrowRight, Headphones } from 'lucide-react';
import Button from '../common/Button';

/**
 * TeamCTA — Peach-toned horizontal CTA panel for the Our Team section.
 * Uses accent + action tokens for readable contrast in light and dark mode.
 */
function TeamCTA({ cta }) {
  if (!cta?.enabled || !cta.title || !cta.buttonLabel || !cta.buttonLink) {
    return null;
  }

  return (
    <div
      className={[
        'flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6',
        'rounded-2xl',
        'bg-accent-50 dark:bg-accent-950/20',
        'border border-accent-200/70 dark:border-accent-800/40',
        'shadow-sm dark:shadow-theme',
        'px-5 py-6 sm:px-8 sm:py-7',
        'text-center sm:text-left',
      ].join(' ')}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 min-w-0">
        <div
          aria-hidden="true"
          className={[
            'flex shrink-0 items-center justify-center',
            'h-12 w-12 rounded-full',
            'bg-accent-100 dark:bg-accent-900/35',
            'border border-accent-200/60 dark:border-accent-700/40',
            'text-theme-action-primary dark:text-orange-300',
            'shadow-sm',
          ].join(' ')}
        >
          <Headphones size={22} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <p className="font-heading text-base sm:text-lg font-bold text-ink-primary dark:text-theme-heading leading-snug">
            {cta.title}
          </p>
          {cta.description && (
            <p className="mt-1 text-sm leading-relaxed text-ink-secondary dark:text-theme-body">
              {cta.description}
            </p>
          )}
        </div>
      </div>

      <Button
        as={Link}
        to={cta.buttonLink}
        variant="primary"
        size="md"
        className="w-full sm:w-auto shrink-0"
        aria-label={cta.buttonAriaLabel || cta.buttonLabel}
        rightIcon={<ArrowRight size={16} aria-hidden="true" />}
      >
        {cta.buttonLabel}
      </Button>
    </div>
  );
}

export default TeamCTA;
