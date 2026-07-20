/**
 * Reusable Tailwind class maps — Artists & Labels Hero.
 * Tuned to match the reference layout, spacing, and hierarchy.
 */

export const heroClasses = {
  sectionClass:
    'relative w-full overflow-hidden bg-theme-secondary',

  containerClass:
    'relative z-10 w-full mx-auto max-w-container-2xl px-4 sm:px-6 lg:px-8 xl:px-10',

  layoutClass: [
    'grid grid-cols-1 lg:grid-cols-12',
    'gap-8 sm:gap-10 lg:gap-8 xl:gap-10',
    'items-center',
    'pt-12 sm:pt-14 lg:pt-16 xl:pt-18',
    'pb-10 sm:pb-12 lg:pb-14',
  ].join(' '),

  contentColClass: 'lg:col-span-6 xl:col-span-6 relative z-10',

  galleryColClass: 'lg:col-span-6 xl:col-span-6 relative z-10',

  contentClass:
    'relative z-10 flex flex-col items-start text-left gap-0 motion-safe:animate-fade-up',

  badgeClass: [
    'inline-flex items-center gap-2',
    'rounded-full',
    'bg-[#FFE8D6] dark:bg-brand-orange/20',
    'px-3.5 py-1.5',
    'text-[13px] font-semibold',
    'text-theme-action-primary dark:text-orange-300',
  ].join(' '),

  badgeIconClass: 'shrink-0 text-theme-action-primary dark:text-orange-300',

  headingClass: [
    'font-heading font-extrabold tracking-tight text-ink-primary dark:text-theme-heading',
    'text-[2.25rem] leading-[1.12]',
    'xs:text-[2.5rem]',
    'sm:text-[3rem] sm:leading-[1.1]',
    'md:text-[3.25rem]',
    'lg:text-[3.5rem] lg:leading-[1.08]',
    'xl:text-[3.75rem]',
    'mt-5 sm:mt-6',
  ].join(' '),

  headingLineClass: 'block',

  gradientClass:
    'bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent',

  accentRowClass: 'mt-4 mb-5 flex items-center gap-1.5',

  accentLineClass: {
    orange: 'h-[5px] w-7 rounded-full bg-orange-500',
    indigo: 'h-[5px] w-7 rounded-full bg-violet-500',
    green: 'h-[5px] w-7 rounded-full bg-emerald-500',
    blue: 'h-[5px] w-7 rounded-full bg-sky-500',
  },

  descriptionClass:
    'max-w-[34rem] text-[15px] sm:text-base leading-[1.7] text-ink-secondary dark:text-theme-body',

  buttonRowClass:
    'mt-7 sm:mt-8 flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3',

  buttonClass: {
    base: [
      'group relative inline-flex items-center justify-center gap-2.5',
      'h-[48px] px-6 sm:px-7 rounded-xl',
      'text-sm font-semibold whitespace-nowrap',
      'transition-all duration-300 ease-smooth',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'focus-visible:ring-orange-500 focus-visible:ring-offset-theme-page',
      'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
      'active:scale-[0.98]',
      'w-full sm:w-auto',
    ].join(' '),
    primary: [
      'bg-gradient-to-r from-orange-500 to-rose-500 text-white',
      'shadow-[0_12px_28px_-8px_rgba(249,115,22,0.55)]',
      'hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(244,63,94,0.5)]',
    ].join(' '),
    secondary: [
      'bg-theme-card text-ink-primary dark:text-theme-heading',
      'border border-theme-border',
      'shadow-sm',
      'hover:bg-theme-hover',
      'hover:border-theme-border',
    ].join(' '),
  },

  featureClass: {
    list: 'mt-9 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 w-full max-w-xl',
    item: [
      'group flex flex-col items-start gap-2.5',
      'transition-transform duration-300 ease-smooth',
      'hover:-translate-y-0.5',
    ].join(' '),
    iconWrap: {
      orange:
        'flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-500/15 dark:text-orange-300 transition-transform duration-300 group-hover:scale-105',
      green:
        'flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 transition-transform duration-300 group-hover:scale-105',
      indigo:
        'flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300 transition-transform duration-300 group-hover:scale-105',
      blue:
        'flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300 transition-transform duration-300 group-hover:scale-105',
    },
    title: 'text-[12px] sm:text-[13px] font-semibold text-ink-secondary dark:text-theme-body leading-snug',
  },

  galleryClass: {
    root: 'relative z-10 w-full',
    stage:
      'relative mx-auto w-full max-w-[480px] lg:max-w-[520px] xl:max-w-[560px] aspect-[4/5] sm:aspect-[5/6] overflow-hidden',
    mainWrap: [
      'absolute left-[8%] right-[10%] top-[6%] bottom-[14%]',
      'overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]',
      'shadow-[0_24px_60px_-20px_rgba(15,23,42,0.28)]',
      'dark:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.55)]',
      'ring-1 ring-black/5 dark:ring-theme-border',
      'transition-transform duration-300 ease-smooth',
      'motion-safe:animate-hero-float',
    ].join(' '),
    mainImage: 'h-full w-full object-cover object-center',
    float: {
      'top-right': [
        'absolute top-[0%] right-[0%] z-20',
        'w-[34%] min-w-0 max-w-[168px] aspect-[5/4]',
        'overflow-hidden rounded-2xl',
        'bg-theme-card',
        'ring-4 ring-theme-page',
        'shadow-[0_16px_40px_-12px_rgba(15,23,42,0.3)]',
        'transition-transform duration-300 ease-smooth hover:scale-[1.03]',
        'motion-safe:animate-hero-float-delayed',
      ].join(' '),
      'bottom-left': [
        'absolute bottom-[8%] left-[0%] z-20',
        'w-[32%] min-w-0 max-w-[156px] aspect-square',
        'overflow-hidden rounded-2xl',
        'bg-theme-card',
        'ring-4 ring-theme-page',
        'shadow-[0_16px_40px_-12px_rgba(15,23,42,0.3)]',
        'transition-transform duration-300 ease-smooth hover:scale-[1.03]',
        'motion-safe:animate-hero-float',
      ].join(' '),
    },
    floatImage: 'h-full w-full object-cover',
  },

  trustClass: {
    root: 'relative z-10 w-full pb-10 sm:pb-12 lg:pb-14',
  },

  backgroundClass: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden',
    orb: {
      orange:
        'absolute rounded-full bg-orange-300/30 dark:bg-orange-500/10 blur-3xl motion-safe:animate-hero-drift',
      pink:
        'absolute rounded-full bg-rose-300/25 dark:bg-rose-500/10 blur-3xl motion-safe:animate-hero-drift-delayed',
      indigo:
        'absolute rounded-full bg-violet-300/20 dark:bg-violet-500/10 blur-3xl motion-safe:animate-hero-drift',
    },
    orbSize: {
      lg: 'h-[380px] w-[380px]',
      md: 'h-[280px] w-[280px]',
      sm: 'h-[200px] w-[200px]',
    },
    orbPosition: {
      'top-right': '-top-20 right-0 sm:right-16 opacity-70',
      'bottom-left': 'bottom-32 -left-16 opacity-50',
      'center-right': 'top-[30%] right-[22%] opacity-40',
    },
    dots: 'absolute top-10 left-6 sm:left-12 grid grid-cols-5 gap-2.5 opacity-35 dark:opacity-20',
    dotsRight:
      'absolute top-10 right-6 sm:right-12 grid grid-cols-5 gap-2.5 opacity-30 dark:opacity-15',
    dot: 'h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-neutral-600',
    pills: 'absolute top-14 right-16 sm:right-28 flex flex-col gap-2.5 opacity-80',
    pillTeal: 'h-2 w-9 rounded-full bg-teal-400/80 motion-safe:animate-hero-drift',
    pillOrange: 'h-2 w-6 rounded-full bg-orange-400/80 motion-safe:animate-hero-drift-delayed',
    rings: [
      'absolute right-[6%] top-[12%] lg:right-[8%] lg:top-[14%]',
      'h-[300px] w-[300px] sm:h-[380px] sm:w-[380px]',
      'rounded-full border border-orange-300/40 dark:border-orange-400/20',
    ].join(' '),
    ringInner:
      'absolute inset-10 rounded-full border border-rose-300/30 dark:border-rose-400/15',
    triangle:
      'absolute left-[48%] top-[22%] h-0 w-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-sky-400/50',
    wave: 'absolute right-[34%] top-[38%] h-7 w-10 opacity-35 dark:opacity-25',
  },

  shadowClass: 'shadow-hero-soft',
  imageClass: 'select-none',
};
