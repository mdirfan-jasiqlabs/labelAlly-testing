import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  User,
  Mic2,
  Music2,
  Disc,
  Headphones,
  Guitar,
} from 'lucide-react';
import artistsCategories from '../../../data/artistsCategories.json';
import { homeArtistsStyles as styles } from '../../../config/homeArtistsStyles';

/** Map JSON icon keys → Lucide (Mic/Music resolve to Mic2/Music2). */
const ICON_MAP = {
  User,
  Mic: Mic2,
  Mic2,
  Music: Music2,
  Music2,
  Disc,
  Headphones,
  Guitar,
};

/** Short mobile label from full JSON label — does not mutate JSON. */
function getShortLabel(label = '') {
  const first = label.trim().split(/\s+/)[0];
  return first || label;
}

/**
 * Featured Artists category filter.
 * Mobile (≤768px): compact square icon cards.
 * Tablet/Desktop: existing horizontal pills.
 */
function ArtistsCategoryFilter({
  categories = artistsCategories,
  activeCategoryId,
  onChange,
}) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const hasMountedRef = useRef(false);
  const list = Array.isArray(categories) ? categories : [];

  // Keep the active pill visible in the horizontal track only.
  // Never use element.scrollIntoView — it can scroll the whole page to Featured Artists on load.
  useEffect(() => {
    if (!activeCategoryId || !trackRef.current) return;

    // Skip first mount so homepage stays at the hero
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const track = trackRef.current;
    const activeEl = track.querySelector(`[data-category-id="${activeCategoryId}"]`);
    if (!activeEl) return;

    const targetLeft =
      activeEl.offsetLeft - (track.clientWidth - activeEl.offsetWidth) / 2;

    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [activeCategoryId, reduceMotion]);

  if (!list.length) return null;

  const handleKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();

    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + delta + list.length) % list.length;
    const next = list[nextIndex];
    if (!next) return;

    onChange?.(next.id);
  };

  return (
    <div
      role="tablist"
      aria-label="Artist categories"
      className={styles.filter.container}
    >
      <div
        ref={trackRef}
        className={styles.filter.scrollTrack}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {list.map((category, index) => {
          const Icon = ICON_MAP[category.icon] ?? User;
          const isActive = category.id === activeCategoryId;
          const shortLabel = getShortLabel(category.label);

          return (
            <motion.button
              key={category.id}
              type="button"
              role="tab"
              data-category-id={category.id}
              aria-label={category.label}
              aria-selected={isActive}
              aria-controls="featured-artists-slider"
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange?.(category.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={[
                styles.filter.pill,
                isActive ? styles.filter.pillActive : styles.filter.pillIdle,
              ].join(' ')}
              whileHover={
                reduceMotion || isActive
                  ? undefined
                  : { y: -2, transition: { duration: 0.2 } }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Icon
                className={styles.filter.pillIcon}
                strokeWidth={isActive ? 2.25 : 2}
                aria-hidden="true"
              />
              <span className={styles.filter.pillLabelMobile} aria-hidden="true">
                {shortLabel}
              </span>
              <span className={styles.filter.pillLabelDesktop}>{category.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ArtistsCategoryFilter;
