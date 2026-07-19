import { getWhatYouGetIcon } from './whatYouGetIcons';
import {
  artistsLabelsWhatYouGetStyles as styles,
  whatYouGetAccentBarClasses,
} from '../../../../config/artistsLabelsWhatYouGetStyles';

/**
 * Centered What You Get header: badge, heading, accent bars, description.
 */
function WhatYouGetHeader({ badge, heading, accentBars = [], description }) {
  const BadgeIcon = getWhatYouGetIcon(badge?.icon);
  const { badge: badgeStyles, heading: headingStyles } = styles;

  return (
    <header className={headingStyles.wrapper}>
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
          <span className="block">{heading.firstLine}</span>
          <span className="block">
            {heading.secondLinePrefix}{' '}
            <span className={headingStyles.highlighted}>
              {heading.highlightedText}
            </span>{' '}
            {heading.secondLineSuffix}
          </span>
        </h2>
      ) : null}

      {accentBars.length > 0 ? (
        <div className={headingStyles.accentRow} aria-hidden="true">
          {accentBars.map((bar) => (
            <span
              key={bar.id}
              className={
                whatYouGetAccentBarClasses[bar.theme] ??
                whatYouGetAccentBarClasses.neutral
              }
            />
          ))}
        </div>
      ) : null}

      {description ? (
        <p className={headingStyles.description}>{description}</p>
      ) : null}
    </header>
  );
}

export default WhatYouGetHeader;
