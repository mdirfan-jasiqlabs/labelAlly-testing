import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Music, Mic2 } from 'lucide-react';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';
import artistsCategories from '../../../data/artistsCategories.json';
import { homeArtistsStyles as styles } from '../../../config/homeArtistsStyles';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';
import ArtistsCategoryFilter from './ArtistsCategoryFilter';

const SPECTRUM_BAR_COUNT = 10;

const DOT_PATTERN_LEFT = (
  <svg fill="currentColor" viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <pattern id="dot-pattern-left" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#dot-pattern-left)" />
  </svg>
);

const DOT_PATTERN_RIGHT = (
  <svg fill="currentColor" viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <pattern id="dot-pattern-right" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#dot-pattern-right)" />
  </svg>
);

function ArtistsSectionBackground() {
  const { background: bg } = styles;

  return (
    <div className={bg.layer} aria-hidden="true">
      <div className={bg.glow} />
      <div className={bg.orbPrimary} />
      <div className={bg.orbAccent} />
      <div className={bg.flowLine} />

      <div className={bg.spectrumRow}>
        {Array.from({ length: SPECTRUM_BAR_COUNT }, (_, index) => (
          <span
            key={`artists-spectrum-${index}`}
            className={bg.spectrumBar}
            style={{ animationDelay: `${(index % 7) * 110}ms` }}
          />
        ))}
      </div>

      <div className={[bg.dotGrid, bg.dotGridLeft].join(' ')}>{DOT_PATTERN_LEFT}</div>
      <div className={[bg.dotGrid, bg.dotGridRight].join(' ')}>{DOT_PATTERN_RIGHT}</div>

      <div className={bg.musicNote} style={{ animationDelay: '0s' }}>
        <Music size={42} className="stroke-[1.5]" />
      </div>
      <div className={bg.microphone} style={{ animationDelay: '1.8s' }}>
        <Mic2 size={42} className="stroke-[1.5]" />
      </div>
    </div>
  );
}

// Easing function for custom smooth animation scroll transition
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

// Programmatic scroll animation helper (snappy 450ms transition)
const animateScroll = (element, targetScrollLeft, duration, callback) => {
  const originalSnapType = element.style.scrollSnapType || 'x mandatory';
  
  // Disable snap type temporarily to prevent browser snap fighting
  element.style.scrollSnapType = 'none';

  const start = element.scrollLeft;
  const change = targetScrollLeft - start;
  const startTime = performance.now();

  const animate = (currentTime) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    element.scrollLeft = start + change * ease;

    if (timeElapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      element.style.scrollSnapType = originalSnapType;
      if (callback) callback();
    }
  };

  requestAnimationFrame(animate);
};

/**
 * ArtistsSection — Displays a premium carousel of Featured Artists.
 * Driven fully by home.json content.
 */
function ArtistsSection() {
  const { featuredArtists } = homeData;
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(
    featuredArtists?.defaultCategory || artistsCategories[0]?.id || 'bhojpuri'
  );

  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;
  const lineVariants = reduceMotion ? motionConfig.lineReduced : motionConfig.line;
  const cardVariants = reduceMotion ? motionConfig.cardReduced : motionConfig.card;
  
  // User Autoplay controls state
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const artists = useMemo(() => {
    const source = featuredArtists?.artists || [];
    return source.filter((artist) => artist.categoryId === activeCategoryId);
  }, [featuredArtists, activeCategoryId]);

  const useLoop = artists.length >= 3;
  const cloneCount = useLoop ? 3 : 0;

  // Seamless Circular Infinite Loop cloned items setup (only when enough cards)
  const preClones = useLoop ? artists.slice(-cloneCount) : [];
  const postClones = useLoop ? artists.slice(0, cloneCount) : [];
  const displayArtists = [...preClones, ...artists, ...postClones];

  // Initialize / reset scroll when category changes
  useEffect(() => {
    if (!featuredArtists) return;
    setActiveIndex(0);
    isAnimatingRef.current = false;

    requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const children = scrollRef.current.childNodes;
      const initialCard = children[cloneCount];
      if (initialCard) {
        const originalSnapType = scrollRef.current.style.scrollSnapType;
        scrollRef.current.style.scrollSnapType = 'none';
        scrollRef.current.style.scrollBehavior = 'auto';
        scrollRef.current.scrollLeft = initialCard.offsetLeft;
        const _ = scrollRef.current.offsetHeight;
        scrollRef.current.style.scrollSnapType = originalSnapType;
      }
    });
  }, [featuredArtists, activeCategoryId, cloneCount, artists.length]);

  // Intersection Observer for viewport scroll entrance animation and autoplay trigger
  useEffect(() => {
    if (!featuredArtists) return;
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [featuredArtists]);

  // Visibility Change API (pause tab when browser tab is inactive)
  useEffect(() => {
    if (!featuredArtists) return;
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [featuredArtists]);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    if (!featuredArtists) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [featuredArtists]);

  // Scroll to actual index with seamless loop reset callback (declared as Ref to be safely referenced in effects)
  const scrollToIndexRef = useRef(null);
  scrollToIndexRef.current = (targetActualIndex, duration = 450) => {
    if (!scrollRef.current || isAnimatingRef.current) return;
    
    const children = scrollRef.current.childNodes;
    const targetCard = children[targetActualIndex];
    
    if (targetCard) {
      isAnimatingRef.current = true;
      const targetScrollLeft = targetCard.offsetLeft;

      animateScroll(scrollRef.current, targetScrollLeft, duration, () => {
        isAnimatingRef.current = false;
        
        // Loop boundary logical checks
        let finalIndex = targetActualIndex;
        if (useLoop) {
          if (targetActualIndex < cloneCount) {
            finalIndex = targetActualIndex + artists.length;
          } else if (targetActualIndex >= artists.length + cloneCount) {
            finalIndex = targetActualIndex - artists.length;
          }
        }

        if (finalIndex !== targetActualIndex) {
          const originalCard = children[finalIndex];
          if (originalCard) {
            silentReset(originalCard.offsetLeft);
          }
        }

        setActiveIndex(Math.max(0, finalIndex - cloneCount));
      });
    }
  };

  // Autoplay Logic - advance right on configurable interval (snappy 450ms smooth transition)
  useEffect(() => {
    if (!featuredArtists || artists.length <= 1) return;
    const shouldPlay =
      isIntersecting &&
      isTabVisible &&
      !prefersReducedMotion &&
      !isHovered &&
      !isFocused &&
      !isAnimatingRef.current;

    if (!shouldPlay) return;

    const interval = setInterval(() => {
      const targetActualIndex = activeIndex + cloneCount + 1;
      if (scrollToIndexRef.current) {
        scrollToIndexRef.current(targetActualIndex, 450);
      }
    }, featuredArtists.autoplaySpeed || 2000);

    return () => clearInterval(interval);
  }, [isIntersecting, isTabVisible, prefersReducedMotion, isHovered, isFocused, activeIndex, featuredArtists, artists.length, cloneCount]);

  if (!featuredArtists) return null;

  const { badge, title, description } = featuredArtists;

  // Update active index and logical index in real-time as user manual scrolls
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const children = scrollRef.current.childNodes;

    // Calculate real-time closest active index
    let closestIndex = cloneCount;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childOffset = child.offsetLeft;
      const distance = Math.abs(childOffset - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    // Map closest index to active pagination dot index (logical index)
    let logicalIndex = closestIndex - cloneCount;
    if (useLoop) {
      if (logicalIndex < 0) {
        logicalIndex = artists.length + logicalIndex;
      } else if (logicalIndex >= artists.length) {
        logicalIndex = logicalIndex - artists.length;
      }
    } else {
      logicalIndex = Math.min(Math.max(logicalIndex, 0), Math.max(artists.length - 1, 0));
    }

    setActiveIndex(logicalIndex);

    // Setup debounce check to silently snap cloned positions once scroll stops
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (!useLoop) return;

    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollRef.current || isAnimatingRef.current) return;

      const currentScrollLeft = scrollRef.current.scrollLeft;
      let finalClosest = cloneCount;
      let finalMinDist = Infinity;

      children.forEach((child, index) => {
        const childOffset = child.offsetLeft;
        const dist = Math.abs(childOffset - currentScrollLeft);
        if (dist < finalMinDist) {
          finalMinDist = dist;
          finalClosest = index;
        }
      });

      // Silently snap to original equivalent position if user settles on clones
      if (finalClosest < cloneCount) {
        // Left preclone -> equivalent original node index
        const originalIndex = finalClosest + artists.length;
        const originalCard = children[originalIndex];
        if (originalCard) {
          silentReset(originalCard.offsetLeft);
        }
      } else if (finalClosest >= artists.length + cloneCount) {
        // Right postclone -> equivalent original node index
        const originalIndex = finalClosest - artists.length;
        const originalCard = children[originalIndex];
        if (originalCard) {
          silentReset(originalCard.offsetLeft);
        }
      }
    }, 150);
  };

  // Perform scroll position silent reset
  const silentReset = (targetOffsetLeft) => {
    if (!scrollRef.current) return;
    const originalSnapType = scrollRef.current.style.scrollSnapType;
    scrollRef.current.style.scrollSnapType = 'none';
    scrollRef.current.style.scrollBehavior = 'auto';
    scrollRef.current.scrollLeft = targetOffsetLeft;
    
    // Force DOM reflow to apply scroll position instantly without layout shift
    const _ = scrollRef.current.offsetHeight;
    scrollRef.current.style.scrollSnapType = originalSnapType;
  };

  // Click arrow navigation debounced/locked (snappy 450ms transition)
  const handlePrev = () => {
    if (isAnimatingRef.current || artists.length <= 1) return;
    const targetIndex = activeIndex + cloneCount - 1;
    if (scrollToIndexRef.current) {
      scrollToIndexRef.current(targetIndex, 450);
    }
  };

  const handleNext = () => {
    if (isAnimatingRef.current || artists.length <= 1) return;
    const targetIndex = activeIndex + cloneCount + 1;
    if (scrollToIndexRef.current) {
      scrollToIndexRef.current(targetIndex, 450);
    }
  };

  // Click dot indicator
  const handleDotClick = (logicalIndex) => {
    if (isAnimatingRef.current) return;
    if (scrollToIndexRef.current) {
      scrollToIndexRef.current(logicalIndex + cloneCount, 450);
    }
  };

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="artists-section-title"
      className={styles.section}
    >
      <ArtistsSectionBackground />

      <Container size="xl" className="relative z-10 flex w-full min-w-0 flex-col items-stretch md:items-center">

        <motion.div
          className={`${styles.header} self-center`}
          variants={motionConfig.container}
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
        >
          <motion.span className={styles.badge} variants={itemVariants}>
            {badge}
          </motion.span>

          <motion.h2
            id="artists-section-title"
            className={styles.heading}
            variants={itemVariants}
          >
            {title.lineOne} {title.lineTwo}
          </motion.h2>

          <motion.p className={styles.description} variants={itemVariants}>
            {description}
          </motion.p>

          <motion.div
            className={styles.brandDivider}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            aria-hidden="true"
          >
            <span className="flex-1 h-full bg-brand-pink rounded-full" />
            <span className="flex-1 h-full bg-brand-orange rounded-full" />
            <span className="flex-1 h-full bg-brand-green rounded-full" />
            <span className="flex-1 h-full bg-brand-blue rounded-full" />
          </motion.div>
        </motion.div>

        <ArtistsCategoryFilter
          categories={artistsCategories}
          activeCategoryId={activeCategoryId}
          onChange={setActiveCategoryId}
        />

        <div
          className={styles.carouselWrap}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          
          <button
            onClick={handlePrev}
            aria-label="View previous artist"
            className={[styles.navButton, styles.navButtonLeft].join(' ')}
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>

          <div
            ref={scrollRef}
            id="featured-artists-slider"
            role="tabpanel"
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={0}
            aria-label="Featured artists slider"
            className={styles.scrollTrack}
            style={{ scrollbarWidth: 'none' }}
          >
            {displayArtists.map((artist, index) => {
              const isClone = useLoop && (index < cloneCount || index >= artists.length + cloneCount);

              return (
                <motion.div
                  key={`${artist.id}-clone-${index}`}
                  aria-hidden={isClone ? 'true' : 'false'}
                  tabIndex={isClone ? -1 : 0}
                  className={styles.slide}
                  variants={isClone ? undefined : cardVariants}
                  initial={isClone ? false : 'hidden'}
                  whileInView={isClone ? undefined : 'visible'}
                  viewport={motionConfig.viewport}
                  transition={isClone ? undefined : { delay: Math.max(0, index - cloneCount) * 0.08 }}
                >
                  <div className={styles.card}>
                    <div className={styles.imageWrap}>
                      <img
                        src={artist.image}
                        alt={`${artist.name} - ${artist.role}`}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="300"
                        className={[styles.image, artist.imageClass || ''].filter(Boolean).join(' ')}
                        style={{
                          objectPosition: artist.imagePosition || 'center center',
                        }}
                      />
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.artistName}>{artist.name}</h3>
                      <div className={styles.accentLine} aria-hidden="true" />
                      <p className={styles.artistRole}>{artist.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            aria-label="View next artist"
            className={[styles.navButton, styles.navButtonRight].join(' ')}
          >
            <ChevronRight size={20} className="stroke-[2.5]" />
          </button>
        </div>

        <motion.div
          className={`${styles.dotsWrap} self-center`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
        >
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              className={[
                styles.dot,
                activeIndex === index ? styles.dotActive : styles.dotIdle,
              ].join(' ')}
            />
          ))}
        </motion.div>

      </Container>
    </section>
  );
}

export default ArtistsSection;
