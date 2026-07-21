import data from '../../../../data/artistsLabelsWhoWeWorkWith.json';
import { artistsLabelsWhoWeWorkWithStyles as styles } from '../../../../config/artistsLabelsWhoWeWorkWithStyles';
import BackgroundDecorations from './BackgroundDecorations';
import WhoWeWorkWithHeader from './WhoWeWorkWithHeader';
import AudienceGrid from './AudienceGrid';
import TrustMessage from './TrustMessage';
import { MotionItem } from '../../../motion';

/**
 * Who We Work With — Artists & Labels audience segmentation section.
 * Renders only from artistsLabelsWhoWeWorkWith.json.
 */
function WhoWeWorkWith() {
  return (
    <section
      id={data.sectionId}
      aria-labelledby={data.heading.id}
      className={styles.section.base}
    >
      <BackgroundDecorations />

      <div className={styles.section.container}>
        <div className={styles.section.content}>
          <MotionItem standalone>
            <WhoWeWorkWithHeader
              badge={data.badge}
              heading={data.heading}
              accentBars={data.accentBars}
              description={data.description}
            />
          </MotionItem>

          <AudienceGrid audiences={data.audiences} />

          <MotionItem standalone>
            <TrustMessage trustMessage={data.trustMessage} />
          </MotionItem>
        </div>
      </div>
    </section>
  );
}

export default WhoWeWorkWith;
