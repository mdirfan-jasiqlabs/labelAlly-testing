/**
 * AboutDecorations — Subtle abstract background shapes for About page sections.
 * Renders decoration items from JSON with static position maps.
 */

const POSITION_CLASSES = {
  'top-left':        'left-[4%] top-[8%]',
  'top-left-inner':  'left-[12%] top-[6%] rotate-12',
  'top-right':       'right-[4%] top-[6%] rotate-45',
  'top-right-inner': 'right-[8%] top-[14%] rotate-[25deg]',
  'middle-left':     'left-[3%] top-[42%] -rotate-45',
  'middle-right':    'right-[4%] top-[38%] rotate-[25deg]',
  'center':          'left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2',
  'center-top':      'left-[18%] top-[22%]',
  'center-right':    'right-[16%] top-[28%]',
};

const VISIBILITY_CLASSES = {
  'top-left':        'hidden lg:block',
  'top-left-inner':  'hidden lg:block',
  'top-right':       'hidden lg:block',
  'top-right-inner': 'hidden lg:block',
  'middle-left':     'hidden lg:block',
  'middle-right':    'hidden lg:block',
  center:            'hidden md:block',
  'center-top':      'hidden lg:block',
  'center-right':    'hidden lg:block',
};

function DecorationShape({ type, position }) {
  const isRightSide = position?.includes('right');
  const isMiddleLeft = position === 'middle-left';

  switch (type) {
    case 'capsule':
      return (
        <div
          className={
            isRightSide
              ? 'w-14 h-5 rounded-full bg-accent-500/25 dark:bg-accent-500/10'
              : 'w-5 h-14 rounded-full bg-teal-500/20 dark:bg-teal-500/10'
          }
        />
      );

    case 'capsule-green':
      return (
        <div className="w-5 h-14 rounded-full bg-teal-500/20 dark:bg-teal-500/10" />
      );

    case 'triangle-faded':
      return (
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-neutral-300/40 dark:border-b-neutral-600/20" />
      );

    case 'triangle-outline':
      return (
        <div
          className={
            isMiddleLeft
              ? 'w-8 h-8 border-2 border-pink-500/25 dark:border-pink-500/15 rounded-sm rotate-12'
              : 'w-10 h-10 border-2 border-teal-500/25 dark:border-teal-500/15 rounded-sm'
          }
        />
      );

    case 'dots':
      return (
        <div
          className={[
            'w-32 h-32 md:w-40 md:h-40 rounded-full',
            'opacity-[0.20] dark:opacity-[0.10]',
            'bg-[radial-gradient(circle,theme(colors.neutral.400)_1.5px,transparent_1.5px)]',
            '[background-size:10px_10px]',
          ].join(' ')}
        />
      );

    case 'dots-large':
      return (
        <div
          className={[
            'w-48 h-48 md:w-64 md:h-64 rounded-full',
            'opacity-[0.18] dark:opacity-[0.10]',
            'bg-[radial-gradient(circle,theme(colors.neutral.400)_1.5px,transparent_1.5px)]',
            '[background-size:10px_10px]',
          ].join(' ')}
        />
      );

    default:
      return null;
  }
}

function AboutDecorations({ decorations = [] }) {
  const enabledDecorations = decorations.filter((item) => item.enabled);

  if (enabledDecorations.length === 0) return null;

  return (
    <>
      {enabledDecorations.map((decoration) => {
        const positionClass = POSITION_CLASSES[decoration.position] ?? '';
        const visibilityClass = VISIBILITY_CLASSES[decoration.position] ?? 'hidden md:block';

        return (
          <div
            key={decoration.id}
            aria-hidden="true"
            className={[
              'absolute pointer-events-none select-none',
              positionClass,
              visibilityClass,
            ].join(' ')}
          >
            <DecorationShape type={decoration.type} position={decoration.position} />
          </div>
        );
      })}
    </>
  );
}

export default AboutDecorations;
