import Container from '../common/Container';
import { aboutIntroData } from '../../data/aboutData';

/**
 * AboutPageBanner — Centered header banner for the About page.
 * Uses a soft semantic background and minimal abstract decorative shapes.
 */
function AboutPageBanner() {
  const { pageBanner } = aboutIntroData;

  if (!pageBanner || !pageBanner.enabled) return null;

  return (
    <section
      role="banner"
      className="relative w-full overflow-hidden bg-gradient-to-b from-surface-muted/50 to-surface-page dark:from-theme-section/30 dark:to-theme-page section-spacing-hero border-b border-theme-border dark:border-theme-border/30"
    >
      {/* ── Background Decorative Abstract Shapes (Hidden on small viewports) ── */}

      {/* Left side: Rotate-45 green/teal capsule */}
      <div
        aria-hidden="true"
        className="absolute left-[8%] top-[35%] w-5 h-14 bg-teal-500/20 dark:bg-teal-500/10 rounded-full transform -rotate-45 hidden lg:block pointer-events-none select-none"
      />

      {/* Left side: Zig-zag shape (SVG) */}
      <div
        aria-hidden="true"
        className="absolute left-[3%] top-[25%] w-6 h-6 text-amber-500/30 dark:text-amber-500/15 hidden lg:block pointer-events-none select-none"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <polyline points="3 17 9 11 15 17 21 11" />
        </svg>
      </div>

      {/* Left side: Small dotted cluster */}
      <div
        aria-hidden="true"
        className="absolute left-[2%] top-[55%] w-14 h-14 opacity-[0.25] dark:opacity-[0.12] hidden lg:block pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
          backgroundSize: '8px 8px',
        }}
      />

      {/* Left side: Soft peach triangle */}
      <div
        aria-hidden="true"
        className="absolute left-[15%] top-[65%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-pink-500/20 dark:border-b-pink-500/10 transform rotate-12 hidden lg:block pointer-events-none select-none"
      />

      {/* Right side: Orange/amber capsule */}
      <div
        aria-hidden="true"
        className="absolute right-[12%] top-[20%] w-14 h-5 bg-amber-500/25 dark:bg-amber-500/10 rounded-full transform rotate-[25deg] hidden lg:block pointer-events-none select-none"
      />

      {/* Right side: Wireframe triangle */}
      <div
        aria-hidden="true"
        className="absolute right-[4%] top-[18%] w-10 h-10 border-[2.5px] border-pink-500/20 dark:border-pink-500/10 rounded-sm transform rotate-45 hidden lg:block pointer-events-none select-none"
      />

      {/* Right side: Small teal triangle (rotated) */}
      <div
        aria-hidden="true"
        className="absolute right-[10%] top-[60%] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-teal-500/25 dark:border-b-teal-500/10 transform -rotate-45 hidden lg:block pointer-events-none select-none"
      />

      {/* ── Banner Content ── */}
      <Container className="relative z-10 flex flex-col items-center">
        <h1
          id="about-page-title"
          className="font-heading font-black tracking-tight text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-ink-primary dark:text-theme-heading text-center leading-tight sm:leading-none text-balance px-2"
        >
          {pageBanner.title}
        </h1>

        {/* Small multicolor underline matching reference */}
        <div
          aria-hidden="true"
          className="h-1 w-20 bg-gradient-to-r from-amber-400 via-pink-500 to-teal-400 rounded-full mt-5 md:mt-6"
        />
      </Container>
    </section>
  );
}

export default AboutPageBanner;
