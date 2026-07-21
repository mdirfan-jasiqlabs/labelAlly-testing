import { motion, useReducedMotion } from 'framer-motion';
import {
  MOTION_VIEWPORT,
  MOTION_STAGGER,
  MOTION_DELAY_CHILDREN,
  staggerContainer,
  staggerContainerReduced,
  createStaggerContainer,
} from './motionVariants';

/**
 * MotionStagger — Parent for staggered child reveals (grids, lists, steps).
 *
 * Wrap MotionItem children. When reduced-motion is preferred, stagger and
 * delay are zeroed so children appear together with opacity-only transitions.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {keyof typeof motion} [props.as='div']
 * @param {string} [props.className]
 * @param {number} [props.stagger=0.08] — delay between children (seconds)
 * @param {number} [props.delayChildren=0.05]
 * @param {object} [props.viewport]
 * @param {object} [props.variants] — override container variants
 */
function MotionStagger({
  children,
  as = 'div',
  className = '',
  stagger = MOTION_STAGGER,
  delayChildren = MOTION_DELAY_CHILDREN,
  viewport = MOTION_VIEWPORT,
  variants,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  let resolved = variants;
  if (!resolved) {
    if (reduceMotion) {
      resolved = staggerContainerReduced;
    } else if (stagger === MOTION_STAGGER && delayChildren === MOTION_DELAY_CHILDREN) {
      resolved = staggerContainer;
    } else {
      resolved = createStaggerContainer(stagger, delayChildren);
    }
  }

  return (
    <MotionTag
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default MotionStagger;
