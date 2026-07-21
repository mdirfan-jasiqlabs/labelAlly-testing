/**
 * Shared motion system — barrel exports.
 *
 * Usage (future page migrations):
 *   import { MotionSection, MotionItem, MotionStagger } from '../motion';
 *   import { itemReveal, MOTION_VIEWPORT } from '../motion';
 */

export { default as MotionSection } from './MotionSection';
export { default as MotionItem } from './MotionItem';
export { default as MotionStagger } from './MotionStagger';

export {
  MOTION_EASE,
  MOTION_DURATION,
  MOTION_VIEWPORT,
  MOTION_STAGGER,
  MOTION_DELAY_CHILDREN,
  sectionReveal,
  sectionRevealReduced,
  itemReveal,
  itemRevealReduced,
  scaleReveal,
  scaleRevealReduced,
  staggerContainer,
  staggerContainerReduced,
  createStaggerContainer,
  pickVariants,
  getMotionSet,
} from './motionVariants';
