import { Link } from 'react-router-dom';
import { getHeroIcon } from './heroIcons';
import { heroClasses } from './heroClasses';

/**
 * Primary / secondary CTA row. Renders only from buttons JSON.
 */
function HeroButtons({ buttons = [] }) {
  if (!buttons.length) return null;

  const { buttonClass, buttonRowClass } = heroClasses;

  return (
    <div className={buttonRowClass} role="group" aria-label="Hero call to action">
      {buttons.map((button) => {
        const Icon = getHeroIcon(button.icon);
        const variantClass =
          buttonClass[button.variant] ?? buttonClass.secondary;
        const className = [buttonClass.base, variantClass].join(' ');

        const content = (
          <>
            <Icon size={17} strokeWidth={2.25} aria-hidden="true" />
            <span>{button.label}</span>
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
              aria-disabled={button.disabled || undefined}
              tabIndex={button.disabled ? -1 : undefined}
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
            aria-disabled={button.disabled || undefined}
            tabIndex={button.disabled ? -1 : undefined}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}

export default HeroButtons;
