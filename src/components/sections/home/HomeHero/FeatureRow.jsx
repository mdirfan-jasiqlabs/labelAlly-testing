import { motion, useReducedMotion } from 'framer-motion';
import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Four-item feature highlight row under the CTAs.
 */
function FeatureRow({ features = [], itemVariants }) {
  const reduceMotion = useReducedMotion();

  if (!features.length) return null;

  return (
    <motion.ul
      className={styles.features.row}
      aria-label="Hero highlights"
      variants={itemVariants}
    >
      {features.map((feature) => {
        const Icon = getHomeHeroIcon(feature.icon);
        const ItemTag = reduceMotion ? 'li' : motion.li;
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
              <Icon size={17} strokeWidth={2} aria-hidden="true" />
            </div>
            <p className={styles.features.title}>{feature.title}</p>
            <p className={styles.features.description}>{feature.description}</p>
          </ItemTag>
        );
      })}
    </motion.ul>
  );
}

export default FeatureRow;
