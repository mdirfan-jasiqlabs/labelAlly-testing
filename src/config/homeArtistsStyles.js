import { homeHeroStyles } from './homeHeroStyles';

/** Tailwind class maps for the homepage Featured Artists section. */
export const homeArtistsStyles = {
  section: [
    'relative section-spacing overflow-hidden',
    'bg-surface-page',
    'border-t border-theme-border/50',
  ].join(' '),

  background: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    glow:
      'absolute inset-0 bg-artistGlow opacity-60 dark:opacity-35',
    orbPrimary:
      'absolute -top-16 left-1/2 -translate-x-1/2 h-[320px] w-[520px] rounded-full bg-primary-400/8 blur-3xl dark:bg-violet-500/8 motion-safe:animate-hero-drift',
    orbAccent:
      'absolute bottom-[12%] -right-20 h-[240px] w-[240px] rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/8 motion-safe:animate-hero-float-delayed',
    flowLine:
      'absolute top-[38%] left-[10%] hidden lg:block h-px w-[30%] bg-gradient-to-r from-transparent via-primary-300/30 to-transparent dark:via-primary-400/18 motion-safe:animate-wave-flow opacity-45',
    spectrumRow:
      'absolute top-[18%] right-[10%] hidden md:flex items-end justify-center gap-1 h-10 opacity-25 dark:opacity-15',
    spectrumBar:
      'w-1 rounded-full bg-gradient-to-t from-primary-400/45 to-orange-400/40 dark:from-primary-400/28 dark:to-orange-400/25 origin-bottom motion-safe:animate-spectrum-pulse',
    dotGrid:
      'absolute text-neutral-200/80 dark:text-neutral-700/35 opacity-60 dark:opacity-25 pointer-events-none hidden md:block w-24 h-24',
    dotGridLeft: 'top-16 left-6',
    dotGridRight: 'top-16 right-6',
    musicNote:
      'absolute top-40 left-[8%] md:left-[12%] lg:left-[15%] text-orange-500/30 dark:text-orange-400/20 pointer-events-none animate-float hidden md:block',
    microphone:
      'absolute top-44 right-[8%] md:right-[12%] lg:right-[15%] text-primary-500/30 dark:text-primary-400/20 pointer-events-none animate-float hidden md:block',
  },

  header: 'text-center max-w-3xl mx-auto flex flex-col items-center mb-10 md:mb-16',

  badge: [
    'inline-flex items-center px-4 py-1.5 rounded-lg',
    'text-xs font-bold text-theme-action-primaryForeground uppercase tracking-wider select-none',
    'bg-theme-action-primary shadow-sm mb-6',
  ].join(' '),

  heading: [
    'font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold',
    'text-ink-primary dark:text-theme-heading mt-5 leading-tight tracking-tight',
  ].join(' '),

  description:
    'text-sm sm:text-base md:text-lg text-ink-secondary dark:text-theme-body mt-4 max-w-2xl mx-auto leading-relaxed',

  brandDivider: 'flex items-center gap-1.5 w-20 h-1 mt-7 origin-center',

  carouselWrap: 'relative w-full px-4 md:px-12 mt-4',

  navButton: [
    'absolute top-1/2 -translate-y-1/2 z-20',
    'w-11 h-11 rounded-full',
    'bg-theme-card',
    'border border-theme-border/80',
    'shadow-sm hover:shadow-md',
    'text-ink-muted dark:text-theme-muted',
    'hover:text-theme-action-primary',
    'hover:bg-theme-hover',
    'hover:border-theme-action-primary/30',
    'active:scale-95 transition-all duration-200',
    'hidden md:flex items-center justify-center',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-action-primary',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-theme-page',
  ].join(' '),

  navButtonLeft: 'left-2 md:-left-4 lg:-left-6',
  navButtonRight: 'right-2 md:-right-4 lg:-right-6',

  scrollTrack: [
    'flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory',
    'py-6 px-1 md:px-2 rounded-3xl',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-action-primary/40',
  ].join(' '),

  slide:
    'snap-start shrink-0 w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]',

  card: [
    'group relative overflow-hidden flex flex-col h-full',
    'bg-theme-card dark:bg-theme-card/75',
    'border border-theme-border/50 dark:border-theme-border/60',
    'rounded-2xl shadow-sm',
    'ring-1 ring-transparent dark:ring-violet-400/10',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-1 hover:shadow-card-hover',
    'hover:border-theme-action-primary/30',
    'dark:hover:ring-theme-action-primary/10',
    'motion-reduce:hover:translate-y-0',
  ].join(' '),

  featuredBadge: [
    'absolute top-4 right-4 z-10',
    'bg-theme-action-primary text-theme-action-primaryForeground',
    'text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm',
    'flex items-center gap-1 select-none animate-pulse-slow',
  ].join(' '),

  imageWrap:
    'relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-theme-secondary',

  image: [
    'w-full h-full object-cover object-[center_20%]',
    'select-none transition-transform duration-700 ease-out',
    'motion-safe:group-hover:scale-105 motion-reduce:group-hover:scale-100',
  ].join(' '),

  cardBody: 'flex-1 flex flex-col items-center text-center p-6 pb-8',
  artistName:
    'font-heading text-base font-bold text-ink-primary dark:text-theme-heading leading-snug',
  artistRole: 'text-xs text-ink-muted dark:text-theme-muted font-medium mt-0.5',
  accentLine: 'w-6 h-[2px] bg-theme-action-primary/35 my-3.5 rounded-full',

  socialLink: [
    'text-ink-muted dark:text-theme-muted transition-colors',
    'focus-visible:outline-none focus-visible:text-theme-action-primary',
  ].join(' '),

  dotsWrap: 'flex justify-center gap-2 mt-10',
  dot: [
    'h-2 rounded-full transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-action-primary',
  ].join(' '),
  dotActive: 'w-6 bg-theme-action-primary',
  dotIdle:
    'w-2 bg-theme-border dark:bg-theme-border hover:bg-theme-action-primary/60',
};
