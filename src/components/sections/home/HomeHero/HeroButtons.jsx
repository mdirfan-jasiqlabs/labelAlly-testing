import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../../../common/Button';
import { getHomeHeroIcon, WhatsAppIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Primary / secondary homepage hero CTAs.
 * Primary uses shared Button tokens (matches Services page).
 */
function HeroButtons({ buttons = [] }) {
  const reduceMotion = useReducedMotion();

  if (!buttons.length) return null;

  return (
    <div className={styles.buttons.row} role="group" aria-label="Hero call to action">
      {buttons.map((button) => {
        if (button.variant === 'primary') {
          const Icon = getHomeHeroIcon(button.icon);

          return (
            <Button
              key={button.id}
              as={button.external ? 'a' : Link}
              to={button.external ? undefined : button.href}
              href={button.external ? button.href : undefined}
              target={button.external ? '_blank' : undefined}
              rel={button.external ? 'noopener noreferrer' : undefined}
              aria-label={button.ariaLabel}
              variant="primary"
              size="lg"
              className={[
                'group w-full sm:w-auto',
                'motion-safe:hover:-translate-y-0.5',
                'motion-reduce:hover:translate-y-0',
              ].join(' ')}
              rightIcon={
                Icon ? (
                  <Icon
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                ) : null
              }
            >
              {button.label}
            </Button>
          );
        }

        const MotionTag = reduceMotion ? 'div' : motion.div;
        const motionProps = reduceMotion
          ? {}
          : { whileHover: { y: -2 }, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } };

        const content = (
          <>
            {button.icon === 'whatsapp' ? <WhatsAppIcon size={16} /> : null}
            <span>{button.label}</span>
          </>
        );

        if (button.external) {
          return (
            <MotionTag key={button.id} {...motionProps} className="w-full sm:w-auto">
              <a
                href={button.href}
                aria-label={button.ariaLabel}
                className={[styles.buttons.base, styles.buttons.secondary].join(' ')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            </MotionTag>
          );
        }

        return (
          <MotionTag key={button.id} {...motionProps} className="w-full sm:w-auto">
            <Link
              to={button.href}
              aria-label={button.ariaLabel}
              className={[styles.buttons.base, styles.buttons.secondary].join(' ')}
            >
              {content}
            </Link>
          </MotionTag>
        );
      })}
    </div>
  );
}

export default HeroButtons;
