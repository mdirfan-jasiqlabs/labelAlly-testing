import { Link } from 'react-router-dom';
import { ArrowRight, Globe, ShieldCheck, BarChart3, Headphones, Music2 } from 'lucide-react';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';
import platformsData from '../../../data/platformsSection.json';

/**
 * HeroSection — Reference-driven homepage hero (v2).
 *
 * Layout: Two-column — left content / right artist image.
 * Platform strip is rendered as part of this section (below the main content).
 *
 * All content sourced from src/data/home.json.
 * No hardcoded strings. No unverified numerical claims.
 */

/** Map icon string keys (from JSON) to Lucide components */
const ICON_MAP = {
  Globe: Globe,
  ShieldCheck: ShieldCheck,
  BarChart3: BarChart3,
  Headphones: Headphones,
};

/**
 * WhatsApp SVG icon — inline, no external library.
 */
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function HeroSection() {
  const { hero } = homeData;

  const enabledPlatforms = platformsData?.platforms
    ? [...platformsData.platforms]
        .filter((p) => p.enabled)
        .sort((a, b) => a.order - b.order)
    : [];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-surface-page"
      style={{ background: 'linear-gradient(180deg, #fbfbfe 0%, #fcfcff 100%)' }}
    >
      {/* ── Background decorative blobs ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-80px] right-[-80px] w-[520px] h-[520px] rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[80px] left-[-60px] w-[360px] h-[360px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }}
      />

      <Container size="2xl" className="relative z-10">

        {/* ═══════════════════════════════════════════════════════
            MAIN HERO — Two column layout
        ═══════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-12 pt-6 md:pt-12 lg:pt-6 pb-0 lg:min-h-[640px] xl:min-h-[700px]">

          {/* ── LEFT COLUMN — Content ─────────────────────────── */}
          <div className="w-full lg:w-[49%] flex flex-col justify-center text-left animate-fade-up py-0 z-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-accent-500" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
              <span className="text-[0.7rem] sm:text-xs font-bold tracking-[0.18em] uppercase text-ink-secondary">
                {hero.badge}
              </span>
            </div>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="font-heading font-black tracking-tight leading-[1.05] text-[1.9rem] xs:text-[2.2rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.2rem] mb-4 sm:mb-6"
            >
              <span className="block text-ink-primary">{hero.heading.lineOne}</span>
              <span className="block">
                <span className="text-ink-primary">{hero.heading.lineTwoPrimary} </span>
                <span className="text-accent-500">{hero.heading.lineTwoAccent}</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-[0.95rem] sm:text-base leading-relaxed text-ink-secondary mb-6 sm:mb-8 max-w-[440px]">
              {hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mb-8 sm:mb-10">
              {/* Primary */}
              <Link
                to={hero.primaryCta.href}
                aria-label={hero.primaryCta.ariaLabel}
                className={[
                  'inline-flex items-center gap-2.5',
                  'h-12 px-7 rounded-xl',
                  'bg-primary-600 hover:bg-primary-700',
                  'text-sm font-bold text-white',
                  'border border-primary-600 hover:border-primary-700',
                  'shadow-hero-soft hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)]',
                  'transition-all duration-200 active:scale-[0.98]',
                  'focus-ring whitespace-nowrap',
                ].join(' ')}
              >
                {hero.primaryCta.label}
                <ArrowRight size={16} aria-hidden="true" strokeWidth={2.5} />
              </Link>

              {/* Secondary — WhatsApp */}
              <a
                href={hero.secondaryCta.href}
                aria-label={hero.secondaryCta.ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'inline-flex items-center gap-2.5',
                  'h-12 px-6 rounded-xl',
                  'bg-white hover:bg-accent-50',
                  'text-sm font-bold text-accent-600 hover:text-accent-700',
                  'border border-accent-400 hover:border-accent-500',
                  'shadow-sm hover:shadow-[0_4px_14px_rgba(245,158,11,0.2)]',
                  'transition-all duration-200 active:scale-[0.98]',
                  'focus-ring whitespace-nowrap',
                ].join(' ')}
              >
                <WhatsAppIcon size={16} />
                {hero.secondaryCta.label}
              </a>
            </div>

            {/* Highlight items — 2×2 grid on mobile, 4-col row on md+ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5">
              {hero.highlights.map((item) => {
                const Icon = ICON_MAP[item.icon] ?? Globe;
                return (
                  <div key={item.id} className="flex flex-col gap-1.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-primary-600" aria-hidden="true" strokeWidth={2} />
                    </div>
                    <p className="text-[0.8rem] font-bold text-ink-primary leading-tight">{item.title}</p>
                    <p className="text-[0.72rem] text-ink-muted leading-tight">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Artist Image ───────────────────── */}
          <div className="relative w-full lg:w-[51%] flex items-end justify-center lg:justify-end self-end h-[260px] sm:h-[380px] md:h-[450px] lg:h-auto z-10">

            {/* Subtle radial indigo glow behind the image */}
            <div
              aria-hidden="true"
              className="absolute top-1/4 right-0 left-0 lg:left-auto w-[85%] h-[85%] lg:w-[110%] lg:h-[110%] rounded-full opacity-40 pointer-events-none z-0"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
            />

            {/* Soft gold glow near the lower-right edge */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full opacity-35 pointer-events-none z-0"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }}
            />

            {/* Artist Image Wrapper & Element (with smooth entrance animation) */}
            <div className="relative w-full h-full flex items-end justify-center lg:justify-end overflow-visible z-10 animate-fade-in">
              <img
                src="/hero-artist.png"
                alt="Independent music artist performing with an electric guitar"
                decoding="async"
                className="block w-auto h-full max-h-[500px] xl:max-h-[540px] object-contain object-bottom select-none pointer-events-none transform lg:-translate-x-12 lg:-translate-y-14 md:-translate-y-8"
                style={{
                  maskImage: 'radial-gradient(ellipse at 50% 50%, black 75%, rgba(0,0,0,0.95) 90%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 75%, rgba(0,0,0,0.95) 90%, transparent 100%)'
                }}
              />
              {/* Bottom fade — blend naturally with the page background */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-surface-page to-transparent z-20"
              />
            </div>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════
            PLATFORM STRIP — inside section, below hero columns
        ═══════════════════════════════════════════════════════ */}
        {platformsData && platformsData.enabled && enabledPlatforms.length > 0 && (
          <div className="mt-8 mb-0">
            <div
              className="rounded-2xl border border-neutral-200/80 bg-white shadow-platform-strip px-6 py-6"
            >
              {/* Heading */}
              <p className="text-center text-sm font-semibold text-ink-primary mb-6 select-none">
                {platformsData.heading}{' '}
                <span className="text-accent-500">{platformsData.highlightText}</span>
              </p>

              {/* Platform logos & Action Button */}
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 md:gap-5 items-center justify-items-center">
                {enabledPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="w-full flex items-center justify-center py-2"
                  >
                    <img
                      src={platform.logo}
                      alt={platform.alt}
                      width={120}
                      height={32}
                      loading="eager"
                      decoding="async"
                      className="h-6 w-auto object-contain filter hover:brightness-105 transition-all duration-200 select-none pointer-events-none"
                    />
                  </div>
                ))}

                {/* Overflow Pill / More platforms Link */}
                {platformsData.moreLabel && (
                  <div className="w-full flex items-center justify-center py-2">
                    <Link
                      to={platformsData.moreHref || '/services'}
                      className="inline-flex items-center justify-center w-full h-8 px-3 rounded-full border border-neutral-200 text-[11px] sm:text-xs font-semibold text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 transition-colors duration-250 whitespace-nowrap text-center focus-ring"
                    >
                      {platformsData.moreLabel}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </Container>

      {/* Bottom spacing */}
      <div className="h-10" aria-hidden="true" />
    </section>
  );
}

export default HeroSection;
