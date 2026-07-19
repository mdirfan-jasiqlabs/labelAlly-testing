import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Four-item feature highlight row under the CTAs.
 */
function FeatureRow({ features = [] }) {
  if (!features.length) return null;

  return (
    <ul className={styles.features.row} aria-label="Hero highlights">
      {features.map((feature) => {
        const Icon = getHomeHeroIcon(feature.icon);

        return (
          <li key={feature.id} className={styles.features.item}>
            <div className={styles.features.iconWrap}>
              <Icon size={17} strokeWidth={2} aria-hidden="true" />
            </div>
            <p className={styles.features.title}>{feature.title}</p>
            <p className={styles.features.description}>{feature.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default FeatureRow;
