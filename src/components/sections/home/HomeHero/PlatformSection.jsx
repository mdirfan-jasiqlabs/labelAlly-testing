import { Link } from 'react-router-dom';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Bottom platform availability bar with full-color logos.
 */
function PlatformSection({ platforms }) {
  if (!platforms?.enabled || !platforms.items?.length) return null;

  const { platforms: p } = styles;

  return (
    <div className={p.root}>
      <div className={p.shell}>
        <p className={p.heading}>
          {platforms.heading}{' '}
          <span className={p.highlight}>{platforms.highlightText}</span>
        </p>

        <div className={p.logosWrap}>
          <ul className={p.logos} aria-label="Distribution platforms">
            {platforms.items.map((platform) => (
              <li key={platform.id} className={p.item}>
                <img
                  src={platform.logo}
                  alt={platform.alt || platform.name}
                  width={120}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  className={p.logo}
                />
              </li>
            ))}

            {platforms.moreLabel ? (
              <li className={p.item}>
                <Link to={platforms.moreHref || '/services'} className={p.more}>
                  {platforms.moreLabel}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlatformSection;
