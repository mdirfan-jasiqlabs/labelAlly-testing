import { homeHeroStyles } from './homeHeroStyles';

/** Tailwind class maps for the homepage Our Services section. */
export const homeServicesStyles = {
  section: [
    'relative section-spacing overflow-hidden',
    'bg-surface-page dark:bg-neutral-950',
    'border-t border-neutral-100 dark:border-theme-border/50',
  ].join(' '),

  background: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    dotGrid:
      'absolute inset-0 opacity-45 dark:opacity-20 bg-[radial-gradient(theme(colors.neutral.300)_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(theme(colors.neutral.700)_1.5px,transparent_1.5px)] [background-size:24px_24px]',
    orbPrimary:
      'absolute -bottom-16 -left-16 h-[300px] w-[300px] rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/8 motion-safe:animate-hero-float-delayed',
    orbAccent:
      'absolute top-[10%] -right-20 h-[260px] w-[260px] rounded-full bg-primary-400/8 blur-3xl dark:bg-violet-500/8 motion-safe:animate-hero-drift opacity-60 dark:opacity-40',
    flowLine:
      'absolute top-[42%] left-[8%] hidden lg:block h-px w-[28%] bg-gradient-to-r from-transparent via-primary-300/30 to-transparent dark:via-primary-400/18 motion-safe:animate-wave-flow opacity-40',
    flowLineAlt:
      'absolute bottom-[22%] right-[6%] hidden lg:block h-px w-[24%] bg-gradient-to-l from-transparent via-orange-300/28 to-transparent dark:via-orange-400/16 motion-safe:animate-wave-flow-delayed opacity-35',
    spectrumRow:
      'absolute top-[14%] right-[8%] hidden md:flex items-end justify-center gap-1 h-10 opacity-20 dark:opacity-12',
    spectrumBar:
      'w-1 rounded-full bg-gradient-to-t from-orange-400/45 to-accent-400/40 dark:from-orange-400/28 dark:to-accent-400/25 origin-bottom motion-safe:animate-spectrum-pulse',
    node:
      'absolute h-1.5 w-1.5 rounded-full bg-orange-400/30 dark:bg-orange-400/22 motion-safe:animate-node-float',
  },

  sparkPositions: [
    'top-[28%] left-[12%]',
    'bottom-[30%] right-[14%]',
    'top-[52%] left-[22%]',
  ],

  grid: [
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-16 lg:gap-x-16 lg:gap-y-20',
    'items-stretch',
  ].join(' '),

  intro: 'flex flex-col text-center items-center md:text-left md:items-start h-full',

  badge: [
    'inline-flex items-center px-4 py-1.5 rounded-lg',
    'text-xs font-bold text-white uppercase tracking-wider select-none',
    'bg-orange-500 shadow-sm mb-5',
  ].join(' '),

  heading: [
    'font-heading text-2xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]',
    'font-extrabold text-ink-primary dark:text-theme-heading mt-2 tracking-tight',
  ].join(' '),

  brandDivider: 'flex items-center gap-1.5 w-20 h-1 mt-6 mb-7 origin-left',

  description:
    'text-[0.95rem] text-ink-secondary dark:text-theme-body leading-relaxed max-w-sm',

  serviceCard: [
    'group flex flex-col items-center text-center h-full',
    'p-4 sm:p-5 rounded-2xl',
    'border border-transparent',
    'bg-transparent dark:bg-neutral-900/40',
    'dark:border-theme-border/40',
    'shadow-none dark:shadow-theme',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-1 hover:bg-neutral-50/70 dark:hover:bg-neutral-900/65',
    'hover:border-orange-500/25 dark:hover:border-orange-400/20',
    'hover:shadow-sm dark:hover:shadow-card-hover',
    'motion-reduce:hover:translate-y-0',
    'focus-within:ring-2 focus-within:ring-orange-500/40 focus-within:ring-offset-2',
    'focus-within:ring-offset-surface-page dark:focus-within:ring-offset-neutral-950',
  ].join(' '),

  iconWrap: [
    'relative w-20 h-20 sm:w-[5.5rem] sm:h-[5.5rem]',
    'flex items-center justify-center mb-5 sm:mb-6 select-none',
    'transition-transform duration-300 ease-out',
    'motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.03]',
    'motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100',
  ].join(' '),

  iconAccent: [
    'mx-auto -mt-4 mb-3 h-0.5 w-10 rounded-full origin-center',
    'bg-gradient-to-r from-orange-500 to-accent-500',
    'opacity-70 dark:opacity-60',
    'transition-all duration-300',
    'group-hover:w-12 group-hover:opacity-100',
  ].join(' '),

  serviceTitle:
    'font-heading text-lg sm:text-xl font-bold text-ink-primary dark:text-theme-heading leading-snug',

  serviceDescription:
    'text-sm text-ink-secondary dark:text-theme-muted leading-relaxed mt-3 max-w-xs flex-1',
};
