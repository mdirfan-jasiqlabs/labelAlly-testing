import { homeHeroStyles } from './homeHeroStyles';

/** Tailwind class maps for the homepage Content Production section. */
export const homeContentProductionStyles = {
  section: [
    'relative w-full overflow-hidden',
    'bg-theme-page',
    'section-spacing border-t border-theme-border/50',
  ].join(' '),

  background: {
    layer: 'pointer-events-none absolute inset-0 overflow-hidden z-0',
    orbPrimary:
      'absolute -top-20 right-[-6%] h-[380px] w-[380px] rounded-full bg-primary-400/10 blur-3xl dark:bg-violet-500/10 opacity-40 dark:opacity-30 motion-safe:animate-hero-drift',
    orbAccent:
      'absolute -bottom-16 -left-12 h-[320px] w-[320px] rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/8 opacity-30 dark:opacity-25 motion-safe:animate-hero-float-delayed',
    flowLine:
      'absolute top-[18%] left-[5%] hidden md:block h-px w-[36%] bg-gradient-to-r from-transparent via-primary-300/35 to-transparent dark:via-primary-400/20 motion-safe:animate-wave-flow opacity-50',
  },

  header: [
    'flex flex-col lg:flex-row lg:items-end lg:justify-between',
    'gap-6 lg:gap-12 xl:gap-16',
    'mb-10 sm:mb-12 lg:mb-14',
  ].join(' '),

  headerLeft: 'w-full lg:w-[48%] flex flex-col items-start text-left',
  headerRight: 'w-full lg:w-[48%] flex flex-col justify-end',

  heading: [
    'font-heading font-black tracking-tight leading-[1.08]',
    'text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.5rem]',
    'text-ink-primary dark:text-theme-heading',
    'uppercase',
  ].join(' '),

  headingAccent: [
    homeHeroStyles.content.accent,
    'uppercase',
  ].join(' '),

  tagline: [
    'mt-3 sm:mt-4',
    'text-sm sm:text-base font-medium',
    'text-ink-secondary dark:text-theme-body',
    'max-w-md',
  ].join(' '),

  description: [
    'text-sm sm:text-[0.95rem] leading-relaxed',
    'text-ink-muted dark:text-theme-body/85',
    'max-w-xl lg:ml-auto',
  ].join(' '),

  grid: [
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    'gap-8 sm:gap-7 lg:gap-6 xl:gap-8',
  ].join(' '),

  card: 'group flex flex-col items-start text-left',

  imageWrap: [
    'relative w-full overflow-hidden mb-5 sm:mb-6',
    'aspect-[4/3]',
    'bg-theme-secondary dark:bg-theme-card/60',
  ].join(' '),

  /** Parallelogram clip — slanted sides, flat top/bottom */
  imageClip: {
    clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
    WebkitClipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
  },

  image: [
    'absolute inset-0 h-full w-full object-cover object-center',
    'select-none pointer-events-none',
    'transition-transform duration-500 ease-out',
    'motion-safe:group-hover:scale-[1.04] motion-reduce:group-hover:scale-100',
  ].join(' '),

  titleRow: 'flex items-center gap-2.5 sm:gap-3 mb-2.5',

  iconWrap: [
    'flex items-center justify-center shrink-0',
    'text-theme-action-primary',
  ].join(' '),

  title: [
    'font-heading font-black uppercase tracking-wide',
    'text-sm sm:text-base',
    'text-ink-primary dark:text-theme-heading',
    'leading-snug',
  ].join(' '),

  cardDescription: [
    'text-[0.8rem] sm:text-[0.85rem] leading-relaxed',
    'text-ink-muted dark:text-theme-body/80',
    'pl-0 sm:pl-[2.15rem]',
  ].join(' '),
};
