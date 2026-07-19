import { Check } from 'lucide-react';
import {
  artistsLabelsWhatYouGetStyles as styles,
  whatYouGetThemeClasses,
} from '../../../../config/artistsLabelsWhatYouGetStyles';

/**
 * Theme-colored three-point feature list for a benefit row.
 */
function BenefitFeatures({ features = [], theme }) {
  if (!features.length) return null;

  const themeClasses =
    whatYouGetThemeClasses[theme] ?? whatYouGetThemeClasses.orange;

  return (
    <ul className={styles.row.featureList}>
      {features.map((feature) => (
        <li key={feature} className={styles.row.featureItem}>
          <span className={`${styles.row.featureIcon} ${themeClasses.check}`}>
            <Check size={12} strokeWidth={3} aria-hidden="true" />
          </span>
          <span className={styles.row.featureText}>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default BenefitFeatures;
