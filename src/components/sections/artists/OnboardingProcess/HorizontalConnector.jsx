import { getOnboardingIcon } from './onboardingIcons';
import {
  artistsLabelsOnboardingStyles as styles,
  onboardingThemeClasses,
} from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Dashed segment + circular arrow between two process cards (desktop).
 * Lives in the grid gap so alignment stays locked to the cards.
 */
function HorizontalConnector({ theme, className = '' }) {
  const ArrowIcon = getOnboardingIcon('arrowRight');
  const themeClasses =
    onboardingThemeClasses[theme] ?? onboardingThemeClasses.orange;

  return (
    <div
      className={`${styles.process.horizontalConnector} ${className}`}
      aria-hidden="true"
    >
      <span className={styles.process.horizontalDash} />
      <span className={`${styles.process.connectorArrow} ${themeClasses.arrow}`}>
        <ArrowIcon
          className={styles.process.connectorArrowIcon}
          strokeWidth={2.5}
        />
      </span>
      <span className={styles.process.horizontalDash} />
    </div>
  );
}

export default HorizontalConnector;
