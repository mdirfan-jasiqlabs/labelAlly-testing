import { Link } from 'react-router-dom';
import { getOnboardingIcon } from './onboardingIcons';
import { WhatsAppIcon } from '../../../common/WhatsAppIcon';
import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Primary / secondary CTA button row.
 * Secondary WhatsApp CTA matches Home hero amber outline style.
 */
function CTAButtons({ buttons = [] }) {
  if (!buttons.length) return null;

  return (
    <div className={styles.cta.buttons}>
      {buttons.map((button) => {
        const isSecondary = button.variant === 'secondary';
        const Icon = isSecondary ? WhatsAppIcon : getOnboardingIcon(button.icon);
        const className = isSecondary
          ? styles.cta.secondaryButton
          : styles.cta.primaryButton;

        const content = (
          <>
            {isSecondary ? (
              <Icon size={16} aria-hidden="true" />
            ) : null}
            <span>{button.label}</span>
            {!isSecondary ? (
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
