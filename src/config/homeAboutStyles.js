import { homeHeroStyles } from './homeHeroStyles';

/** Tailwind class maps for the homepage About Us section. */
export const homeAboutStyles = {
  section: [
    'relative w-full overflow-hidden',
    'bg-theme-page',
    'section-spacing',
  ].join(' '),

  background: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    orbPrimary:
      'absolute -right-24 top-[14%] h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-primary-400/10 blur-3xl dark:bg-violet-500/10 motion-safe:animate-hero-drift',
    orbAccent:
      'absolute -left-16 bottom-[18%] h-48 w-48 sm:h-56 sm:w-56 rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/8 motion-safe:animate-hero-float-delayed',
    orbSecondary:
      'absolute top-[48%] right-[30%] hidden md:block h-40 w-40 rounded-full bg-accent-300/8 blur-3xl dark:bg-accent-500/6 motion-safe:animate-hero-orb-drift opacity-60',
    flowLine:
      'absolute top-[28%] left-[6%] hidden md:block h-px w-[42%] bg-gradient-to-r from-transparent via-primary-300/35 to-transparent dark:via-primary-400/20 motion-safe:animate-wave-flow opacity-50',
    flowLineAlt:
      'absolute bottom-[38%] right-[4%] hidden md:block h-px w-[36%] bg-gradient-to-l from-transparent via-orange-300/30 to-transparent dark:via-orange-400/18 motion-safe:animate-wave-flow-delayed opacity-45',
    node:
      'absolute h-1.5 w-1.5 rounded-full bg-orange-400/35 dark:bg-orange-400/25 motion-safe:animate-node-float',
    spectrumRow:
      'absolute right-[6%] top-[22%] hidden lg:flex items-end justify-center gap-1 h-14 opacity-30 dark:opacity-20',
    spectrumBar:
      'w-1 rounded-full bg-gradient-to-t from-orange-400/55 to-accent-400/45 dark:from-orange-400/35 dark:to-accent-400/28 origin-bottom motion-safe:animate-spectrum-pulse',
    waveBand:
      'absolute inset-x-0 bottom-0 h-20 sm:h-24 opacity-35 dark:opacity-20 motion-safe:animate-wave-flow pointer-events-none',
    waveSvg: 'h-full w-[108%] -translate-x-[4%]',
    wavePathA:
      'fill-primary-200/30 dark:fill-primary-500/10 motion-safe:animate-wave-flow',
    wavePathB:
      'fill-orange-200/20 dark:fill-orange-500/8 motion-safe:animate-wave-flow-delayed',
  },

  layout: 'flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-16 items-center',
  contentCol: 'w-full lg:w-[42%] xl:w-[40%] flex flex-col items-start text-left shrink-0',
  mediaCol: 'w-full lg:w-[58%] xl:w-[60%] flex flex-col gap-4 relative min-w-0',

  badge: [
    'inline-flex items-center px-4 py-1.5 rounded-lg',
    'text-xs font-bold text-theme-action-primaryForeground',
    'bg-theme-action-primary shadow-sm mb-5 sm:mb-6',
  ].join(' '),

  heading: [
    'font-heading font-black tracking-tight leading-[1.12]',
    'text-2xl sm:text-4xl md:text-[2.65rem] lg:text-5xl',
    'text-ink-primary dark:text-theme-heading',
    'max-w-xl',
  ].join(' '),

  divider: [
    'h-1 w-20 sm:w-24 rounded-full mt-4 mb-6 sm:mb-8 origin-left',
    'bg-gradient-to-r from-orange-500 via-primary-500 to-accent-500',
    'opacity-90 dark:opacity-80',
  ].join(' '),

  checklist: 'flex flex-col gap-3.5 sm:gap-4 max-w-md',
  checklistItem:
    'flex items-start gap-3.5 text-[0.92rem] sm:text-[0.95rem] font-medium text-ink-secondary dark:text-theme-body leading-relaxed',
  checklistIcon: 'shrink-0 mt-0.5 flex items-center justify-center text-theme-action-primary',

  carousel: [
    'flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth',
    'scrollbar-hide w-full py-2 px-1',
    '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  ].join(' '),

  card: [
    'group flex flex-col items-center text-center',
    'p-6 sm:p-8 rounded-2xl sm:rounded-[1.75rem]',
    'border border-theme-border/60 dark:border-theme-border/70',
    'bg-theme-card dark:bg-theme-card/75',
    'shadow-theme dark:shadow-theme',
    'ring-1 ring-transparent dark:ring-violet-400/10',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-1 hover:border-theme-action-primary/40',
    'hover:shadow-card-hover dark:hover:ring-theme-action-primary/15',
    'motion-reduce:hover:translate-y-0 motion-reduce:transition-none',
    'snap-start shrink-0',
    'w-full md:w-[calc(50%-12px)] min-h-[300px] sm:min-h-[340px]',
  ].join(' '),

  cardTitle:
    'font-heading font-black text-lg text-ink-primary dark:text-theme-heading leading-snug',
  cardDivider:
    'h-0.5 w-12 bg-gradient-to-r from-orange-500 to-accent-500 rounded-full mt-3 mb-4 opacity-90 dark:opacity-80',
  cardDescription:
    'text-[0.85rem] sm:text-[0.9rem] leading-relaxed text-ink-muted dark:text-theme-body/85 max-w-[240px]',

  dots: 'flex items-center justify-center gap-2 mt-3',
  dot: [
    'h-2 rounded-full transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-action-primary',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-theme-page',
  ].join(' '),
  dotActive: 'bg-theme-action-primary w-5',
  dotIdle:
    'bg-theme-border dark:bg-theme-border w-2 hover:bg-theme-action-primary/60',

  statsWrap: 'mt-12 md:mt-16 lg:mt-20',
  statsShell: [
    'rounded-2xl sm:rounded-3xl',
    'border border-theme-border/60 dark:border-theme-border/70',
    'bg-theme-card dark:bg-theme-card/70',
    'shadow-theme dark:shadow-theme',
    'ring-1 ring-transparent dark:ring-violet-400/10',
    'px-6 py-8 sm:px-8 md:py-10',
  ].join(' '),
  statsGrid:
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 items-center justify-center',
  statItem: [
    'flex flex-col items-center justify-center text-center',
    'transition-transform duration-300 motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
  ].join(' '),
  statDivider: 'lg:border-r lg:border-theme-border/50 dark:lg:border-theme-border/60',
  statValue:
    'font-heading font-black text-2xl sm:text-3xl text-ink-primary dark:text-theme-heading leading-none mb-2',
  statLabel:
    'text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-theme-action-primary',

  /** Bottom wave — seamless into How It Works (theme-page in both modes) */
  wave: 'absolute bottom-0 left-0 right-0 h-10 w-full pointer-events-none select-none overflow-hidden',
  waveFill: 'w-full h-full object-cover text-theme-page dark:text-theme-page',
};
