/**
 * Configurable Tailwind class maps for the homepage Hero.
 * Compact reference layout: tight left stack + side image, no stretched row gaps.
 */

export const homeHeroStyles = {
  section: {
    base: [
      'relative w-full overflow-hidden',
      'bg-white dark:bg-neutral-950',
    ].join(' '),
    container:
      'relative z-10 w-full mx-auto max-w-container-2xl px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 lg:pt-6 pb-6 sm:pb-8',
    layout: [
      'grid grid-cols-1 lg:grid-cols-12',
      'gap-4 sm:gap-5 lg:gap-x-4 lg:gap-y-0 xl:gap-x-5',
      'items-center',
    ].join(' '),
  },

  content: {
    stack: [
      'lg:col-span-6 relative z-10',
      'flex flex-col justify-center',
      'items-center text-center',
      'lg:items-start lg:text-left',
      'gap-0',
      'motion-safe:animate-fade-up',
    ].join(' '),
    mobileImage: 'relative z-0 w-full flex justify-center my-2 sm:my-3 lg:hidden pointer-events-none',
    badge:
      'inline-flex items-center gap-2 text-[0.7rem] sm:text-xs font-bold tracking-[0.18em] uppercase text-ink-secondary',
    badgeIcon: 'text-accent-500 shrink-0',
    heading: [
      'mt-3 sm:mt-4 font-heading font-black tracking-tight',
      'text-ink-primary',
      'text-[1.85rem] leading-[1.08]',
      'xs:text-[2.1rem]',
      'sm:text-[2.85rem]',
      'md:text-[3.25rem]',
      'lg:text-[3.5rem]',
      'xl:text-[3.85rem]',
    ].join(' '),
    headingLine: 'block',
    accent: 'text-accent-500',
    description: [
      'mt-3 sm:mt-3.5',
      'max-w-[460px]',
      'text-sm sm:text-[0.95rem] leading-relaxed text-ink-secondary',
    ].join(' '),
  },

  buttons: {
    row: [
      'relative z-30',
      'mt-4 sm:mt-5 lg:mt-5',
      'flex w-full flex-col sm:flex-row',
      'items-stretch sm:items-center',
      'justify-center lg:justify-start',
      'gap-3',
      'isolate',
    ].join(' '),
    base: [
      'group inline-flex items-center justify-center gap-2.5',
      'relative z-30',
      'h-11 sm:h-12 px-5 sm:px-6 rounded-xl',
      'text-sm font-semibold whitespace-nowrap',
      'transition-all duration-300 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'focus-visible:ring-orange-400 focus-visible:ring-offset-white',
      'dark:focus-visible:ring-offset-neutral-950',
      'active:scale-[0.98]',
      'w-full sm:w-auto',
    ].join(' '),
    primary: [
      'bg-gradient-to-r from-orange-500 to-rose-500 text-white',
      'border border-transparent',
      'shadow-[0_12px_28px_-10px_rgba(249,115,22,0.55)]',
      'hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(244,63,94,0.5)]',
      'motion-reduce:hover:translate-y-0',
    ].join(' '),
    secondary: [
      'bg-white dark:bg-neutral-950',
      'text-accent-600 dark:text-accent-400',
      'border border-accent-400 dark:border-accent-500/60',
      'hover:bg-accent-50 dark:hover:bg-neutral-800',
      'hover:-translate-y-0.5',
      'motion-reduce:hover:translate-y-0',
    ].join(' '),
    icon:
      'transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0',
  },

  features: {
    row: [
      'mt-6 sm:mt-7',
      'grid grid-cols-2 lg:grid-cols-4',
      'gap-x-4 gap-y-4',
      'w-full max-w-xl lg:max-w-none',
      'justify-items-center lg:justify-items-start',
      'text-center lg:text-left',
    ].join(' '),
    item: 'flex flex-col gap-1 items-center lg:items-start',
    iconWrap:
      'flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300',
    title: 'text-[0.78rem] sm:text-[0.8rem] font-bold text-ink-primary leading-tight',
    description: 'text-[0.7rem] text-ink-muted leading-tight',
  },

  image: {
    col: [
      'relative z-0',
      'flex',
      'justify-center items-center',
      'w-full',
      'overflow-visible',
      'pointer-events-none',
    ].join(' '),
    colDesktop: [
      'relative z-0',
      'hidden lg:flex',
      'justify-center items-center',
      'lg:col-span-6',
      'overflow-visible',
      'pointer-events-none',
    ].join(' '),
    stage: [
      'relative w-full mx-auto overflow-visible',
      'max-w-[340px] sm:max-w-[380px]',
      'lg:max-w-[480px] xl:max-w-[520px]',
      'aspect-square',
    ].join(' '),
    glow: [
      'absolute left-1/2 top-1/2 z-0',
      'h-[88%] w-[88%] rounded-full',
      'bg-[#D4C2F8] dark:bg-violet-500/40',
      'blur-[1px]',
      'motion-safe:animate-hero-glow-pulse',
      'motion-reduce:opacity-95 motion-reduce:translate-x-[-50%] motion-reduce:translate-y-[-50%]',
    ].join(' '),
    glowSoft: [
      'absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2',
      'h-[105%] w-[105%] rounded-full',
      'bg-violet-300/40 dark:bg-violet-500/25',
      'blur-3xl',
      'motion-safe:animate-hero-orb-drift',
    ].join(' '),
    glowAccent: [
      'absolute left-[62%] top-[58%] z-0',
      'h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full',
      'bg-orange-300/25 dark:bg-orange-500/15',
      'blur-3xl',
      'motion-safe:animate-hero-float',
    ].join(' '),
    ring: [
      'absolute left-1/2 top-1/2 z-[1]',
      'h-[94%] w-[94%] rounded-full',
      'border border-dashed border-violet-300/50 dark:border-violet-400/30',
      'motion-safe:animate-hero-ring-spin',
      'motion-reduce:translate-x-[-50%] motion-reduce:translate-y-[-50%]',
    ].join(' '),
    ringInner: [
      'absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2',
      'h-[76%] w-[76%] rounded-full',
      'border border-violet-200/45 dark:border-violet-400/20',
    ].join(' '),
    waveWrap: [
      'absolute inset-0 z-[5]',
      'flex items-center justify-center',
      'pointer-events-none',
    ].join(' '),
    waveRow:
      'flex h-[48%] w-[74%] max-w-[360px] items-center justify-center gap-[3px] sm:gap-1',
    waveBar: [
      'w-[3px] sm:w-[3.5px] h-[80%] shrink-0 rounded-full',
      'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]',
      'dark:bg-white/55 dark:shadow-[0_0_8px_rgba(255,255,255,0.18)]',
      'origin-center will-change-transform',
      'motion-reduce:animate-none',
    ].join(' '),
    floatBadge: [
      'absolute top-[8%] right-[8%] z-20',
      'flex h-11 w-11 sm:h-12 sm:w-12 xl:h-14 xl:w-14 items-center justify-center rounded-full',
      'bg-white dark:bg-neutral-900',
      'text-primary-600 dark:text-primary-300',
      'shadow-[0_12px_28px_-10px_rgba(79,70,229,0.35)]',
      'ring-1 ring-primary-100 dark:ring-white/10',
      'motion-safe:animate-hero-float',
    ].join(' '),
    figure: [
      'absolute inset-0 z-10',
      'flex items-center justify-center',
      'scale-[1.05] sm:scale-[1.1] lg:scale-[1.22] xl:scale-[1.28]',
    ].join(' '),
    img: [
      'block h-full w-auto max-h-[100%]',
      'object-contain object-center select-none',
      'mix-blend-lighten',
      'drop-shadow-[0_20px_40px_rgba(79,70,229,0.2)]',
      '[mask-image:linear-gradient(to_bottom,black_74%,transparent_100%)]',
      '[-webkit-mask-image:linear-gradient(to_bottom,black_74%,transparent_100%)]',
    ].join(' '),
  },

  platforms: {
    // Kept for backwards compatibility — live styles live in platformMarqueeStyles.js
    root: 'relative z-10 mt-3 sm:mt-4 lg:mt-3',
  },

  decorations: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    orbPrimary:
      'absolute -top-20 right-[-4%] hidden lg:block h-[320px] w-[320px] rounded-full bg-violet-300/12 blur-3xl dark:bg-violet-500/10',
    orbAccent:
      'absolute bottom-20 -left-16 hidden lg:block h-[200px] w-[200px] rounded-full bg-accent-300/10 blur-3xl dark:bg-accent-500/8',
    softCircle: 'hidden',
  },
};
