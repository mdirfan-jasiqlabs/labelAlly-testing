import { Link } from 'react-router-dom';
import { ArrowRight, Globe, ShieldCheck, BarChart3, Headphones, Music2 } from 'lucide-react';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';

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
  Globe:       Globe,
  ShieldCheck: ShieldCheck,
  BarChart3:   BarChart3,
  Headphones:  Headphones,
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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function HeroSection() {
  const { hero, platformStrip } = homeData;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-surface-page"
      style={{ background: 'linear-gradient(135deg, #f4f3ff 0%, #fcfcff 55%, #fffbeb 100%)' }}
    >
      {/* ── Background decorative blobs ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-80px] right-[-80px] w-[520px] h-[520px] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[80px] left-[-60px] w-[360px] h-[360px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)' }}
      />

      <Container size="2xl" className="relative z-10">

        {/* ═══════════════════════════════════════════════════════
            MAIN HERO — Two column layout
        ═══════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-4 pt-12 pb-0 md:pt-16 lg:pt-20 min-h-[580px] lg:min-h-[700px] xl:min-h-[740px]">

          {/* ── LEFT COLUMN — Content ─────────────────────────── */}
          <div className="flex-1 max-w-[560px] w-full text-left flex flex-col justify-center animate-fade-up py-8 lg:py-12">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-accent-500" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </span>
              <span className="text-[0.7rem] sm:text-xs font-bold tracking-[0.18em] uppercase text-ink-secondary">
                {hero.badge}
              </span>
            </div>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="font-heading font-black tracking-tight leading-[1.05] text-[2.6rem] sm:text-[3.4rem] md:text-[4rem] lg:text-[4.2rem] mb-6"
            >
              <span className="block text-ink-primary">{hero.heading.lineOne}</span>
              <span className="block">
                <span className="text-ink-primary">{hero.heading.lineTwoPrimary} </span>
                <span className="text-accent-500">{hero.heading.lineTwoAccent}</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-[0.95rem] sm:text-base leading-relaxed text-ink-secondary mb-8 max-w-[440px]">
              {hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-10">
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
          <div className="relative flex-shrink-0 w-full lg:w-[48%] xl:w-[46%] flex items-end justify-center lg:justify-end self-end h-full">

            {/* Lavender radial glow behind artist */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 left-0 lg:left-auto w-[90%] h-[90%] lg:w-[120%] lg:h-[120%] rounded-full opacity-60 pointer-events-none z-0"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
            />

            {/* Background 3D isometric illustration */}
            <div
              aria-hidden="true"
              className="absolute w-[85%] h-[85%] lg:w-[100%] lg:h-[100%] opacity-[0.65] pointer-events-none select-none z-0"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img
                src="/hero-illustration.png"
                alt=""
                className="w-full h-full object-contain mix-blend-multiply"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            {/* Concentric rings behind artist (to match approved visual direction) */}
            <div
              aria-hidden="true"
              className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] xl:w-[620px] xl:h-[620px] border border-primary-200/20 rounded-full pointer-events-none z-0"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute w-[460px] h-[460px] sm:w-[580px] sm:h-[580px] lg:w-[660px] lg:h-[660px] xl:w-[760px] xl:h-[760px] border border-primary-100/10 rounded-full pointer-events-none z-0"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Decorative waveform bars behind artist */}
            <div aria-hidden="true" className="absolute right-4 lg:right-0 bottom-[12%] flex items-end gap-[3.5px] opacity-15 pointer-events-none z-0">
              {[40, 65, 90, 55, 110, 75, 45, 95, 60, 80, 50, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full bg-primary-400"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            {/* Decorative music note icon — top right */}
            <div
              aria-hidden="true"
              className="absolute top-4 right-8 lg:top-[15%] lg:right-[5%] w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center pointer-events-none z-20"
            >
              <Music2 size={20} className="text-primary-500" strokeWidth={1.8} />
            </div>

            {/* Artist Image Wrapper & Element (with float animation) */}
            <div className="relative w-[85%] sm:w-[80%] lg:w-full h-[320px] sm:h-[420px] lg:h-[90%] xl:h-[95%] flex items-end justify-center lg:justify-end self-end mt-6 lg:mt-0 overflow-visible z-10 animate-float">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                decoding="async"
                className="w-auto h-full object-contain object-bottom select-none pointer-events-none"
              />
              {/* Bottom fade — blend into platform strip */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-surface-page to-transparent z-20"
              />
            </div>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════
            PLATFORM STRIP — inside section, below hero columns
        ═══════════════════════════════════════════════════════ */}
        {platformStrip?.items?.length > 0 && (
          <div className="mt-8 mb-0">
            <div
              className="rounded-2xl border border-neutral-200/80 bg-white shadow-platform-strip px-6 py-5"
            >
              {/* Heading */}
              <p className="text-center text-sm font-semibold text-ink-primary mb-5">
                {platformStrip.headingPrimary}{' '}
                <span className="text-accent-500">{platformStrip.headingAccent}</span>
              </p>

              {/* Platform logos / text pills */}
              <div className="flex items-center justify-between gap-3 overflow-x-auto scrollbar-hide pb-1">
                {platformStrip.items.map((platform) => (
                  <div
                    key={platform.id}
                    className="flex-shrink-0 flex items-center justify-center"
                  >
                    <PlatformLogo id={platform.id} label={platform.label} />
                  </div>
                ))}

                {/* Overflow pill */}
                {platformStrip.overflow && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-ink-muted bg-neutral-50 whitespace-nowrap">
                      {platformStrip.overflow}
                    </span>
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

/**
 * PlatformLogo — Renders an SVG-based branded logo for each platform.
 * Uses inline SVG for crisp rendering — no external requests.
 */
function PlatformLogo({ id, label }) {
  const logos = {
    'spotify': (
      <div className="flex items-center gap-1.5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1DB954" aria-hidden="true">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="text-sm font-bold text-[#1DB954]">Spotify</span>
      </div>
    ),
    'apple-music': (
      <div className="flex items-center gap-1.5">
        <svg width="20" height="22" viewBox="0 0 814 1000" fill="currentColor" className="text-neutral-900" aria-hidden="true">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 380.8 17.4 233 77.7 113.8c28.1-57.1 78.4-93.8 133.7-94.2 52.6-.6 96.6 35.7 156.7 35.7 60.4 0 97.2-35.7 163.7-35.7 62.3.6 113.1 35.7 148.4 92.5zm-252.5-184.4C524.4 27.8 579.2 0 633.5 0c6.7 49.5-12.8 98.3-42.8 136.1-31.3 40.8-79 71.8-129.2 67.5-7.9-48.3 12.7-98.2 44.1-133.1z"/>
        </svg>
        <span className="text-sm font-bold text-neutral-900">Music</span>
      </div>
    ),
    'youtube': (
      <div className="flex items-center gap-1.5">
        <svg width="26" height="18" viewBox="0 0 576 512" fill="#FF0000" aria-hidden="true">
          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
        </svg>
        <span className="text-sm font-bold text-neutral-900">YouTube</span>
      </div>
    ),
    'amazon-music': (
      <div className="flex items-center gap-1">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF9900" aria-hidden="true">
          <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705a.659.659 0 01-.753.074c-1.058-.878-1.249-1.286-1.83-2.122-1.748 1.786-2.989 2.32-5.258 2.32-2.684 0-4.779-1.657-4.779-4.975 0-2.591 1.404-4.351 3.398-5.212 1.73-.77 4.147-.905 5.993-1.114v-.416c0-.765.06-1.667-.391-2.327-.397-.591-1.154-.838-1.823-.838-1.237 0-2.343.635-2.614 1.95-.056.287-.275.57-.566.584l-3.165-.342c-.267-.06-.563-.274-.484-.679C5.758 2.786 8.65 1.807 11.232 1.807c1.305 0 3.009.346 4.039 1.332C16.543 4.289 16.5 5.822 16.5 7.48v6.134c0 1.843.765 2.654 1.486 3.652.253.354.309.776-.013 1.039l-2.83 2.49z"/>
        </svg>
        <span className="text-sm font-bold text-neutral-900">amazon <span className="text-[#FF9900]">music</span></span>
      </div>
    ),
    'resso': (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <span className="text-sm font-bold text-neutral-900">Resso</span>
      </div>
    ),
    'jiosaavn': (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-[#00A85A] flex items-center justify-center" aria-hidden="true">
          <span className="text-[7px] font-black text-white leading-none">Jio</span>
        </div>
        <span className="text-sm font-bold text-neutral-900">JioSaavn</span>
      </div>
    ),
    'hungama': (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-sm bg-[#E8230D] flex items-center justify-center" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <span className="text-sm font-bold text-neutral-900">hungama</span>
      </div>
    ),
  };

  return logos[id] ?? (
    <span className="text-sm font-semibold text-ink-secondary px-2">{label}</span>
  );
}

export default HeroSection;
