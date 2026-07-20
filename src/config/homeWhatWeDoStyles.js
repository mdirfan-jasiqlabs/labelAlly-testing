import { homeHeroStyles } from './homeHeroStyles';

/** Tailwind class maps for the homepage What We Do section. */
export const homeWhatWeDoStyles = {
  section: [
    'relative w-full overflow-hidden',
    'bg-theme-page',
    'section-spacing border-t border-theme-border/50',
  ].join(' '),

  background: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    orbPrimary:
      'absolute -top-24 right-[-8%] h-[420px] w-[420px] rounded-full bg-primary-400/10 blur-3xl dark:bg-violet-500/10 opacity-40 dark:opacity-30 motion-safe:animate-hero-drift',
    orbAccent:
      'absolute -bottom-20 -left-16 h-[360px] w-[360px] rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/8 opacity-30 dark:opacity-25 motion-safe:animate-hero-float-delayed',
    flowLine:
      'absolute top-[22%] left-[4%] hidden md:block h-px w-[38%] bg-gradient-to-r from-transparent via-primary-300/35 to-transparent dark:via-primary-400/20 motion-safe:animate-wave-flow opacity-50',
    flowLineAlt:
      'absolute bottom-[28%] right-[6%] hidden md:block h-px w-[32%] bg-gradient-to-l from-transparent via-orange-300/30 to-transparent dark:via-orange-400/18 motion-safe:animate-wave-flow-delayed opacity-45',
    spectrumRow:
      'absolute left-[8%] bottom-[18%] hidden lg:flex items-end justify-center gap-1 h-12 opacity-25 dark:opacity-15',
    spectrumBar:
      'w-1 rounded-full bg-gradient-to-t from-orange-400/50 to-accent-400/40 dark:from-orange-400/30 dark:to-accent-400/25 origin-bottom motion-safe:animate-spectrum-pulse',
    dotGrid:
      'absolute text-neutral-200/50 dark:text-neutral-700/40 opacity-40 dark:opacity-25 pointer-events-none hidden md:block',
    dotGridLeft: 'top-20 left-6 w-20 h-20',
    dotGridRight: 'bottom-20 right-6 w-20 h-20',
  },

  layout: 'flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16',
  contentCol: 'w-full lg:w-[48%] flex flex-col items-start text-left z-10',

  badge: [
    'inline-flex items-center px-4 py-1.5 rounded-lg',
    'text-xs font-bold text-theme-action-primaryForeground uppercase tracking-wider select-none',
    'bg-theme-action-primary shadow-sm mb-6',
  ].join(' '),

  heading: [
    'font-heading font-black tracking-tight leading-[1.12]',
    'text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[3.8rem]',
    'text-ink-primary dark:text-theme-heading mb-4',
  ].join(' '),

  headingAccent: homeHeroStyles.content.accent,

  brandDivider: 'flex items-center gap-1.5 w-20 h-1 mb-7 origin-left',

  description: [
    'text-sm sm:text-[0.92rem] sm:text-base leading-relaxed',
    'text-ink-secondary dark:text-theme-body mb-8',
    'max-w-full sm:max-w-[540px]',
  ].join(' '),

  featuresGrid: 'grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-10 w-full',
  featureItem: 'flex items-center gap-2.5',
  featureBullet: 'w-3.5 h-[2px] bg-theme-action-primary shrink-0 rounded-full',
  featureTitle:
    'text-[13px] sm:text-[14px] font-bold text-ink-primary dark:text-theme-heading tracking-wide select-none',

  masonryCol: 'flex-1 flex flex-col gap-4 sm:gap-6',
  masonryColLeft: 'pt-6 lg:pt-8',
  imageFrame: [
    'overflow-hidden rounded-3xl shadow-sm',
    'border border-theme-border/40 dark:border-theme-border/60',
    'bg-theme-secondary dark:bg-theme-card/75',
    'ring-1 ring-transparent dark:ring-violet-400/10',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-0.5 hover:border-theme-action-primary/30',
    'hover:shadow-card-hover motion-reduce:hover:translate-y-0',
  ].join(' '),
  image: [
    'w-full h-full object-cover select-none pointer-events-none',
    'transition-transform duration-500 ease-out',
    'motion-safe:group-hover:scale-[1.03] motion-reduce:group-hover:scale-100',
  ].join(' '),

  imageHeights: {
    short: 'w-full h-[120px] sm:h-[200px] lg:h-[270px]',
    tall: 'w-full h-[160px] sm:h-[260px] lg:h-[350px]',
  },
};
