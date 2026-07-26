import {
  artistsLabelsWhatYouGetStyles as styles,
} from '../../../../config/artistsLabelsWhatYouGetStyles';

/**
 * Landscape benefit image with angled clip on desktop.
 */
function BenefitImage({ item }) {
  if (!item?.image) return null;

  const isLeft = item.imagePosition === 'left';
  const clipClass = isLeft
    ? styles.row.imageClipLeft
    : styles.row.imageClipRight;

  const objectPositionClass =
    styles.row.imageObjectPositions[item.imageObjectPosition] ||
    styles.row.imageObjectPositionDefault;

  return (
    <div className={styles.row.imageWrapper}>
      <img
        src={item.image}
        alt={item.imageAlt}
        width={item.imageWidth}
        height={item.imageHeight}
        loading="lazy"
        decoding="async"
        className={`${styles.row.image} ${clipClass} ${objectPositionClass}`}
      />
    </div>
  );
}

export default BenefitImage;
