import { getOnboardingIcon } from './onboardingIcons';
import {
  artistsLabelsOnboardingStyles as styles,
  onboardingThemeClasses,
} from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Vertical dashed connector between stacked mobile process cards.
 */
function MobileConnector({ theme }) {
  const ArrowIcon = getOnboardingIcon('arrowDown');
  const themeClasses =
    onboardingThemeClasses[theme] ?? onboardingThemeClasses.orange;

  return (
    <div className={styles.process.mobileConnector} aria-hidden="true">
      <div className={styles.process.mobileLine} />
      <span className={`${styles.process.connectorArrow} ${themeClasses.arrow}`}>
        <ArrowIcon className={styles.process.connectorArrowIcon} strokeWidth={2.5} />
      </span>
      <div className={styles.process.mobileLine} />
    </div>
  );
}

export default MobileConnector;
