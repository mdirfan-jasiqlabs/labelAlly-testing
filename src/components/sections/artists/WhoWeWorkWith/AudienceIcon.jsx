import { getWhoWeWorkWithIcon } from './audienceIcons';
import {
  artistsLabelsWhoWeWorkWithStyles as styles,
  audienceThemeClasses,
} from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Centered circular accent icon for an audience card.
 */
function AudienceIcon({ icon, theme }) {
  const Icon = getWhoWeWorkWithIcon(icon);
  const themeClasses =
    audienceThemeClasses[theme] ?? audienceThemeClasses.orange;

  return (
    <div
      className={`${styles.grid.iconBadge} ${themeClasses.iconBadge} ${themeClasses.iconGlow}`}
      aria-hidden="true"
    >
      <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
    </div>
  );
}

export default AudienceIcon;
