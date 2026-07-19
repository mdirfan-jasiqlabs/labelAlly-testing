import data from '../../../../data/homeHero.json';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';
import BackgroundDecorations from './BackgroundDecorations';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';
import PlatformSection from './PlatformSection';

/**
 * Homepage Hero — compact two-column layout matching the reference spacing.
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
            image={data.image}
          />

          <div className={styles.image.colDesktop}>
            <HeroImage image={data.image} />
          </div>
        </div>

        <PlatformSection platforms={data.platforms} />
      </div>
    </section>
  );
}

export default HomeHero;
