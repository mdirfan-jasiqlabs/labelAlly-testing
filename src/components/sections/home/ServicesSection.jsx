import { useState, useEffect, useRef } from 'react';
import Container from '../../common/Container';
import servicesData from '../../../data/servicesSection.json';

/**
 * ServicesSection — Displays dynamic, JSON-driven LabelAlly services.
 * Implements a premium, light-theme layout matching the reference UI.
 */
function ServicesSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

  // Return null if configuration is missing or disabled
  if (!servicesData || !servicesData.enabled) return null;

  const { badge, heading, description, services } = servicesData;
  const enabledServices = services ? services.filter((s) => s.enabled) : [];

  if (enabledServices.length === 0) return null;

  // Intersection Observer for scroll entrance animations
  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-section-heading"
      className="relative section-spacing bg-surface-page border-t border-neutral-100 dark:border-theme-border/50 overflow-hidden"
    >
      {/* ── Subtle Dotted Background (aria-hidden) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 dark:opacity-30 pointer-events-none z-0"
      />

      <Container size="xl" className="relative z-10">
        {/* ── Responsive 3-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-16 lg:gap-x-16 lg:gap-y-20 items-start">
          
          {/* Slot 1: Section Introduction Block */}
          <div
            className={`flex flex-col text-center items-center md:text-left md:items-start transition-all duration-700 ease-out ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            {badge && (
              <span className="inline-flex items-center px-4 py-1.5 rounded-sm text-xs font-bold text-white bg-brand-pink mb-5 uppercase tracking-wider select-none">
                {badge}
              </span>
            )}

            {/* Heading */}
            {heading && (
              <h2
                id="services-section-heading"
                className="font-heading text-2xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15] font-extrabold text-ink-primary mt-2 tracking-tight"
              >
                {heading}
              </h2>
            )}

            {/* Small Brand Divider */}
            <div
              className={`flex items-center gap-1.5 w-20 h-1 mt-6 mb-7 transition-all duration-700 ease-out delay-200 ${
                isIntersecting ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transformOrigin: 'left' }}
              aria-hidden="true"
            >
              <span className="flex-1 h-full bg-brand-green rounded-full" />
              <span className="flex-1 h-full bg-brand-pink rounded-full" />
              <span className="flex-1 h-full bg-brand-orange rounded-full" />
              <span className="flex-1 h-full bg-brand-blue rounded-full" />
            </div>

            {/* Description */}
            {description && (
              <p className="text-[0.95rem] text-ink-secondary leading-relaxed max-w-sm">
                {description}
              </p>
            )}
          </div>

          {/* Slots 2-6: Dynamic Service Cards */}
          {enabledServices.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col items-center text-center p-4 transition-all duration-700 ease-out group ${
                isIntersecting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Service Icon Container with subtle lift/scale hover animation */}
              {service.icon && (
                <div className="w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center mb-6 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-105 select-none">
                  <img
                    src={service.icon}
                    alt={service.alt || service.title}
                    loading="lazy"
                    decoding="async"
                    width="88"
                    height="88"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Service Title */}
              <h3 className="font-heading text-lg sm:text-xl font-bold text-ink-primary leading-snug">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-sm text-ink-secondary leading-relaxed mt-3 max-w-xs">
                {service.description}
              </p>
            </div>
          ))}

        </div>
      </Container>
    </section>
  );
}

export default ServicesSection;
