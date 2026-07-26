import servicesData from '../../../data/services.json';
import { MotionItem, MotionStagger } from '../../motion';

/**
 * ProcessTimeline — Vertical timeline with 5 numbered steps.
 *
 * Connector is a single absolutely positioned spine centered on the number
 * circles (left-6/7/8 = circle radius at each breakpoint). top/bottom insets
 * equal half the circle size so the line runs from the first circle center
 * to the last — no overflow, scales with any step count.
 */
function ProcessTimeline() {
  const { process } = servicesData;

  if (!process?.heading || !process?.steps) return null;

  const { heading, steps } = process;
  const enabledSteps = steps.filter((step) => step.enabled);

  return (
    <div className="flex flex-col">
      <MotionItem standalone className="mb-10 md:mb-12">
        {heading.badge && (
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-brand-pink mb-4 md:mb-5 shadow-sm select-none">
            {heading.badge}
          </span>
        )}

        <h2
          id="process-heading"
          className="font-heading font-black tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-5xl text-ink-primary dark:text-theme-heading mb-5 md:mb-6"
        >
          {heading.title}
        </h2>

        <div
          aria-hidden="true"
          className="h-1 w-20 bg-gradient-to-r from-brand-pink via-brand-orange to-brand-green rounded-full"
        />
      </MotionItem>

      <div className="relative">
        {/* Spine: centered behind circles, first center → last center */}
        {enabledSteps.length > 1 ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-6 bottom-6 w-px -translate-x-1/2 bg-theme-border dark:bg-theme-border/50 sm:left-7 sm:top-7 sm:bottom-7 md:left-8 md:top-8 md:bottom-8"
          />
        ) : null}

        <MotionStagger as="ol" className="relative flex flex-col gap-6 md:gap-8" stagger={0.08}>
          {enabledSteps.map((step) => (
            <MotionItem
              key={step.id}
              as="li"
              className="relative z-10 flex gap-4 md:gap-6 items-start"
            >
              <div className="relative z-10 shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-brand-pink dark:bg-brand-pink/90 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                    {step.number}
                  </span>
                </div>
              </div>

              <div className="flex-1 pt-1 min-w-0">
                <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-ink-primary dark:text-theme-heading leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-ink-secondary dark:text-theme-body">
                  {step.description}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </div>
  );
}

export default ProcessTimeline;
