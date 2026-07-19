import { getWhoWeWorkWithIcon } from './audienceIcons';
import {
  artistsLabelsWhoWeWorkWithStyles as styles,
  audienceThemeClasses,
} from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Circular theme icon that overlaps the card image and body.
 */
function AudienceIcon({ icon, theme }) {
  const Icon = getWhoWeWorkWithIcon(icon);
  const themeClasses =
    audienceThemeClasses[theme] ?? audienceThemeClasses.orange;

  return (
    <div
      className={`${styles.grid.iconBadge} ${themeClasses.iconBadge}`}
      aria-hidden="true"
    >
      <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} />
    </div>
  );
}

export default AudienceIcon;
