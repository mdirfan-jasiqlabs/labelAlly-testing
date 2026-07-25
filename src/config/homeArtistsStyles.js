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

  filter: {
    // Mobile: full-bleed swipe row. md+: normal in-flow centered pills.
    container: [
      'relative w-full min-w-0 max-w-full self-stretch',
      'mb-3 sm:mb-4 md:mb-4',
      'max-md:-mx-4 max-md:w-[calc(100%+2rem)]',
      'sm:max-md:-mx-6 sm:max-md:w-[calc(100%+3rem)]',
      'bg-transparent',
    ].join(' '),
    scrollTrack: [
      'flex flex-nowrap items-center',
      'gap-2.5 sm:gap-3 md:gap-4',
      'w-full min-w-0 max-w-full',
      'overflow-x-auto overflow-y-hidden',
      'overscroll-x-contain',
      'snap-x snap-mandatory',
      // Allow vertical page scroll + horizontal swipe (pan-x alone traps touch)
      '[touch-action:pan-x_pan-y]',
      '[-webkit-overflow-scrolling:touch]',
      '[-ms-overflow-style:none] [scrollbar-width:none]',
      '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
      'px-4 sm:px-6 md:px-0 py-1.5 md:py-1',
      'scroll-px-4 sm:scroll-px-6 md:scroll-px-0',
      'md:justify-center md:overflow-x-visible',
    ].join(' '),

    // Mobile default = square icon cards; md+ restores horizontal pills.
    pill: [
      'group relative shrink-0 grow-0 snap-start',
      'inline-flex flex-col items-center justify-center gap-1',
      'h-[4.75rem] w-[4.75rem] sm:h-20 sm:w-20',
      'rounded-[1.05rem] sm:rounded-[1.15rem]',
      'text-[11px] font-semibold whitespace-nowrap select-none',
      'transition-all duration-[250ms] ease-out',
      'focus-visible:outline-none',
      'focus-visible:ring-2 focus-visible:ring-theme-action-primary',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-theme-page',
      // Tablet / desktop — original pill chrome
      'md:h-[50px] md:w-auto md:flex-row md:gap-2',
      'md:rounded-full md:px-5',
      'md:text-sm',
    ].join(' '),
    pillActive: [
      // Mobile active: orange gradient + glow
      'bg-gradient-to-br from-orange-500 to-orange-600',
      'text-white',
      'border border-orange-400/80',
      'shadow-[0_10px_22px_-8px_rgba(249,115,22,0.7)]',
      'dark:shadow-[0_12px_26px_-8px_rgba(249,115,22,0.55)]',
      // Desktop active: solid brand pill
      'md:[background-image:none] md:bg-theme-action-primary',
      'md:text-theme-action-primaryForeground',
      'md:border-theme-action-primary',
      'md:shadow-[0_10px_24px_-10px_rgba(249,115,22,0.75)]',
      'dark:md:shadow-[0_12px_28px_-10px_rgba(249,115,22,0.55)]',
    ].join(' '),
    pillIdle: [
      // Mobile idle: dark surface card
      'bg-theme-card dark:bg-theme-card/90',
      'border border-theme-border/70 dark:border-white/15',
      'text-ink-muted dark:text-white/70',
      'active:border-theme-action-primary',
      'active:bg-theme-action-primary/10',
      // Desktop idle: transparent outlined pill
      'md:bg-transparent',
      'md:border-theme-border/80 dark:md:border-white/25',
      'md:text-ink-primary dark:md:text-white',
      'md:hover:border-theme-action-primary',
      'md:hover:text-theme-action-primary',
      'md:hover:bg-theme-action-primary/10',
      'dark:md:hover:bg-orange-500/10',
      'md:hover:-translate-y-0.5',
      'motion-reduce:md:hover:translate-y-0',
    ].join(' '),
    pillIcon: [
      'h-5 w-5 shrink-0 text-white',
      'md:h-4 md:w-4 md:text-current',
    ].join(' '),
    pillLabelMobile: [
      'leading-none md:hidden',
      'max-w-[4.25rem] truncate text-center',
    ].join(' '),
    pillLabelDesktop: [
      'hidden md:inline leading-none',
    ].join(' '),
  },

  carouselWrap: [
    'relative w-full min-w-0 max-w-full self-stretch overflow-visible',
    'px-0 sm:px-1 md:px-12 mt-2 sm:mt-4',
    // Keep the 3-card desktop row compact (not full-bleed oversized)
    'md:mx-auto md:max-w-5xl xl:max-w-6xl',
  ].join(' '),

  navButton: [
    'absolute top-1/2 -translate-y-1/2 z-30',
    'w-11 h-11 rounded-full',
    'bg-theme-card dark:bg-theme-card',
    'border border-theme-border/80',
    'shadow-md hover:shadow-lg',
    'text-ink-muted dark:text-theme-muted',
    'hover:text-theme-action-primary',
    'hover:bg-theme-hover',
    'hover:border-theme-action-primary/30',
    'active:scale-95 transition-all duration-200',
    'hidden md:flex items-center justify-center',
    'pointer-events-auto',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-action-primary',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-theme-page',
  ].join(' '),

  navButtonLeft: 'left-0 md:-left-3 lg:-left-5',
  navButtonRight: 'right-0 md:-right-3 lg:-right-5',

  scrollTrack: [
    'flex gap-4 sm:gap-5 md:gap-5 lg:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory',
    'w-full min-w-0 max-w-full overscroll-x-contain',
    // pan-x alone blocks finger scroll-down on mobile; keep both axes
    '[touch-action:pan-x_pan-y]',
    '[-webkit-overflow-scrolling:touch]',
    'py-4 sm:py-5 md:py-4 px-0 md:px-1 rounded-3xl',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-action-primary/40',
  ].join(' '),

  // Mobile: one full-width card. Tablet: 2. Desktop: exactly 3 equal compact cards.
  slide: [
    'snap-start shrink-0 grow-0',
    'min-w-full w-full max-w-full',
    'md:min-w-0 md:w-[calc((100%-20px)/2)]',
    'lg:w-[calc((100%-48px)/3)]',
  ].join(' '),

  card: [
    'group relative overflow-hidden flex flex-col h-full w-full max-w-full min-w-0',
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

  // Pre-cropped 4:3 assets fill edge-to-edge; optional JSON imagePosition overrides focal point.
  imageWrap: [
    'relative w-full shrink-0 overflow-hidden rounded-t-2xl',
    'aspect-[4/3]',
    'bg-theme-secondary',
  ].join(' '),

  image: [
    'absolute inset-0 block h-full w-full',
    'object-cover',
    'select-none',
  ].join(' '),

  cardBody: [
    'flex flex-col items-center justify-center text-center',
    'min-h-[5.75rem] px-4 py-4 sm:px-5 sm:py-5',
  ].join(' '),
  artistName:
    'font-heading text-base font-bold text-ink-primary dark:text-theme-heading leading-snug',
  artistRole: 'text-xs text-ink-muted dark:text-theme-muted font-medium',
  accentLine: 'w-6 h-[2px] bg-theme-action-primary/35 my-2.5 rounded-full shrink-0',

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
