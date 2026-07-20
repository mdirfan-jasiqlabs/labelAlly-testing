import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import HeroDecorations from './HeroDecorations';

/**
 * PageHero — Reusable, data-driven inner-page hero.
 *
 * Content-led, left-aligned premium hero used across inner pages. Only the
 * content and the optional support slot change per page.
 *
 * Slots (top → bottom): eyebrow → single H1 (optional gradient phrase) →
 * optional underline → description → CTA row → optional support slot,
 * with an optional decorative layer and wave hand-off.
 *
 * Accessibility: renders a single <h1> and labels the <section> via that id.
 * The eyebrow is a <p>, never a heading. Decorations are aria-hidden.
 *
 * @param {string}   eyebrow
 * @param {string}   title              — becomes the page's single H1
 * @param {string}   [highlightedText]  — substring of title rendered with a gradient
 * @param {string}   [description]
 * @param {object}   [primaryCta]       — { label, href, ariaLabel, external }
 * @param {object}   [secondaryCta]     — { label, href, ariaLabel, external }
 * @param {'none'|'stats'|'quickContact'|'custom'} [supportVariant='none']
 * @param {ReactNode} [support]         — custom support content (supportVariant='custom')
 * @param {'stacked'|'split'} [variant='stacked']
 * @param {boolean}  [showUnderline=true]
 * @param {boolean}  [showWave=false]
 * @param {boolean}  [decorations=true]
 * @param {string}   [titleId='page-hero-title']
 * @param {string}   [className]
 */
function renderTitle(title, highlightedText) {
  if (!highlightedText) return title;
  const idx = title.indexOf(highlightedText);
  if (idx === -1) return title;

  return (
    <>
      {title.slice(0, idx)}
      <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
        {highlightedText}
      </span>
      {title.slice(idx + highlightedText.length)}
    </>
  );
}

function HeroCTA({ cta, variant }) {
  if (!cta?.label || !cta?.href) return null;

  const shared = {
    variant,
    'aria-label': cta.ariaLabel || undefined,
    rightIcon:
      variant === 'primary' ? <ArrowRight size={16} aria-hidden="true" /> : undefined,
  };

  if (cta.external) {
    return (
      <Button as="a" href={cta.href} target="_blank" rel="noopener noreferrer" {...shared}>
        {cta.label}
      </Button>
    );
  }

  return (
    <Button as={Link} to={cta.href} {...shared}>
      {cta.label}
    </Button>
  );
}

function PageHero({
  eyebrow,
  title,
  highlightedText,
  description,
  primaryCta,
  secondaryCta,
  supportVariant = 'none',
  support = null,
  variant = 'stacked',
  showUnderline = true,
  showWave = false,
  decorations = true,
  titleId = 'page-hero-title',
  className = '',
}) {
  const hasCtas = Boolean(primaryCta?.href || secondaryCta?.href);
  const hasSupport = supportVariant !== 'none' && Boolean(support);

  return (
    <section
      aria-labelledby={titleId}
      className={[
        'relative z-0 w-full overflow-hidden',
        'bg-gradient-to-b from-teal-50/70 via-teal-50/30 to-surface-page',
        'dark:from-teal-950/30 dark:via-theme-page dark:to-theme-page',
        'pt-8 sm:pt-10 md:pt-12 lg:pt-14',
        showWave ? 'pb-10 sm:pb-12 md:pb-16' : 'pb-8 sm:pb-10 md:pb-12',
        'transition-colors duration-250',
        className,
      ].filter(Boolean).join(' ')}
    >
      {decorations ? <HeroDecorations /> : null}

      <Container className="relative z-10">
        <div
          className={[
            'flex flex-col items-start text-left',
            'motion-safe:animate-fade-up',
            variant === 'stacked' ? 'lg:max-w-xl xl:max-w-2xl' : '',
          ].filter(Boolean).join(' ')}
        >
          {eyebrow ? (
            <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-orange-700 dark:text-accent-400">
              {eyebrow}
            </p>
          ) : null}

          <h1
            id={titleId}
            className="mt-3 max-w-[15ch] font-heading font-black tracking-tight text-balance text-ink-primary dark:text-theme-heading text-3xl xs:text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-[1.07]"
          >
            {renderTitle(title, highlightedText)}
          </h1>

          {showUnderline ? (
            <div aria-hidden="true" className="brand-underline mt-5 md:mt-6" />
          ) : null}

          {description ? (
            <p className="mt-4 md:mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-ink-secondary dark:text-theme-body">
              {description}
            </p>
          ) : null}

          {hasCtas ? (
            <div className="mt-5 sm:mt-6 flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <HeroCTA cta={primaryCta} variant="primary" />
              <HeroCTA cta={secondaryCta} variant="secondary" />
            </div>
          ) : null}

          {hasSupport ? <div className="mt-8 w-full">{support}</div> : null}
        </div>
      </Container>

      {showWave ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full overflow-hidden leading-none"
        >
          <svg
            className="relative block w-full h-10 sm:h-12 md:h-14 text-surface-page dark:text-theme-page"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,32 C240,58 480,6 720,30 C960,54 1200,10 1440,34 L1440,60 L0,60 Z"
            />
          </svg>
        </div>
      ) : null}
    </section>
  );
}

export default PageHero;
