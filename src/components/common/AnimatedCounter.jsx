import { useCountUp } from '../../hooks/useCountUp';

/**
 * AnimatedCounter — Renders a number that counts up from 0 to its target
 * when `start` becomes true. Preserves any non-numeric prefix/suffix
 * (e.g. "150+"), and renders the integer with no separators to match source.
 *
 * Non-numeric values are rendered as-is. When `reduceMotion` is true the
 * final value is shown immediately with no animation.
 *
 * @param {object}  props
 * @param {string|number} props.value          Target value (e.g. "2304" or "150+").
 * @param {boolean} [props.start=false]        Begin counting when true.
 * @param {number}  [props.duration=2000]      Animation duration in ms.
 * @param {boolean} [props.reduceMotion=false] Skip animation, show final value.
 * @param {string}  [props.className]
 */
function AnimatedCounter({ value, start = false, duration = 2000, reduceMotion = false, className }) {
  const raw = String(value ?? '');
  const match = raw.match(/^(\D*)([\d,]+)(\D*)$/);
  const numericTarget = match ? Number(match[2].replace(/,/g, '')) : NaN;
  const isNumeric = Number.isFinite(numericTarget);

  const counted = useCountUp({
    target: isNumeric ? numericTarget : 0,
    start: Boolean(start) && !reduceMotion && isNumeric,
    duration,
  });

  if (!isNumeric) {
    return <span className={className}>{raw}</span>;
  }

  const current = reduceMotion ? numericTarget : counted;

  return (
    <span className={className}>
      {match[1]}
      {current}
      {match[3]}
    </span>
  );
}

export default AnimatedCounter;
