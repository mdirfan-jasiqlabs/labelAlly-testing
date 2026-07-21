import HorizontalConnector from './HorizontalConnector';
import MobileConnector from './MobileConnector';
import ProcessCard from './ProcessCard';
import RowTurnConnector from './RowTurnConnector';
import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';
import { MotionSection, MotionStagger, MotionItem } from '../../../motion';

/**
 * Five-step onboarding flow.
 * Desktop: top row 01–03 with gap connectors, U-turn, bottom row 04–05.
 * Mobile: vertical stack. DOM order stays 01 → 05.
 *
 * Desktop uses a single section reveal (connectors must stay layout-stable).
 * Mobile uses step stagger.
 */
function ProcessFlow({ steps = [] }) {
  if (!steps.length) return null;

  const [step1, step2, step3, step4, step5] = steps;

  return (
    <div className={styles.process.stage}>
      <MotionSection className={styles.process.desktopOnly}>
        <div className={styles.process.topRow}>
          <div className={styles.process.cardSlot}>
            <ProcessCard step={step1} />
          </div>
          <HorizontalConnector theme={step1.theme} />
          <div className={styles.process.cardSlot}>
            <ProcessCard step={step2} />
          </div>
          <HorizontalConnector theme={step2.theme} />
          <div className={styles.process.cardSlot}>
            <ProcessCard step={step3} />
          </div>
        </div>

        <RowTurnConnector />

        <div className={styles.process.bottomRow}>
          <div className={styles.process.bottomInner}>
            <div className={styles.process.cardSlot}>
              <ProcessCard step={step4} />
            </div>
            <HorizontalConnector theme={step4.theme} />
            <div className={styles.process.cardSlot}>
              <ProcessCard step={step5} />
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionStagger as="ol" className={styles.process.mobileList} stagger={0.08}>
        {steps.map((step, index) => (
          <MotionItem key={step.id} as="li" className={styles.process.listItem}>
            <ProcessCard step={step} />
            {index < steps.length - 1 ? (
              <MobileConnector theme={step.theme} />
            ) : null}
          </MotionItem>
        ))}
      </MotionStagger>
    </div>
  );
}

export default ProcessFlow;
