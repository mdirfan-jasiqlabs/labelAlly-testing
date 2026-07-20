/** Shared Framer Motion presets for the homepage Hero (entrance + hover). */
export const homeHeroMotion = {
  stagger: 0.09,
  duration: 0.58,
  ease: [0.22, 1, 0.36, 1],

  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.04,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
    },
  },

  itemReduced: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  },

  imageStage: {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
    },
  },

  imageStageReduced: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  },

  platformReveal: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  },

  platformRevealReduced: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } },
  },
};
