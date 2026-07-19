import FeatureList from './FeatureList';
import HeroButtons from './HeroButtons';
import { getHeroIcon } from './heroIcons';
import { heroClasses } from './heroClasses';

/**
 * Left-column hero copy: badge, heading, accent lines, description, CTAs, features.
 */
function HeroContent({
  badge,
  heading,
  accentLines = [],
  description,
  buttons = [],
  features = [],
}) {
  const {
    contentClass,
    badgeClass,
    badgeIconClass,
    headingClass,
    headingLineClass,
    gradientClass,
    accentRowClass,
    accentLineClass,
    descriptionClass,
  } = heroClasses;

  const BadgeIcon = getHeroIcon(badge?.icon);

  return (
    <div className={contentClass}>
      {badge ? (
        <span className={badgeClass} aria-label={badge.ariaLabel}>
          <BadgeIcon size={14} strokeWidth={2.25} className={badgeIconClass} aria-hidden="true" />
          {badge.label}
        </span>
      ) : null}

      {heading ? (
        <h1 id={heading.id} className={headingClass}>
          {(heading.lines ?? []).map((line) => (
            <span key={line.id} className={headingLineClass}>
              {(line.segments ?? []).map((segment, index) =>
                segment.gradient ? (
                  <span key={`${line.id}-${index}`} className={gradientClass}>
                    {segment.text}
                  </span>
                ) : (
                  <span key={`${line.id}-${index}`}>{segment.text}</span>
                ),
              )}
            </span>
          ))}
        </h1>
      ) : null}

      {accentLines.length > 0 ? (
        <div className={accentRowClass} aria-hidden="true">
          {accentLines.map((line) => (
            <span
              key={line.id}
              className={accentLineClass[line.tone] ?? accentLineClass.orange}
            />
          ))}
        </div>
      ) : null}

      {description ? <p className={descriptionClass}>{description}</p> : null}

      <HeroButtons buttons={buttons} />
      <FeatureList features={features} />
    </div>
  );
}

export default HeroContent;
