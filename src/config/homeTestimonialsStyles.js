/** Tailwind class maps for the homepage Testimonials section. */
export const homeTestimonialsStyles = {
  section: [
    'relative section-spacing overflow-hidden outline-none',
    'bg-surface-page',
    'border-t border-theme-border/50',
  ].join(' '),

  background: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    orb:
      'absolute bottom-0 right-0 h-[450px] w-[450px] translate-x-1/4 translate-y-1/4 rounded-full bg-primary-100/30 blur-3xl dark:bg-primary-500/10 opacity-70 dark:opacity-45',
    orbAccent:
      'absolute top-[12%] -left-20 h-[240px] w-[240px] rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/8 motion-safe:animate-hero-float-delayed',
    vinylArc:
      'absolute bottom-[18%] left-[8%] hidden md:block h-32 w-32 rounded-full border border-dashed border-primary-400/40 dark:border-primary-300/30 opacity-60 dark:opacity-50',
    flowLine:
      'absolute top-[36%] right-[6%] hidden lg:block h-px w-[26%] bg-gradient-to-l from-transparent via-orange-300/28 to-transparent dark:via-orange-400/16 motion-safe:animate-wave-flow opacity-40',
    node:
      'absolute h-1.5 w-1.5 rounded-full bg-orange-400/35 dark:bg-orange-400/25 motion-safe:animate-node-float',
  },

  nodePositions: [
    'top-[24%] left-[14%]',
    'bottom-[28%] right-[12%]',
    'top-[52%] left-[28%]',
  ],

  header: 'text-center max-w-3xl mx-auto flex flex-col items-center mb-12 md:mb-16 px-2',

  badge: [
    'inline-flex items-center px-4 py-1.5 rounded-lg',
    'text-xs font-bold text-theme-action-primaryForeground uppercase tracking-wider select-none',
    'bg-theme-action-primary shadow-sm mb-6',
  ].join(' '),

  heading: [
    'font-heading text-2xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]',
    'font-extrabold text-ink-primary dark:text-theme-heading',
    'mt-3 leading-tight tracking-tight text-center text-balance',
  ].join(' '),

  brandDivider: 'flex items-center gap-1.5 w-20 h-1 mt-7 origin-center',

  carouselWrap: 'w-full max-w-5xl mx-auto flex items-center justify-center',
  carouselGrid: 'grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center w-full',

  portraitCol:
    'lg:col-span-5 flex justify-center items-center relative h-64 sm:h-80 md:h-96 w-full',

  pulseRing:
    'absolute rounded-full border-2 motion-safe:animate-pulse motion-reduce:animate-none',
  pulseRingOne:
    'w-[80%] h-[80%] sm:w-[90%] sm:h-[90%] border-orange-400/40 dark:border-orange-400/35',
  pulseRingTwo:
    'w-[95%] h-[95%] sm:w-[105%] sm:h-[105%] border-primary-400/30 dark:border-primary-300/25',
  pulseRingThree:
    'w-[110%] h-[110%] sm:w-[120%] sm:h-[120%] border-accent-400/25 dark:border-accent-400/20',

  eqRow:
    'absolute bottom-4 left-[10%] right-[10%] flex items-end justify-center gap-1.5 h-14 sm:h-16 opacity-55 dark:opacity-45 z-0 pointer-events-none',
  eqBar:
    'w-1.5 rounded-t-full origin-bottom motion-safe:animate-eq-bar motion-reduce:animate-none',

  floatNote:
    'absolute font-bold select-none pointer-events-none z-[1] text-orange-500/45 dark:text-orange-400/40 motion-safe:animate-node-float motion-reduce:animate-none',
  floatNoteTop: 'top-[8%] left-[6%] text-3xl sm:text-4xl',
  floatNoteBottom: 'bottom-[18%] right-[4%] text-2xl sm:text-3xl motion-safe:animate-hero-float-delayed',

  portraitFrame: [
    'relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80',
    'flex items-center justify-center z-10',
    'transition-all duration-300 transform',
    'drop-shadow-md dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]',
  ].join(' '),

  portraitFrameTransition: 'opacity-100 scale-100',
  portraitFrameTransitionActive: 'opacity-0 scale-95',

  portraitBorder:
    'absolute inset-0 bg-gradient-to-tr from-brand-pink via-brand-orange to-brand-green shadow-sm',

  portraitInner:
    'absolute inset-[6px] bg-theme-card overflow-hidden ring-1 ring-theme-border/50',

  portraitImage: [
    'w-full h-full object-cover object-[center_18%]',
    'transition-transform duration-500 ease-out',
    'motion-safe:group-hover:scale-[1.02] motion-reduce:group-hover:scale-100',
    'dark:brightness-105 dark:contrast-[1.03]',
  ].join(' '),

  contentCol:
    'lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative z-10 min-w-0',

  slideContent: [
    'transition-all duration-300 transform flex flex-col items-center lg:items-start',
  ].join(' '),

  slideContentActive: 'opacity-100 translate-x-0',
  slideContentTransitioning: 'opacity-0 translate-x-6',

  quoteIcon:
    'text-orange-500/40 dark:text-orange-400/35 mb-5 lg:-ml-1 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100',

  blockquote: [
    'font-heading text-ink-primary dark:text-theme-body',
    'text-base md:text-[1.18rem] font-medium leading-relaxed italic',
    'mb-6 max-w-xl',
  ].join(' '),

  nameBadge: [
    'inline-block bg-theme-action-primary text-theme-action-primaryForeground font-bold text-[0.85rem]',
    'px-5 py-2 rounded-sm select-none mb-1 tracking-wide shadow-sm',
  ].join(' '),

  role:
    'not-italic text-xs font-bold text-ink-muted dark:text-theme-muted tracking-wider uppercase',

  controlsRow:
    'flex flex-row items-center gap-5 mt-8 w-full justify-between select-none',

  navButton: [
    'w-10 h-10 rounded-full flex items-center justify-center',
    'border border-theme-border',
    'bg-theme-card',
    'text-ink-muted dark:text-theme-muted',
    'hover:border-theme-action-primary/40',
    'hover:text-theme-action-primary',
    'hover:bg-theme-hover',
    'shadow-sm hover:shadow-card-hover',
    'transition-all duration-200 active:scale-95',
    'hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-action-primary',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-theme-page',
  ].join(' '),

  navGroup: 'flex items-center gap-3 order-2 sm:order-1',

  dotsGroup: 'flex items-center gap-2 order-1 sm:order-2',

  dot: [
    'w-3.5 h-3.5 rounded-full border transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-action-primary',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-theme-page',
  ].join(' '),

  dotActive: 'bg-theme-action-primary border-theme-action-primary scale-110 shadow-sm',
  dotIdle: [
    'bg-theme-card',
    'border-theme-border',
    'hover:border-theme-action-primary/40',
    'hover:bg-theme-hover',
  ].join(' '),
};

/** Organic blob border-radius — preserved from approved design. */
export const TESTIMONIAL_ORGANIC_RADIUS = '60% 40% 30% 70% / 60% 30% 70% 40%';

/** Equalizer bar config for portrait decoration. */
export const TESTIMONIAL_EQ_BARS = [
  { color: 'bg-brand-pink', height: 'h-[40%]', delay: '0ms', animation: 'motion-safe:animate-eq-bar' },
  { color: 'bg-brand-orange', height: 'h-[70%]', delay: '150ms', animation: 'motion-safe:animate-eq-bar-slow' },
  { color: 'bg-brand-green', height: 'h-full', delay: '300ms', animation: 'motion-safe:animate-eq-bar-fast' },
  { color: 'bg-brand-blue', height: 'h-[60%]', delay: '100ms', animation: 'motion-safe:animate-eq-bar' },
  { color: 'bg-brand-pink', height: 'h-[80%]', delay: '250ms', animation: 'motion-safe:animate-eq-bar-slow' },
  { color: 'bg-brand-orange', height: 'h-[50%]', delay: '400ms', animation: 'motion-safe:animate-eq-bar' },
  { color: 'bg-brand-green', height: 'h-[90%]', delay: '500ms', animation: 'motion-safe:animate-eq-bar-fast' },
  { color: 'bg-brand-blue', height: 'h-[40%]', delay: '200ms', animation: 'motion-safe:animate-eq-bar-slow' },
];
