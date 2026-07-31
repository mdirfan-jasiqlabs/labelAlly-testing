import { motion, useReducedMotion } from 'framer-motion';
import { Music2, Clapperboard, Baby, Smartphone } from 'lucide-react';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';
import { homeContentProductionStyles as styles } from '../../../config/homeContentProductionStyles';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';

const ICON_MAP = {
  Music2,
  Clapperboard,
  Baby,
  Smartphone,
};

function ContentProductionBackground() {
  const { background: bg } = styles;

  return (
    <div className={bg.layer} aria-hidden="true">
      <div className={bg.orbPrimary} />
      <div className={bg.orbAccent} />
      <div className={bg.flowLine} />
    </div>
  );
}

/**
 * ContentProductionSection — Homepage genres/formats grid.
 * Split header + 4 parallelogram image cards (Music, Entertainment, Kids & Family, Micro Drama).
 */
function ContentProductionSection() {
  const { contentProduction } = homeData;
  const reduceMotion = useReducedMotion();

  if (!contentProduction?.items?.length) return null;

  const { heading, tagline, description, items } = contentProduction;
  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;

  return (
    <section
      role="region"
      aria-labelledby="content-production-heading"
      className={styles.section}
    >
      <ContentProductionBackground />

      <Container size="2xl" className="relative z-10">
        <motion.div
          className={styles.header}
          variants={motionConfig.container}
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
        >
          <motion.div className={styles.headerLeft} variants={itemVariants}>
            <h2 id="content-production-heading" className={styles.heading}>
              <span className="block">{heading.prefix}</span>
              <span className={`block ${styles.headingAccent}`}>{heading.accent}</span>
            </h2>
            {tagline ? <p className={styles.tagline}>{tagline}</p> : null}
          </motion.div>

          {description ? (
            <motion.div className={styles.headerRight} variants={itemVariants}>
              <p className={styles.description}>{description}</p>
            </motion.div>
          ) : null}
        </motion.div>

        <motion.ul
          className={styles.grid}
          variants={motionConfig.container}
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
        >
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Music2;

            return (
              <motion.li key={item.id} className={styles.card} variants={itemVariants}>
                <div className={styles.imageWrap} style={styles.imageClip}>
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className={styles.image}
                  />
                </div>

                <div className={styles.titleRow}>
                  <span className={styles.iconWrap} aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className={styles.title}>{item.title}</h3>
                </div>

                <p className={styles.cardDescription}>{item.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}

export default ContentProductionSection;
