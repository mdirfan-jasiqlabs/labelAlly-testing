import servicesData from '../../../data/services.json';

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
      {/* Heading Group */}
      <div className="mb-10 md:mb-12">
        {/* Badge */}
        {heading.badge && (
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-brand-pink mb-4 md:mb-5 shadow-sm select-none">
            {heading.badge}
          </span>
        )}

        {/* Heading */}
        <h2
          id="process-heading"
          className="font-heading font-black tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-5xl text-neutral-900 dark:text-theme-heading mb-5 md:mb-6"
        >
          {heading.title}
        </h2>

        {/* Decorative Underline */}
        <div
          aria-hidden="true"
          className="h-1 w-20 bg-gradient-to-r from-brand-pink via-brand-orange to-brand-green rounded-full"
        />
      </div>

      {/* Timeline Steps */}
      <ol className="flex flex-col gap-6 md:gap-8">
        {enabledSteps.map((step, index) => (
          <li
            key={step.id}
            className="flex gap-4 md:gap-6 items-start"
          >
            {/* Number Circle */}
            <div className="shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-brand-pink dark:bg-brand-pink/90 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                  {step.number}
                </span>
              </div>
            </div>

            {/* Connector Line (not for last item) */}
            {index < enabledSteps.length - 1 && (
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-px h-16 md:h-20 bg-neutral-300 dark:bg-theme-border/50 mt-2" />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 pt-1 min-w-0">
              <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-neutral-900 dark:text-theme-heading leading-snug mb-2">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-theme-body">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ProcessTimeline;
