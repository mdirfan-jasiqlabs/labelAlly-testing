import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../../common/Container';
import Button from '../../common/Button';
import homeData from '../../../data/home.json';
import { homeWhatWeDoStyles as styles } from '../../../config/homeWhatWeDoStyles';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';

const SPECTRUM_BAR_COUNT = 12;

const DOT_PATTERN = (
  <svg fill="currentColor" viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <pattern id="what-we-do-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#what-we-do-dots)" />
  </svg>
);

function WhatWeDoBackground() {
  const { background: bg } = styles;

  return (
    <div className={bg.layer} aria-hidden="true">
      <div className={bg.orbPrimary} />
      <div className={bg.orbAccent} />
      <div className={bg.flowLine} />
      <div className={bg.flowLineAlt} />

      <div className={bg.spectrumRow}>
        {Array.from({ length: SPECTRUM_BAR_COUNT }, (_, index) => (
          <span
            key={`wwd-spectrum-${index}`}
            className={bg.spectrumBar}
            style={{ animationDelay: `${(index % 8) * 100}ms` }}
          />
        ))}
      </div>

      <div className={[bg.dotGrid, bg.dotGridLeft].join(' ')}>{DOT_PATTERN}</div>
      <div className={[bg.dotGrid, bg.dotGridRight].join(' ')}>{DOT_PATTERN}</div>
    </div>
  );
}

function WhatWeDoSection() {
  const { whatWeDo } = homeData;
  const reduceMotion = useReducedMotion();

  if (!whatWeDo) return null;

  const { badge, title, description, primaryButton, features, images } = whatWeDo;

  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;
  const mediaVariants = reduceMotion ? motionConfig.mediaReduced : motionConfig.media;
  const lineVariants = reduceMotion ? motionConfig.lineReduced : motionConfig.line;
  const checklistItemVariants = reduceMotion
    ? motionConfig.checklistItemReduced
    : motionConfig.checklistItem;

  const masonryImages = [
    { key: 'topLeft', data: images.topLeft, height: styles.imageHeights.short },
    { key: 'bottomLeft', data: images.bottomLeft, height: styles.imageHeights.tall },
    { key: 'topRight', data: images.topRight, height: styles.imageHeights.tall },
    { key: 'bottomRight', data: images.bottomRight, height: styles.imageHeights.short },
  ];

  return (
    <section
      aria-labelledby="what-we-do-heading"
      className={styles.section}
    >
      <WhatWeDoBackground />

      <Container size="2xl" className="relative z-10">
        <div className={styles.layout}>

          {/* Left Column — Content (48%) */}
          <motion.div
            className={styles.contentCol}
            variants={motionConfig.container}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
          >
            <motion.span className={styles.badge} variants={itemVariants}>
              {badge}
            </motion.span>

            <motion.h2
              id="what-we-do-heading"
              className={styles.heading}
              variants={itemVariants}
            >
              <span className="block">{title.line1}</span>
              <span className={`block mt-1 ${styles.headingAccent}`}>{title.line2}</span>
            </motion.h2>

            <motion.div
              className={styles.brandDivider}
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={motionConfig.viewport}
              aria-hidden="true"
            >
              <span className="flex-1 h-full bg-brand-pink rounded-full" />
              <span className="flex-1 h-full bg-brand-orange rounded-full" />
              <span className="flex-1 h-full bg-brand-green rounded-full" />
              <span className="flex-1 h-full bg-brand-blue rounded-full" />
            </motion.div>

            <motion.p className={styles.description} variants={itemVariants}>
              {description}
            </motion.p>

            {features?.length > 0 ? (
              <motion.div
                className={styles.featuresGrid}
                variants={motionConfig.checklistContainer}
                initial="hidden"
                whileInView="visible"
                viewport={motionConfig.viewport}
              >
                {features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    className={styles.featureItem}
                    variants={checklistItemVariants}
                  >
                    <span className={styles.featureBullet} aria-hidden="true" />
                    <span className={styles.featureTitle}>{feature.title}</span>
                  </motion.div>
                ))}
              </motion.div>
            ) : null}

            {primaryButton ? (
              <motion.div variants={itemVariants}>
                <Button
                  as={Link}
                  to={primaryButton.href}
                  aria-label={primaryButton.ariaLabel}
                  size="lg"
                  className="rounded-xl px-8"
                >
                  {primaryButton.label}
                </Button>
              </motion.div>
            ) : null}
          </motion.div>

          {/* Right Column — Staggered Masonry Images (48%) */}
          <motion.div
            className="w-full lg:w-[48%] flex gap-4 sm:gap-6 items-start overflow-visible z-10"
            variants={mediaVariants}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
          >
            <div className={[styles.masonryCol, styles.masonryColLeft].join(' ')}>
              {masonryImages.slice(0, 2).map(({ key, data, height }) => (
                <div key={key} className={`group ${styles.imageFrame} ${height}`}>
                  <img
                    src={data.src}
                    alt={data.alt}
                    width="280"
                    height={key.includes('bottom') ? '350' : '270'}
                    loading="lazy"
                    decoding="async"
                    className={styles.image}
                  />
                </div>
              ))}
            </div>

            <div className={styles.masonryCol}>
              {masonryImages.slice(2).map(({ key, data, height }) => (
                <div key={key} className={`group ${styles.imageFrame} ${height}`}>
                  <img
                    src={data.src}
                    alt={data.alt}
                    width="280"
                    height={key.includes('top') ? '350' : '270'}
                    loading="lazy"
                    decoding="async"
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

export default WhatWeDoSection;
