/**
 * Shared styles for the infinite platform logo marquee.
 * Used by Home Hero and Artists & Labels Hero.
 */
export const platformMarqueeStyles = {
  root: 'relative z-10 mt-4 sm:mt-5 lg:mt-6 xl:mt-8',
  shell: 'bg-transparent border-0 shadow-none px-0 py-2 sm:py-3 lg:py-5 xl:py-6',
  heading: [
    'text-center text-[0.7rem] sm:text-xs md:text-sm lg:text-[0.95rem] font-bold',
    'tracking-[0.16em] uppercase',
    'text-accent-500 dark:text-accent-400',
    'mb-3 sm:mb-4 lg:mb-6 select-none',
  ].join(' '),
  highlight: 'text-accent-500 dark:text-accent-400',
  supportCopy: [
    'text-center text-sm sm:text-[15px] font-semibold',
    'text-ink-primary dark:text-theme-body',
    'mb-2 sm:mb-3',
  ].join(' '),
  supportHighlight: 'text-orange-500 dark:text-orange-400',
  marquee: [
    'group relative w-full overflow-hidden',
    '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
    '[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
    'motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]',
    'motion-reduce:overflow-visible',
  ].join(' '),
  track: [
    'flex w-max flex-nowrap items-center',
    'animate-platform-marquee',
    'motion-reduce:animate-none',
    'motion-reduce:w-full motion-reduce:max-w-full',
    'motion-reduce:flex-wrap motion-reduce:justify-center',
    'group-hover:[animation-play-state:paused]',
    'will-change-transform',
    'motion-reduce:will-change-auto',
  ].join(' '),
  sequence: [
    'flex list-none m-0 p-0 items-center shrink-0',
    'motion-reduce:flex-wrap motion-reduce:justify-center',
  ].join(' '),
  sequenceDuplicate: 'flex list-none m-0 p-0 items-center shrink-0 motion-reduce:hidden',
  item: [
    'flex items-center justify-center shrink-0',
    'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12',
    'py-1 lg:py-1.5',
  ].join(' '),
  logo: [
    'h-5 sm:h-6 md:h-8 lg:h-10 xl:h-12 w-auto',
    'max-w-[5.5rem] sm:max-w-[6.5rem] md:max-w-[9rem] lg:max-w-[11rem] xl:max-w-[13rem]',
    'object-contain object-center',
    'select-none pointer-events-none',
  ].join(' '),
  more: [
    'inline-flex items-center justify-center h-8 lg:h-10 px-3 lg:px-4 rounded-full',
    'border border-theme-border/80 dark:border-theme-border/50',
    'text-[11px] sm:text-xs lg:text-sm font-semibold',
    'text-ink-muted dark:text-theme-muted',
    'hover:text-ink-primary dark:hover:text-theme-heading',
    'hover:border-strong dark:hover:border-theme-border',
    'transition-colors duration-250 whitespace-nowrap focus-ring',
  ].join(' '),
};
