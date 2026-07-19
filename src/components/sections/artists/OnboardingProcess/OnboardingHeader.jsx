import { getOnboardingIcon } from './onboardingIcons';
import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Centered onboarding section header.
 */
function OnboardingHeader({ badge, heading, description }) {
  const BadgeIcon = getOnboardingIcon(badge?.icon);
  const { badge: badgeStyles, heading: headingStyles } = styles;

  return (
    <header className={styles.section.header}>
      {badge ? (
        <span className={badgeStyles.wrapper}>
          <BadgeIcon
            size={14}
            strokeWidth={2.25}
            className={badgeStyles.icon}
            aria-hidden="true"
          />
          <span className={badgeStyles.label}>{badge.label}</span>
        </span>
      ) : null}

      {heading ? (
        <h2 id={heading.id} className={headingStyles.title}>
          <span>{heading.prefix} </span>
          <span className={headingStyles.highlighted}>
            {heading.highlightedText}
          </span>
        </h2>
      ) : null}

      {description ? (
        <p className={headingStyles.description}>{description}</p>
      ) : null}
    </header>
  );
}

export default OnboardingHeader;
