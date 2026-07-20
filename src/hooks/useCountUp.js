import { useEffect, useRef, useState } from 'react';

/** easeOutCubic — fast start, smooth deceleration into the final value. */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * useCountUp — Animate an integer from 0 up to `target` using requestAnimationFrame.
 *
 * - Runs once: after it completes it never restarts (safe on scroll away/return).
 * - Clamps to `target` so it can never overshoot; always ends on the exact value.
 * - Integer-only output (no decimals, no jitter).
 *
 * @param {object}  opts
 * @param {number}  opts.target        Final value to count to.
 * @param {boolean} [opts.start=false] Flip to true to begin the animation.
 * @param {number}  [opts.duration=2000] Duration in ms.
 * @param {(t:number)=>number} [opts.easing] Easing fn mapping progress 0..1 → 0..1.
 * @returns {number} Current integer value.
 */
export function useCountUp({ target, start = false, duration = 2000, easing = easeOutCubic }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return undefined;
    startedRef.current = true;

    const numericTarget = Number(target) || 0;
    let startTime = null;

    const tick = (now) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.min(Math.round(easing(progress) * numericTarget), numericTarget);
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(numericTarget);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration, easing]);

  return value;
}

export default useCountUp;
