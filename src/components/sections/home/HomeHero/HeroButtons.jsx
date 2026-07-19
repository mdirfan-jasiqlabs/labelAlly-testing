import { Link } from 'react-router-dom';
import { getHomeHeroIcon, WhatsAppIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Primary / secondary homepage hero CTAs.
 */
function HeroButtons({ buttons = [] }) {
  if (!buttons.length) return null;

  return (
    <div className={styles.buttons.row} role="group" aria-label="Hero call to action">
      {buttons.map((button) => {
        const className = [
          styles.buttons.base,
          button.variant === 'primary'
            ? styles.buttons.primary
            : styles.buttons.secondary,
        ].join(' ');

        const Icon =
          button.icon === 'whatsapp'
            ? null
            : getHomeHeroIcon(button.icon);

        const content = (
          <>
            {button.icon === 'whatsapp' ? <WhatsAppIcon size={16} /> : null}
            <span>{button.label}</span>
            {Icon ? (
              <Icon
                size={16}
                strokeWidth={2.5}
                className={styles.buttons.icon}
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

export default HeroButtons;
