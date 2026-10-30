import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  getUniqueHeroSlides,
  getAvailableHeroSlides,
  getReadyHeroSlides,
  getNextReadyHeroSlide,
} from './heroCarouselImages';

const EMPTY_SLIDES = [];

/**
 * Show only the unique photos supplied by the homepage data.
 * Never switch to a photo until it has loaded and decoded. The last successfully
 * displayed photo stays on screen while the next one is pending.
 */
function ArtistCarousel({ slides = EMPTY_SLIDES }) {
  const reduceMotion = useReducedMotion();
  const slideList = useMemo(() => getUniqueHeroSlides(slides), [slides]);
  const [statuses, setStatuses] = useState({});
  const [currentSrc, setCurrentSrc] = useState(null);
  const [isTabHidden, setIsTabHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false
  );

  useEffect(() => {
    const onVisibilityChange = () => setIsTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // Preload the small, configured set of artist photos once per slide list.
  // The detached Image objects do not create additional slides or DOM images.
  useEffect(() => {
    let active = true;
    const preloads = [];

    setStatuses({});
    setCurrentSrc(null);

    slideList.forEach((slide, index) => {
      const image = new Image();
      let settled = false;

      image.decoding = 'async';
      image.fetchPriority = index === 0 ? 'high' : 'auto';

      const ready = () => {
        if (!active || settled) return;
        settled = true;
        setStatuses((previous) => ({ ...previous, [slide.src]: 'ready' }));
        setCurrentSrc((previous) => previous || slide.src);
      };

      const failed = () => {
        if (!active || settled) return;
        settled = true;
        setStatuses((previous) => ({ ...previous, [slide.src]: 'failed' }));
      };

      image.onload = () => {
        // Decoding ahead of the transition also avoids a blank frame on slower devices.
        if (typeof image.decode === 'function') {
          image.decode().then(ready).catch(() => {
            if (image.naturalWidth > 0) ready();
            else failed();
          });
        } else if (image.naturalWidth > 0) {
          ready();
        } else {
          failed();
        }
      };
      image.onerror = failed;
      image.src = slide.src;

      // Some browsers have an image already decoded in cache before onload runs.
      if (image.complete && image.naturalWidth > 0) image.onload();

      preloads.push(image);
    });

    return () => {
      active = false;
      preloads.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [slideList]);

  const availableSlides = useMemo(
    () => getAvailableHeroSlides(slideList, statuses),
    [slideList, statuses]
  );
  const readySlides = useMemo(
    () => getReadyHeroSlides(availableSlides, statuses),
    [availableSlides, statuses]
  );
  const currentSlide =
    readySlides.find((slide) => slide.src === currentSrc) || readySlides[0] || null;

  // Rotate only through successfully loaded images; leave the current photo
  // visible if every other photo is still loading or has failed.
  useEffect(() => {
    if (reduceMotion || isTabHidden || readySlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSrc((previous) => getNextReadyHeroSlide(readySlides, previous)?.src || previous);
    }, 2000);

    return () => clearInterval(timer);
  }, [reduceMotion, isTabHidden, readySlides]);

  const onDisplayedImageError = (src) => {
    setStatuses((previous) =>
      previous[src] === 'failed' ? previous : { ...previous, [src]: 'failed' }
    );
  };

  const waitingForImage = availableSlides.some((slide) => !statuses[slide.src]);

  return (
    <div className="w-full max-w-[540px] flex flex-col items-center select-none pointer-events-none">
      <div className="relative w-full aspect-[4/3.3] xs:aspect-[4/3.2] sm:aspect-[4/3.1] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-indigo-50 via-violet-100 to-orange-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 border border-slate-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.14)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <AnimatePresence initial={false}>
          {currentSlide ? (
            <motion.div
              key={currentSlide.src}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <img
                src={currentSlide.src}
                alt={
                  currentSlide.alt ||
                  (currentSlide.name
                    ? `${currentSlide.name} performing on stage`
                    : 'Featured artist performance')
                }
                className="w-full h-full object-cover select-none pointer-events-none"
                style={{ objectPosition: currentSlide.objectPosition || 'center center' }}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                onError={() => onDisplayedImageError(currentSlide.src)}
              />

              <div
                className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {currentSlide.name ? (
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 pointer-events-none">
                  <p className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md truncate">
                    {currentSlide.name}
                  </p>
                  {currentSlide.role ? (
                    <p className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/85 mt-0.5 drop-shadow-sm truncate">
                      {currentSlide.role}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!currentSlide ? (
          <div
            className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-slate-600 dark:text-slate-300"
            role="status"
          >
            {waitingForImage
              ? 'Loading artist photos…'
              : slideList.length > 0
                ? 'Artist photos are temporarily unavailable.'
                : 'No artist photos available.'}
          </div>
        ) : null}
      </div>

      {/* One indicator per configured, non-failed photo. Never add dummy slides. */}
      {availableSlides.length > 0 ? (
        <div
          className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-3.5"
          aria-hidden="true"
        >
          {availableSlides.map((slide) => (
            <span
              key={slide.src}
              className={[
                'h-2 rounded-full transition-all duration-300',
                currentSlide?.src === slide.src
                  ? 'w-6 bg-accent-500 dark:bg-accent-400 shadow-sm'
                  : 'w-2 bg-slate-300 dark:bg-ink-700',
              ].join(' ')}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ArtistCarousel;
