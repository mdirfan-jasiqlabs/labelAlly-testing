import { Check } from 'lucide-react';
import {
  artistsLabelsWhoWeWorkWithStyles as styles,
  audienceThemeClasses,
} from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Theme-colored feature checklist for an audience card.
 */
function FeatureList({ features = [], theme }) {
  if (!features.length) return null;

  const themeClasses =
    audienceThemeClasses[theme] ?? audienceThemeClasses.orange;

  return (
    <ul className={styles.grid.featureList}>
      {features.map((feature) => (
        <li key={feature} className={styles.grid.featureItem}>
          <span className={`${styles.grid.featureIcon} ${themeClasses.check}`}>
            <Check size={12} strokeWidth={3} aria-hidden="true" />
          </span>
          <span className={styles.grid.featureText}>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default FeatureList;
