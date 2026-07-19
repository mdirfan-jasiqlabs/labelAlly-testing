import { Target, Eye } from 'lucide-react';

const ICON_MAP = {
  target: Target,
  eye: Eye,
};

/**
 * PurposeCard — Reusable horizontal card for Mission and Vision statements.
 */
function PurposeCard({ card }) {
  if (!card?.enabled) return null;

  const IconComponent = ICON_MAP[card.icon];
  const enabledContent = (card.content ?? []).filter((segment) => segment.text);

  return (
    <article
      aria-labelledby={`${card.id}-label`}
      className={[
        'relative w-full',
        'rounded-2xl md:rounded-3xl',
        'bg-neutral-50/80 dark:bg-theme-card',
        'border border-neutral-200/70 dark:border-theme-border/50',
        'shadow-sm dark:shadow-theme',
        'transition-colors duration-250',
      ].join(' ')}
    >
      <div className="flex flex-col sm:flex-row sm:items-center p-5 sm:p-6 md:p-7 lg:p-8 gap-5 sm:gap-0">
        {/* ── Icon Panel ── */}
        <div className="flex sm:items-center sm:justify-center shrink-0">
          <div
            aria-hidden="true"
            className={[
              'flex items-center justify-center',
              'w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] md:w-20 md:h-20 lg:w-[5.5rem] lg:h-[5.5rem]',
              'rounded-2xl md:rounded-[1.35rem]',
              'bg-teal-50 dark:bg-teal-950/25',
              'border border-teal-100/60 dark:border-teal-900/30',
            ].join(' ')}
          >
            {IconComponent && (
              <IconComponent
                size={32}
                strokeWidth={1.75}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-teal-600 dark:text-teal-400"
              />
            )}
          </div>
        </div>

        {/* ── Horizontal Divider (mobile) ── */}
        <div
          aria-hidden="true"
          className="sm:hidden w-full h-px my-1 bg-neutral-200/80 dark:bg-theme-border/50 shrink-0"
        />

        {/* ── Vertical Divider (desktop) ── */}
        <div
          aria-hidden="true"
          className="hidden sm:block w-px self-center mx-5 md:mx-7 lg:mx-8 h-16 md:h-20 bg-neutral-200/80 dark:bg-theme-border/50 shrink-0"
        />

        {/* ── Content Area ── */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <span
            id={`${card.id}-label`}
            className={[
              'inline-flex self-start items-center',
              'px-3 py-1 rounded-md',
              'text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider',
              'text-white bg-accent-500 dark:bg-accent-600',
              'select-none',
            ].join(' ')}
          >
            {card.label}
          </span>

          {enabledContent.length > 0 && (
            <p className="text-[0.92rem] sm:text-base leading-relaxed text-neutral-600 dark:text-theme-body">
              {enabledContent.map((segment) => (
                <span
                  key={segment.id}
                  className={segment.emphasis ? 'font-semibold text-neutral-800 dark:text-theme-heading' : ''}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default PurposeCard;
