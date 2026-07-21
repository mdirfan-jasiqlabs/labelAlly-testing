/**
 * Shared motion presets for LabelAlly Entertainment.
 *
 * Aligned with existing Home page motion (`homeSectionsMotion` / `homeHeroMotion`)
 * so future page migrations feel visually compatible without rewriting Home.
 *
 * Rules:
 * - Animate only opacity + transform (no layout properties)
 * - Viewport: once (no replay on scroll-back)
 * - Reduced motion: no translate/scale/stagger — opacity only, short duration
 */

/** Premium ease used across the Home page */
export const MOTION_EASE = [0.22, 1, 0.36, 1];

/** Default reveal duration (seconds) */
export const MOTION_DURATION = 0.55;

/** Default viewport trigger — matches Home section behavior */
export const MOTION_VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -40px 0px',
};

/** Default stagger between children (seconds) */
export const MOTION_STAGGER = 0.08;

/** Small delay before first staggered child */
export const MOTION_DELAY_CHILDREN = 0.05;

const baseTransition = {
  duration: MOTION_DURATION,
  ease: MOTION_EASE,
};

const reducedTransition = {
  duration: 0.2,
};

// ─── 1. Section Reveal ───────────────────────────────────────────────────────
/** Major section containers: opacity 0→1, y 20→0 */
export const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const sectionRevealReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: reducedTransition,
  },
};

// ─── 2. Item Reveal ──────────────────────────────────────────────────────────
/** Headings, cards, isolated content groups: opacity 0→1, y 16→0 */
export const itemReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: MOTION_EASE },
  },
};

export const itemRevealReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: reducedTransition,
  },
};

// ─── 3. Staggered Children ───────────────────────────────────────────────────
/** Parent container — stagger children on enter */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_STAGGER,
      delayChildren: MOTION_DELAY_CHILDREN,
    },
  },
};

/** Reduced: no stagger / delay — children appear together */
export const staggerContainerReduced = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

/**
 * Build a stagger container with a custom stagger interval.
 * @param {number} [stagger=0.08]
 * @param {number} [delayChildren=0.05]
 */
export function createStaggerContainer(stagger = MOTION_STAGGER, delayChildren = MOTION_DELAY_CHILDREN) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

// ─── 4. Subtle Scale Reveal ──────────────────────────────────────────────────
/** Selected visual cards / illustrations only — do not use everywhere */
export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: MOTION_EASE },
  },
};

export const scaleRevealReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: reducedTransition,
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Pick full or reduced variants based on prefers-reduced-motion.
 * @param {boolean} reduceMotion
 * @param {object} full
 * @param {object} reduced
 */
export function pickVariants(reduceMotion, full, reduced) {
  return reduceMotion ? reduced : full;
}

/**
 * Resolve the four built-in patterns for a given reduce-motion preference.
 * Useful when composing custom wrappers.
 */
export function getMotionSet(reduceMotion) {
  return {
    section: pickVariants(reduceMotion, sectionReveal, sectionRevealReduced),
    item: pickVariants(reduceMotion, itemReveal, itemRevealReduced),
    scale: pickVariants(reduceMotion, scaleReveal, scaleRevealReduced),
    stagger: pickVariants(reduceMotion, staggerContainer, staggerContainerReduced),
    viewport: MOTION_VIEWPORT,
  };
}
