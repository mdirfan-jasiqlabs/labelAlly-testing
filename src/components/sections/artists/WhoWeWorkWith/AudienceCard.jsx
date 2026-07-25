import AudienceIcon from './AudienceIcon';
import FeatureList from './FeatureList';
import {
  artistsLabelsWhoWeWorkWithStyles as styles,
  audienceThemeClasses,
} from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Single audience card — centered accent icon, copy, feature list.
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
      <div className={styles.grid.cardContent}>
        <AudienceIcon icon={audience.icon} theme={audience.theme} />

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
