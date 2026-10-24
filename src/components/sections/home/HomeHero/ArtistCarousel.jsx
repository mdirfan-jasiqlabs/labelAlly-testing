import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const DEFAULT_HERO_ARTISTS = [
  {
    id: 'utkarsh-saxena',
    filename: 'Utkarsh Saxena.png',
    src: '/Hero_artist/Utkarsh Saxena.png',
    name: 'Utkarsh Saxena',
    role: 'Bollywood Singer',
    objectPosition: 'center 18%',
    alt: 'Utkarsh Saxena singing into a microphone in studio',
  },
  {
    id: 'satish-das',
    filename: 'Satish Das.png',
    src: '/Hero_artist/Satish Das.png',
    name: 'Satish Das',
    role: 'Khortha Artist',
    objectPosition: 'center 18%',
    alt: 'Satish Das singing live in performance',
  },
  {
    id: 'kanwar-singh-grewal',
    filename: 'kanwar singh grewal.png',
    src: '/Hero_artist/kanwar singh grewal.png',
    name: 'Kanwar Singh Grewal',
    role: 'Punjabi Singer',
    objectPosition: 'center center',
    alt: 'Kanwar Singh Grewal performing live',
  },
  {
    id: 'shivani',
    filename: 'Shivani.png',
    src: '/Hero_artist/Shivani.png',
    name: 'Shivani',
    role: 'Bhojpuri Artist',
    objectPosition: 'center 15%',
    alt: 'Shivani performing live with wireless microphone',
  },
  {
    id: 'featured-artist-abx',
    filename: 'abx.jpeg',
    src: '/Hero_artist/abx.jpeg',
    name: null,
    role: null,
    objectPosition: 'center 20%',
    alt: 'Featured artist performing on stage',
  },
  {
    id: 'featured-artist-live',
    filename: '830856997_18122027963585457_4863629328978351164_n.jpg.jpeg',
    src: '/Hero_artist/830856997_18122027963585457_4863629328978351164_n.jpg.jpeg',
    name: null,
    role: null,
    objectPosition: 'center 20%',
    alt: 'Featured artist live performance',
  },
];

/**
 * ArtistCarousel — Fully automatic hero photo crossfade carousel.
 *
 * Requirements:
 * - 2-second continuous looping rotation across all 6 artist photos
 * - Non-pausing on hover, touch, click, or focus
 * - Suspends rotation while browser tab is hidden; resumes with fresh 2s interval when visible
 * - Shows static image when prefers-reduced-motion is active
 * - Overlapping 400ms opacity crossfade within fixed-aspect frame
 * - Visual-only dot indicators below the image without button semantics or click handlers
 * - Preserves confirmed artist captions, slide counter, deterministic order, and framing
 * - Cleaned-up control row spacing with no empty gaps
 */
function ArtistCarousel({ slides = DEFAULT_HERO_ARTISTS }) {
  const reduceMotion = useReducedMotion();
  const slideList = slides && slides.length > 0 ? slides : DEFAULT_HERO_ARTISTS;
  const totalSlides = slideList.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTabHidden, setIsTabHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false
  );
  const [failedImages, setFailedImages] = useState({});

  // Suspend rotation when browser tab is hidden; resume when visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Preload next image to ensure prompt, smooth transition
  useEffect(() => {
    if (totalSlides <= 1) return;
    const nextIndex = (currentIndex + 1) % totalSlides;
    const nextSlide = slideList[nextIndex];
    if (nextSlide?.src) {
      const img = new Image();
      img.src = nextSlide.src;
    }
  }, [currentIndex, slideList, totalSlides]);

  // Preload all slides once mounted in background
  useEffect(() => {
    slideList.forEach((slide) => {
      if (slide?.src) {
        const img = new Image();
        img.src = slide.src;
      }
    });
  }, [slideList]);

  // Fully automatic rotation: advance every 2 seconds unless tab is hidden or reduced motion is active
  useEffect(() => {
    if (reduceMotion || isTabHidden || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 2000);

    return () => clearInterval(timer);
  }, [reduceMotion, isTabHidden, totalSlides]);

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const currentSlide = slideList[currentIndex] || slideList[0];
  const isCurrentFailed = failedImages[currentSlide.id];
  const displaySrc = isCurrentFailed
    ? slideList[0]?.src || '/Hero_artist/Utkarsh Saxena.png'
    : currentSlide.src;

  return (
    <div className="w-full max-w-[540px] flex flex-col items-center select-none pointer-events-none">
      {/* Fixed-aspect frame for image crossfade */}
      <div className="relative w-full aspect-[4/3.3] xs:aspect-[4/3.2] sm:aspect-[4/3.1] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.14)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        {/* Overlapping crossfading slides */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide.id}
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
              src={displaySrc}
              alt={
                currentSlide.alt ||
                (currentSlide.name
                  ? `${currentSlide.name} performing on stage`
                  : 'Featured artist performance')
              }
              className="w-full h-full object-cover select-none pointer-events-none"
              style={{ objectPosition: currentSlide.objectPosition || 'center center' }}
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
              decoding="async"
              onError={() => handleImageError(currentSlide.id)}
            />

            {/* Dark gradient for caption legibility */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Slide caption: Artist name and role */}
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
        </AnimatePresence>
      </div>

      {/* Visual-only Slide Indicators: 6 Dots with active pill */}
      <div
        className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-3.5"
        aria-hidden="true"
      >
        {slideList.map((slide, index) => {
          const isActive = currentIndex === index;
          return (
            <span
              key={slide.id}
              className={[
                'h-2 rounded-full transition-all duration-300',
                isActive
                  ? 'w-6 bg-accent-500 dark:bg-accent-400 shadow-sm'
                  : 'w-2 bg-slate-300 dark:bg-ink-700',
              ].join(' ')}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ArtistCarousel;
