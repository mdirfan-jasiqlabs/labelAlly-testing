import { getHeroIcon } from './heroIcons';
import { heroClasses } from './heroClasses';

/**
 * Feature icon row — 2×2 on mobile, 4-col on larger screens.
 */
function FeatureList({ features = [] }) {
  if (!features.length) return null;

  const { featureClass } = heroClasses;

  return (
    <ul className={featureClass.list} aria-label="Hero highlights">
      {features.map((feature) => {
        const Icon = getHeroIcon(feature.icon);
        const iconWrap =
          featureClass.iconWrap[feature.tone] ?? featureClass.iconWrap.orange;

        return (
          <li key={feature.id} className={`group ${featureClass.item}`}>
            <div className={iconWrap}>
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
            </div>
            <p className={featureClass.title}>{feature.title}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default FeatureList;
