import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Subtle dots / rings behind the onboarding section.
 */
function BackgroundDecorations() {
  const { decorations: d } = styles;

  return (
    <div className={d.layer} aria-hidden="true">
      <div className={d.glow} />
      <div className={d.dots}>
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={`onb-dot-${index}`} className={d.dot} />
        ))}
      </div>
      <div className={d.rings}>
        <div className={d.ringsInner} />
      </div>
    </div>
  );
}

export default BackgroundDecorations;
