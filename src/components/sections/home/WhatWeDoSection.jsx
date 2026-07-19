import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';

function WhatWeDoSection() {
  const { whatWeDo } = homeData;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

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

  if (!whatWeDo) return null;

  const { badge, title, description, primaryButton, features, images } = whatWeDo;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="what-we-do-heading"
      className="relative w-full overflow-hidden bg-gradient-to-b from-neutral-50/70 to-neutral-100/45 dark:bg-theme-section dark:from-transparent dark:to-transparent py-20 md:py-28 lg:py-32 border-t border-neutral-100 dark:border-theme-border/50"
    >
      {/* ── Soft Background Glows ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-100px] right-[-100px] w-[550px] h-[550px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(230,220,255,0.4) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-80px] left-[-80px] w-[450px] h-[450px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(220,240,255,0.3) 0%, transparent 70%)' }}
      />

      {/* ── Background Dotted Pattern (Left Decor) ────────────────── */}
      <svg
        className="absolute top-20 left-6 w-20 h-20 text-neutral-200/50 opacity-40 pointer-events-none hidden md:block"
        fill="currentColor"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <pattern id="what-we-do-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#what-we-do-dots)" />
      </svg>

      {/* ── Background Dotted Pattern (Right Decor) ────────────────── */}
      <svg
        className="absolute bottom-20 right-6 w-20 h-20 text-neutral-200/50 opacity-40 pointer-events-none hidden md:block"
        fill="currentColor"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <rect width="100" height="100" fill="url(#what-we-do-dots)" />
      </svg>

      <Container size="2xl" className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* ── Left Column — Content (50% width) ────────────────── */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left z-10">
            
            {/* Section Badge (Solid pink background, white text, rounded-lg) */}
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 mb-6 uppercase tracking-wider select-none transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {badge}
            </span>

            {/* Heading */}
            <h2
              id="what-we-do-heading"
              className={`font-heading font-black tracking-tight leading-[1.12] text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[3.8rem] text-neutral-900 dark:text-theme-heading mb-4 transition-all duration-700 ease-out delay-100 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="block">{title.line1}</span>
              <span className="block mt-1 text-ink-primary">{title.line2}</span>
            </h2>

            {/* Brand Divider */}
            <div
              className={`flex items-center gap-1.5 w-20 h-1 mb-7 transition-all duration-700 ease-out delay-200 ${
                isIntersecting ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transformOrigin: 'left' }}
              aria-hidden="true"
            >
              <span className="flex-1 h-full bg-brand-pink rounded-full" />
              <span className="flex-1 h-full bg-brand-orange rounded-full" />
              <span className="flex-1 h-full bg-brand-green rounded-full" />
              <span className="flex-1 h-full bg-brand-blue rounded-full" />
            </div>

            {/* Description */}
            <p
              className={`text-sm sm:text-[0.92rem] sm:text-base leading-relaxed text-neutral-600 dark:text-theme-body mb-8 max-w-full sm:max-w-[540px] transition-all duration-700 ease-out delay-200 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {description}
            </p>

            {/* Service Highlights (2-column layout with pink line bullet prefix) */}
            {features?.length > 0 && (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-10 w-full transition-all duration-700 ease-out delay-300 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-2.5">
                    {/* Pink accent horizontal line bullet */}
                    <span className="w-3.5 h-[2px] bg-brand-pink shrink-0 rounded-full" />
                    <span className="text-[13px] sm:text-[14px] font-bold text-neutral-800 dark:text-theme-heading tracking-wide select-none">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA button */}
            {primaryButton && (
              <div
                className={`transition-all duration-700 ease-out delay-400 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <Link
                  to={primaryButton.href}
                  aria-label={primaryButton.ariaLabel}
                  className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-pink-600 hover:bg-pink-700 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-600/50"
                >
                  {primaryButton.label}
                </Link>
              </div>
            )}
          </div>

          {/* ── Right Column — Staggered Masonry Images (50% width) ────────────────── */}
          <div
            className={`w-full lg:w-[48%] flex gap-4 sm:gap-6 items-start overflow-visible z-10 transition-all duration-1000 ease-out delay-200 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            
            {/* Left Column of Masonry (Shorter top, Taller bottom) */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-6 pt-6 lg:pt-8">
              {/* Top-Left Image: Shorter Height */}
              <div className="overflow-hidden rounded-3xl shadow-sm border border-neutral-200/40 dark:border-theme-border/40 w-full h-[120px] sm:h-[200px] lg:h-[270px] bg-neutral-100 dark:bg-theme-card">
                <img
                  src={images.topLeft.src}
                  alt={images.topLeft.alt}
                  width="280"
                  height="270"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Bottom-Left Image: Taller Height */}
              <div className="overflow-hidden rounded-3xl shadow-sm border border-neutral-200/40 dark:border-theme-border/40 w-full h-[160px] sm:h-[260px] lg:h-[350px] bg-neutral-100 dark:bg-theme-card">
                <img
                  src={images.bottomLeft.src}
                  alt={images.bottomLeft.alt}
                  width="280"
                  height="350"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column of Masonry (Taller top, Shorter bottom) */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-6">
              {/* Top-Right Image: Taller Height */}
              <div className="overflow-hidden rounded-3xl shadow-sm border border-neutral-200/40 dark:border-theme-border/40 w-full h-[160px] sm:h-[260px] lg:h-[350px] bg-neutral-100 dark:bg-theme-card">
                <img
                  src={images.topRight.src}
                  alt={images.topRight.alt}
                  width="280"
                  height="350"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Bottom-Right Image: Shorter Height */}
              <div className="overflow-hidden rounded-3xl shadow-sm border border-neutral-200/40 dark:border-theme-border/40 w-full h-[120px] sm:h-[200px] lg:h-[270px] bg-neutral-100 dark:bg-theme-card">
                <img
                  src={images.bottomRight.src}
                  alt={images.bottomRight.alt}
                  width="280"
                  height="270"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default WhatWeDoSection;
