import { motion, useReducedMotion } from 'framer-motion';
import data from '../../../../data/homeHero.json';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';
import { homeHeroMotion as motionConfig } from '../../../../config/homeHeroMotion';
import BackgroundDecorations from './BackgroundDecorations';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';
import PlatformSection from './PlatformSection';

/**
 * Homepage Hero — compact two-column layout matching the reference spacing.
 */
function HomeHero() {
  const reduceMotion = useReducedMotion();
  const platformVariants = reduceMotion
    ? motionConfig.platformRevealReduced
    : motionConfig.platformReveal;

  return (
    <section
      id={data.sectionId}
      aria-labelledby={data.heading.id}
      aria-label={data.ariaLabel}
      className={styles.section.base}
    >
      <BackgroundDecorations />

      <div className={styles.section.container}>
        <div className={styles.section.layout}>
          <HeroContent
            badge={data.badge}
            heading={data.heading}
            description={data.description}
            buttons={data.buttons}
            features={data.features}
            image={data.image}
          />

          <div className={styles.image.colDesktop}>
            <HeroImage image={data.image} />
          </div>
        </div>

        <motion.div
          variants={platformVariants}
          initial="hidden"
          animate="visible"
        >
          <PlatformSection platforms={data.platforms} />
        </motion.div>
      </div>
    </section>
  );
}

export default HomeHero;
