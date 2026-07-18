import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Music, Mic2 } from 'lucide-react';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
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

  // Autoplay Logic - har 2 seconds me right advance (snappy 450ms smooth transition)
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
    }, 2000);

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
      className="relative py-20 md:py-28 lg:py-36 bg-surface-page overflow-hidden border-t border-neutral-100"
    >
      {/* ── Soft Background Decorations ── */}
      <div className="absolute inset-0 bg-artistGlow pointer-events-none opacity-80" />

      {/* Dotted Grid Decoration (Left) */}
      <svg
        className="absolute top-16 left-6 w-24 h-24 text-neutral-200/80 opacity-60 pointer-events-none hidden md:block"
        fill="currentColor"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dot-pattern-left" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#dot-pattern-left)" />
      </svg>

      {/* Dotted Grid Decoration (Right) */}
      <svg
        className="absolute top-16 right-6 w-24 h-24 text-neutral-200/80 opacity-60 pointer-events-none hidden md:block"
        fill="currentColor"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dot-pattern-right" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#dot-pattern-right)" />
      </svg>

      {/* Floating Music Note (Left) */}
      <div
        className="absolute top-40 left-[8%] md:left-[12%] lg:left-[15%] text-brand-pink opacity-25 pointer-events-none animate-float hidden md:block"
        aria-hidden="true"
      >
        <Music size={42} className="stroke-[1.5]" />
      </div>

      {/* Floating Microphone (Right) */}
      <div
        className="absolute top-44 right-[8%] md:right-[12%] lg:right-[15%] text-brand-indigo opacity-25 pointer-events-none animate-float hidden md:block"
        style={{ animationDelay: '1.8s' }}
        aria-hidden="true"
      >
        <Mic2 size={42} className="stroke-[1.5]" />
      </div>

      {/* ── Main Layout Container ── */}
      <Container size="xl" className="relative z-10 flex flex-col items-center">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-16">
          {/* Badge styled like other sections (bg-pink-600 white text rounded-lg) */}
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 mb-6 uppercase tracking-wider select-none transition-all duration-700 ease-out ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {badge}
          </span>

          {/* Heading */}
          <h2
            id="artists-section-title"
            className={`font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-primary mt-5 leading-tight tracking-tight transition-all duration-700 ease-out delay-100 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {title.lineOne} {title.lineTwo}
          </h2>

          {/* Supporting Description */}
          <p
            className={`text-sm sm:text-base md:text-lg text-ink-secondary mt-4 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ease-out delay-200 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {description}
          </p>

          {/* Brand Divider */}
          <div
            className={`flex items-center gap-1.5 w-20 h-1 mt-7 transition-all duration-700 ease-out delay-300 ${
              isIntersecting ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transformOrigin: 'center' }}
            aria-hidden="true"
          >
            <span className="flex-1 h-full bg-[#FF2E74] rounded-full" />
            <span className="flex-1 h-full bg-[#FF7E40] rounded-full" />
            <span className="flex-1 h-full bg-[#96E012] rounded-full" />
            <span className="flex-1 h-full bg-[#2B83FC] rounded-full" />
          </div>
        </div>

        {/* ── Carousel Slider Component ── */}
        <div 
          className="relative w-full px-4 md:px-12 mt-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          
          {/* Navigation Arrow Left (Positioned outside with negative absolute coordinates) */}
          <button
            onClick={handlePrev}
            aria-label="View previous artist"
            className="absolute left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-neutral-200/80 shadow-sm hover:shadow-md text-neutral-500 hover:text-brand-pink hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 transition-all duration-200 hidden md:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-pink/30"
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>

          {/* Scroll Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={0}
            aria-label="Featured artists slider"
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-6 px-1 md:px-2 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/30"
            style={{ scrollbarWidth: 'none' }}
          >
            {displayArtists.map((artist, index) => {
              const socials = artist.socials || {};
              const isClone = index < 3 || index >= artists.length + 3;

              return (
                <div
                  key={`${artist.id}-clone-${index}`}
                  aria-hidden={isClone ? 'true' : 'false'}
                  tabIndex={isClone ? -1 : 0}
                  className={`snap-start shrink-0 w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] transition-all duration-700 ease-out ${
                    isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  }`}
                  style={{
                    transitionDelay: isClone ? '0ms' : `${(index - 3) * 120 + 350}ms`,
                  }}
                >
                  {/* Clean premium SaaS product style card without outer padding */}
                  <div className="group relative overflow-hidden bg-white border border-neutral-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                    
                    {/* Featured Artist Badge */}
                    {artist.featured && (
                      <div className="absolute top-4 right-4 z-10 bg-brand-pink text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1 select-none animate-pulse-slow">
                        <Star size={8} className="fill-current" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Image Container (Stretched to top/left/right borders of the card, aspect-[4/3]) */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-neutral-50">
                      <img
                        src={artist.image}
                        alt={`${artist.name} - ${artist.role}`}
                        loading="lazy"
                        decoding="async"
                        width="340"
                        height="255"
                        className={`w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105 ${artist.imageClass || ''}`}
                      />
                    </div>

                    {/* Meta Content (Simple, clean, minimal padding at the bottom) */}
                    <div className="flex-1 flex flex-col items-center text-center p-6 pb-8">
                      <h3 className="font-heading text-base font-bold text-neutral-900 leading-snug">
                        {artist.name}
                      </h3>
                      <p className="text-xs text-neutral-500 font-medium mt-0.5">
                        {artist.role}
                      </p>

                      {/* Small subtle accent divider */}
                      <div className="w-6 h-[2px] bg-brand-pink/30 my-3.5 rounded-full" />

                      {/* Social Actions (Subtle minimal flat icons - slightly enlarged) */}
                      <div className="flex gap-4.5">
                        {/* Instagram */}
                        <a
                          href={socials.instagram || '#'}
                          target={isClone ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          tabIndex={isClone ? -1 : 0}
                          aria-label={`Visit ${artist.name}'s Instagram`}
                          className={`text-neutral-400 hover:text-[#FF2E74] transition-colors focus:outline-none focus:text-[#FF2E74] ${
                            socials.instagram ? '' : 'opacity-30 cursor-not-allowed pointer-events-none'
                          }`}
                        >
                          <InstagramIcon className="w-5.5 h-5.5" />
                        </a>

                        {/* YouTube */}
                        <a
                          href={socials.youtube || '#'}
                          target={isClone ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          tabIndex={isClone ? -1 : 0}
                          aria-label={`Visit ${artist.name}'s YouTube channel`}
                          className={`text-neutral-400 hover:text-[#FF0000] transition-colors focus:outline-none focus:text-[#FF0000] ${
                            socials.youtube ? '' : 'opacity-30 cursor-not-allowed pointer-events-none'
                          }`}
                        >
                          <YoutubeIcon className="w-5.5 h-5.5" />
                        </a>

                        {/* Spotify */}
                        <a
                          href={socials.spotify || '#'}
                          target={isClone ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          tabIndex={isClone ? -1 : 0}
                          aria-label={`Listen to ${artist.name} on Spotify`}
                          className={`text-neutral-400 hover:text-[#1DB954] transition-colors focus:outline-none focus:text-[#1DB954] ${
                            socials.spotify ? '' : 'opacity-30 cursor-not-allowed pointer-events-none'
                          }`}
                        >
                          <SpotifyIcon className="w-5.5 h-5.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrow Right (Positioned outside with negative absolute coordinates) */}
          <button
            onClick={handleNext}
            aria-label="View next artist"
            className="absolute right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-neutral-200/80 shadow-sm hover:shadow-md text-neutral-500 hover:text-brand-pink hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 transition-all duration-200 hidden md:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-pink/30"
          >
            <ChevronRight size={20} className="stroke-[2.5]" />
          </button>
        </div>

        {/* ── Carousel Pagination Dots ── */}
        <div
          className={`flex justify-center gap-2 mt-10 transition-all duration-700 ease-out delay-500 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Show slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 ${
                activeIndex === index
                  ? 'w-6 bg-brand-pink'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}

export default ArtistsSection;
