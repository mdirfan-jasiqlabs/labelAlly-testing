/**
 * Shared styles for the infinite platform logo marquee.
 * Used by Home Hero and Artists & Labels Hero.
 */
export const platformMarqueeStyles = {
  root: 'relative z-10 mt-4 sm:mt-5 lg:mt-4',
  shell: 'bg-transparent border-0 shadow-none px-0 py-2 sm:py-3',
  heading: [
    'text-center text-[0.7rem] sm:text-xs font-bold',
    'tracking-[0.16em] uppercase',
    'text-accent-500 dark:text-accent-400',
    'mb-3 sm:mb-4 select-none',
  ].join(' '),
  highlight: 'text-accent-500 dark:text-accent-400',
  supportCopy: [
    'text-center text-sm sm:text-[15px] font-semibold',
    'text-ink-primary dark:text-theme-body',
    'mb-2 sm:mb-3',
  ].join(' '),
  supportHighlight: 'text-orange-500 dark:text-orange-400',
  marquee: 'group relative w-full overflow-hidden',
  fadeLeft: [
    'pointer-events-none absolute inset-y-0 left-0 z-10',
    'w-8 sm:w-12 md:w-16',
    'bg-gradient-to-r from-theme-page to-transparent',
  ].join(' '),
  fadeRight: [
    'pointer-events-none absolute inset-y-0 right-0 z-10',
    'w-8 sm:w-12 md:w-16',
    'bg-gradient-to-l from-theme-page to-transparent',
  ].join(' '),
  track: [
    'flex w-max shrink-0 items-center',
    'animate-platform-marquee',
    'motion-reduce:animate-none',
    'motion-reduce:w-full motion-reduce:max-w-full',
    'motion-reduce:flex-wrap motion-reduce:justify-center',
    'group-hover:[animation-play-state:paused]',
    'will-change-transform',
    'motion-reduce:will-change-auto',
  ].join(' '),
  item: [
    'flex shrink-0 items-center justify-center',
    'px-4 sm:px-6 md:px-7 lg:px-8',
    'py-1',
  ].join(' '),
  logoWrap: [
    'flex h-8 w-[5.5rem] sm:h-9 sm:w-[6.5rem] md:h-10 md:w-[7.5rem]',
    'items-center justify-center',
  ].join(' '),
  logo: [
    'h-5 sm:h-6 md:h-7 w-full max-h-full',
    'object-contain object-center',
    'opacity-90 dark:opacity-95',
    'dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.06)]',
    'select-none pointer-events-none',
  ].join(' '),
  more: [
    'inline-flex items-center justify-center h-8 px-3 rounded-full',
    'border border-neutral-200/80 dark:border-theme-border/50',
    'text-[11px] sm:text-xs font-semibold',
    'text-neutral-500 dark:text-theme-muted',
    'hover:text-neutral-900 dark:hover:text-theme-heading',
    'hover:border-neutral-300 dark:hover:border-theme-border',
    'transition-colors duration-250 whitespace-nowrap focus-ring',
  ].join(' '),
};
