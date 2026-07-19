import {
  artistsLabelsWhoWeWorkWithStyles as styles,
} from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Subtle geometric decorations for the Who We Work With section.
 */
function BackgroundDecorations() {
  const { decorations: d } = styles;

  return (
    <div className={d.layer} aria-hidden="true">
      <div className={d.glowLeft} />
      <div className={d.glowRight} />

      <div className={d.dots}>
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={`dot-l-${index}`} className={d.dot} />
        ))}
      </div>

      <div className={d.dotsRight}>
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={`dot-r-${index}`} className={d.dot} />
        ))}
      </div>

      <div className={d.triangle} />
      <div className={d.curve} />
    </div>
  );
}

export default BackgroundDecorations;
