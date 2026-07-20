import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Music, Mic2 } from 'lucide-react';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';
import { homeArtistsStyles as styles } from '../../../config/homeArtistsStyles';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';

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

// Self-contained high-fidelity SVGs for social platforms
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const SpotifyIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.982-.336.076-.67-.135-.746-.472-.076-.336.135-.67.472-.746 3.856-.88 7.15-.502 9.822 1.135.295.18.387.565.206.86zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.183-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.666-1.112 8.247-.57 11.34 1.33.367.227.487.708.261 1.075zm.106-2.833C14.383 8.8 8.44 8.603 5.004 9.645c-.53.16-1.09-.14-1.25-.67-.16-.53.14-1.09.67-1.25 3.963-1.202 10.523-.973 14.593 1.444.477.283.633.9.35 1.377-.283.478-.9.633-1.377.35z"/>
  </svg>
);

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

  const artists = featuredArtists?.artists || [];

  // Seamless Circular Infinite Loop cloned items setup
  // We clone 3 cards at the start (preclones) and 3 cards at the end (postclones)
  const preClones = artists.slice(-3);
  const postClones = artists.slice(0, 3);
  const displayArtists = [...preClones, ...artists, ...postClones];

  // Initialize scrolltrack positions mapping to original index 0 (actual node index 3)
  useEffect(() => {
    if (!featuredArtists) return;
    if (scrollRef.current) {
      const children = scrollRef.current.childNodes;
      const initialCard = children[3];
      if (initialCard) {
        scrollRef.current.scrollLeft = initialCard.offsetLeft;
      }
    }
  }, [featuredArtists]);

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
        if (targetActualIndex < 3) {
          finalIndex = targetActualIndex + artists.length;
        } else if (targetActualIndex >= artists.length + 3) {
          finalIndex = targetActualIndex - artists.length;
        }

        if (finalIndex !== targetActualIndex) {
          const originalCard = children[finalIndex];
          if (originalCard) {
            silentReset(originalCard.offsetLeft);
          }
        }

        setActiveIndex(finalIndex - 3);
      });
    }
  };

  // Autoplay Logic - advance right on configurable interval (snappy 450ms smooth transition)
  useEffect(() => {
    if (!featuredArtists) return;
    const shouldPlay =
      isIntersecting &&
      isTabVisible &&
      !prefersReducedMotion &&
      !isHovered &&
      !isFocused &&
      !isAnimatingRef.current;

    if (!shouldPlay) return;

    const interval = setInterval(() => {
      const targetActualIndex = activeIndex + 3 + 1;
      if (scrollToIndexRef.current) {
        scrollToIndexRef.current(targetActualIndex, 450);
      }
    }, featuredArtists.autoplaySpeed || 2000);

    return () => clearInterval(interval);
  }, [isIntersecting, isTabVisible, prefersReducedMotion, isHovered, isFocused, activeIndex, featuredArtists]);

  if (!featuredArtists) return null;

  const { badge, title, description } = featuredArtists;

  // Update active index and logical index in real-time as user manual scrolls
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const children = scrollRef.current.childNodes;

    // Calculate real-time closest active index
    let closestIndex = 3;
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
    let logicalIndex = closestIndex - 3;
    if (logicalIndex < 0) {
      logicalIndex = artists.length + logicalIndex;
    } else if (logicalIndex >= artists.length) {
      logicalIndex = logicalIndex - artists.length;
    }

    setActiveIndex(logicalIndex);

    // Setup debounce check to silently snap cloned positions once scroll stops
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollRef.current || isAnimatingRef.current) return;

      const currentScrollLeft = scrollRef.current.scrollLeft;
      let finalClosest = 3;
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
      if (finalClosest < 3) {
        // Left preclone -> equivalent original node index
        const originalIndex = finalClosest + artists.length;
        const originalCard = children[originalIndex];
        if (originalCard) {
          silentReset(originalCard.offsetLeft);
        }
      } else if (finalClosest >= artists.length + 3) {
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
    if (isAnimatingRef.current) return;
    const targetIndex = activeIndex + 3 - 1;
    if (scrollToIndexRef.current) {
      scrollToIndexRef.current(targetIndex, 450);
    }
  };

  const handleNext = () => {
    if (isAnimatingRef.current) return;
    const targetIndex = activeIndex + 3 + 1;
    if (scrollToIndexRef.current) {
      scrollToIndexRef.current(targetIndex, 450);
    }
  };

  // Click dot indicator
  const handleDotClick = (logicalIndex) => {
    if (isAnimatingRef.current) return;
    if (scrollToIndexRef.current) {
      scrollToIndexRef.current(logicalIndex + 3, 450);
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

      <Container size="xl" className="relative z-10 flex flex-col items-center">

        <motion.div
          className={styles.header}
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
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={0}
            aria-label="Featured artists slider"
            className={styles.scrollTrack}
            style={{ scrollbarWidth: 'none', touchAction: 'pan-x' }}
          >
            {displayArtists.map((artist, index) => {
              const socials = artist.socials || {};
              const isClone = index < 3 || index >= artists.length + 3;

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
                  transition={isClone ? undefined : { delay: (index - 3) * 0.08 }}
                >
                  <div className={styles.card}>

                    {artist.featured && (
                      <div className={styles.featuredBadge}>
                        <Star size={8} className="fill-current" />
                        <span>Featured</span>
                      </div>
                    )}

                    <div className={styles.imageWrap}>
                      <img
                        src={artist.image}
                        alt={`${artist.name} - ${artist.role}`}
                        loading="lazy"
                        decoding="async"
                        width="340"
                        height="255"
                        className={[styles.image, artist.imageClass || ''].filter(Boolean).join(' ')}
                      />
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.artistName}>{artist.name}</h3>
                      <p className={styles.artistRole}>{artist.role}</p>

                      <div className={styles.accentLine} aria-hidden="true" />

                      <div className="flex gap-4.5">
                        <a
                          href={socials.instagram || '#'}
                          target={isClone ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          tabIndex={isClone ? -1 : 0}
                          aria-label={`Visit ${artist.name}'s Instagram`}
                          className={[
                            styles.socialLink,
                            'hover:text-brand-pink focus:text-brand-pink',
                            socials.instagram ? '' : 'opacity-30 cursor-not-allowed pointer-events-none',
                          ].join(' ')}
                        >
                          <InstagramIcon className="w-5.5 h-5.5" />
                        </a>

                        <a
                          href={socials.youtube || '#'}
                          target={isClone ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          tabIndex={isClone ? -1 : 0}
                          aria-label={`Visit ${artist.name}'s YouTube channel`}
                          className={[
                            styles.socialLink,
                            'hover:text-red-600 focus:text-red-600',
                            socials.youtube ? '' : 'opacity-30 cursor-not-allowed pointer-events-none',
                          ].join(' ')}
                        >
                          <YoutubeIcon className="w-5.5 h-5.5" />
                        </a>

                        <a
                          href={socials.spotify || '#'}
                          target={isClone ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          tabIndex={isClone ? -1 : 0}
                          aria-label={`Listen to ${artist.name} on Spotify`}
                          className={[
                            styles.socialLink,
                            'hover:text-emerald-500 focus:text-emerald-500',
                            socials.spotify ? '' : 'opacity-30 cursor-not-allowed pointer-events-none',
                          ].join(' ')}
                        >
                          <SpotifyIcon className="w-5.5 h-5.5" />
                        </a>
                      </div>
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
          className={styles.dotsWrap}
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
