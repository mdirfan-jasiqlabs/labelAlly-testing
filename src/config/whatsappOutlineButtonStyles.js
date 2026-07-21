/**
 * Shared WhatsApp outline CTA styles — matches Home hero secondary button.
 * Use for Services PageHero, Artists hero, and Artists "Ready to Get Started?" CTA.
 */
export const whatsappOutlineButtonClasses = {
  base: [
    'group inline-flex items-center justify-center gap-2.5',
    'relative z-10',
    'h-11 sm:h-12 px-5 sm:px-6 rounded-lg',
    'text-sm font-semibold whitespace-nowrap',
    'transition-all duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-accent-500 focus-visible:ring-offset-[var(--color-page-bg)]',
    'active:scale-[0.98] motion-reduce:active:scale-100',
    'w-full sm:w-auto',
  ].join(' '),

  /** Amber outline + text (light & dark) — Home hero secondary look */
  surface: [
    'bg-theme-page',
    'text-accent-600 dark:text-accent-400',
    'border border-accent-400/80 dark:border-accent-500/45',
    'hover:bg-accent-50/90 dark:hover:bg-accent-500/10',
    'hover:border-accent-500 dark:hover:border-accent-400/70',
    'hover:-translate-y-0.5 hover:shadow-sm',
    'dark:hover:text-accent-300',
    'motion-reduce:hover:translate-y-0',
  ].join(' '),
};

export function getWhatsAppOutlineButtonClassName(extra = '') {
  return [whatsappOutlineButtonClasses.base, whatsappOutlineButtonClasses.surface, extra]
    .filter(Boolean)
    .join(' ');
}
