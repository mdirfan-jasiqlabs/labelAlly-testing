import {
  artistsLabelsOnboardingStyles as styles,
  ctaHighlightThemeClasses,
} from '../../../../config/artistsLabelsOnboardingStyles';
import { getOnboardingIcon } from './onboardingIcons';

/**
 * Four compact CTA feature highlights.
 */
function CTAHighlights({ highlights = [] }) {
  if (!highlights.length) return null;

  return (
    <div className={styles.cta.highlightGrid}>
      {highlights.map((item) => {
        const Icon = getOnboardingIcon(item.icon);
        const iconTheme =
          ctaHighlightThemeClasses[item.theme] ??
          ctaHighlightThemeClasses.orange;

        return (
          <div key={item.id} className={styles.cta.highlightItem}>
            <span className={`${styles.cta.highlightIcon} ${iconTheme}`}>
              <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
            </span>
            <span className={styles.cta.highlightLabel}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default CTAHighlights;
