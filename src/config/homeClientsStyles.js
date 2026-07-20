/** Tailwind class maps for the homepage Clients section. */
export const homeClientsStyles = {
  section: [
    'relative section-spacing overflow-hidden',
    'bg-theme-page dark:bg-neutral-950',
    'border-t border-neutral-100 dark:border-theme-border/50',
  ].join(' '),

  background: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    orbPrimary:
      'absolute top-[8%] left-1/2 -translate-x-1/2 h-[420px] w-[640px] rounded-full bg-primary-400/8 blur-3xl dark:bg-violet-500/10 opacity-50 dark:opacity-40 motion-safe:animate-hero-drift',
    orbAccent:
      'absolute bottom-[6%] -right-24 h-[280px] w-[280px] rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/10 opacity-40 dark:opacity-35 motion-safe:animate-hero-float-delayed',
    flowLineLeft:
      'absolute top-[34%] left-0 hidden md:block h-px w-[22%] bg-gradient-to-r from-transparent via-orange-300/35 to-transparent dark:via-orange-400/20 motion-safe:animate-wave-flow opacity-50',
    flowLineRight:
      'absolute top-[58%] right-0 hidden md:block h-px w-[20%] bg-gradient-to-l from-transparent via-primary-300/30 to-transparent dark:via-primary-400/18 motion-safe:animate-wave-flow-delayed opacity-45',
    spark:
      'absolute rounded-full bg-orange-400/40 dark:bg-orange-400/30 blur-[0.5px] motion-safe:animate-node-float',
  },

  sparkPositions: [
    'top-[22%] left-[10%] h-1.5 w-1.5',
    'top-[18%] right-[14%] h-1 w-1',
    'top-[48%] left-[6%] h-1 w-1',
    'bottom-[30%] right-[8%] h-1.5 w-1.5',
    'bottom-[18%] left-[18%] h-1 w-1',
    'top-[36%] right-[22%] h-1 w-1',
  ],

  header: 'text-center max-w-3xl mx-auto flex flex-col items-center mb-10 sm:mb-12 md:mb-14 px-2',

  badge: [
    'inline-flex items-center px-4 py-1.5 rounded-lg',
    'text-xs font-bold text-white uppercase tracking-wider select-none',
    'bg-orange-500 shadow-sm mb-5 sm:mb-6',
  ].join(' '),

  heading: [
    'font-heading text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold',
    'text-ink-primary dark:text-theme-heading',
    'leading-tight tracking-tight text-center text-balance',
  ].join(' '),

  brandDivider: 'flex items-center gap-1.5 w-20 h-1 mt-6 sm:mt-7 origin-center',

  logoGrid: 'w-full grid gap-3.5 sm:gap-4 md:gap-5 lg:gap-6',

  logoCard: [
    'group relative flex items-center justify-center overflow-hidden',
    'rounded-xl sm:rounded-2xl',
    'aspect-[1.55] sm:aspect-[1.5]',
    'p-4 sm:p-5 md:p-6',
    'bg-white dark:bg-neutral-900/85',
    'border border-neutral-200/70 dark:border-theme-border/60',
    'shadow-sm dark:shadow-theme',
    'ring-1 ring-transparent dark:ring-orange-500/10',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-0.5 hover:shadow-card-hover',
    'hover:border-orange-500/35 dark:hover:border-orange-400/30',
    'dark:hover:ring-orange-400/20',
    'motion-reduce:hover:translate-y-0',
  ].join(' '),

  logoGlow:
    'pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-500/5 via-transparent to-primary-500/5 dark:from-orange-500/8 dark:to-primary-500/6',

  logoImageWrap: 'relative z-10 flex h-full w-full items-center justify-center',

  logoImage: [
    'max-w-[88%] max-h-[78%] sm:max-h-[82%] w-auto h-auto object-contain',
    'transition-transform duration-300 ease-out',
    'motion-safe:group-hover:scale-[1.04]',
    'motion-reduce:group-hover:scale-100',
    'dark:brightness-110 dark:contrast-[1.04]',
  ].join(' '),
};
