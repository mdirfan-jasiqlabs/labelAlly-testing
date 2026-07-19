/**
 * Configurable Tailwind class maps for the homepage Hero.
 * Tuned to the reference: ~58/42 split, soft purple disc + artist, purple CTA.
 */

export const homeHeroStyles = {
  section: {
    base: [
      'relative w-full overflow-hidden',
      'bg-white dark:bg-neutral-950',
    ].join(' '),
    container:
      'relative z-10 w-full mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-10 pb-10 sm:pb-12',
    layout: [
      'grid grid-cols-1 lg:grid-cols-12',
      'gap-8 lg:gap-8 xl:gap-12',
      'items-center',
      'lg:min-h-[560px] xl:min-h-[600px]',
    ].join(' '),
  },

  content: {
    col: [
      'lg:col-span-7 relative z-10',
      'flex flex-col justify-center',
      'items-center text-center',
      'lg:items-start lg:text-left',
      'motion-safe:animate-fade-up',
    ].join(' '),
    badge:
      'inline-flex items-center gap-2 text-[0.7rem] sm:text-xs font-bold tracking-[0.18em] uppercase text-ink-secondary',
    badgeIcon: 'text-accent-500 shrink-0',
    heading: [
      'mt-5 sm:mt-6 font-heading font-black tracking-tight',
      'text-ink-primary',
      'text-[1.9rem] leading-[1.05]',
      'xs:text-[2.2rem]',
      'sm:text-[3.2rem]',
      'md:text-[3.75rem]',
      'lg:text-[4rem]',
      'xl:text-[4.35rem]',
    ].join(' '),
    headingLine: 'block',
    accent: 'text-accent-500',
    description: [
      'mt-4 sm:mt-5',
      'max-w-[480px]',
      'text-sm sm:text-[0.95rem] sm:text-base leading-relaxed text-ink-secondary',
    ].join(' '),
  },

  buttons: {
    row: [
      'mt-6 sm:mt-8',
      'flex w-full flex-col sm:flex-row',
      'items-stretch sm:items-center',
      'justify-center lg:justify-start',
      'gap-3',
    ].join(' '),
    base: [
      'group inline-flex items-center justify-center gap-2.5',
      'h-12 px-6 sm:px-7 rounded-xl',
      'text-sm font-bold whitespace-nowrap',
      'transition-all duration-300 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'focus-visible:ring-primary-500 focus-visible:ring-offset-white',
      'dark:focus-visible:ring-offset-neutral-950',
      'active:scale-[0.98]',
      'w-full sm:w-auto',
    ].join(' '),
    primary: [
      'bg-primary-600 hover:bg-primary-700 text-white',
      'border border-primary-600 hover:border-primary-700',
      'shadow-[0_10px_28px_-8px_rgba(79,70,229,0.45)]',
      'hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(79,70,229,0.4)]',
      'motion-reduce:hover:translate-y-0',
    ].join(' '),
    secondary: [
      'bg-white dark:bg-neutral-900',
      'text-accent-600 dark:text-accent-400',
      'border border-accent-400 dark:border-accent-500/60',
      'shadow-sm',
      'hover:bg-accent-50 dark:hover:bg-neutral-800',
      'hover:-translate-y-0.5',
      'motion-reduce:hover:translate-y-0',
    ].join(' '),
    icon:
      'transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0',
  },

  features: {
    row: [
      'mt-8 sm:mt-10',
      'grid grid-cols-2 md:grid-cols-4',
      'gap-x-5 gap-y-5',
      'w-full max-w-xl lg:max-w-none',
      'justify-items-center lg:justify-items-start',
      'text-center lg:text-left',
    ].join(' '),
    item: 'flex flex-col gap-1.5 items-center lg:items-start',
    iconWrap:
      'flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300',
    title: 'text-[0.8rem] font-bold text-ink-primary leading-tight',
    description: 'text-[0.72rem] text-ink-muted leading-tight',
  },

  image: {
    col: [
      'relative z-10',
      'hidden lg:flex',
      'lg:col-span-5',
      'items-center justify-center',
    ].join(' '),
    stage:
      'relative w-full max-w-[460px] xl:max-w-[500px] aspect-square',
    glow: [
      'absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2',
      'h-[88%] w-[88%] rounded-full',
      'bg-[#D8C9F8] dark:bg-violet-500/35',
      'blur-[2px]',
    ].join(' '),
    glowSoft: [
      'absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2',
      'h-[100%] w-[100%] rounded-full',
      'bg-violet-300/35 dark:bg-violet-500/20',
      'blur-3xl',
    ].join(' '),
    waveWrap: [
      'absolute inset-0 z-[5]',
      'flex items-center justify-center',
      'pointer-events-none',
    ].join(' '),
    waveRow:
      'flex h-[42%] w-[78%] items-center justify-center gap-[3px] sm:gap-1',
    waveBar:
      'w-[3px] sm:w-[3.5px] shrink-0 rounded-full bg-white/85 shadow-sm dark:bg-white/40',
    floatBadge: [
      'absolute top-[10%] right-[8%] z-20',
      'flex h-12 w-12 xl:h-14 xl:w-14 items-center justify-center rounded-full',
      'bg-white dark:bg-neutral-900',
      'text-primary-600 dark:text-primary-300',
      'shadow-[0_12px_30px_-10px_rgba(79,70,229,0.35)]',
      'ring-1 ring-primary-100 dark:ring-white/10',
      'motion-safe:animate-hero-float',
    ].join(' '),
    figure: [
      'absolute inset-0 z-10',
      'flex items-end justify-center',
      'pb-0',
    ].join(' '),
    img: [
      'block h-[92%] w-auto max-h-none',
      'object-contain object-bottom select-none',
      'mix-blend-lighten dark:mix-blend-lighten',
      'drop-shadow-[0_20px_40px_rgba(79,70,229,0.18)]',
      '[mask-image:linear-gradient(to_bottom,black_68%,transparent_100%)]',
      '[-webkit-mask-image:linear-gradient(to_bottom,black_68%,transparent_100%)]',
    ].join(' '),
  },

  platforms: {
    root: 'relative z-10 mt-6 sm:mt-8 lg:mt-4',
    shell: [
      'rounded-2xl sm:rounded-3xl',
      'border border-neutral-200/80 dark:border-white/10',
      'bg-white dark:bg-neutral-900/85',
      'shadow-platform-strip',
      'px-4 py-5 sm:px-6 sm:py-6',
    ].join(' '),
    heading: [
      'text-center text-[0.7rem] sm:text-xs font-bold',
      'tracking-[0.16em] uppercase',
      'text-accent-500',
      'mb-5 sm:mb-6 select-none',
    ].join(' '),
    highlight: 'text-accent-500',
    logosWrap:
      'overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    logos:
      'flex lg:grid lg:grid-cols-8 items-center justify-items-center gap-4 sm:gap-5 min-w-max lg:min-w-0 px-1',
    item: 'flex items-center justify-center py-1 shrink-0',
    logo: 'h-6 w-auto max-w-[110px] object-contain transition-transform duration-200 hover:scale-105',
    more: [
      'inline-flex items-center justify-center h-8 px-3 rounded-full',
      'border border-neutral-200 dark:border-white/15',
      'text-[11px] sm:text-xs font-semibold',
      'text-neutral-500 dark:text-neutral-400',
      'hover:text-neutral-900 dark:hover:text-white',
      'hover:border-neutral-300 dark:hover:border-white/25',
      'hover:bg-neutral-50 dark:hover:bg-neutral-800',
      'transition-colors duration-250 whitespace-nowrap focus-ring',
    ].join(' '),
  },

  decorations: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden',
    orbPrimary:
      'absolute -top-20 right-[-4%] h-[380px] w-[380px] rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-500/12',
    orbAccent:
      'absolute bottom-24 -left-20 h-[240px] w-[240px] rounded-full bg-accent-300/10 blur-3xl dark:bg-accent-500/8',
    softCircle: 'hidden',
  },
};
