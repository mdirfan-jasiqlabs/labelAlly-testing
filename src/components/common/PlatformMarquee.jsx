import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
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
  const reduceMotion = useReducedMotion();

  const marqueeItems = useMemo(
    () => (reduceMotion ? items : [...items, ...items]),
    [items, reduceMotion],
  );

  if (!items.length) return null;

  const originalCount = items.length;

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
          <div className={styles.fadeLeft} aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />

          <ul
            className={styles.track}
            aria-label="Distribution platforms"
          >
            {marqueeItems.map((platform, index) => {
              const isDuplicate = !reduceMotion && index >= originalCount;

              return (
                <li
                  key={`${platform.id}-${index}`}
                  className={styles.item}
                  aria-hidden={isDuplicate ? 'true' : undefined}
                >
                  <div className={styles.logoWrap}>
                    <PlatformLogo
                      platform={platform}
                      className={styles.logo}
                      hideFromAssistiveTech={isDuplicate}
                    />
                  </div>
                </li>
              );
            })}

            {moreLabel ? (
              <li className={styles.item}>
                <Link to={moreHref || '/services'} className={styles.more}>
                  {moreLabel}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlatformMarquee;
export { platformMarqueeStyles } from '../../config/platformMarqueeStyles';
