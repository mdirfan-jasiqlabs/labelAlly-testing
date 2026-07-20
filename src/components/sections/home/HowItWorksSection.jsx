import { motion, useReducedMotion } from 'framer-motion';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';
import { homeProcessStyles as styles } from '../../../config/homeProcessStyles';

/**
 * HowItWorksSection — Homepage process steps section matching reference direction.
 *
 * Layout:
 * - Two-column split layout: Left side organic rounded team photo, Right side 3 process steps.
 * - Dynamic data driven via home.json.
 */
function HowItWorksSection() {
  const { process } = homeData;
  const reduceMotion = useReducedMotion();

  if (!process?.steps?.length) return null;

  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;
  const mediaVariants = reduceMotion ? motionConfig.mediaReduced : motionConfig.media;
  const stepNumberVariants = reduceMotion
    ? motionConfig.stepNumberReduced
    : motionConfig.stepNumber;

  return (
    <section
      role="region"
      aria-labelledby="process-heading"
      className="relative w-full overflow-hidden bg-theme-page section-spacing"
    >
      {/* Background radial — hero-aligned dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 z-0 h-[600px] w-[600px] rounded-full bg-primary-400/10 blur-3xl opacity-20 dark:bg-violet-500/10 dark:opacity-30"
      />

      <Container size="2xl" className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-center justify-between">

          {/* Left Column — Organic blob image */}
          <motion.div
            className="w-full lg:w-[46%] flex flex-col items-center justify-center relative shrink-0"
            variants={mediaVariants}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 -top-6 z-0 h-40 w-40 opacity-[0.22] dark:opacity-[0.14] bg-[radial-gradient(theme(colors.orange.400)_1.5px,transparent_1.5px)] bg-[length:16px_16px]"
            />

            <div
              className={[
                'relative z-10 w-full aspect-[4/5] max-w-[320px] sm:max-w-[380px] lg:max-w-none overflow-hidden',
                'drop-shadow-[0_20px_40px_rgba(31,35,90,0.08)]',
                'dark:drop-shadow-[0_20px_44px_rgba(0,0,0,0.45)]',
                'ring-1 ring-violet-200/30 dark:ring-violet-400/15 rounded-2xl',
              ].join(' ')}
              style={{
                clipPath: 'url(#blob-clip)',
                WebkitClipPath: 'url(#blob-clip)',
              }}
            >
              <img
                src={process.image.src}
                alt={process.image.alt}
                width="380"
                height="475"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none select-none"
              />
            </div>
          </motion.div>

          {/* Right Column — Steps */}
          <motion.div
            className="w-full lg:w-[54%] flex flex-col items-start text-left"
            variants={motionConfig.container}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
          >
            <motion.span className={styles.badge} variants={itemVariants}>
              {process.badge}
            </motion.span>

            <motion.h2
              id="process-heading"
              className={styles.heading}
              variants={itemVariants}
            >
              <span className="block">{process.title.lineOne}</span>
              <span className={`block ${styles.headingAccent}`}>
                {process.title.lineTwo}
              </span>
            </motion.h2>

            <motion.div
              aria-hidden="true"
              className={styles.divider}
              variants={itemVariants}
            />

            <motion.ol
              className="w-full flex flex-col gap-8 md:gap-10"
              variants={motionConfig.container}
              initial="hidden"
              whileInView="visible"
              viewport={motionConfig.viewport}
            >
              {process.steps.map((step, idx) => {
                const isLast = idx === process.steps.length - 1;

                return (
                  <motion.li
                    key={step.number}
                    variants={itemVariants}
                    className="relative flex items-start gap-5 group"
                  >
                    {!isLast ? (
                      <div
                        aria-hidden="true"
                        className="absolute left-5 top-10 bottom-[-40px] w-[2px] bg-theme-border pointer-events-none"
                      />
                    ) : null}

                    <motion.div
                      aria-hidden="true"
                      className={[
                        'relative z-10 flex items-center justify-center shrink-0',
                        'w-10 h-10 rounded-full',
                        'bg-theme-action-primary text-theme-action-primaryForeground',
                        'font-heading font-extrabold text-sm',
                        'border border-theme-action-primaryBorder',
                        'shadow-sm',
                        'transition-all duration-300',
                        'group-hover:bg-theme-action-primaryHover group-hover:border-theme-action-primaryBorderHover',
                        'group-hover:scale-105 motion-reduce:group-hover:scale-100',
                        'group-hover:shadow-card-hover',
                      ].join(' ')}
                      variants={stepNumberVariants}
                    >
                      {step.number}
                    </motion.div>

                    <div className="flex flex-col gap-1.5 pt-1 max-w-xl">
                      <h3 className="font-heading font-black text-lg text-ink-primary dark:text-theme-heading leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[0.88rem] sm:text-[0.92rem] leading-relaxed text-ink-muted dark:text-theme-muted">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ol>
          </motion.div>

        </div>
      </Container>

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
