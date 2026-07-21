import { motion, useReducedMotion } from 'framer-motion';
import {
  MOTION_VIEWPORT,
  sectionReveal,
  sectionRevealReduced,
  pickVariants,
} from './motionVariants';

/**
 * MotionSection — Viewport reveal wrapper for major section containers.
 *
 * Animates opacity + y only. Plays once. Respects prefers-reduced-motion.
 * Polymorphic `as` preserves semantic HTML (section, div, article, …).
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {keyof typeof motion} [props.as='div']
 * @param {string} [props.className]
 * @param {object} [props.viewport] — override default viewport
 * @param {object} [props.variants] — override default section variants
 */
function MotionSection({
  children,
  as = 'div',
  className = '',
  viewport = MOTION_VIEWPORT,
  variants,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;
  const resolved = variants ?? pickVariants(reduceMotion, sectionReveal, sectionRevealReduced);

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

export default MotionSection;
