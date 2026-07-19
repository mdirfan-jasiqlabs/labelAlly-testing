import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Soft ambient orbs and rings behind the homepage hero.
 */
function BackgroundDecorations() {
  const { decorations: d } = styles;

  return (
    <div className={d.layer} aria-hidden="true">
      <div className={d.orbPrimary} />
      <div className={d.orbAccent} />
      <div className={d.softCircle} />
    </div>
  );
}

export default BackgroundDecorations;
