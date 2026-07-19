import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Container from '../../common/Container';
import testimonialsData from '../../../data/testimonialsSection.json';

/**
 * TestimonialsSection — Premium light-theme Testimonial Carousel with organic frame
 * and animated music background.
 */
function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);

  // Return null if disabled or no items
  if (!testimonialsData || !testimonialsData.enabled) return null;

  const { badge, heading, autoplaySpeed, testimonials } = testimonialsData;
  const enabledTestimonials = testimonials ? testimonials.filter((t) => t.enabled) : [];

  if (enabledTestimonials.length === 0) return null;

  // Set up intersection observer for header reveal animations
  useEffect(() => {
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
  }, []);

  // Set up tab visibility listeners to pause autoplay
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Respect reduced motion settings
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Carousel transition handlers
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % enabledTestimonials.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, enabledTestimonials.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + enabledTestimonials.length) % enabledTestimonials.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, enabledTestimonials.length]);

  const handleDotClick = (index) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Autoplay loop timer
  useEffect(() => {
    if (prefersReducedMotion || isHovered || isFocused || !isTabVisible) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoplaySpeed || 4000);

    return () => clearInterval(timer);
  }, [handleNext, isHovered, isFocused, isTabVisible, prefersReducedMotion, autoplaySpeed]);

  const currentSlide = enabledTestimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-section-heading"
      className="relative section-spacing bg-surface-page border-t border-neutral-100 dark:border-theme-border/50 overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* ── Custom CSS Animations Block ── */}
      <style>{`
        @keyframes pulse-ring-slow {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 0.35; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes wave-bounce-slow {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        @keyframes float-note-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(8deg); }
        }
        .animate-pulse-ring-1 {
          animation: pulse-ring-slow 6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
        }
        .animate-pulse-ring-2 {
          animation: pulse-ring-slow 6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
          animation-delay: 2s;
        }
        .animate-pulse-ring-3 {
          animation: pulse-ring-slow 6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
          animation-delay: 4s;
        }
        .animate-wave-bounce {
          animation: wave-bounce-slow 1.6s ease-in-out infinite;
          transform-origin: bottom;
        }
        .animate-float-note {
          animation: float-note-slow 4s ease-in-out infinite;
        }
        .animate-float-note-delayed {
          animation: float-note-slow 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-ring-1, .animate-pulse-ring-2, .animate-pulse-ring-3, .animate-wave-bounce, .animate-float-note, .animate-float-note-delayed {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background shape */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[450px] h-[450px] translate-x-1/4 translate-y-1/4 rounded-full bg-primary-100/30 dark:bg-primary-900/20 blur-3xl z-0"
      />

      <Container size="xl" className="relative z-10 flex flex-col items-center">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-12 md:mb-16">
          {badge && (
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-sm text-xs font-bold text-white bg-brand-pink mb-6 uppercase tracking-wider select-none transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {badge}
            </span>
          )}

          {heading && (
            <h2
              id="testimonials-section-heading"
              className={`font-heading text-2xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15] font-extrabold text-ink-primary mt-3 leading-tight tracking-tight text-center transition-all duration-700 ease-out delay-100 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {heading}
            </h2>
          )}

          {/* Brand Divider */}
          <div
            className={`flex items-center gap-1.5 w-20 h-1 mt-7 transition-all duration-700 ease-out delay-200 ${
              isIntersecting ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transformOrigin: 'center' }}
            aria-hidden="true"
          >
            <span className="flex-1 h-full bg-brand-green rounded-full" />
            <span className="flex-1 h-full bg-brand-pink rounded-full" />
            <span className="flex-1 h-full bg-brand-orange rounded-full" />
            <span className="flex-1 h-full bg-brand-blue rounded-full" />
          </div>
        </div>

        {/* ── Carousel Slider Container ── */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center w-full">
            
            {/* Left Column: Portrait in Organic Frame & Pulsing Soundwaves */}
            <div className="lg:col-span-5 flex justify-center items-center relative h-64 sm:h-80 md:h-96 w-full">
              
              {/* Concentric soundwave pulsing rings */}
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <div className="absolute w-[80%] h-[80%] sm:w-[90%] sm:h-[90%] rounded-full border border-primary-500/15 animate-pulse-ring-1" />
                <div className="absolute w-[95%] h-[95%] sm:w-[105%] sm:h-[105%] rounded-full border border-primary-500/10 animate-pulse-ring-2" />
                <div className="absolute w-[110%] h-[110%] sm:w-[120%] sm:h-[120%] rounded-full border border-primary-500/5 animate-pulse-ring-3" />
              </div>

              {/* Equalizer lines behind image */}
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-[10%] right-[10%] flex items-end justify-center gap-1.5 h-12 opacity-25 z-0 pointer-events-none"
              >
                <span className="w-1 bg-brand-pink rounded-t-full animate-wave-bounce" style={{ animationDelay: '0.1s', height: '40%' }} />
                <span className="w-1 bg-brand-orange rounded-t-full animate-wave-bounce" style={{ animationDelay: '0.3s', height: '70%' }} />
                <span className="w-1 bg-brand-green rounded-t-full animate-wave-bounce" style={{ animationDelay: '0.5s', height: '100%' }} />
                <span className="w-1 bg-brand-blue rounded-t-full animate-wave-bounce" style={{ animationDelay: '0.2s', height: '60%' }} />
                <span className="w-1 bg-brand-pink rounded-t-full animate-wave-bounce" style={{ animationDelay: '0.4s', height: '80%' }} />
                <span className="w-1 bg-brand-orange rounded-t-full animate-wave-bounce" style={{ animationDelay: '0.6s', height: '50%' }} />
                <span className="w-1 bg-brand-green rounded-t-full animate-wave-bounce" style={{ animationDelay: '0.7s', height: '90%' }} />
                <span className="w-1 bg-brand-blue rounded-t-full animate-wave-bounce" style={{ animationDelay: '0.3s', height: '40%' }} />
              </div>

              {/* Floating music note symbols */}
              <div aria-hidden="true" className="absolute top-[10%] left-[8%] text-brand-pink/20 text-3xl font-bold select-none pointer-events-none animate-float-note">
                ♪
              </div>
              <div aria-hidden="true" className="absolute bottom-[20%] right-[5%] text-brand-blue/20 text-2xl font-bold select-none pointer-events-none animate-float-note-delayed">
                ♫
              </div>

              {/* Organic fluid frame with gradient border */}
              <div 
                className={`relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center z-10 transition-all duration-300 transform ${
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                {/* Outermost gradient background layer that forms the border */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-brand-pink via-brand-orange to-brand-green" 
                  style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                />
                {/* Inner mask holding the image */}
                <div 
                  className="absolute inset-[6px] bg-white dark:bg-theme-card overflow-hidden" 
                  style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.alt || currentSlide.name}
                    width="320"
                    height="320"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Quote text and controls */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative z-10 min-w-0">
              
              <div
                className={`transition-all duration-300 transform flex flex-col items-center lg:items-start ${
                  isTransitioning ? 'opacity-0 translate-x-6' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* Large outlined Quote Icon */}
                <div className="text-neutral-200/80 dark:text-theme-border/60 mb-5 lg:-ml-1">
                  <Quote size={54} fill="currentColor" strokeWidth={1} />
                </div>

                {/* Hindi Testimonial Quote */}
                <blockquote className="font-heading text-neutral-800 dark:text-theme-heading text-base md:text-[1.18rem] font-medium leading-relaxed italic mb-6 max-w-xl">
                  "{currentSlide.quote}"
                </blockquote>

                {/* Name Badge */}
                <span className="inline-block bg-brand-pink text-white font-bold text-[0.85rem] px-5 py-2 rounded-sm select-none mb-1 tracking-wide shadow-sm">
                  {currentSlide.name}
                </span>

                {/* Profession / Role */}
                <cite className="not-italic text-xs font-bold text-neutral-400 dark:text-theme-muted tracking-wider uppercase">
                  {currentSlide.role}
                </cite>
              </div>

              {/* ── Controls: Arrows & Navigation dots ── */}
              <div className="flex flex-row items-center gap-5 mt-8 w-full justify-between select-none">
                
                {/* Left/Right Arrow Buttons */}
                <div className="flex items-center gap-3 order-2 sm:order-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial slide"
                    className="w-10 h-10 rounded-full border border-neutral-300 dark:border-theme-border hover:border-brand-pink text-neutral-500 dark:text-theme-muted hover:text-brand-pink bg-white dark:bg-theme-card flex items-center justify-center transition-all duration-200 focus-ring hover:shadow-[0_2px_8px_rgba(255,46,116,0.15)] active:scale-95"
                  >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial slide"
                    className="w-10 h-10 rounded-full border border-neutral-300 dark:border-theme-border hover:border-brand-pink text-neutral-500 dark:text-theme-muted hover:text-brand-pink bg-white dark:bg-theme-card flex items-center justify-center transition-all duration-200 focus-ring hover:shadow-[0_2px_8px_rgba(255,46,116,0.15)] active:scale-95"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Pagination Indicator Dots */}
                <div className="flex items-center gap-2 order-1 sm:order-2">
                  {enabledTestimonials.map((_, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Go to testimonial slide ${idx + 1}`}
                        aria-current={isActive ? 'true' : 'false'}
                        className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 focus-ring ${
                          isActive
                            ? 'bg-brand-pink border-brand-pink scale-110 shadow-sm'
                            : 'bg-white dark:bg-theme-card border-neutral-300 dark:border-theme-border hover:border-neutral-400 dark:hover:border-theme-muted hover:bg-neutral-50 dark:hover:bg-theme-hover'
                        }`}
                      />
                    );
                  })}
                </div>

              </div>

            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
