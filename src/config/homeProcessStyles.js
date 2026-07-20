import { homeHeroStyles } from './homeHeroStyles';

/** Tailwind class maps for the homepage How It Works section. */
export const homeProcessStyles = {
  badge: [
    'inline-flex items-center px-4 py-1.5 rounded-lg',
    'text-xs font-bold text-theme-action-primaryForeground',
    'bg-theme-action-primary shadow-sm mb-6',
  ].join(' '),

  heading: [
    'font-heading font-black tracking-tight leading-[1.1]',
    'text-2xl sm:text-4xl md:text-5xl',
    'text-ink-primary dark:text-theme-heading',
  ].join(' '),

  /** Same accent as homepage Hero heading highlight */
  headingAccent: homeHeroStyles.content.accent,

  divider: [
    'h-1 w-20 rounded-full mt-4 mb-10',
    'bg-gradient-to-r from-orange-500 via-primary-500 to-accent-500',
    'opacity-90 dark:opacity-80',
  ].join(' '),
};
