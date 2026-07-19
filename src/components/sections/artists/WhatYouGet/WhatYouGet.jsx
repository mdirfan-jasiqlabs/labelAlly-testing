import { artistsLabelsWhatYouGetData as data } from '../../../../data/artistsLabelsWhatYouGetData';
import { artistsLabelsWhatYouGetStyles as styles } from '../../../../config/artistsLabelsWhatYouGetStyles';
import BackgroundDecorations from './BackgroundDecorations';
import WhatYouGetHeader from './WhatYouGetHeader';
import BenefitList from './BenefitList';
import WhatYouGetCTA from './WhatYouGetCTA';

/**
 * What You Get — Artists & Labels value rows + CTA.
 * Renders only from artistsLabelsWhatYouGetData.
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
          <WhatYouGetHeader
            badge={data.badge}
            heading={data.heading}
            accentBars={data.accentBars}
            description={data.description}
          />

          <BenefitList items={data.items} />

          <WhatYouGetCTA cta={data.cta} />
        </div>
      </div>
    </section>
  );
}

export default WhatYouGet;
