/**
 * Tailwind class maps for Artists & Labels Onboarding Process + CTA.
 * Keep complete static class strings so Tailwind can detect them.
 */

export const onboardingThemeClasses = {
  orange: {
    icon:
      'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300',
    number:
      'border-orange-300 bg-orange-50 text-orange-600 dark:border-orange-400/40 dark:bg-orange-500/15 dark:text-orange-300',
    accent: 'bg-orange-500',
    arrow: 'text-orange-500 dark:text-orange-300',
  },
  purple: {
    icon:
      'bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300',
    number:
      'border-violet-300 bg-violet-50 text-violet-600 dark:border-violet-400/40 dark:bg-violet-500/15 dark:text-violet-300',
    accent: 'bg-violet-500',
    arrow: 'text-violet-500 dark:text-violet-300',
  },
  blue: {
    icon:
      'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300',
    number:
      'border-sky-300 bg-sky-50 text-sky-600 dark:border-sky-400/40 dark:bg-sky-500/15 dark:text-sky-300',
    accent: 'bg-sky-500',
    arrow: 'text-sky-500 dark:text-sky-300',
  },
  green: {
    icon:
      'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300',
    number:
      'border-emerald-300 bg-emerald-50 text-emerald-600 dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-300',
    accent: 'bg-emerald-500',
    arrow: 'text-emerald-500 dark:text-emerald-300',
  },
  pink: {
    icon:
      'bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300',
    number:
      'border-pink-300 bg-pink-50 text-pink-600 dark:border-pink-400/40 dark:bg-pink-500/15 dark:text-pink-300',
    accent: 'bg-pink-500',
    arrow: 'text-pink-500 dark:text-pink-300',
  },
};

export const ctaHighlightThemeClasses = {
  orange:
    'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300',
  purple:
    'bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300',
  green:
    'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300',
  pink: 'bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300',
};

/** Grid placement kept for reference / future use */
export const placementClasses = {
  'top-left': 'lg:col-span-3 lg:col-start-1 lg:row-start-1',
  'top-center': 'lg:col-span-3 lg:col-start-5 lg:row-start-1',
  'top-right': 'lg:col-span-3 lg:col-start-9 lg:row-start-1',
  'bottom-left': 'lg:col-span-3 lg:col-start-3 lg:row-start-2',
  'bottom-right': 'lg:col-span-3 lg:col-start-7 lg:row-start-2',
};

export const artistsLabelsOnboardingStyles = {
  section: {
    base: 'relative w-full overflow-hidden bg-white dark:bg-neutral-950 pt-18 sm:pt-22 md:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24',
    container: 'relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    header:
      'relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center',
    processWrapper: 'relative z-10 mt-10 sm:mt-12 lg:mt-14 w-full',
    ctaWrapper: 'relative z-10 mt-12 sm:mt-14 lg:mt-16 w-full',
  },

  badge: {
    wrapper:
      'inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 dark:border-orange-400/30 dark:bg-orange-500/15',
    icon: 'shrink-0 text-orange-600 dark:text-orange-300',
    label:
      'text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-300',
  },

  heading: {
    title:
      'mt-5 sm:mt-6 font-heading font-extrabold tracking-tight text-slate-900 dark:text-white text-[1.85rem] leading-[1.2] sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem]',
    highlighted:
      'bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent',
    description:
      'mt-5 sm:mt-6 max-w-[46rem] text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-neutral-300',
  },

  process: {
    stage: 'relative w-full',
    desktopOnly: 'hidden lg:block',
    topRow:
      'grid grid-cols-[1fr_3rem_1fr_3rem_1fr] xl:grid-cols-[1fr_3.5rem_1fr_3.5rem_1fr] items-center',
    bottomRow: 'flex justify-center',
    bottomInner:
      'grid w-full max-w-[calc((100%-6rem)*2/3+3rem)] xl:max-w-[calc((100%-7rem)*2/3+3.5rem)] grid-cols-[1fr_3rem_1fr] xl:grid-cols-[1fr_3.5rem_1fr] items-center',
    cardSlot: 'min-w-0 h-full',
    mobileList: 'flex lg:hidden flex-col list-none m-0 p-0',
    listItem: 'flex flex-col items-stretch w-full',
    card: [
      'group relative z-10 flex h-full w-full flex-col',
      'rounded-2xl sm:rounded-[1.35rem]',
      'border border-slate-200 dark:border-white/15',
      'bg-white dark:bg-neutral-900',
      'shadow-[0_12px_32px_-12px_rgba(15,23,42,0.14)]',
      'dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.65)]',
      'px-5 pt-6 pb-5 sm:px-6 sm:pt-7 sm:pb-6',
      'transition-all duration-300 ease-out',
      'hover:-translate-y-1',
      'hover:shadow-[0_20px_44px_-14px_rgba(15,23,42,0.2)]',
      'dark:hover:shadow-[0_20px_44px_-12px_rgba(0,0,0,0.75)]',
      'motion-reduce:hover:translate-y-0',
    ].join(' '),
    iconCircle:
      'mx-auto mb-5 flex h-[76px] w-[76px] sm:h-[84px] sm:w-[84px] items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0',
    numberBadge:
      'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide shrink-0',
    titleRow: 'flex items-center gap-2.5',
    title:
      'font-heading text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white',
    description:
      'mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-neutral-300 flex-1',
    accentLine: 'mt-5 h-1.5 w-14 rounded-full',
    horizontalConnector:
      'relative z-20 flex w-full items-center justify-center self-center',
    horizontalDash:
      'h-0 flex-1 border-t-2 border-dashed border-slate-300 dark:border-white/25',
    connectorPath:
      'fill-none stroke-slate-300 dark:stroke-white/25',
    connectorArrow: [
      'relative z-10 mx-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
      'border border-slate-200 bg-white shadow-md',
      'dark:border-white/20 dark:bg-neutral-900 dark:shadow-black/40',
    ].join(' '),
    connectorArrowIcon: 'h-4 w-4',
    rowTurn: 'relative z-0 -mt-1 -mb-1 h-14 xl:h-16 w-full pointer-events-none',
    rowTurnSvg: 'absolute inset-0 h-full w-full overflow-visible',
    mobileConnector: 'flex flex-col items-center py-3',
    mobileLine:
      'h-7 w-px border-l-2 border-dashed border-slate-300 dark:border-white/25',
  },

  cta: {
    wrapper: [
      'grid grid-cols-1 lg:grid-cols-2',
      'overflow-hidden rounded-2xl sm:rounded-3xl',
      'border border-slate-200 dark:border-white/15',
      'bg-[#F6F0E8] dark:bg-neutral-900',
      'shadow-[0_18px_48px_-20px_rgba(15,23,42,0.18)]',
      'dark:shadow-[0_18px_48px_-16px_rgba(0,0,0,0.6)]',
    ].join(' '),
    content:
      'flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-9 lg:px-9 xl:px-10 order-1',
    eyebrow:
      'inline-flex items-center justify-center gap-2.5 self-center lg:self-start text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400',
    eyebrowLine: 'h-px w-6 bg-orange-400/80 dark:bg-orange-400/50',
    heading:
      'mt-4 font-heading font-extrabold tracking-tight text-slate-900 dark:text-white text-[1.5rem] leading-[1.2] sm:text-3xl lg:text-[1.9rem]',
    highlightedLimitless:
      'bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent',
    highlightedPossibilities:
      'bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent',
    description:
      'mt-4 max-w-xl text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-neutral-300',
    highlightGrid:
      'mt-6 grid grid-cols-2 xl:grid-cols-4 gap-y-3 gap-x-2 xl:gap-0 xl:divide-x xl:divide-slate-300/70 dark:xl:divide-white/15 border-y border-slate-300/60 dark:border-white/15 py-4',
    highlightItem:
      'flex items-center gap-2.5 xl:px-3 first:xl:pl-0 last:xl:pr-0',
    highlightIcon:
      'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
    highlightLabel:
      'text-[11px] sm:text-xs font-semibold leading-snug text-slate-700 dark:text-neutral-200',
    buttons: 'mt-6 flex flex-col sm:flex-row gap-3',
    primaryButton: [
      'group inline-flex items-center justify-center gap-2',
      'h-12 px-6 rounded-xl w-full sm:w-auto',
      'bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-semibold',
      'shadow-[0_12px_28px_-10px_rgba(249,115,22,0.55)]',
      'transition-all duration-300 ease-out',
      'hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(244,63,94,0.5)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F0E8] dark:focus-visible:ring-offset-neutral-900',
      'active:scale-[0.98] motion-reduce:hover:translate-y-0',
    ].join(' '),
    secondaryButton: [
      'group inline-flex items-center justify-center gap-2',
      'h-12 px-6 rounded-xl w-full sm:w-auto',
      'bg-white dark:bg-neutral-950 text-slate-900 dark:text-white text-sm font-semibold',
      'border border-slate-900/80 dark:border-white/40',
      'transition-all duration-300 ease-out',
      'hover:bg-slate-50 dark:hover:bg-neutral-800',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F0E8] dark:focus-visible:ring-offset-neutral-900',
      'active:scale-[0.98]',
    ].join(' '),
    buttonIcon:
      'transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0',
    imageWrapper:
      'relative order-2 hidden lg:block min-h-[260px] sm:min-h-[320px] lg:min-h-[420px] xl:min-h-[460px]',
    image: 'absolute inset-0 h-full w-full object-cover object-center',
  },

  decorations: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden',
    dots: 'absolute top-12 left-6 sm:left-10 hidden sm:grid grid-cols-5 gap-2.5 opacity-35 dark:opacity-20',
    dot: 'h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-neutral-500',
    rings:
      'absolute -top-10 right-0 hidden md:block h-64 w-64 rounded-full border border-slate-200 dark:border-white/10',
    ringsInner:
      'absolute inset-10 rounded-full border border-slate-200/80 dark:border-white/10',
    glow: 'absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full bg-orange-200/25 blur-3xl dark:bg-orange-500/10',
  },
};
