import servicesData from '../../../data/services.json';
import { MotionItem, MotionStagger } from '../../motion';

/**
 * ProcessTimeline — Vertical timeline with 5 numbered steps.
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

      <MotionStagger as="ol" className="flex flex-col gap-6 md:gap-8" stagger={0.08}>
        {enabledSteps.map((step, index) => (
          <MotionItem
            key={step.id}
            as="li"
            className="flex gap-4 md:gap-6 items-start"
          >
            <div className="shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-brand-pink dark:bg-brand-pink/90 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                  {step.number}
                </span>
              </div>
            </div>

            {index < enabledSteps.length - 1 && (
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-px h-16 md:h-20 bg-theme-border dark:bg-theme-border/50 mt-2" />
              </div>
            )}

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
  );
}

export default ProcessTimeline;
