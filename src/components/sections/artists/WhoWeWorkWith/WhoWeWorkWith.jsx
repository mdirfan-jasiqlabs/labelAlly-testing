import data from '../../../../data/artistsLabelsWhoWeWorkWith.json';
import { artistsLabelsWhoWeWorkWithStyles as styles } from '../../../../config/artistsLabelsWhoWeWorkWithStyles';
import BackgroundDecorations from './BackgroundDecorations';
import WhoWeWorkWithHeader from './WhoWeWorkWithHeader';
import AudienceGrid from './AudienceGrid';
import TrustMessage from './TrustMessage';

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
          <WhoWeWorkWithHeader
            badge={data.badge}
            heading={data.heading}
            accentBars={data.accentBars}
            description={data.description}
          />

          <AudienceGrid audiences={data.audiences} />

          <TrustMessage trustMessage={data.trustMessage} />
        </div>
      </div>
    </section>
  );
}

export default WhoWeWorkWith;
