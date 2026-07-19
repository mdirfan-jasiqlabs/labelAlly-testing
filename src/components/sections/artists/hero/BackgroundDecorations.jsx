import { heroClasses } from './heroClasses';

/**
 * Subtle background orbs and geometric accents for the Hero.
 * Driven entirely by heroData.decorations.
 */
function BackgroundDecorations({ decorations }) {
  if (!decorations) return null;

  const { backgroundClass: bg } = heroClasses;
  const orbs = decorations.orbs ?? [];
  const shapes = decorations.shapes ?? [];

  return (
    <div className={bg.layer} aria-hidden="true">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={[
            bg.orb[orb.tone] ?? bg.orb.orange,
            bg.orbSize[orb.size] ?? bg.orbSize.md,
            bg.orbPosition[orb.position] ?? '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ))}

      {shapes.map((shape) => {
        if (shape.type === 'dots' || shape.type === 'dots-right') {
          const dotsClass = shape.type === 'dots-right' ? bg.dotsRight : bg.dots;
          return (
            <div key={shape.id} className={dotsClass}>
              {Array.from({ length: 20 }).map((_, index) => (
                <span key={`${shape.id}-${index}`} className={bg.dot} />
              ))}
            </div>
          );
        }

        if (shape.type === 'pills') {
          return (
            <div key={shape.id} className={bg.pills}>
              <span className={bg.pillTeal} />
              <span className={bg.pillOrange} />
            </div>
          );
        }

        if (shape.type === 'rings') {
          return (
            <div key={shape.id} className={bg.rings}>
              <div className={bg.ringInner} />
            </div>
          );
        }

        if (shape.type === 'triangle') {
          return <div key={shape.id} className={bg.triangle} />;
        }

        if (shape.type === 'wave') {
          return (
            <svg
              key={shape.id}
              className={bg.wave}
              viewBox="0 0 48 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 12c4-8 8 8 12 0s8 8 12 0 8 8 12 0 8 8 12 0"
                className="stroke-brand-orange/50 dark:stroke-brand-orange/40"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          );
        }

        return null;
      })}
    </div>
  );
}

export default BackgroundDecorations;
