import data from '../../../../data/artistsLabelsOnboarding.json';
import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';
import BackgroundDecorations from './BackgroundDecorations';
import OnboardingHeader from './OnboardingHeader';
import ProcessFlow from './ProcessFlow';
import OnboardingCTA from './OnboardingCTA';

/**
 * Onboarding Process + CTA — Artists & Labels journey section.
 * Renders only from artistsLabelsOnboarding.json.
 */
function OnboardingProcess() {
  return (
    <section
      id={data.sectionId}
      aria-labelledby={data.heading.id}
      className={styles.section.base}
    >
      <BackgroundDecorations />

      <div className={styles.section.container}>
        <OnboardingHeader
          badge={data.badge}
          heading={data.heading}
          description={data.description}
        />

        <div className={styles.section.processWrapper}>
          <ProcessFlow steps={data.steps} />
        </div>

        <div className={styles.section.ctaWrapper}>
          <OnboardingCTA cta={data.cta} />
        </div>
      </div>
    </section>
  );
}

export default OnboardingProcess;
