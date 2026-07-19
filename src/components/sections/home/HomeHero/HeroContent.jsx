import FeatureRow from './FeatureRow';
import HeroButtons from './HeroButtons';
import HeroImage from './HeroImage';
import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Left-column hero stack — tight vertical rhythm matching the reference.
 * Mobile: image sits between description and CTAs.
 * Desktop: image renders in the sibling column via HomeHero.
 */
function HeroContent({ badge, heading, description, buttons, features, image }) {
  const BadgeIcon = getHomeHeroIcon(badge?.icon);
  const { content } = styles;

  return (
    <div className={content.stack}>
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
          <span className={content.headingLine}>
            {heading.lineTwoPrimary}{' '}
            <span className={content.accent}>{heading.lineTwoAccent}</span>
          </span>
        </h1>
      ) : null}

      {description ? <p className={content.description}>{description}</p> : null}

      {image ? (
        <div className={content.mobileImage}>
          <HeroImage image={image} />
        </div>
      ) : null}

      <HeroButtons buttons={buttons} />
      <FeatureRow features={features} />
    </div>
  );
}

export default HeroContent;
