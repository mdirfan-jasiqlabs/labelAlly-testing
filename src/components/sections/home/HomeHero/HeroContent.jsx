import FeatureRow from './FeatureRow';
import HeroButtons from './HeroButtons';
import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Left-column hero copy: badge, heading, description, CTAs, features.
 */
function HeroContent({ badge, heading, description, buttons, features }) {
  const BadgeIcon = getHomeHeroIcon(badge?.icon);
  const { content } = styles;

  return (
    <div className={content.col}>
      {badge ? (
        <div className={content.badge}>
          <BadgeIcon
            size={14}
            className={content.badgeIcon}
            fill="currentColor"
            aria-hidden="true"
          />
          <span>{badge.label}</span>
        </div>
      ) : null}

      {heading ? (
        <h1 id={heading.id} className={content.heading}>
          <span className={content.headingLine}>{heading.lineOne}</span>
          <span className={`${content.headingLine} ${content.accent}`}>
            {heading.lineTwoPrimary} {heading.lineTwoAccent}
          </span>
        </h1>
      ) : null}

      {description ? <p className={content.description}>{description}</p> : null}

      <HeroButtons buttons={buttons} />
      <FeatureRow features={features} />
    </div>
  );
}

export default HeroContent;
