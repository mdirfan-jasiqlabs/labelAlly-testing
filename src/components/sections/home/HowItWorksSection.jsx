import Container from '../../common/Container';
import homeData from '../../../data/home.json';

/**
 * HowItWorksSection — Homepage process steps section matching reference direction.
 *
 * Layout:
 * - Two-column split layout: Left side organic rounded team photo, Right side 3 process steps.
 * - Spacing and sizing match the approved reference exactly.
 * - Dynamic data driven via home.json.
 */
function HowItWorksSection() {
  const { process } = homeData;

  if (!process?.steps?.length) return null;

  return (
    <section
      role="region"
      aria-labelledby="process-heading"
      className="relative w-full bg-white py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* ── Background curved / radial lavender shape (right) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full opacity-[0.20] z-0"
        style={{ background: 'radial-gradient(circle, rgba(139,120,255,0.15) 0%, transparent 70%)' }}
      />

      <Container size="2xl" className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-center justify-between">

          {/* ── Left Column — Asymmetrical Organic Image (46%) ── */}
          <div className="w-full lg:w-[46%] flex flex-col items-center justify-center relative shrink-0">
            {/* Dotted grid backdrop decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 -top-6 w-40 h-40 opacity-[0.22] z-0"
              style={{
                backgroundImage: 'radial-gradient(#ec4899 1.5px, transparent 1.5px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Organic blob image wrapper */}
            <div
              className="relative w-full aspect-[4/5] max-w-[320px] sm:max-w-[380px] lg:max-w-none overflow-hidden z-10"
              style={{
                clipPath: 'url(#blob-clip)',
                WebkitClipPath: 'url(#blob-clip)',
                filter: 'drop-shadow(0 20px 40px rgba(31, 35, 90, 0.08))',
              }}
            >
              <img
                src={process.image.src}
                alt={process.image.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none select-none"
              />
            </div>
          </div>

          {/* ── Right Column — Steps (54%) ── */}
          <div className="w-full lg:w-[54%] flex flex-col items-start text-left">
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 mb-6">
              {process.badge}
            </span>

            {/* Title / Heading */}
            <h2
              id="process-heading"
              className="font-heading font-black tracking-tight leading-[1.1] text-2xl sm:text-4xl md:text-5xl text-neutral-900"
            >
              <span className="block">{process.title.lineOne}</span>
              <span className="block text-primary-900">{process.title.lineTwo}</span>
            </h2>

            {/* Small Brand Divider */}
            <div
              aria-hidden="true"
              className="h-1 w-20 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full mt-4 mb-10"
            />

            {/* Steps Timeline (Ordered List) */}
            <ol className="w-full flex flex-col gap-8 md:gap-10">
              {process.steps.map((step, idx) => {
                const isLast = idx === process.steps.length - 1;
                return (
                  <li key={step.number} className="relative flex items-start gap-5 group">
                    {/* Vertical Connector Line (behind circles, centering aligned) */}
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="absolute left-5 top-10 bottom-[-40px] w-[2px] bg-neutral-200 pointer-events-none"
                      />
                    )}

                    {/* Step circle */}
                    <div
                      aria-hidden="true"
                      className={[
                        'flex items-center justify-center shrink-0',
                        'w-10 h-10 rounded-full',
                        'bg-pink-600 text-white font-heading font-extrabold text-sm',
                        'shadow-[0_8px_20px_rgba(219,39,119,0.22)]',
                        'transition-all duration-300 group-hover:scale-105',
                        'z-10',
                      ].join(' ')}
                    >
                      {step.number}
                    </div>

                    {/* Step Copy */}
                    <div className="flex flex-col gap-1.5 pt-1 max-w-xl">
                      <h3 className="font-heading font-black text-lg text-neutral-900 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[0.88rem] sm:text-[0.92rem] leading-relaxed text-neutral-500">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

        </div>
      </Container>

      {/* ── Custom Clip Path for Organic Blob Shape ── */}
      <svg width="0" height="0" className="absolute pointer-events-none select-none" aria-hidden="true">
        <defs>
          <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.2,0.18 C0.5,-0.05 0.8,0.1 0.8,0.35 C0.8,0.5 0.98,0.55 0.85,0.75 C0.7,0.95 0.3,1 0.18,0.8 C0.05,0.6 -0.05,0.3 0.2,0.18 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}

export default HowItWorksSection;
