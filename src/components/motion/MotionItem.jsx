import { motion, useReducedMotion } from 'framer-motion';
import {
  itemReveal,
  itemRevealReduced,
  scaleReveal,
  scaleRevealReduced,
  pickVariants,
} from './motionVariants';

/**
 * MotionItem — Reveal for headings, cards, or isolated content groups.
 *
 * Use inside MotionStagger (inherits parent stagger) or standalone with
 * whileInView. Pattern:
 * - `item`  → opacity + y (default)
 * - `scale` → opacity + subtle scale (selected visuals only)
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'item'|'scale'} [props.variant='item']
 * @param {keyof typeof motion} [props.as='div']
 * @param {string} [props.className]
 * @param {boolean} [props.standalone=false] — trigger on viewport when true
 * @param {object} [props.viewport]
 * @param {object} [props.variants] — override built-in pattern
 */
function MotionItem({
  children,
  variant = 'item',
  as = 'div',
  className = '',
  standalone = false,
  viewport,
  variants,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  const full = variant === 'scale' ? scaleReveal : itemReveal;
  const reduced = variant === 'scale' ? scaleRevealReduced : itemRevealReduced;
  const resolved = variants ?? pickVariants(reduceMotion, full, reduced);

  const viewportProps = standalone
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: viewport ?? { once: true, amount: 0.2 },
      }
    : {
        // Parent MotionStagger / MotionSection drives initial + whileInView
        // via variant inheritance when this sits inside a motion parent.
      };

  return (
    <MotionTag className={className} variants={resolved} {...viewportProps} {...rest}>
      {children}
    </MotionTag>
  );
}

export default MotionItem;
