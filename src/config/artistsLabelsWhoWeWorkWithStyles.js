/**
 * Tailwind class maps for the Artists & Labels “Who We Work With” section.
 * Keep complete static class strings so Tailwind can detect them.
 */

export const audienceThemeClasses = {
  orange: {
    iconBadge:
      'border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-400/25 dark:bg-orange-500/10 dark:text-orange-300',
    check:
      'border-orange-400 text-orange-600 dark:border-orange-400 dark:text-orange-300',
    glow: 'group-hover:shadow-orange-500/10',
  },
  pink: {
    iconBadge:
      'border-pink-200 bg-pink-50 text-pink-600 dark:border-pink-400/25 dark:bg-pink-500/10 dark:text-pink-300',
    check:
      'border-pink-400 text-pink-600 dark:border-pink-400 dark:text-pink-300',
    glow: 'group-hover:shadow-pink-500/10',
  },
  purple: {
    iconBadge:
      'border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-400/25 dark:bg-purple-500/10 dark:text-purple-300',
    check:
      'border-purple-400 text-purple-600 dark:border-purple-400 dark:text-purple-300',
    glow: 'group-hover:shadow-purple-500/10',
  },
};

export const headingHighlightClasses = {
  orange:
    'bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent',
  pink:
    'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent',
};

export const accentBarClasses = {
  orange: 'h-1.5 w-7 rounded-full bg-orange-500',
  pink: 'h-1.5 w-7 rounded-full bg-pink-500',
  teal: 'h-1.5 w-7 rounded-full bg-teal-500',
  purple: 'h-1.5 w-7 rounded-full bg-violet-500',
  neutral: 'h-1.5 w-7 rounded-full bg-slate-300 dark:bg-neutral-600',
};

export const artistsLabelsWhoWeWorkWithStyles = {
  section: {
    base: 'relative w-full overflow-hidden bg-slate-50 dark:bg-neutral-950 pt-18 sm:pt-22 md:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24',
    container: 'relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    content: 'relative z-10 flex flex-col items-center',
  },

  header: {
    wrapper: 'w-full max-w-3xl mx-auto flex flex-col items-center text-center',
    badge:
      'inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-[#FFE8D6] px-3.5 py-1.5 dark:border-orange-400/20 dark:bg-orange-500/15',
    badgeIcon: 'shrink-0 text-[#E85D04] dark:text-orange-300',
    badgeText:
      'text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#E85D04] dark:text-orange-300',
    heading:
      'mt-5 sm:mt-6 font-heading font-extrabold tracking-tight text-slate-950 dark:text-white text-[1.85rem] leading-[1.2] sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem]',
    headingPlain: 'text-slate-950 dark:text-white',
    description:
      'mt-5 sm:mt-6 max-w-[50rem] text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-neutral-400',
    accentRow: 'mt-4 sm:mt-5 flex items-center justify-center gap-1.5',
  },

  grid: {
    wrapper:
      'mt-10 sm:mt-12 lg:mt-14 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8',
    card: [
      'group relative flex h-full flex-col',
      'rounded-2xl sm:rounded-3xl',
      'border border-slate-200/90 dark:border-white/10',
      'bg-white dark:bg-neutral-900/80',
      'shadow-[0_12px_40px_-20px_rgba(15,23,42,0.18)]',
      'dark:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.55)]',
      'transition-all duration-300 ease-out',
      'hover:-translate-y-1',
      'hover:shadow-[0_22px_50px_-22px_rgba(15,23,42,0.28)]',
      'dark:hover:shadow-[0_22px_50px_-18px_rgba(0,0,0,0.7)]',
      'md:last:col-span-2 md:last:max-w-md md:last:justify-self-center lg:last:col-span-1 lg:last:max-w-none',
    ].join(' '),
    imageWrapper: 'relative w-full overflow-hidden aspect-[5/3.4] rounded-t-2xl sm:rounded-t-3xl',
    image:
      'h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
    iconBadge: [
      'absolute left-1/2 z-20',
      '-bottom-9 sm:-bottom-10',
      '-translate-x-1/2',
      'flex items-center justify-center',
      'h-[72px] w-[72px] sm:h-[84px] sm:w-[84px] lg:h-[88px] lg:w-[88px]',
      'rounded-full border-2',
      'bg-white dark:bg-neutral-900',
      'shadow-[0_10px_28px_-10px_rgba(15,23,42,0.35)]',
      'transition-transform duration-300 ease-out',
      'group-hover:-translate-y-0.5',
      'motion-reduce:group-hover:translate-y-0',
    ].join(' '),
    cardContent:
      'flex flex-1 flex-col px-5 sm:px-6 pt-14 sm:pt-16 pb-6 sm:pb-7 text-center',
    title:
      'font-heading text-xl sm:text-[1.4rem] font-bold tracking-tight text-slate-950 dark:text-white',
    description:
      'mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-neutral-400 min-h-[4.5rem]',
    divider: 'mt-5 mb-5 border-t border-slate-200 dark:border-white/10',
    featureList: 'mt-auto flex flex-col gap-3 text-left',
    featureItem: 'flex items-start gap-3',
    featureIcon:
      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
    featureText: 'text-sm leading-snug text-slate-700 dark:text-neutral-300',
  },

  trust: {
    wrapper:
      'mt-10 sm:mt-12 lg:mt-14 inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 text-center',
    icon: 'shrink-0 text-orange-500 dark:text-orange-400',
    text: 'text-sm sm:text-[15px] font-medium text-slate-500 dark:text-neutral-400',
  },

  decorations: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden',
    dots: 'absolute top-10 left-4 sm:left-10 hidden sm:grid grid-cols-5 gap-2.5 opacity-30 dark:opacity-20',
    dotsRight:
      'absolute bottom-16 right-4 sm:right-10 hidden sm:grid grid-cols-5 gap-2.5 opacity-25 dark:opacity-15',
    dot: 'h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-neutral-600',
    triangle:
      'absolute left-6 top-28 hidden md:block h-0 w-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-violet-300/50 dark:border-b-violet-400/30',
    curve:
      'absolute right-8 top-24 hidden md:block h-16 w-16 rounded-full border-2 border-orange-300/50 dark:border-orange-400/25 border-l-transparent border-b-transparent rotate-45',
    glowLeft:
      'absolute -left-20 top-1/3 h-56 w-56 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-500/10',
    glowRight:
      'absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-pink-200/25 blur-3xl dark:bg-pink-500/10',
  },
};
