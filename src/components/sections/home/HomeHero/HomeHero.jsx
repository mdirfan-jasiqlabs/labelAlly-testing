import { motion, useReducedMotion } from 'framer-motion';
import data from '../../../../data/homeHero.json';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';
import { homeHeroMotion as motionConfig } from '../../../../config/homeHeroMotion';
import BackgroundDecorations from './BackgroundDecorations';
import HeroContent from './HeroContent';
import ArtistCarousel from './ArtistCarousel';
import FeatureRow from './FeatureRow';
import PlatformSection from './PlatformSection';

/**
 * Homepage Hero — desktop two-column with artist carousel on right;
 * stacks naturally on mobile/tablet; four key benefits row cleanly arranged below.
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
        {/* Main Hero grid: left content, right artist photo carousel */}
        <div className={styles.section.layout}>
          <HeroContent
            badge={data.badge}
            heading={data.heading}
            description={data.description}
            buttons={data.buttons}
          />

          <div className="lg:col-span-6 w-full flex justify-center items-center relative z-10">
            <ArtistCarousel slides={data.artistSlides} />
          </div>
        </div>

        {/* Four benefits row below the hero section */}
        <FeatureRow features={data.features} />

        {/* Available On platform marquee */}
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
