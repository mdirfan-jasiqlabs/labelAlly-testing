import { Link } from 'react-router-dom';
import { getOnboardingIcon } from './onboardingIcons';
import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Primary / secondary CTA button row.
 */
function CTAButtons({ buttons = [] }) {
  if (!buttons.length) return null;

  return (
    <div className={styles.cta.buttons}>
      {buttons.map((button) => {
        const Icon = getOnboardingIcon(button.icon);
        const className =
          button.variant === 'primary'
            ? styles.cta.primaryButton
            : styles.cta.secondaryButton;

        const content = (
          <>
            {button.variant === 'secondary' ? (
              <Icon size={16} strokeWidth={2.25} aria-hidden="true" />
            ) : null}
            <span>{button.label}</span>
            {button.variant === 'primary' ? (
              <Icon
                size={16}
                strokeWidth={2.5}
                className={styles.cta.buttonIcon}
                aria-hidden="true"
              />
            ) : null}
          </>
        );

        if (button.external) {
          return (
            <a
              key={button.id}
              href={button.href}
              aria-label={button.ariaLabel}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={button.id}
            to={button.href}
            aria-label={button.ariaLabel}
            className={className}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}

export default CTAButtons;
