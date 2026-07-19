import { getOnboardingIcon } from './onboardingIcons';
import {
  artistsLabelsOnboardingStyles as styles,
  onboardingThemeClasses,
} from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Single onboarding process card — icon, number, title, copy, accent.
 */
function ProcessCard({ step }) {
  if (!step) return null;

  const Icon = getOnboardingIcon(step.icon);
  const theme =
    onboardingThemeClasses[step.theme] ?? onboardingThemeClasses.orange;

  return (
    <article
      className={styles.process.card}
      aria-labelledby={`onboarding-step-${step.id}-title`}
    >
      <div className={`${styles.process.iconCircle} ${theme.icon}`} aria-hidden="true">
        <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={2} />
      </div>

      <div className={styles.process.titleRow}>
        <span className={`${styles.process.numberBadge} ${theme.number}`}>
          {step.number}
        </span>
        <h3
          id={`onboarding-step-${step.id}-title`}
          className={styles.process.title}
        >
          {step.title}
        </h3>
      </div>

      <p className={styles.process.description}>{step.description}</p>

      <div
        className={`${styles.process.accentLine} ${theme.accent}`}
        aria-hidden="true"
      />
    </article>
  );
}

export default ProcessCard;
