import { useState, useEffect, useRef } from 'react';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';

/**
 * AboutSection — Redesigned Homepage About Section.
 *
 * Layout:
 * - Desktop: Left Side (40%) Content, Right Side (60%) Carousel Slider showing 2 cards.
 * - Bottom: Full-width floating statistics card container (4 columns).
 * - Background: Dotted grid accents, soft pink radial glow, clean bottom wave.
 *
 * Carousel Features:
 * - Displays 2 cards at a time on desktop, 1 card on mobile.
 * - Auto-slides every 2 seconds with smooth scroll transitions.
 * - Allows manual swiping / scrolling by user natively.
 * - Decoupled content from home.json.
 */

// ── Custom Illustration SVGs — Matched with reference ─────────────────

function CreatorCentricIcon() {
  return (
    <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none">
      {/* Background Pastel Blob */}
      <circle cx="50" cy="50" r="32" fill="#E8F4FF" opacity="0.9" />
      {/* Monitor frame */}
      <rect x="28" y="24" width="44" height="32" rx="4" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <path d="M42 56L38 66H62L58 56" stroke="#11143E" strokeWidth="2.5" strokeLinejoin="round" fill="white" />
      <line x1="34" y1="66" x2="66" y2="66" stroke="#11143E" strokeWidth="2.5" strokeLinecap="round" />
      {/* Screen layout */}
      <rect x="34" y="30" width="12" height="18" rx="1" stroke="#11143E" strokeWidth="2" fill="#3B82F6" />
      <line x1="50" y1="30" x2="62" y2="30" stroke="#11143E" strokeWidth="2" />
      <line x1="50" y1="36" x2="58" y2="36" stroke="#11143E" strokeWidth="2" />
      {/* Gear settings overlay */}
      <circle cx="64" cy="46" r="8" stroke="#11143E" strokeWidth="2" fill="#EF4444" />
      <path d="M64 42V50M60 46H68" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function TransparentGrowthIcon() {
  return (
    <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none">
      {/* Background Pastel Blob */}
      <circle cx="50" cy="50" r="32" fill="#FFEFEA" opacity="0.9" />
      {/* Clipboard Frame */}
      <rect x="36" y="24" width="30" height="38" rx="4" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <path d="M44 24V22C44 20.8954 44.8954 20 46 20H56C57.1046 20 58 20.8954 58 22V24" stroke="#11143E" strokeWidth="2.5" />
      {/* Chart lines */}
      <line x1="42" y1="34" x2="60" y2="34" stroke="#11143E" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="40" x2="52" y2="40" stroke="#11143E" strokeWidth="2" strokeLinecap="round" />
      {/* Mini Pie Chart inside */}
      <circle cx="56" cy="46" r="6" stroke="#11143E" strokeWidth="2" fill="#06B6D4" />
      <path d="M56 40A6 6 0 0 1 62 46H56V40Z" fill="#F59E0B" />
      {/* Check/Task boxes */}
      <rect x="42" y="48" width="6" height="6" rx="1.5" stroke="#11143E" strokeWidth="2" fill="#3B82F6" />
      <line x1="52" y1="51" x2="60" y2="51" stroke="#11143E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GlobalReachIcon() {
  return (
    <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none">
      {/* Background Pastel Blob */}
      <circle cx="50" cy="50" r="32" fill="#FFEBF0" opacity="0.9" />
      {/* Soundwaves / Network lines */}
      <circle cx="50" cy="50" r="24" stroke="#7B8092" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Megaphone body */}
      <path d="M34 46H40L48 52V38L40 44H34C32.8954 44 32 44.8954 32 46V50C32 51.1046 32.8954 52 34 52Z" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <path d="M48 42L56 36V54L48 48" stroke="#11143E" strokeWidth="2.5" fill="#EF4444" />
      {/* Network Nodes */}
      <circle cx="64" cy="34" r="5" stroke="#11143E" strokeWidth="2" fill="#3B82F6" />
      <circle cx="68" cy="50" r="4" stroke="#11143E" strokeWidth="2" fill="#10B981" />
      <circle cx="56" cy="62" r="5" stroke="#11143E" strokeWidth="2" fill="#F59E0B" />
      {/* Connecting lines */}
      <line x1="56" y1="39" x2="61" y2="36" stroke="#11143E" strokeWidth="1.5" />
      <line x1="56" y1="51" x2="64" y2="50" stroke="#11143E" strokeWidth="1.5" />
    </svg>
  );
}

function ProjectDoneIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none">
      {/* Character Hat */}
      <path d="M28 50H52V62H28V50Z" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <path d="M25 50H55L52 44H28L25 50Z" stroke="#11143E" strokeWidth="2.5" fill="#F59E0B" />
      {/* Face & body */}
      <circle cx="40" cy="56" r="6" stroke="#11143E" strokeWidth="2.5" fill="#FFE2D1" />
      {/* Lightbulb */}
      <path d="M40 18C35.58 18 32 21.58 32 26C32 28.78 33.42 31.22 35.58 32.7L36 38H44L44.42 32.7C46.58 31.22 48 28.78 48 26C48 21.58 44.42 18 40 18Z" stroke="#11143E" strokeWidth="2.5" fill="#F59E0B" />
      <line x1="40" y1="38" x2="40" y2="44" stroke="#11143E" strokeWidth="2.5" />
      {/* Glowing rays */}
      <line x1="40" y1="12" x2="40" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="20" x2="30" y2="22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="20" x2="50" y2="22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SatisfyClientIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none">
      {/* Mountain shape */}
      <path d="M22 62L40 26L58 62H22Z" stroke="#11143E" strokeWidth="2.5" fill="white" />
      {/* Little figure */}
      <circle cx="40" cy="20" r="4" stroke="#11143E" strokeWidth="2" fill="#FFE2D1" />
      <path d="M37 24H43L45 36H35L37 24Z" stroke="#11143E" strokeWidth="2" fill="#3B82F6" />
      {/* Flag */}
      <path d="M45 16H53L51 22L53 28H45V16Z" stroke="#11143E" strokeWidth="2" fill="#EF4444" />
      {/* Sparkles */}
      <circle cx="28" cy="24" r="1.5" fill="#F59E0B" />
      <circle cx="56" cy="30" r="1.5" fill="#F59E0B" />
    </svg>
  );
}

function AwardsIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none">
      {/* Podium */}
      <rect x="22" y="48" width="12" height="14" stroke="#11143E" strokeWidth="2.5" fill="#7B8092" />
      <rect x="34" y="38" width="12" height="24" stroke="#11143E" strokeWidth="2.5" fill="#3B82F6" />
      <rect x="46" y="44" width="12" height="18" stroke="#11143E" strokeWidth="2.5" fill="#7B8092" />
      {/* Trophy cup */}
      <path d="M34 22H46V28C46 31.3137 43.3137 34 40 34C36.6863 34 34 31.3137 34 28V22Z" stroke="#11143E" strokeWidth="2.5" fill="#F59E0B" />
      <path d="M38 34V38H42V34" stroke="#11143E" strokeWidth="2.5" />
      {/* Sparkles */}
      <path d="M30 18L32 20L30 22L28 20L30 18Z" fill="#F59E0B" />
      <path d="M50 18L52 20L50 22L48 20L50 18Z" fill="#F59E0B" />
    </svg>
  );
}

function HappyClientIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none">
      {/* Person Left */}
      <circle cx="32" cy="36" r="5" stroke="#11143E" strokeWidth="2.5" fill="#FFE2D1" />
      <path d="M26 48C26 43.5817 29.5817 40 34 40H35C36.1046 40 37 40.8954 37 42V52H26V48Z" stroke="#11143E" strokeWidth="2.5" fill="#10B981" />
      {/* Person Right */}
      <circle cx="48" cy="36" r="5" stroke="#11143E" strokeWidth="2.5" fill="#FFE2D1" />
      <path d="M43 42C43 40.8954 43.8954 40 45 40H46C50.4183 40 54 43.5817 54 48V52H43V42Z" stroke="#11143E" strokeWidth="2.5" fill="#3B82F6" />
      {/* Cheering arms */}
      <path d="M28 38L32 30" stroke="#11143E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 38L48 30" stroke="#11143E" strokeWidth="2.5" strokeLinecap="round" />
      {/* Success Star */}
      <path d="M40 20L41.5 23L44.5 23.5L42.2 25.5L43 28.5L40 26.8L37 28.5L37.8 25.5L35.5 23.5L38.5 23L40 20Z" fill="#F59E0B" />
    </svg>
  );
}

// ── Icon Maps ────────────────────────────────────────────────────────

const CARD_ICONS = {
  CreatorCentric:    CreatorCentricIcon,
  TransparentGrowth: TransparentGrowthIcon,
  GlobalReach:       GlobalReachIcon,
};

const STATS_ICONS = {
  ProjectDone:  ProjectDoneIcon,
  SatisfyClient: SatisfyClientIcon,
  Awards:        AwardsIcon,
  HappyClient:   HappyClientIcon,
};

function AboutSection() {
  const { about } = homeData;
  const scrollContainerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // ── Auto-Slide Carousel Logic (Every 2 Seconds) ─────────────────────
  useEffect(() => {
    if (!about.features || about.features.length === 0) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const isMobile = window.innerWidth < 768;
      const totalItems = about.features.length;

      // Card width calculations based on visible count
      const visibleCount = isMobile ? 1 : 2;
      const maxStep = totalItems - visibleCount;

      setActiveStep((prevStep) => {
        const nextStep = prevStep >= maxStep ? 0 : prevStep + 1;
        
        // Compute correct scroll offset
        const cardWidth = container.scrollWidth / totalItems;
        container.scrollTo({
          left: nextStep * cardWidth,
          behavior: 'smooth',
        });

        return nextStep;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [about.features]);

  // ── Manual Scroll Detection ─────────────────────────────────────────
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || !about.features) return;

    const totalItems = about.features.length;
    const cardWidth = container.scrollWidth / totalItems;
    const computedIndex = Math.round(container.scrollLeft / cardWidth);
    
    const isMobile = window.innerWidth < 768;
    const visibleCount = isMobile ? 1 : 2;
    const maxStep = totalItems - visibleCount;

    if (computedIndex >= 0 && computedIndex <= maxStep) {
      setActiveStep(computedIndex);
    }
  };

  // Click handler for indicators
  const handleDotClick = (stepIndex) => {
    const container = scrollContainerRef.current;
    if (!container || !about.features) return;

    const totalItems = about.features.length;
    const cardWidth = container.scrollWidth / totalItems;

    container.scrollTo({
      left: stepIndex * cardWidth,
      behavior: 'smooth',
    });
    setActiveStep(stepIndex);
  };

  return (
    <section
      role="region"
      aria-labelledby="about-heading"
      className="relative w-full bg-white py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* ── Background decoration radial glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full opacity-[0.25]"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)' }}
      />

      {/* ── Background decoration dots ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-[15%] w-48 h-48 opacity-[0.20]"
        style={{
          backgroundImage: 'radial-gradient(#ec4899 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      <Container size="2xl" className="relative z-10">

        {/* ═══════════════════════════════════════════════════════
            TOP ROW — Content (Left) & Carousel (Right)
        ═══════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* ── Left Column (40%) ── */}
          <div className="w-full lg:w-[40%] flex flex-col items-start text-left shrink-0">
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 mb-6">
              {about.badge}
            </span>

            {/* Heading */}
            <h2
              id="about-heading"
              className="font-heading font-black tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl text-neutral-900"
            >
              {about.heading}
            </h2>

            {/* Gradient Divider Line */}
            <div
              aria-hidden="true"
              className="h-1 w-24 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full mt-4 mb-8"
            />

            {/* Checklist items */}
            {about.checklist?.length > 0 && (
              <ul className="flex flex-col gap-4">
                {about.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3.5 text-[0.95rem] font-medium text-neutral-600">
                    {/* Pink checkmark */}
                    <span className="shrink-0 flex items-center justify-center text-pink-600" aria-hidden="true">
                      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 7 6 11 16 1" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ── Right Column (60%) — Slider Carousel ── */}
          {about.features?.length > 0 && (
            <div className="w-full lg:w-[60%] flex flex-col gap-4 relative overflow-hidden">
              
              {/* Horizontal Scrollable container */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide w-full py-4 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {about.features.map((card) => {
                  const IconComponent = CARD_ICONS[card.icon];
                  return (
                    <div
                      key={card.id}
                      className={[
                        'flex flex-col items-center text-center',
                        'p-8 rounded-[1.75rem] border border-neutral-100/70',
                        'bg-white shadow-[0_12px_36px_rgba(25,24,70,0.03)]',
                        'transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(25,24,70,0.06)]',
                        'snap-start shrink-0',
                        'w-full md:w-[calc(50%-12px)] h-[360px]', // 1 card on mobile, 2 cards on desktop
                      ].join(' ')}
                    >
                      {/* Illustrated Icon */}
                      {IconComponent && (
                        <div className="mb-4">
                          <IconComponent />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-heading font-black text-lg text-neutral-900 leading-snug">
                        {card.title}
                      </h3>

                      {/* Gradient Divider Line */}
                      <div
                        aria-hidden="true"
                        className="h-0.5 w-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full mt-3 mb-4"
                      />

                      {/* Description */}
                      <p className="text-[0.85rem] sm:text-[0.9rem] leading-relaxed text-neutral-500 max-w-[240px]">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Indicator Dot Controls */}
              <div className="flex items-center justify-center gap-2 mt-2">
                {Array.from({ length: about.features.length - 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={[
                      'w-2 h-2 rounded-full transition-all duration-300',
                      activeStep === idx ? 'bg-pink-600 w-5' : 'bg-neutral-200 hover:bg-neutral-300',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ═══════════════════════════════════════════════════════
            BOTTOM STATS CONTAINER
        ═══════════════════════════════════════════════════════ */}
        {about.stats?.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div
              className={[
                'rounded-3xl border border-neutral-100/70 bg-white',
                'shadow-[0_16px_50px_rgba(25,24,70,0.04)]',
                'px-8 py-8 md:py-10',
              ].join(' ')}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 items-center justify-center">
                {about.stats.map((stat, idx) => {
                  const StatIcon = STATS_ICONS[stat.icon];
                  return (
                    <div
                      key={stat.id}
                      className={[
                        'flex flex-col items-center justify-center text-center',
                        // Vertical divider on desktop, skip for last item
                        idx < 3 ? 'lg:border-r lg:border-neutral-200/50' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {/* Stat Icon */}
                      {StatIcon && (
                        <div className="mb-2.5">
                          <StatIcon />
                        </div>
                      )}

                      {/* Number */}
                      <p className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 leading-none mb-2">
                        {stat.value}
                      </p>

                      {/* Label */}
                      <p className="text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-pink-600">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </Container>

      {/* ── Bottom Wave Decoration ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-10 w-full pointer-events-none select-none overflow-hidden"
      >
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <path d="M0 40H1440V12C1280 28 1120 28 960 12C800 -4 640 -4 480 12C320 28 160 28 0 12V40Z" fill="#F7F7FC" />
        </svg>
      </div>
    </section>
  );
}

export default AboutSection;
