import { motion, useReducedMotion } from 'framer-motion';
import Container from '../../common/Container';
import clientsData from '../../../data/clientsSection.json';
import { homeClientsStyles as styles } from '../../../config/homeClientsStyles';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';

function ClientsSectionBackground() {
  const { background: bg } = styles;

  return (
    <div className={bg.layer} aria-hidden="true">
      <div className={bg.orbPrimary} />
      <div className={bg.orbAccent} />
      <div className={bg.flowLineLeft} />
      <div className={bg.flowLineRight} />

      {styles.sparkPositions.map((position, index) => (
        <span
          key={`client-spark-${index}`}
          className={[bg.spark, position].join(' ')}
          style={{ animationDelay: `${index * 0.45}s` }}
        />
      ))}
    </div>
  );
}

/**
 * ClientsSection — Premium clients logo grid with individual cards.
 * Sourced fully from src/data/clientsSection.json.
 */
function ClientsSection() {
  const reduceMotion = useReducedMotion();

  if (!clientsData || !clientsData.enabled) return null;

  const { badge, heading, grid, logos } = clientsData;
  const enabledLogos = logos ? logos.filter((logo) => logo.enabled) : [];

  if (enabledLogos.length === 0) return null;

  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;
  const lineVariants = reduceMotion ? motionConfig.lineReduced : motionConfig.line;
  const cardVariants = reduceMotion ? motionConfig.cardReduced : motionConfig.card;

  const gridMobileClass = grid?.mobile || 'grid-cols-2';
  const gridTabletClass = grid?.tablet || 'md:grid-cols-2';
  const gridDesktopClass = grid?.desktop || 'lg:grid-cols-4';

  return (
    <section
      aria-labelledby="clients-section-title"
      className={styles.section}
    >
      <ClientsSectionBackground />

      <Container size="xl" className="relative z-10 flex flex-col items-center">
        <motion.div
          className={styles.header}
          variants={motionConfig.container}
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
        >
          {badge ? (
            <motion.span className={styles.badge} variants={itemVariants}>
              {badge}
            </motion.span>
          ) : null}

          {heading ? (
            <motion.h2
              id="clients-section-title"
              className={styles.heading}
              variants={itemVariants}
            >
              {heading}
            </motion.h2>
          ) : null}

          <motion.div
            className={styles.brandDivider}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            aria-hidden="true"
          >
            <span className="flex-1 h-full bg-brand-green rounded-full" />
            <span className="flex-1 h-full bg-brand-pink rounded-full" />
            <span className="flex-1 h-full bg-brand-orange rounded-full" />
            <span className="flex-1 h-full bg-brand-blue rounded-full" />
          </motion.div>
        </motion.div>

        <motion.div
          className={[styles.logoGrid, gridMobileClass, gridTabletClass, gridDesktopClass].join(' ')}
          variants={motionConfig.container}
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
        >
          {enabledLogos.map((logo) => (
            <motion.div
              key={logo.id}
              className={styles.logoCard}
              variants={cardVariants}
            >
              <div className={styles.logoGlow} aria-hidden="true" />
              <div className={styles.logoImageWrap}>
                <img
                  src={logo.image}
                  alt={logo.alt || logo.name}
                  loading="lazy"
                  decoding="async"
                  width="200"
                  height="120"
                  className={styles.logoImage}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default ClientsSection;
