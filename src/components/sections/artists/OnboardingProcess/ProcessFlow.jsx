import HorizontalConnector from './HorizontalConnector';
import MobileConnector from './MobileConnector';
import ProcessCard from './ProcessCard';
import RowTurnConnector from './RowTurnConnector';
import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Five-step onboarding flow.
 * Desktop: top row 01–03 with gap connectors, U-turn, bottom row 04–05.
 * Mobile: vertical stack. DOM order stays 01 → 05.
 */
function ProcessFlow({ steps = [] }) {
  if (!steps.length) return null;

  const [step1, step2, step3, step4, step5] = steps;

  return (
    <div className={styles.process.stage}>
      {/* Desktop layout */}
      <div className={styles.process.desktopOnly}>
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
      </div>

      {/* Mobile layout — single ordered list for a11y */}
      <ol className={styles.process.mobileList}>
        {steps.map((step, index) => (
          <li key={step.id} className={styles.process.listItem}>
            <ProcessCard step={step} />
            {index < steps.length - 1 ? (
              <MobileConnector theme={step.theme} />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ProcessFlow;
