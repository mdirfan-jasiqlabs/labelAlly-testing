import { motion, useReducedMotion } from 'framer-motion';
import {
  Headphones,
  Zap,
  MessagesSquare,
  ShieldCheck,
  Lock,
  Clock,
  ArrowRight,
  Heart,
  Check,
  CheckCheck,
} from 'lucide-react';
import Container from '../../common/Container';
import defaultContent from '../../../data/whatsappCta.json';
import footerData from '../../../data/footer.json';
import { MotionStagger, MotionItem } from '../../motion';

/**
 * WhatsAppCTA — Secondary conversion section for the Contact page.
 *
 * Props-driven and JSON-configured (no hardcoded copy). Theme-aware, fully
 * responsive, and accessible. Content defaults to `whatsappCta.json`; the
 * WhatsApp URL resolves from footer.json (single source of truth) unless
 * overridden via the `whatsappUrl` prop.
 */

const ICONS = {
  headphones: Headphones,
  zap: Zap,
  messages: MessagesSquare,
  shield: ShieldCheck,
  lock: Lock,
  clock: Clock,
};

function Icon({ name, className }) {
  const Cmp = ICONS[name] ?? Headphones;
  return <Cmp className={className} aria-hidden="true" strokeWidth={2} />;
}

/** WhatsApp brand glyph (recognizable logo — exempt from text-contrast rules). */
function WhatsAppGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.011 2c-5.502 0-9.96 4.458-9.96 9.96 0 2.115.659 4.079 1.785 5.702l-1.836 5.666 5.808-1.521c1.558.955 3.385 1.503 5.344 1.503 5.502 0 9.96-4.458 9.96-9.96a9.923 9.923 0 00-2.917-7.042A9.923 9.923 0 0012.011 2zm5.55 13.914c-.21.583-1.05 1.077-1.706 1.157-.472.052-1.076.078-3.08-.744-2.555-1.042-4.185-3.6-4.316-3.774-.131-.174-1.05-1.383-1.05-2.637 0-1.254.646-1.867.883-2.118.21-.223.57-.32.84-.32.088 0 .175.004.245.008.219.009.324.022.464.346.175.424.604 1.45.656 1.555.052.105.088.228.018.372-.07.144-.158.24-.315.424-.158.184-.332.398-.472.538-.158.158-.324.328-.14.639.184.31.82 1.343 1.759 2.167 1.207 1.066 2.222 1.393 2.537 1.551.315.157.499.131.69-.079.193-.21.84-.967 1.058-1.298.228-.328.455-.271.761-.157.315.114 1.986.927 2.328 1.1.341.171.569.258.656.398.087.149.087.838-.123 1.428z" />
    </svg>
  );
}

function TrustDots({ reversed = false }) {
  const dots = (
    <span className="hidden xs:flex items-center gap-1" aria-hidden="true">
      <span className="w-1 h-1 rounded-full bg-ink-muted/40 dark:bg-theme-muted/40" />
      <span className="w-1 h-1 rounded-full bg-ink-muted/30 dark:bg-theme-muted/30" />
      <span className="w-1 h-1 rounded-full bg-ink-muted/20 dark:bg-theme-muted/20" />
    </span>
  );
  const heart = (
    <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 shrink-0" aria-hidden="true" />
  );
  return (
    <span className="flex items-center gap-1.5">
      {reversed ? dots : heart}
      {reversed ? heart : dots}
    </span>
  );
}

function WhatsAppCTA({ content = defaultContent, whatsappUrl }) {
  const reduceMotion = useReducedMotion();

  if (!content?.enabled) return null;

  const url =
    whatsappUrl || footerData?.contact?.whatsapp?.href || '#';

  const { eyebrow, heading, description, features = [], assurance, card, trust } = content;

  // Lightweight decorative floats only (not scroll-reveal). Reduced-motion: static.
  const float = reduceMotion
    ? {}
    : {
        animate: { y: [0, -8, 0] },
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      };

  const floatDelayed = reduceMotion
    ? {}
    : {
        animate: { y: [0, -6, 0] },
        transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      };

  return (
    <section
      aria-labelledby="whatsapp-cta-heading"
      className={[
        'relative w-full overflow-x-clip',
        'bg-surface-page dark:bg-theme-page',
        'py-8 sm:py-10 md:py-12 lg:py-14',
        'transition-colors duration-250 motion-reduce:transition-none',
      ].join(' ')}
    >
      <Container size="2xl" className="relative">
        <div
          className={[
            'relative',
            'rounded-[1.75rem] sm:rounded-[2rem]',
            'border border-theme-border/70 dark:border-white/12',
            'bg-surface-card dark:bg-theme-card',
            'shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]',
            'px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-14 lg:py-14',
          ].join(' ')}
        >
          {/* Light-mode gradient wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-50/50 via-transparent to-emerald-50/40 dark:hidden"
          />
          {/* Corner dot texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 w-16 h-16 text-ink-muted opacity-20 dark:opacity-[0.06] hidden sm:block"
          >
            <div className="w-full h-full bg-dot-grid" />
          </div>

          <MotionStagger
            className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-center"
            stagger={0.1}
          >
            {/* ─── Left: Message + features ─── */}
            <MotionItem className="flex flex-col items-start text-left min-w-0">
              {eyebrow && (
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/30 border border-pink-100/70 dark:border-pink-900/40">
                  <Icon name={eyebrow.icon} className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                  <span className="text-[0.7rem] sm:text-xs font-bold uppercase tracking-[0.14em] text-pink-600 dark:text-pink-400">
                    {eyebrow.text}
                  </span>
                </span>
              )}

              <h2
                id="whatsapp-cta-heading"
                className="mt-5 font-heading font-black tracking-tight leading-[1.1] text-[1.75rem] xs:text-3xl sm:text-4xl lg:text-[2.6rem] text-ink-primary dark:text-theme-heading text-balance"
              >
                {heading.lineOnePrefix}{' '}
                <span className="relative inline-block text-pink-600 dark:text-pink-400">
                  {heading.highlight}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 120 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 text-pink-500/70 dark:text-pink-400/70"
                  >
                    <path
                      d="M2 8 C 30 2, 60 2, 90 6 S 118 8, 118 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                {heading.lineTwo}
              </h2>

              {description && (
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-ink-muted dark:text-slate-300 max-w-xl">
                  {description}
                </p>
              )}

              {features.length > 0 && (
                <ul className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full">
                  {features.map((f) => (
                    <li key={f.id} className="flex items-start gap-3 min-w-0">
                      <span className="shrink-0 w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-100/70 dark:border-pink-800/50 flex items-center justify-center text-pink-600 dark:text-pink-400">
                        <Icon name={f.icon} className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink-primary dark:text-theme-heading leading-tight">
                          {f.title}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-muted dark:text-slate-400 leading-snug">
                          {f.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {assurance && (
                <div className="mt-7 w-full flex items-center gap-3 rounded-2xl border border-theme-border/70 dark:border-white/15 bg-surface-secondary/70 dark:bg-white/[0.04] backdrop-blur-sm px-4 py-3.5 shadow-sm">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-surface-card dark:bg-theme-card border border-theme-border/60 dark:border-white/15 flex items-center justify-center text-ink-muted dark:text-slate-300">
                    <Icon name={assurance.icon} className="w-4 h-4" />
                  </span>
                  <p className="flex-1 text-xs sm:text-sm text-ink-secondary dark:text-slate-200 leading-snug">
                    {assurance.text}
                    <span className="font-semibold text-pink-600 dark:text-pink-400">
                      {assurance.highlight}
                    </span>
                  </p>
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                </div>
              )}
            </MotionItem>

            {/* ─── Right: WhatsApp card (primary visual focus) ─── */}
            <MotionItem className="relative overflow-visible pt-4 pr-3 sm:pt-6 sm:pr-5 pb-4 sm:pb-5">
              {/* Floating chat bubble (top-right) — solid green so it never washes out */}
              <motion.div
                {...float}
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 -right-2 sm:-top-5 sm:-right-4 z-20"
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl rounded-br-md bg-[#25D366] shadow-[0_10px_24px_-8px_rgba(37,211,102,0.7)] flex items-center justify-center">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                </div>
              </motion.div>

              {/* Floating mini WhatsApp icon (bottom-right) */}
              <motion.div
                {...floatDelayed}
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 -right-2 sm:-bottom-5 sm:-right-4 z-20"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] shadow-[0_10px_24px_-8px_rgba(37,211,102,0.7)] flex items-center justify-center">
                  <WhatsAppGlyph className="w-6 h-6 text-white" />
                </div>
              </motion.div>

              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl border border-theme-border/70 dark:border-white/15 bg-surface-card dark:bg-theme-elevated shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] dark:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] px-5 py-6 sm:px-7 sm:py-8">
                {/* Radial glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 w-56 h-56 rounded-full bg-[#25D366]/30 dark:bg-[#25D366]/20 blur-3xl"
                />

                {/* Top row: status + reply time */}
                <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span aria-hidden="true" className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink-primary dark:text-theme-heading leading-none whitespace-nowrap">
                        {card.status.label}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted dark:text-slate-400 leading-none">
                        {card.status.sub}
                      </p>
                    </div>
                  </div>

                  <span className="self-start shrink-0 inline-flex items-center gap-1.5 rounded-full border border-theme-border/70 dark:border-white/15 bg-surface-secondary/70 dark:bg-white/[0.06] px-2.5 py-1 text-[0.65rem] sm:text-xs text-ink-muted dark:text-slate-300">
                    <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span className="hidden xs:inline">{card.replyBadge.prefix} </span>
                    <span className="font-semibold text-ink-secondary dark:text-slate-100 whitespace-nowrap">
                      {card.replyBadge.highlight}
                    </span>
                  </span>
                </div>

                {/* Center icon + title — solid WhatsApp green */}
                <div className="relative flex flex-col items-center pt-6 pb-1">
                  <motion.div {...float} className="relative">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#25D366] shadow-[0_18px_40px_-12px_rgba(37,211,102,0.65)] flex items-center justify-center">
                      <WhatsAppGlyph className="w-11 h-11 sm:w-12 sm:h-12 text-white" />
                      <span
                        aria-hidden="true"
                        className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#25D366] border-[3px] border-surface-card dark:border-theme-elevated"
                      />
                    </div>
                  </motion.div>
                  <h3 className="mt-5 text-lg sm:text-xl font-black font-heading text-ink-primary dark:text-theme-heading text-center text-balance">
                    {card.title}
                  </h3>
                </div>

                {/* Message preview */}
                <div className="relative mt-4 flex items-start gap-3 rounded-2xl border border-theme-border/60 dark:border-white/12 bg-surface-secondary/60 dark:bg-white/[0.05] px-3.5 py-3">
                  <span
                    aria-hidden="true"
                    className="relative shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-white text-[0.7rem] font-bold"
                  >
                    {card.preview.avatar}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-surface-secondary dark:border-[#1a2030]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs sm:text-sm font-bold text-ink-primary dark:text-theme-heading truncate">
                        {card.preview.name}
                      </p>
                      <span className="shrink-0 text-[0.65rem] text-ink-muted dark:text-slate-400">
                        {card.preview.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-ink-secondary dark:text-slate-200 leading-snug">
                      {card.preview.message}
                    </p>
                    <div className="mt-1 flex justify-end text-brand-blue" aria-hidden="true">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* CTA button — solid fill (not gradient) so label never washes out on light cards */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    'group relative z-10 mt-4 flex w-full items-center justify-center gap-2.5',
                    'h-12 sm:h-14 px-5 rounded-xl',
                    'bg-[#15803D] hover:bg-[#116B31] dark:bg-[#16A34A] dark:hover:bg-[#15803D]',
                    'text-white text-sm sm:text-base font-bold',
                    'shadow-[0_12px_28px_-10px_rgba(21,128,61,0.7)] hover:shadow-[0_16px_36px_-10px_rgba(21,128,61,0.9)]',
                    'dark:shadow-[0_12px_28px_-10px_rgba(22,163,74,0.55)]',
                    'transition-all duration-300 ease-out',
                    'motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none',
                    'focus-ring',
                  ].join(' ')}
                >
                  <WhatsAppGlyph className="w-5 h-5 shrink-0 text-white" />
                  <span className="text-white">{card.button.label}</span>
                  <ArrowRight
                    className="w-4 h-4 shrink-0 text-white transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </a>

                {/* Privacy note */}
                <p className="relative mt-3 flex items-center justify-center gap-1.5 text-[0.7rem] sm:text-xs text-ink-muted dark:text-slate-400">
                  <Lock className="w-3 h-3 shrink-0" aria-hidden="true" />
                  {card.privacy.text}
                </p>
              </div>
            </MotionItem>
          </MotionStagger>

          {/* ─── Trust bar ─── */}
          {trust?.text && (
            <MotionItem
              standalone
              className="relative mt-8 sm:mt-10 pt-6 border-t border-theme-border/60 dark:border-white/10"
            >
              <div className="flex items-center justify-center gap-3">
                <TrustDots />
                <span className="text-xs sm:text-sm font-semibold text-ink-secondary dark:text-slate-300 text-center">
                  {trust.text}
                </span>
                <TrustDots reversed />
              </div>
            </MotionItem>
          )}
        </div>
      </Container>
    </section>
  );
}

export default WhatsAppCTA;
