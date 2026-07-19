import { getWhoWeWorkWithIcon } from './audienceIcons';
import {
  accentBarClasses,
  artistsLabelsWhoWeWorkWithStyles as styles,
  headingHighlightClasses,
} from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Centered section header: badge, heading, accent bars, description.
 */
function WhoWeWorkWithHeader({ badge, heading, accentBars = [], description }) {
  const BadgeIcon = getWhoWeWorkWithIcon(badge?.icon);
  const { header } = styles;

  return (
    <header className={header.wrapper}>
      {badge ? (
        <span className={header.badge}>
          <BadgeIcon
            size={14}
            strokeWidth={2.25}
            className={header.badgeIcon}
            aria-hidden="true"
          />
          <span className={header.badgeText}>{badge.label}</span>
        </span>
      ) : null}

      {heading ? (
        <h2 id={heading.id} className={header.heading}>
          <span className={header.headingPlain}>{heading.prefix} </span>
          {(heading.highlightedWords ?? []).map((word, index) => (
            <span key={`${word.text}-${word.theme}`}>
              <span
                className={
                  headingHighlightClasses[word.theme] ??
                  headingHighlightClasses.orange
                }
              >
                {word.text}
              </span>
              {index < (heading.highlightedWords?.length ?? 0) - 1 ? (
                <span className={header.headingPlain}>, </span>
              ) : (
                <span className={header.headingPlain}> </span>
              )}
            </span>
          ))}
          <span className={header.headingPlain}>{heading.suffix}</span>
        </h2>
      ) : null}

      {accentBars.length > 0 ? (
        <div className={header.accentRow} aria-hidden="true">
          {accentBars.map((bar) => (
            <span
              key={bar.id}
              className={accentBarClasses[bar.theme] ?? accentBarClasses.neutral}
            />
          ))}
        </div>
      ) : null}

      {description ? <p className={header.description}>{description}</p> : null}
    </header>
  );
}

export default WhoWeWorkWithHeader;
