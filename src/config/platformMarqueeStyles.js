/**
 * Shared styles for the infinite platform logo marquee.
 * Used by Home Hero and Artists & Labels Hero.
 */
export const platformMarqueeStyles = {
  root: 'relative z-10 mt-3 sm:mt-4 lg:mt-3',
  shell: 'bg-transparent border-0 shadow-none px-0 py-2 sm:py-3',
  heading: [
    'text-center text-[0.7rem] sm:text-xs font-bold',
    'tracking-[0.16em] uppercase',
    'text-accent-500',
    'mb-3 sm:mb-4 select-none',
  ].join(' '),
  highlight: 'text-accent-500',
  supportCopy: [
    'text-center text-sm sm:text-[15px] font-semibold',
    'text-slate-800 dark:text-neutral-200',
    'mb-2 sm:mb-3',
  ].join(' '),
  supportHighlight: 'text-orange-500',
  marquee: [
    'group relative w-full overflow-hidden',
    '[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]',
    '[-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]',
    'motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]',
    'motion-reduce:overflow-visible',
  ].join(' '),
  track: [
    'flex w-max items-center',
    'animate-platform-marquee',
    'motion-reduce:animate-none',
    'motion-reduce:w-full motion-reduce:max-w-full',
    'motion-reduce:flex-wrap motion-reduce:justify-center',
    'group-hover:[animation-play-state:paused]',
    'will-change-transform',
    'motion-reduce:will-change-auto',
  ].join(' '),
  sequence:
    'flex items-center shrink-0 motion-reduce:flex-wrap motion-reduce:justify-center',
  sequenceDuplicate: 'flex items-center shrink-0 motion-reduce:hidden',
  item: [
    'flex items-center justify-center shrink-0',
    'px-4 sm:px-6 md:px-7 lg:px-8',
    'py-1',
  ].join(' '),
  logo: [
    'h-5 sm:h-6 md:h-7 w-auto',
    'max-w-[5.5rem] sm:max-w-[6.5rem] md:max-w-[7.5rem]',
    'object-contain object-center',
    'opacity-90 dark:opacity-95',
    'drop-shadow-none dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.06)]',
    'select-none pointer-events-none',
  ].join(' '),
  more: [
    'inline-flex items-center justify-center h-8 px-3 rounded-full',
    'border border-neutral-200/80 dark:border-white/15',
    'text-[11px] sm:text-xs font-semibold',
    'text-neutral-500 dark:text-neutral-300',
    'hover:text-neutral-900 dark:hover:text-white',
    'hover:border-neutral-300 dark:hover:border-white/25',
    'transition-colors duration-250 whitespace-nowrap focus-ring',
  ].join(' '),
};
