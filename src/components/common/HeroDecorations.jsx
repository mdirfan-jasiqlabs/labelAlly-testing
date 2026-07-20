/**
 * HeroDecorations — Reusable premium decorative layer for page heroes.
 *
 * A restrained, abstract composition that balances a left-aligned hero:
 *  - a layered gradient mesh / soft glow,
 *  - concentric geometric rings,
 *  - a waveform-inspired bar cluster (music motif),
 *  - a few scattered brand shapes.
 *
 * Purely decorative: aria-hidden, non-interactive, and progressively revealed on
 * larger viewports so it never competes with or overlaps the text column.
 * Pure CSS/SVG — no images, illustrations, or new dependencies.
 */

// Waveform bar heights (music/equalizer motif) — static, no motion.
const WAVE_BARS = ['h-6', 'h-12', 'h-20', 'h-28', 'h-16', 'h-24', 'h-32', 'h-14', 'h-8'];

function HeroDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Layered gradient mesh — right-side balance */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 h-[440px] w-[440px] rounded-full bg-gradient-to-br from-orange-400/15 via-rose-400/10 to-transparent dark:from-orange-500/12 dark:via-rose-500/10 blur-3xl hidden md:block" />
      <div className="absolute right-8 -top-12 h-[260px] w-[260px] rounded-full bg-gradient-to-br from-fuchsia-400/10 via-violet-400/10 to-transparent dark:from-fuchsia-500/10 dark:via-violet-500/10 blur-3xl hidden lg:block" />

      {/* Concentric rings — geometric depth */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="relative h-72 w-72 xl:h-80 xl:w-80">
          <div className="absolute inset-0 rounded-full border border-brand-pink/15 dark:border-brand-pink/12" />
          <div className="absolute inset-8 rounded-full border border-orange-400/20 dark:border-orange-400/12" />
          <div className="absolute inset-16 rounded-full border border-violet-400/20 dark:border-violet-400/12" />
        </div>
      </div>

      {/* Waveform-inspired bars — music motif, centered on the rings */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1.5 opacity-70">
        {WAVE_BARS.map((h, i) => (
          <span
            key={i}
            className={`w-1.5 rounded-full bg-gradient-to-t from-orange-500/40 to-rose-500/25 dark:from-orange-400/30 dark:to-rose-400/18 ${h}`}
          />
        ))}
      </div>

      {/* Zig-zag (top-left) */}
      <div className="absolute left-4 top-10 sm:left-8 sm:top-14 w-6 h-6 text-accent-500/40 dark:text-accent-400/25 hidden md:block">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <polyline points="3 17 9 11 15 17 21 11" />
        </svg>
      </div>

      {/* Small triangle (left-mid) */}
      <div className="absolute left-12 top-1/2 w-3.5 h-3.5 text-brand-pink/35 dark:text-brand-pink/20 rotate-12 hidden lg:block">
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
          <path d="M8 2 L14 14 H2 Z" />
        </svg>
      </div>

      {/* Orange capsule (top-right) */}
      <div className="absolute right-10 top-12 sm:right-16 sm:top-16 w-12 h-4 bg-brand-orange/35 dark:bg-brand-orange/20 rounded-full rotate-45 hidden md:block" />

      {/* Violet dot (right) */}
      <div className="absolute right-24 top-20 w-2.5 h-2.5 rounded-full bg-violet-500/35 dark:bg-violet-400/20 hidden lg:block" />
    </div>
  );
}

export default HeroDecorations;
