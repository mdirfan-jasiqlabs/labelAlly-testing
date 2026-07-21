import BackgroundDecorations from './BackgroundDecorations';
import HeroContent from './HeroContent';
import HeroGallery from './HeroGallery';
import TrustSection from './TrustSection';
import heroData from '../../../../data/artistsHero.json';
import { heroClasses } from './heroClasses';
import { MotionSection, MotionItem } from '../../../motion';

/**
 * Premium Artists & Labels Hero — JSON-driven; layout matches reference.
 */
function Hero() {
  const data = heroData;

  return (
    <section
      aria-labelledby={data.heading?.id ?? 'hero-heading'}
      aria-label={data.ariaLabel}
      className={heroClasses.sectionClass}
    >
      <BackgroundDecorations decorations={data.decorations} />

      <div className={heroClasses.containerClass}>
        <div className={heroClasses.layoutClass}>
          <MotionSection className={heroClasses.contentColClass}>
            <HeroContent
              badge={data.badge}
              heading={data.heading}
              accentLines={data.accentLines}
              description={data.description}
              buttons={data.buttons}
              features={data.features}
            />
          </MotionSection>

          <MotionItem standalone variant="scale" className={heroClasses.galleryColClass}>
            <HeroGallery gallery={data.gallery} />
          </MotionItem>
        </div>

        <MotionItem standalone>
          <TrustSection trustSection={data.trustSection} />
        </MotionItem>
      </div>
    </section>
  );
}

export default Hero;
