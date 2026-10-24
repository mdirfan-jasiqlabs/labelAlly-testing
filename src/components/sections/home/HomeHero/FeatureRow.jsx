import { motion, useReducedMotion } from 'framer-motion';
import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Four-item feature highlight row under the hero section matching wireframe.
 * Desktop: 4 columns across. Mobile: 2x2 grid.
 */
function FeatureRow({ features = [] }) {
  const reduceMotion = useReducedMotion();

  if (!features || !features.length) return null;

  return (
    <div
      className={styles.features.row}
      role="region"
      aria-label="LabelAlly key highlights"
    >
      {features.map((feature) => {
        const Icon = getHomeHeroIcon(feature.icon);
        const ItemTag = reduceMotion ? 'div' : motion.div;
        const hoverProps = reduceMotion
          ? {}
          : {
              whileHover: { y: -2 },
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            };

        return (
          <ItemTag
            key={feature.id}
            className={styles.features.item}
            {...hoverProps}
          >
            <div className={styles.features.iconWrap}>
              <Icon size={19} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className={styles.features.title}>{feature.title}</p>
              <p className={styles.features.description}>{feature.description}</p>
            </div>
          </ItemTag>
        );
      })}
    </div>
  );
}

export default FeatureRow;
