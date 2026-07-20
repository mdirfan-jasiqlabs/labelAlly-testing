import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Container from '../../common/Container';
import testimonialsData from '../../../data/testimonialsSection.json';
import {
  homeTestimonialsStyles as styles,
  TESTIMONIAL_ORGANIC_RADIUS,
  TESTIMONIAL_EQ_BARS,
} from '../../../config/homeTestimonialsStyles';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';

function TestimonialsSectionBackground() {
  const { background: bg } = styles;

  return (
    <div className={bg.layer} aria-hidden="true">
      <div className={bg.orb} />
      <div className={bg.orbAccent} />
      <div className={bg.vinylArc} />
      <div className={bg.flowLine} />

      {styles.nodePositions.map((position, index) => (
        <span
          key={`testimonial-node-${index}`}
          className={[bg.node, position].join(' ')}
          style={{ animationDelay: `${index * 0.55}s` }}
        />
      ))}
    </div>
  );
}

/**
 * TestimonialsSection — Premium testimonial carousel with organic portrait frame.
 */
function TestimonialsSection() {
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const enabledTestimonials = testimonialsData?.testimonials
    ? testimonialsData.testimonials.filter((t) => t.enabled)
    : [];
  const isEnabled = Boolean(testimonialsData?.enabled && enabledTestimonials.length > 0);
  const autoplaySpeed = testimonialsData?.autoplaySpeed || 4000;

  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;
  const lineVariants = reduceMotion ? motionConfig.lineReduced : motionConfig.line;

  const handleNext = useCallback(() => {
    if (isTransitioning || enabledTestimonials.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % enabledTestimonials.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, enabledTestimonials.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || enabledTestimonials.length === 0) return;
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

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isEnabled || reduceMotion || isHovered || isFocused || !isTabVisible) return;

    const timer = setInterval(handleNext, autoplaySpeed);
    return () => clearInterval(timer);
  }, [handleNext, isEnabled, reduceMotion, isHovered, isFocused, isTabVisible, autoplaySpeed]);

  if (!isEnabled) return null;

  const { badge, heading } = testimonialsData;
  const currentSlide = enabledTestimonials[activeIndex];

  return (
    <section
      aria-labelledby="testimonials-section-heading"
      aria-roledescription="carousel"
      className={styles.section}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <TestimonialsSectionBackground />

      <Container size="xl" className="relative z-10 flex flex-col items-center">
        <motion.div
          className={styles.header}
          variants={motionConfig.container}
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
        >
          {badge ? (
            <motion.span className={styles.badge} variants={itemVariants}>
              {badge}
            </motion.span>
          ) : null}

          {heading ? (
            <motion.h2
              id="testimonials-section-heading"
              className={styles.heading}
              variants={itemVariants}
            >
              {heading}
            </motion.h2>
          ) : null}

          <motion.div
            className={styles.brandDivider}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            aria-hidden="true"
          >
            <span className="flex-1 h-full bg-brand-green rounded-full" />
            <span className="flex-1 h-full bg-brand-pink rounded-full" />
            <span className="flex-1 h-full bg-brand-orange rounded-full" />
            <span className="flex-1 h-full bg-brand-blue rounded-full" />
          </motion.div>
        </motion.div>

        <div className={styles.carouselWrap}>
          <div className={styles.carouselGrid}>

            {/* Left: Organic portrait frame */}
            <div className={styles.portraitCol}>
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <div className={[styles.pulseRing, styles.pulseRingOne].join(' ')} />
                <div className={[styles.pulseRing, styles.pulseRingTwo, 'delay-300'].join(' ')} />
                <div className={[styles.pulseRing, styles.pulseRingThree, 'delay-700'].join(' ')} />
              </div>

              <div aria-hidden="true" className={styles.eqRow}>
                {TESTIMONIAL_EQ_BARS.map((bar, index) => (
                  <span
                    key={`eq-${index}`}
                    className={[styles.eqBar, bar.color, bar.height, bar.animation].join(' ')}
                    style={{ animationDelay: bar.delay }}
                  />
                ))}
              </div>

              <span className={[styles.floatNote, styles.floatNoteTop].join(' ')} aria-hidden="true">♪</span>
              <span className={[styles.floatNote, styles.floatNoteBottom].join(' ')} aria-hidden="true">♫</span>

              <div
                className={[
                  styles.portraitFrame,
                  'group',
                  isTransitioning ? styles.portraitFrameTransitionActive : styles.portraitFrameTransition,
                ].join(' ')}
              >
                <div
                  className={styles.portraitBorder}
                  style={{ borderRadius: TESTIMONIAL_ORGANIC_RADIUS }}
                />
                <div
                  className={styles.portraitInner}
                  style={{ borderRadius: TESTIMONIAL_ORGANIC_RADIUS }}
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.alt || currentSlide.name}
                    width="320"
                    height="320"
                    loading="lazy"
                    decoding="async"
                    className={styles.portraitImage}
                  />
                </div>
              </div>
            </div>

            {/* Right: Quote and controls */}
            <div className={styles.contentCol}>
              <div
                className={[
                  styles.slideContent,
                  'group',
                  isTransitioning ? styles.slideContentTransitioning : styles.slideContentActive,
                ].join(' ')}
                aria-live="polite"
              >
                <div className={styles.quoteIcon} aria-hidden="true">
                  <Quote size={54} fill="currentColor" strokeWidth={1} />
                </div>

                <blockquote className={styles.blockquote} cite={`#testimonial-${currentSlide.id}`}>
                  &ldquo;{currentSlide.quote}&rdquo;
                </blockquote>

                <span className={styles.nameBadge} id={`testimonial-${currentSlide.id}`}>
                  {currentSlide.name}
                </span>

                <cite className={styles.role}>{currentSlide.role}</cite>
              </div>

              <motion.div
                className={styles.controlsRow}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={motionConfig.viewport}
              >
                <div className={styles.navGroup}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial slide"
                    className={styles.navButton}
                  >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial slide"
                    className={styles.navButton}
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                </div>

                <div className={styles.dotsGroup} role="tablist" aria-label="Testimonial slides">
                  {enabledTestimonials.map((item, idx) => {
                    const isActive = idx === activeIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Go to testimonial slide ${idx + 1}`}
                        aria-selected={isActive}
                        className={[styles.dot, isActive ? styles.dotActive : styles.dotIdle].join(' ')}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
