import { Link } from 'react-router-dom';
import { getWhatYouGetIcon } from './whatYouGetIcons';
import { artistsLabelsWhatYouGetStyles as styles } from '../../../../config/artistsLabelsWhatYouGetStyles';

/**
 * Full-width dark CTA banner below the benefit rows.
 */
function WhatYouGetCTA({ cta }) {
  if (!cta) return null;

  const StarIcon = getWhatYouGetIcon(cta.icon);
  const ArrowIcon = getWhatYouGetIcon(cta.button?.icon);
  const { cta: ctaStyles } = styles;

  return (
    <div className={ctaStyles.wrapper}>
      <div className={ctaStyles.iconWrapper} aria-hidden="true">
        <StarIcon className="h-6 w-6" strokeWidth={2} fill="currentColor" />
      </div>

      <div className={ctaStyles.content}>
        <p className={ctaStyles.title}>{cta.title}</p>
        {cta.description ? (
          <p className={ctaStyles.description}>{cta.description}</p>
        ) : null}
      </div>

      {cta.button ? (
        <Link
          to={cta.button.href}
          aria-label={cta.button.ariaLabel}
          className={ctaStyles.button}
        >
          <span>{cta.button.label}</span>
          <ArrowIcon
            size={16}
            strokeWidth={2.5}
            className={ctaStyles.buttonIcon}
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}

export default WhatYouGetCTA;
