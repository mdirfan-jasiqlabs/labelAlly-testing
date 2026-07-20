import { Link } from 'react-router-dom';
import { platformMarqueeStyles as styles } from '../../config/platformMarqueeStyles';

/** Logos whose wordmarks need a light/official dark-mode SVG variant. */
const DARK_WORDMARK_IDS = new Set([
  'apple-music',
  'youtube',
  'facebook',
  'amazon-music',
  'resso',
  'jiosaavn',
  'hungama',
]);

function getDarkLogoSrc(logoSrc) {
  return logoSrc.replace(/\.svg$/i, '-dark.svg');
}

/**
 * Official brand mark with optional dark-mode wordmark variant.
 * Does not globally invert colorful icons.
 */
function PlatformLogo({ platform, className, hideFromAssistiveTech = false }) {
  const alt = platform.alt || platform.name;
  const needsDarkVariant = DARK_WORDMARK_IDS.has(platform.id);

  if (!needsDarkVariant) {
    return (
      <img
        src={platform.logo}
        alt={hideFromAssistiveTech ? '' : alt}
        aria-hidden={hideFromAssistiveTech ? 'true' : undefined}
        width={120}
        height={32}
        loading="lazy"
        decoding="async"
        className={className}
      />
    );
  }

  return (
    <>
      <img
        src={platform.logo}
        alt={hideFromAssistiveTech ? '' : alt}
        aria-hidden={hideFromAssistiveTech ? 'true' : undefined}
        width={120}
        height={32}
        loading="lazy"
        decoding="async"
        className={`${className} dark:hidden`}
      />
      <img
        src={getDarkLogoSrc(platform.logo)}
        alt=""
        aria-hidden="true"
        width={120}
        height={32}
        loading="lazy"
        decoding="async"
        className={`${className} hidden dark:block`}
      />
    </>
  );
}

function LogoSequence({ items, moreLabel, moreHref, duplicate = false }) {
  return (
    <ul
      className={duplicate ? styles.sequenceDuplicate : styles.sequence}
      aria-hidden={duplicate ? 'true' : undefined}
      aria-label={duplicate ? undefined : 'Distribution platforms'}
    >
      {items.map((platform) => (
        <li key={`${duplicate ? 'dup' : 'src'}-${platform.id}`} className={styles.item}>
          <PlatformLogo
            platform={platform}
            className={styles.logo}
            hideFromAssistiveTech={duplicate}
          />
        </li>
      ))}

      {moreLabel ? (
        <li className={styles.item}>
          {duplicate ? (
            <span className={styles.more}>{moreLabel}</span>
          ) : (
            <Link to={moreHref || '/services'} className={styles.more}>
              {moreLabel}
            </Link>
          )}
        </li>
      ) : null}
    </ul>
  );
}

/**
 * PlatformMarquee — Reusable infinite CSS logo marquee.
 *
 * @param {object[]} items — Platform objects with id, logo, name, alt
 * @param {string}   [heading]
 * @param {string}   [highlightText]
 * @param {string}   [moreLabel]
 * @param {string}   [moreHref]
 * @param {ReactNode} [support] — Optional line above the accent heading
 * @param {string}   [className] — Extra classes on root
 */
function PlatformMarquee({
  items = [],
  heading,
  highlightText,
  moreLabel,
  moreHref,
  support = null,
  className = '',
}) {
  if (!items.length) return null;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.shell}>
        {support}

        {(heading || highlightText) && (
          <p className={styles.heading}>
            {heading ? <>{heading}{' '}</> : null}
            {highlightText ? (
              <span className={styles.highlight}>{highlightText}</span>
            ) : null}
          </p>
        )}

        <div className={styles.marquee}>
          <div className={styles.track}>
            <LogoSequence
              items={items}
              moreLabel={moreLabel}
              moreHref={moreHref}
            />
            <LogoSequence
              items={items}
              moreLabel={moreLabel}
              moreHref={moreHref}
              duplicate
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformMarquee;
export { platformMarqueeStyles } from '../../config/platformMarqueeStyles';
