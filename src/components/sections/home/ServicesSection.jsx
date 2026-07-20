import { motion, useReducedMotion } from 'framer-motion';
import Container from '../../common/Container';
import servicesData from '../../../data/servicesSection.json';
import { homeServicesStyles as styles } from '../../../config/homeServicesStyles';
import { homeSectionsMotion as motionConfig } from '../../../config/homeSectionsMotion';

const SPECTRUM_BAR_COUNT = 8;

function ServicesSectionBackground() {
  const { background: bg } = styles;

  return (
    <div className={bg.layer} aria-hidden="true">
      <div className={bg.dotGrid} />
      <div className={bg.orbPrimary} />
      <div className={bg.orbAccent} />
      <div className={bg.flowLine} />
      <div className={bg.flowLineAlt} />

      <div className={bg.spectrumRow}>
        {Array.from({ length: SPECTRUM_BAR_COUNT }, (_, index) => (
          <span
            key={`services-spectrum-${index}`}
            className={bg.spectrumBar}
            style={{ animationDelay: `${(index % 6) * 100}ms` }}
          />
        ))}
      </div>

      {styles.sparkPositions.map((position, index) => (
        <span
          key={`services-node-${index}`}
          className={[bg.node, position].join(' ')}
          style={{ animationDelay: `${index * 0.6}s` }}
        />
      ))}
    </div>
  );
}

/**
 * ServicesSection — JSON-driven LabelAlly services grid.
 */
function ServicesSection() {
  const reduceMotion = useReducedMotion();

  if (!servicesData || !servicesData.enabled) return null;

  const { badge, heading, description, services } = servicesData;
  const enabledServices = services ? services.filter((s) => s.enabled) : [];

  if (enabledServices.length === 0) return null;

  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;
  const lineVariants = reduceMotion ? motionConfig.lineReduced : motionConfig.line;
  const cardVariants = reduceMotion ? motionConfig.cardReduced : motionConfig.card;

  return (
    <section
      aria-labelledby="services-section-heading"
      className={styles.section}
    >
      <ServicesSectionBackground />

      <Container size="xl" className="relative z-10">
        <div className={styles.grid}>

          <motion.div
            className={styles.intro}
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
                id="services-section-heading"
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

            {description ? (
              <motion.p className={styles.description} variants={itemVariants}>
                {description}
              </motion.p>
            ) : null}
          </motion.div>

          {enabledServices.map((service) => (
            <motion.div
              key={service.id}
              className={styles.serviceCard}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={motionConfig.viewport}
            >
              {service.icon ? (
                <div className={styles.iconWrap}>
                  <img
                    src={service.icon}
                    alt={service.alt || service.title}
                    loading="lazy"
                    decoding="async"
                    width="88"
                    height="88"
                    className="w-full h-full object-contain dark:brightness-110 dark:contrast-[1.03]"
                  />
                </div>
              ) : null}

              <div className={styles.iconAccent} aria-hidden="true" />

              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </motion.div>
          ))}

        </div>
      </Container>
    </section>
  );
}

export default ServicesSection;
