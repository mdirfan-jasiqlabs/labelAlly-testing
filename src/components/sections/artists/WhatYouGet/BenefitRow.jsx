import BenefitDetails from './BenefitDetails';
import BenefitFeatures from './BenefitFeatures';
import BenefitImage from './BenefitImage';
import {
  artistsLabelsWhatYouGetStyles as styles,
  whatYouGetThemeClasses,
} from '../../../../config/artistsLabelsWhatYouGetStyles';

/**
 * One alternating horizontal benefit row.
 * DOM stays image → details → features for accessibility;
 * CSS order creates left/right image layouts on desktop.
 */
function BenefitRow({ item }) {
  if (!item) return null;

  const theme =
    whatYouGetThemeClasses[item.theme] ?? whatYouGetThemeClasses.orange;
  const isLeft = item.imagePosition === 'left';
  const titleId = `benefit-${item.id}-title`;

  return (
    <article
      className={`${styles.row.base} ${theme.rowBackground}`}
      aria-labelledby={titleId}
    >
      <div
        className={[
          styles.row.imageCell,
          isLeft ? styles.row.imageCellLeft : styles.row.imageCellRight,
        ].join(' ')}
      >
        <BenefitImage item={item} />
      </div>

      <div
        className={[
          styles.row.detailsCell,
          isLeft ? styles.row.detailsCellLeft : styles.row.detailsCellRight,
        ].join(' ')}
      >
        <BenefitDetails item={item} titleId={titleId} />
      </div>

      <div
        className={[
          styles.row.featuresCell,
          isLeft ? styles.row.featuresCellLeft : styles.row.featuresCellRight,
        ].join(' ')}
      >
        <BenefitFeatures features={item.features} theme={item.theme} />
      </div>
    </article>
  );
}

export default BenefitRow;
