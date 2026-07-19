/**
 * SectionDecorations — Subtle abstract background shapes for section surfaces.
 * Renders decoration items defined in missionVisionData.decorations.
 */

const POSITION_CLASSES = {
  'top-left':       'left-[6%] top-[12%] -rotate-45',
  'top-left-inner': 'left-[14%] top-[8%] rotate-12',
  'top-right':      'right-[5%] top-[10%] rotate-45',
  'top-right-inner':'right-[10%] top-[18%] rotate-[25deg]',
  center:           'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
};

const VISIBILITY_CLASSES = {
  'top-left':       'hidden md:block',
  'top-left-inner': 'hidden lg:block',
  'top-right':      'hidden md:block',
  'top-right-inner':'hidden md:block',
  center:           'hidden sm:block',
};

function DecorationShape({ type, position }) {
  const isRightSide = position?.includes('right');

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

    case 'triangle-faded':
      return (
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-neutral-300/40 dark:border-b-neutral-600/20" />
      );

    case 'triangle-outline':
      return (
        <div className="w-10 h-10 border-2 border-accent-500/25 dark:border-accent-500/15 rounded-sm" />
      );

    case 'dots':
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

function SectionDecorations({ decorations = [] }) {
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

export default SectionDecorations;
