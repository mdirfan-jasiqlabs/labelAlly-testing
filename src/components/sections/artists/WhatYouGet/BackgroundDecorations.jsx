import { artistsLabelsWhatYouGetStyles as styles } from '../../../../config/artistsLabelsWhatYouGetStyles';

/**
 * Subtle rings / dots behind the What You Get section.
 */
function BackgroundDecorations() {
  const { decorations: d } = styles;

  return (
    <div className={d.layer} aria-hidden="true">
      <div className={d.glow} />
      <div className={d.ringsLeft}>
        <div className={d.ringsLeftInner} />
      </div>
      <div className={d.ringsRight}>
        <div className={d.ringsRightInner} />
      </div>
      <div className={d.dots}>
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={`wyg-dot-${index}`} className={d.dot} />
        ))}
      </div>
    </div>
  );
}

export default BackgroundDecorations;
