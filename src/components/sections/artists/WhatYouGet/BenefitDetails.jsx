import { getWhatYouGetIcon } from './whatYouGetIcons';
import {
  artistsLabelsWhatYouGetStyles as styles,
  whatYouGetThemeClasses,
} from '../../../../config/artistsLabelsWhatYouGetStyles';

/**
 * Icon + title + accent line + description for a benefit row.
 */
function BenefitDetails({ item, titleId }) {
  if (!item) return null;

  const Icon = getWhatYouGetIcon(item.icon);
  const theme =
    whatYouGetThemeClasses[item.theme] ?? whatYouGetThemeClasses.orange;

  return (
    <div className={styles.row.details}>
      <div className={`${styles.row.iconWrapper} ${theme.icon}`}>
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} aria-hidden="true" />
      </div>

      <div className={styles.row.textWrapper}>
        <h3 id={titleId} className={styles.row.title}>
          {item.title}
        </h3>
        <div
          className={`${styles.row.accentLine} ${theme.accent}`}
          aria-hidden="true"
        />
        <p className={styles.row.description}>{item.description}</p>
      </div>
    </div>
  );
}

export default BenefitDetails;
