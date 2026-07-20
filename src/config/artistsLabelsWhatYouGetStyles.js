/**
 * Tailwind class maps for the Artists & Labels “What You Get” section.
 * Keep complete static class strings so Tailwind can detect them.
 */

export const whatYouGetThemeClasses = {
  orange: {
    rowBackground: 'bg-orange-50/70 dark:bg-orange-500/[0.06]',
    icon:
      'border-orange-300 bg-orange-50/80 text-orange-600 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300',
    accent: 'bg-orange-500',
    check:
      'border-orange-400 text-orange-600 dark:border-orange-400 dark:text-orange-300',
  },
  green: {
    rowBackground: 'bg-emerald-50/60 dark:bg-emerald-500/[0.06]',
    icon:
      'border-emerald-300 bg-emerald-50/80 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-300',
    accent: 'bg-emerald-500',
    check:
      'border-emerald-400 text-emerald-600 dark:border-emerald-400 dark:text-emerald-300',
  },
  purple: {
    rowBackground: 'bg-violet-50/70 dark:bg-violet-500/[0.06]',
    icon:
      'border-violet-300 bg-violet-50/80 text-violet-600 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-300',
    accent: 'bg-violet-500',
    check:
      'border-violet-400 text-violet-600 dark:border-violet-400 dark:text-violet-300',
  },
  yellow: {
    rowBackground: 'bg-amber-50/70 dark:bg-amber-500/[0.06]',
    icon:
      'border-amber-300 bg-amber-50/80 text-amber-600 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300',
    accent: 'bg-amber-500',
    check:
      'border-amber-400 text-amber-600 dark:border-amber-400 dark:text-amber-300',
  },
  pink: {
    rowBackground: 'bg-pink-50/70 dark:bg-pink-500/[0.06]',
    icon:
      'border-pink-300 bg-pink-50/80 text-pink-600 dark:border-pink-400/30 dark:bg-pink-500/10 dark:text-pink-300',
    accent: 'bg-pink-500',
    check:
      'border-pink-400 text-pink-600 dark:border-pink-400 dark:text-pink-300',
  },
};

export const whatYouGetAccentBarClasses = {
  orange: 'h-1.5 w-7 rounded-full bg-orange-500',
  green: 'h-1.5 w-7 rounded-full bg-emerald-500',
  purple: 'h-1.5 w-7 rounded-full bg-violet-500',
  neutral: 'h-1.5 w-7 rounded-full bg-sky-500',
};

export const artistsLabelsWhatYouGetStyles = {
  section: {
    base: 'relative w-full overflow-hidden bg-white dark:bg-neutral-950 pt-6 sm:pt-8 md:pt-12 lg:pt-14 pb-6 sm:pb-8 lg:pb-12',
    container: 'relative z-10 w-full mx-auto max-w-container-2xl px-4 sm:px-6 lg:px-8 xl:px-10',
    content: 'relative z-10 flex flex-col items-center',
  },

  badge: {
    wrapper:
      'inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-[#FFE8D6] px-3.5 py-1.5 dark:border-orange-400/20 dark:bg-orange-500/15',
    icon: 'shrink-0 text-[#E85D04] dark:text-orange-300',
    label:
      'text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#E85D04] dark:text-orange-300',
  },

  heading: {
    wrapper: 'w-full max-w-3xl mx-auto flex flex-col items-center text-center',
    title:
      'mt-5 sm:mt-6 font-heading font-extrabold tracking-tight text-slate-950 dark:text-white text-[1.85rem] leading-[1.2] sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem]',
    highlighted:
      'bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent',
    description:
      'mt-5 sm:mt-6 max-w-[48rem] text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-neutral-400',
    accentRow: 'mt-4 sm:mt-5 flex items-center justify-center gap-1.5',
  },

  list: {
    wrapper: 'mt-10 sm:mt-12 lg:mt-14 w-full flex flex-col gap-4 sm:gap-5',
  },

  row: {
    base: [
      'group relative grid grid-cols-1 lg:grid-cols-12',
      'overflow-hidden rounded-2xl sm:rounded-3xl',
      'border border-slate-200/80 dark:border-white/10',
      'shadow-[0_10px_32px_-18px_rgba(15,23,42,0.18)]',
      'dark:shadow-[0_14px_36px_-18px_rgba(0,0,0,0.55)]',
      'transition-all duration-300 ease-out',
      'lg:hover:-translate-y-0.5',
      'lg:hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.24)]',
      'motion-reduce:lg:hover:translate-y-0',
    ].join(' '),
    leftImageLayout: '',
    rightImageLayout: '',
    imageCell:
      'relative order-1 lg:col-span-4 min-h-[200px] sm:min-h-[220px] lg:min-h-[240px]',
    imageCellLeft: 'lg:order-1',
    imageCellRight: 'lg:order-3',
    detailsCell: [
      'order-2 lg:col-span-4',
      'flex items-center',
      'px-5 py-5 sm:px-6 sm:py-6 lg:px-5 xl:px-6',
      'lg:border-r lg:border-slate-200/80 dark:lg:border-white/10',
    ].join(' '),
    detailsCellLeft: 'lg:order-2',
    detailsCellRight: 'lg:order-2 lg:border-r-0 lg:border-l lg:border-slate-200/80 dark:lg:border-white/10',
    featuresCell: [
      'order-3 lg:col-span-4',
      'flex items-center',
      'px-5 pb-5 sm:px-6 sm:pb-6 lg:px-5 xl:px-7 lg:py-6',
      'border-t border-slate-200/80 dark:border-white/10 lg:border-t-0',
    ].join(' '),
    featuresCellLeft: 'lg:order-3',
    featuresCellRight: 'lg:order-1',
    imageWrapper: 'absolute inset-0 h-full w-full',
    imageClipLeft:
      'lg:[clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%)]',
    imageClipRight:
      'lg:[clip-path:polygon(8%_0,100%_0,100%_100%,8%_100%,0_50%)]',
    image:
      'h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100',
    details: 'flex w-full items-start gap-3.5 sm:gap-4',
    iconWrapper:
      'flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0',
    textWrapper: 'min-w-0 flex-1',
    title:
      'font-heading text-lg sm:text-xl font-bold tracking-tight text-slate-950 dark:text-white',
    accentLine: 'mt-2.5 h-1 w-10 rounded-full',
    description:
      'mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-neutral-400',
    featureList: 'flex w-full flex-col gap-3',
    featureItem: 'flex items-start gap-3',
    featureIcon:
      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
    featureText: 'text-sm leading-snug text-slate-700 dark:text-neutral-300',
  },

  cta: {
    wrapper: [
      'mt-10 sm:mt-12 lg:mt-14 w-full',
      'flex flex-col lg:flex-row lg:items-center gap-5 sm:gap-6 lg:gap-8',
      'rounded-2xl sm:rounded-3xl',
      'border border-indigo-900/40 dark:border-white/10',
      'bg-gradient-to-r from-slate-950 via-indigo-950 to-violet-950',
      'px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8',
      'shadow-[0_20px_50px_-24px_rgba(49,46,129,0.55)]',
    ].join(' '),
    iconWrapper:
      'flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-orange-400 text-orange-400',
    content: 'flex-1 min-w-0',
    title:
      'font-heading text-lg sm:text-xl lg:text-[1.35rem] font-bold leading-snug text-white',
    description: 'mt-2 text-sm text-indigo-200/80',
    button: [
      'group inline-flex items-center justify-center gap-2',
      'h-12 px-6 rounded-xl',
      'w-full lg:w-auto shrink-0',
      'bg-gradient-to-r from-orange-500 to-rose-500 text-white',
      'text-sm font-semibold',
      'shadow-[0_12px_28px_-10px_rgba(249,115,22,0.55)]',
      'transition-all duration-300 ease-out',
      'hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(244,63,94,0.5)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-950',
      'active:scale-[0.98]',
      'motion-reduce:hover:translate-y-0',
    ].join(' '),
    buttonIcon:
      'transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0',
  },

  decorations: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden',
    ringsLeft:
      'absolute -top-16 -left-16 hidden md:block h-64 w-64 rounded-full border border-slate-200/70 dark:border-white/5',
    ringsLeftInner:
      'absolute inset-10 rounded-full border border-slate-200/50 dark:border-white/5',
    ringsRight:
      'absolute -top-20 -right-12 hidden md:block h-72 w-72 rounded-full border border-slate-200/60 dark:border-white/5',
    ringsRightInner:
      'absolute inset-12 rounded-full border border-slate-200/40 dark:border-white/5',
    dots: 'absolute top-24 right-10 hidden lg:grid grid-cols-4 gap-2.5 opacity-30 dark:opacity-15',
    dot: 'h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-neutral-600',
    glow:
      'absolute left-1/3 top-0 h-56 w-56 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-500/5',
  },
};
