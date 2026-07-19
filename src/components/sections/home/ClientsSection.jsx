import { useState, useEffect, useRef } from 'react';
import Container from '../../common/Container';
import clientsData from '../../../data/clientsSection.json';

/**
 * ClientsSection — Displays a premium light-theme clients logo grid.
 * Sourced fully from src/data/clientsSection.json.
 */
function ClientsSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

  // If section is not configured or disabled, do not render anything
  if (!clientsData || !clientsData.enabled) return null;

  const { badge, heading, grid, logos } = clientsData;
  const enabledLogos = logos ? logos.filter((logo) => logo.enabled) : [];

  if (enabledLogos.length === 0) return null;

  // Intersection Observer for viewport scroll entrance animation
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

  // Dynamically build grid classes from config
  const gridMobileClass = grid?.mobile || 'grid-cols-2';
  const gridTabletClass = grid?.tablet || 'md:grid-cols-2';
  const gridDesktopClass = grid?.desktop || 'lg:grid-cols-4';

  return (
    <section
      ref={sectionRef}
      aria-labelledby="clients-section-title"
      className="relative py-20 md:py-28 lg:py-32 bg-surface-page border-t border-neutral-100 dark:border-theme-border/50 overflow-hidden"
    >
      <Container size="xl" className="relative z-10 flex flex-col items-center">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-12">
          {/* Badge */}
          {badge && (
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-sm text-xs font-bold text-white bg-brand-pink mb-6 uppercase tracking-wider select-none transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {badge}
            </span>
          )}

          {/* Heading */}
          {heading && (
            <h2
              id="clients-section-title"
              className={`font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-ink-primary mt-3 leading-tight tracking-tight text-center transition-all duration-700 ease-out delay-100 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {heading}
            </h2>
          )}

          {/* Brand Divider */}
          <div
            className={`flex items-center gap-1.5 w-20 h-1 mt-7 transition-all duration-700 ease-out delay-200 ${
              isIntersecting ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transformOrigin: 'center' }}
            aria-hidden="true"
          >
            <span className="flex-1 h-full bg-brand-green rounded-full" />
            <span className="flex-1 h-full bg-brand-pink rounded-full" />
            <span className="flex-1 h-full bg-brand-orange rounded-full" />
            <span className="flex-1 h-full bg-brand-blue rounded-full" />
          </div>
        </div>

        {/* ── Responsive Logo Grid ── */}
        <div
          className={`w-full grid ${gridMobileClass} ${gridTabletClass} ${gridDesktopClass} border-t border-l border-neutral-200/70 dark:border-theme-border/50 bg-white dark:bg-theme-card shadow-soft transition-all duration-1000 ease-out delay-300 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {enabledLogos.map((logo) => (
            <div
              key={logo.id}
              className="border-r border-b border-neutral-200/70 dark:border-theme-border/50 bg-white dark:bg-theme-card flex items-center justify-center p-4 md:p-6 aspect-[1.6] md:aspect-[1.5] transition-colors duration-300 hover:bg-neutral-50/30 dark:hover:bg-theme-hover group"
            >
              <img
                src={logo.image}
                alt={logo.alt || logo.name}
                loading="lazy"
                decoding="async"
                className="max-w-[85%] max-h-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ClientsSection;
