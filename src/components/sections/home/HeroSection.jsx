import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Container from '../../common/Container';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import GradientBackground from '../../common/GradientBackground';
import GlowEffect from '../../common/GlowEffect';
import homeData from '../../../data/home.json';

/**
 * HeroSection — Homepage hero section.
 *
 * The primary above-the-fold section of the homepage.
 * All content is sourced from src/data/home.json — no hardcoded strings.
 *
 * Composition:
 * - GradientBackground (hero variant) — full-section dark gradient
 * - GlowEffect          — decorative radial glow behind heading
 * - Badge               — eyebrow label
 * - h1                  — primary heading (split: plain + highlighted)
 * - p                   — supporting description
 * - Button (primary)    — primary CTA → /contact
 * - Button (outline)    — secondary CTA → /services
 * - trust note          — small supporting text
 */
function HeroSection() {
  const { hero } = homeData;

  return (
    <GradientBackground
      as="section"
      variant="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[90vh] flex items-center"
    >
      {/* ── Decorative top-right glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-primary-900/30 blur-3xl animate-pulse-slow"
      />

      {/* ── Decorative bottom-left glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] translate-y-1/3 -translate-x-1/3 rounded-full bg-accent-950/40 blur-3xl animate-pulse-slow"
      />

      <Container className="relative z-10 py-24 md:py-32 lg:py-40 animate-fade-up">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* ── Eyebrow Badge ── */}
          <div className="mb-6">
            <Badge variant="outline">
              {hero.badge}
            </Badge>
          </div>

          {/* ── Main Heading ── */}
          <GlowEffect color="primary" intensity="lg" className="w-full">
            <h1
              id="hero-heading"
              className={[
                'font-heading font-black tracking-tight',
                'text-4xl sm:text-6xl md:text-7xl lg:text-8xl',
                'leading-none',
                'text-neutral-50',
              ].join(' ')}
            >
              {/* Plain part */}
              <span className="block">{hero.heading}</span>

              {/* Highlighted / accent part */}
              <span className="block text-gradient">
                {hero.headingHighlight}
              </span>
            </h1>
          </GlowEffect>

          {/* ── Description ── */}
          <p
            className={[
              'mt-8',
              'max-w-2xl mx-auto',
              'text-base sm:text-lg md:text-xl',
              'text-neutral-400',
              'leading-relaxed',
            ].join(' ')}
          >
            {hero.description}
          </p>

          {/* ── CTA Buttons ── */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            {/* Primary CTA */}
            <Button
              as={Link}
              to={hero.primaryCta.href}
              aria-label={hero.primaryCta.ariaLabel}
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} aria-hidden="true" />}
            >
              {hero.primaryCta.label}
            </Button>

            {/* Secondary CTA */}
            <Button
              as={Link}
              to={hero.secondaryCta.href}
              aria-label={hero.secondaryCta.ariaLabel}
              variant="outline"
              size="lg"
              rightIcon={<ChevronRight size={18} aria-hidden="true" />}
            >
              {hero.secondaryCta.label}
            </Button>
          </div>

          {/* ── Trust Note ── */}
          {hero.trustNote && (
            <p className="mt-8 text-sm text-neutral-600">
              {hero.trustNote}
            </p>
          )}

        </div>
      </Container>

      {/* ── Bottom fade into page ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent"
      />
    </GradientBackground>
  );
}

export default HeroSection;
