import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { User, Mic, Music, Disc, Headphones } from 'lucide-react';
import artistsCategories from '../../../data/artistsCategories.json';
import { homeArtistsStyles as styles } from '../../../config/homeArtistsStyles';

const ICON_MAP = {
  User,
  Mic,
  Music,
  Disc,
  Headphones,
};

/**
 * Featured Artists category filter — JSON-driven pills.
 * Mobile: single-row horizontal scroll. Desktop: centered row.
 */
function ArtistsCategoryFilter({
  categories = artistsCategories,
  activeCategoryId,
  onChange,
}) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const list = Array.isArray(categories) ? categories : [];

  useEffect(() => {
    if (!activeCategoryId || !trackRef.current) return;
    const activeEl = trackRef.current.querySelector(
      `[data-category-id="${activeCategoryId}"]`
    );
    if (!activeEl) return;

    activeEl.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
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

          return (
            <motion.button
              key={category.id}
              type="button"
              role="tab"
              data-category-id={category.id}
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
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Icon
                className={styles.filter.pillIcon}
                strokeWidth={isActive ? 2.25 : 2}
                aria-hidden="true"
              />
              <span className={styles.filter.pillLabel}>{category.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ArtistsCategoryFilter;
