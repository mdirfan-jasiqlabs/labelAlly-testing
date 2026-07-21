import data from '../../../../data/artistsLabelsWhatYouGet.json';
import { artistsLabelsWhatYouGetStyles as styles } from '../../../../config/artistsLabelsWhatYouGetStyles';
import BackgroundDecorations from './BackgroundDecorations';
import WhatYouGetHeader from './WhatYouGetHeader';
import BenefitList from './BenefitList';
import WhatYouGetCTA from './WhatYouGetCTA';
import { MotionItem, MotionSection } from '../../../motion';

/**
 * What You Get — Artists & Labels value rows + CTA.
 * Renders only from artistsLabelsWhatYouGet.json.
 */
function WhatYouGet() {
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
            <WhatYouGetHeader
              badge={data.badge}
              heading={data.heading}
              accentBars={data.accentBars}
              description={data.description}
            />
          </MotionItem>

          <BenefitList items={data.items} />

          <MotionSection>
            <WhatYouGetCTA cta={data.cta} />
          </MotionSection>
        </div>
      </div>
    </section>
  );
}

export default WhatYouGet;
