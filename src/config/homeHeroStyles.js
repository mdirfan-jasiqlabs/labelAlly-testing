/**
 * Configurable Tailwind class maps for the homepage Hero.
 * Compact reference layout: tight left stack + side image, no stretched row gaps.
 */
import { whatsappOutlineButtonClasses } from './whatsappOutlineButtonStyles';

export const homeHeroStyles = {
  section: {
    base: [
      'relative w-full overflow-hidden',
      'bg-theme-page',
    ].join(' '),
    container:
      'relative z-10 w-full mx-auto max-w-container-2xl px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 lg:pt-6 pb-6 sm:pb-8',
    layout: [
      'grid grid-cols-1 lg:grid-cols-12',
      'gap-8 sm:gap-10 lg:gap-8 xl:gap-12',
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
    ].join(' '),
    mobileImage:
      'relative z-0 w-full flex justify-center my-4 sm:my-5 lg:hidden px-1',
    badge: [
      'inline-flex items-center justify-center gap-1.5 sm:gap-2',
      'max-w-full rounded-full',
      'px-3 py-1.5 sm:px-3.5 sm:py-1.5',
      'bg-accent-100/90 dark:bg-accent-500/15',
      'text-[0.68rem] xs:text-[0.72rem] sm:text-[0.8125rem]',
      'font-semibold leading-snug tracking-wide sm:tracking-[0.04em]',
      'text-accent-700 dark:text-accent-300',
      'text-balance text-center lg:text-left',
    ].join(' '),
    badgeInteractive:
      'transition-colors duration-300 hover:bg-accent-100 dark:hover:bg-accent-500/25',
    badgeIcon: 'text-accent-500 dark:text-accent-400 shrink-0',
    /** Semantic H1 — crawlable brand name; visually secondary to marketing headline */
    brandName: [
      'mt-3 sm:mt-4',
      'font-heading font-bold tracking-wide',
      'text-[0.72rem] xs:text-[0.78rem] sm:text-sm',
      'uppercase',
      'text-accent-600 dark:text-accent-400',
      'text-balance',
    ].join(' '),
    /** Visually primary marketing headline (not H1 — brand H1 is above) */
    heading: [
      'mt-2 sm:mt-2.5 font-heading font-black tracking-tight',
      'text-ink-primary dark:text-theme-heading',
      'text-[1.85rem] leading-[1.08]',
      'xs:text-[2.1rem]',
      'sm:text-[2.85rem]',
      'md:text-[3.25rem]',
      'lg:text-[3.5rem]',
      'xl:text-[3.85rem]',
    ].join(' '),
    headingLine: 'block',
    accent: 'text-accent-500 dark:text-accent-400',
    divider: [
      'mt-3 sm:mt-3.5 mb-0',
      'h-1 w-16 sm:w-20 rounded-full',
      'bg-gradient-to-r from-orange-500 via-primary-500 to-accent-500',
      'opacity-90 dark:opacity-80',
    ].join(' '),
    description: [
      'mt-3 sm:mt-4',
      'max-w-[480px]',
      'text-sm sm:text-[0.95rem] leading-relaxed',
      'text-ink-secondary dark:text-theme-body',
    ].join(' '),
  },

  buttons: {
    row: [
      'relative z-30',
      'mt-5 sm:mt-6 lg:mt-6',
      'flex w-full flex-col sm:flex-row',
      'items-stretch sm:items-center',
      'justify-center lg:justify-start',
      'gap-3',
      'isolate',
    ].join(' '),
    // Shared with Services / Artists WhatsApp outline CTAs
    base: whatsappOutlineButtonClasses.base,
    secondary: whatsappOutlineButtonClasses.surface,
  },

  features: {
    row: [
      'mt-8 sm:mt-10 lg:mt-12',
      'grid grid-cols-2 lg:grid-cols-4',
      'gap-3 sm:gap-4 lg:gap-6',
      'w-full',
    ].join(' '),
    item: [
      'group flex items-center gap-3 sm:gap-3.5',
      'rounded-2xl p-3 sm:p-4',
      'bg-slate-50/70 dark:bg-white/[0.03]',
      'border border-slate-100 dark:border-white/[0.06]',
      'transition-all duration-300',
      'hover:bg-primary-50/40 dark:hover:bg-primary-950/20',
      'hover:border-primary-200/60 dark:hover:border-primary-500/20',
    ].join(' '),
    iconWrap: [
      'flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full',
      'bg-primary-50 text-primary-600',
      'dark:bg-primary-500/15 dark:text-primary-300',
      'border border-primary-100/80 dark:border-primary-400/20',
      'transition-transform duration-300 ease-out',
      'motion-safe:group-hover:scale-105',
      'group-hover:scale-105 motion-reduce:group-hover:scale-100',
    ].join(' '),
    title: 'text-[0.82rem] sm:text-[0.88rem] font-bold text-ink-primary dark:text-theme-heading leading-tight truncate sm:whitespace-normal',
    description: 'text-[0.7rem] sm:text-[0.76rem] text-ink-muted dark:text-theme-muted leading-tight mt-0.5 truncate sm:whitespace-normal',
  },

  image: {
    col: [
      'relative z-10',
      'flex',
      'justify-center items-center',
      'w-full',
      'overflow-visible',
    ].join(' '),
    colDesktop: [
      'relative z-10',
      'hidden lg:flex',
      'justify-center items-center',
      'lg:col-span-6',
      'w-full',
      'overflow-visible',
    ].join(' '),
    stage: [
      'relative w-full mx-auto overflow-visible',
      'max-w-[min(100%,400px)] xs:max-w-[420px] sm:max-w-[440px]',
      'md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px]',
      'aspect-square',
    ].join(' '),
    glow: [
      'absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2',
      'h-[88%] w-[88%] rounded-full',
      'bg-primary-200/80 dark:bg-violet-500/35',
      'blur-[1px]',
      'motion-safe:animate-hero-glow-pulse',
      'motion-reduce:opacity-95',
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
      'absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2',
      'h-[94%] w-[94%] rounded-full',
      'border border-dashed border-violet-300/50 dark:border-violet-400/30',
      'motion-safe:animate-hero-ring-spin',
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
      'bg-theme-page dark:bg-theme-card',
      'text-primary-600 dark:text-primary-300',
      'shadow-[0_12px_28px_-10px_rgba(79,70,229,0.35)]',
      'ring-1 ring-primary-100 dark:ring-theme-border/60',
      'motion-safe:animate-hero-float',
    ].join(' '),
    figure: [
      'absolute inset-0 z-10',
      'flex items-center justify-center',
      'scale-[1.18] xs:scale-[1.2] sm:scale-[1.16] md:scale-[1.18]',
      'lg:scale-[1.22] xl:scale-[1.28]',
    ].join(' '),
    img: [
      'block h-full w-auto max-h-[100%]',
      'object-contain object-center select-none',
      'drop-shadow-[0_20px_40px_rgba(79,70,229,0.18)]',
      'dark:drop-shadow-[0_20px_44px_rgba(0,0,0,0.45)]',
      // Soft feather into purple disc — face/neck stay sharp; lower hand/guitar dissolve
      '[mask-image:linear-gradient(to_bottom,black_0%,black_74%,rgba(0,0,0,0.92)_82%,rgba(0,0,0,0.55)_90%,rgba(0,0,0,0.18)_96%,transparent_100%)]',
      '[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_74%,rgba(0,0,0,0.92)_82%,rgba(0,0,0,0.55)_90%,rgba(0,0,0,0.18)_96%,transparent_100%)]',
    ].join(' '),
  },

  platforms: {
    // Kept for backwards compatibility — live styles live in platformMarqueeStyles.js
    root: 'relative z-10 mt-3 sm:mt-4 lg:mt-3',
  },

  decorations: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    orbPrimary:
      'absolute -top-24 right-[-6%] h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] rounded-full bg-violet-300/14 blur-3xl dark:bg-violet-500/10 motion-safe:animate-hero-drift',
    orbAccent:
      'absolute bottom-16 -left-20 h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] rounded-full bg-accent-300/12 blur-3xl dark:bg-accent-500/8 motion-safe:animate-hero-float-delayed',
    orbSecondary:
      'absolute top-[42%] left-[38%] hidden md:block h-[160px] w-[160px] rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/8 motion-safe:animate-hero-orb-drift opacity-70',
    waveBand:
      'absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 opacity-40 dark:opacity-25 motion-safe:animate-wave-flow',
    waveSvg: 'h-full w-[108%] -translate-x-[4%]',
    wavePathA:
      'fill-primary-200/35 dark:fill-primary-500/10 motion-safe:animate-wave-flow',
    wavePathB:
      'fill-orange-200/25 dark:fill-orange-500/8 motion-safe:animate-wave-flow-delayed',
    spectrumRow:
      'absolute bottom-8 sm:bottom-10 left-1/2 hidden sm:flex -translate-x-1/2 items-end justify-center gap-1 h-10 sm:h-12 opacity-30 dark:opacity-20',
    spectrumBar:
      'w-1 rounded-full bg-gradient-to-t from-primary-400/50 to-accent-400/40 dark:from-primary-400/30 dark:to-accent-400/25 origin-bottom motion-safe:animate-spectrum-pulse',
    networkField:
      'absolute inset-0 hidden lg:block',
    networkNode:
      'absolute rounded-full bg-primary-400/25 dark:bg-primary-300/15 blur-[1px] motion-safe:animate-node-float h-2 w-2',
    flowLine:
      'absolute top-[30%] left-[-10%] h-px w-[55%] bg-gradient-to-r from-transparent via-primary-300/35 to-transparent dark:via-primary-400/20 motion-safe:animate-wave-flow opacity-50',
    flowLineAlt:
      'absolute top-[58%] right-[-8%] h-px w-[48%] bg-gradient-to-l from-transparent via-accent-300/30 to-transparent dark:via-accent-400/18 motion-safe:animate-wave-flow-delayed opacity-45',
  },
};
