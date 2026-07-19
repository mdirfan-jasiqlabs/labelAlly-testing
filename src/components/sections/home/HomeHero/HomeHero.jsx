import data from '../../../../data/homeHero.json';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';
import BackgroundDecorations from './BackgroundDecorations';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';
import PlatformSection from './PlatformSection';

/**
 * Homepage Hero — JSON-driven premium hero matching the reference composition.
 */
function HomeHero() {
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
          />
          <HeroImage image={data.image} />
        </div>

        <PlatformSection platforms={data.platforms} />
      </div>
    </section>
  );
}

export default HomeHero;
