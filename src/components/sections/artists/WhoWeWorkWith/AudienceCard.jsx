import AudienceIcon from './AudienceIcon';
import FeatureList from './FeatureList';
import {
  artistsLabelsWhoWeWorkWithStyles as styles,
  audienceThemeClasses,
} from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Single audience card — image, overlapping icon, copy, feature list.
 */
function AudienceCard({ audience }) {
  if (!audience) return null;

  const themeClasses =
    audienceThemeClasses[audience.theme] ?? audienceThemeClasses.orange;

  return (
    <article
      className={`${styles.grid.card} ${themeClasses.glow}`}
      aria-labelledby={`audience-${audience.id}-title`}
    >
      <div className="relative">
        <div className={styles.grid.imageWrapper}>
          <img
            src={audience.image}
            alt={audience.imageAlt}
            width={audience.imageWidth}
            height={audience.imageHeight}
            loading="lazy"
            decoding="async"
            className={styles.grid.image}
          />
        </div>
        <AudienceIcon icon={audience.icon} theme={audience.theme} />
      </div>

      <div className={styles.grid.cardContent}>
        <h3 id={`audience-${audience.id}-title`} className={styles.grid.title}>
          {audience.title}
        </h3>

        <p className={styles.grid.description}>{audience.description}</p>

        <div className={styles.grid.divider} aria-hidden="true" />

        <FeatureList features={audience.features} theme={audience.theme} />
      </div>
    </article>
  );
}

export default AudienceCard;
