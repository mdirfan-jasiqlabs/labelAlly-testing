import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../../common/Container';
import homeData from '../../../data/home.json';
import { homeAboutStyles as styles } from '../../../config/homeAboutStyles';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';

// ── Custom Illustration SVGs — Matched with reference ─────────────────

function CreatorCentricIcon() {
  return (
    <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none" aria-hidden="true">
      <circle cx="50" cy="50" r="32" fill="#E8F4FF" opacity="0.9" />
      <rect x="28" y="24" width="44" height="32" rx="4" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <path d="M42 56L38 66H62L58 56" stroke="#11143E" strokeWidth="2.5" strokeLinejoin="round" fill="white" />
      <line x1="34" y1="66" x2="66" y2="66" stroke="#11143E" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="34" y="30" width="12" height="18" rx="1" stroke="#11143E" strokeWidth="2" fill="#3B82F6" />
      <line x1="50" y1="30" x2="62" y2="30" stroke="#11143E" strokeWidth="2" />
      <line x1="50" y1="36" x2="58" y2="36" stroke="#11143E" strokeWidth="2" />
      <circle cx="64" cy="46" r="8" stroke="#11143E" strokeWidth="2" fill="#EF4444" />
      <path d="M64 42V50M60 46H68" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function TransparentGrowthIcon() {
  return (
    <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none" aria-hidden="true">
      <circle cx="50" cy="50" r="32" fill="#FFEFEA" opacity="0.9" />
      <rect x="36" y="24" width="30" height="38" rx="4" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <path d="M44 24V22C44 20.8954 44.8954 20 46 20H56C57.1046 20 58 20.8954 58 22V24" stroke="#11143E" strokeWidth="2.5" />
      <line x1="42" y1="34" x2="60" y2="34" stroke="#11143E" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="40" x2="52" y2="40" stroke="#11143E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="56" cy="46" r="6" stroke="#11143E" strokeWidth="2" fill="#06B6D4" />
      <path d="M56 40A6 6 0 0 1 62 46H56V40Z" fill="#F59E0B" />
      <rect x="42" y="48" width="6" height="6" rx="1.5" stroke="#11143E" strokeWidth="2" fill="#3B82F6" />
      <line x1="52" y1="51" x2="60" y2="51" stroke="#11143E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GlobalReachIcon() {
  return (
    <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none" aria-hidden="true">
      <circle cx="50" cy="50" r="32" fill="#FFEBF0" opacity="0.9" />
      <circle cx="50" cy="50" r="24" stroke="#7B8092" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M34 46H40L48 52V38L40 44H34C32.8954 44 32 44.8954 32 46V50C32 51.1046 32.8954 52 34 52Z" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <path d="M48 42L56 36V54L48 48" stroke="#11143E" strokeWidth="2.5" fill="#EF4444" />
      <circle cx="64" cy="34" r="5" stroke="#11143E" strokeWidth="2" fill="#3B82F6" />
      <circle cx="68" cy="50" r="4" stroke="#11143E" strokeWidth="2" fill="#10B981" />
      <circle cx="56" cy="62" r="5" stroke="#11143E" strokeWidth="2" fill="#F59E0B" />
      <line x1="56" y1="39" x2="61" y2="36" stroke="#11143E" strokeWidth="1.5" />
      <line x1="56" y1="51" x2="64" y2="50" stroke="#11143E" strokeWidth="1.5" />
    </svg>
  );
}

function ProjectDoneIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none" aria-hidden="true">
      <path d="M28 50H52V62H28V50Z" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <path d="M25 50H55L52 44H28L25 50Z" stroke="#11143E" strokeWidth="2.5" fill="#F59E0B" />
      <circle cx="40" cy="56" r="6" stroke="#11143E" strokeWidth="2.5" fill="#FFE2D1" />
      <path d="M40 18C35.58 18 32 21.58 32 26C32 28.78 33.42 31.22 35.58 32.7L36 38H44L44.42 32.7C46.58 31.22 48 28.78 48 26C48 21.58 44.42 18 40 18Z" stroke="#11143E" strokeWidth="2.5" fill="#F59E0B" />
      <line x1="40" y1="38" x2="40" y2="44" stroke="#11143E" strokeWidth="2.5" />
      <line x1="40" y1="12" x2="40" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="20" x2="30" y2="22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="20" x2="50" y2="22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SatisfyClientIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none" aria-hidden="true">
      <path d="M22 62L40 26L58 62H22Z" stroke="#11143E" strokeWidth="2.5" fill="white" />
      <circle cx="40" cy="20" r="4" stroke="#11143E" strokeWidth="2" fill="#FFE2D1" />
      <path d="M37 24H43L45 36H35L37 24Z" stroke="#11143E" strokeWidth="2" fill="#3B82F6" />
      <path d="M45 16H53L51 22L53 28H45V16Z" stroke="#11143E" strokeWidth="2" fill="#EF4444" />
      <circle cx="28" cy="24" r="1.5" fill="#F59E0B" />
      <circle cx="56" cy="30" r="1.5" fill="#F59E0B" />
    </svg>
  );
}

function AwardsIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none" aria-hidden="true">
      <rect x="22" y="48" width="12" height="14" stroke="#11143E" strokeWidth="2.5" fill="#7B8092" />
      <rect x="34" y="38" width="12" height="24" stroke="#11143E" strokeWidth="2.5" fill="#3B82F6" />
      <rect x="46" y="44" width="12" height="18" stroke="#11143E" strokeWidth="2.5" fill="#7B8092" />
      <path d="M34 22H46V28C46 31.3137 43.3137 34 40 34C36.6863 34 34 31.3137 34 28V22Z" stroke="#11143E" strokeWidth="2.5" fill="#F59E0B" />
      <path d="M38 34V38H42V34" stroke="#11143E" strokeWidth="2.5" />
      <path d="M30 18L32 20L30 22L28 20L30 18Z" fill="#F59E0B" />
      <path d="M50 18L52 20L50 22L48 20L50 18Z" fill="#F59E0B" />
    </svg>
  );
}

function HappyClientIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 select-none" aria-hidden="true">
      <circle cx="32" cy="36" r="5" stroke="#11143E" strokeWidth="2.5" fill="#FFE2D1" />
      <path d="M26 48C26 43.5817 29.5817 40 34 40H35C36.1046 40 37 40.8954 37 42V52H26V48Z" stroke="#11143E" strokeWidth="2.5" fill="#10B981" />
      <circle cx="48" cy="36" r="5" stroke="#11143E" strokeWidth="2.5" fill="#FFE2D1" />
      <path d="M43 42C43 40.8954 43.8954 40 45 40H46C50.4183 40 54 43.5817 54 48V52H43V42Z" stroke="#11143E" strokeWidth="2.5" fill="#3B82F6" />
      <path d="M28 38L32 30" stroke="#11143E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 38L48 30" stroke="#11143E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 20L41.5 23L44.5 23.5L42.2 25.5L43 28.5L40 26.8L37 28.5L37.8 25.5L35.5 23.5L38.5 23L40 20Z" fill="#F59E0B" />
    </svg>
  );
}

const CARD_ICONS = {
  CreatorCentric: CreatorCentricIcon,
  TransparentGrowth: TransparentGrowthIcon,
  GlobalReach: GlobalReachIcon,
};

const STATS_ICONS = {
  ProjectDone: ProjectDoneIcon,
  SatisfyClient: SatisfyClientIcon,
  Awards: AwardsIcon,
  HappyClient: HappyClientIcon,
};

const BG_NODES = [
  'top-[24%] left-[14%]',
  'top-[42%] left-[28%]',
  'bottom-[30%] right-[20%]',
];

const SPECTRUM_BAR_COUNT = 14;

function AboutSectionBackground() {
  const { background: bg } = styles;

  return (
    <div className={bg.layer} aria-hidden="true">
      <div className={bg.orbPrimary} />
      <div className={bg.orbAccent} />
      <div className={bg.orbSecondary} />
      <div className={bg.flowLine} />
      <div className={bg.flowLineAlt} />

      <div className={bg.spectrumRow}>
        {Array.from({ length: SPECTRUM_BAR_COUNT }, (_, index) => (
          <span
            key={`about-spectrum-${index}`}
            className={bg.spectrumBar}
            style={{ animationDelay: `${(index % 8) * 100}ms` }}
          />
        ))}
      </div>

      <div className={bg.waveBand}>
        <svg
          className={bg.waveSvg}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            className={bg.wavePathA}
            d="M0,64 C180,24 360,96 540,56 C720,16 900,88 1080,48 C1260,8 1380,72 1440,56 L1440,120 L0,120 Z"
          />
          <path
            className={bg.wavePathB}
            d="M0,78 C220,38 420,98 640,62 C860,26 1080,92 1320,54 L1440,62 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      {BG_NODES.map((position) => (
        <span key={position} className={[bg.node, position].join(' ')} />
      ))}
    </div>
  );
}

function AboutSection() {
  const { about } = homeData;
  const scrollContainerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const reduceMotion = useReducedMotion();

  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;
  const mediaVariants = reduceMotion ? motionConfig.mediaReduced : motionConfig.media;
  const cardVariants = reduceMotion ? motionConfig.cardReduced : motionConfig.card;
  const lineVariants = reduceMotion ? motionConfig.lineReduced : motionConfig.line;
  const checklistItemVariants = reduceMotion
    ? motionConfig.checklistItemReduced
    : motionConfig.checklistItem;

  useEffect(() => {
    if (!about.features?.length || reduceMotion) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const isMobile = window.innerWidth < 768;
      const totalItems = about.features.length;
      const visibleCount = isMobile ? 1 : 2;
      const maxStep = totalItems - visibleCount;

      setActiveStep((prevStep) => {
        const nextStep = prevStep >= maxStep ? 0 : prevStep + 1;
        const cardWidth = container.scrollWidth / totalItems;

        container.scrollTo({
          left: nextStep * cardWidth,
          behavior: 'smooth',
        });

        return nextStep;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [about.features, reduceMotion]);

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
      className={styles.section}
    >
      <AboutSectionBackground />

      <Container size="2xl" className="relative z-10">
        <div className={styles.layout}>
          <motion.div
            className={styles.contentCol}
            variants={motionConfig.container}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
          >
            <motion.span className={styles.badge} variants={itemVariants}>
              {about.badge}
            </motion.span>

            <motion.h2
              id="about-heading"
              className={styles.heading}
              variants={itemVariants}
            >
              {about.heading}
            </motion.h2>

            <motion.div
              aria-hidden="true"
              className={styles.divider}
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={motionConfig.viewport}
            />

            {about.checklist?.length > 0 ? (
              <motion.ul
                className={styles.checklist}
                variants={motionConfig.checklistContainer}
                initial="hidden"
                whileInView="visible"
                viewport={motionConfig.viewport}
              >
                {about.checklist.map((item) => (
                  <motion.li
                    key={item}
                    className={styles.checklistItem}
                    variants={checklistItemVariants}
                  >
                    <span className={styles.checklistIcon} aria-hidden="true">
                      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 7 6 11 16 1" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : null}
          </motion.div>

          {about.features?.length > 0 ? (
            <motion.div
              className={styles.mediaCol}
              variants={mediaVariants}
              initial="hidden"
              whileInView="visible"
              viewport={motionConfig.viewport}
            >
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className={styles.carousel}
              >
                {about.features.map((card, cardIdx) => {
                  const IconComponent = CARD_ICONS[card.icon];

                  return (
                    <motion.article
                      key={card.id}
                      className={styles.card}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={motionConfig.viewport}
                      transition={{ delay: cardIdx * 0.08 }}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
                      }
                    >
                      {IconComponent ? (
                        <div className="mb-4 transition-transform duration-300 motion-safe:group-hover:scale-105 motion-reduce:group-hover:scale-100">
                          <IconComponent />
                        </div>
                      ) : null}

                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <div aria-hidden="true" className={styles.cardDivider} />
                      <p className={styles.cardDescription}>{card.description}</p>
                    </motion.article>
                  );
                })}
              </div>

              <div className={styles.dots}>
                {Array.from({ length: about.features.length - 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={activeStep === idx ? 'true' : undefined}
                    className={[
                      styles.dot,
                      activeStep === idx ? styles.dotActive : styles.dotIdle,
                    ].join(' ')}
                  />
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>

        {about.stats?.length > 0 ? (
          <motion.div
            className={styles.statsWrap}
            variants={motionConfig.container}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
          >
            <div className={styles.statsShell}>
              <div className={styles.statsGrid}>
                {about.stats.map((stat, idx) => {
                  const StatIcon = STATS_ICONS[stat.icon];

                  return (
                    <motion.div
                      key={stat.id}
                      variants={itemVariants}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -3, transition: { duration: 0.25 } }
                      }
                      className={[
                        styles.statItem,
                        idx < about.stats.length - 1 ? styles.statDivider : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {StatIcon ? (
                        <div className="mb-2.5">
                          <StatIcon />
                        </div>
                      ) : null}
                      <p className={styles.statValue}>{stat.value}</p>
                      <p className={styles.statLabel}>{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </Container>

      <div aria-hidden="true" className={styles.wave}>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.waveFill}>
          <path d="M0 40H1440V12C1280 28 1120 28 960 12C800 -4 640 -4 480 12C320 28 160 28 0 12V40Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}

export default AboutSection;
