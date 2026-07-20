import { motion, useReducedMotion } from 'framer-motion';
import FeatureRow from './FeatureRow';
import HeroButtons from './HeroButtons';
import HeroImage from './HeroImage';
import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';
import { homeHeroMotion as motionConfig } from '../../../../config/homeHeroMotion';

/**
 * Left-column hero stack — tight vertical rhythm matching the reference.
 * Mobile: image sits between description and CTAs.
 * Desktop: image renders in the sibling column via HomeHero.
 */
function HeroContent({ badge, heading, description, buttons, features, image }) {
  const reduceMotion = useReducedMotion();
  const itemVariants = reduceMotion ? motionConfig.itemReduced : motionConfig.item;
  const BadgeIcon = badge ? getHomeHeroIcon(badge?.icon) : null;
  const { content } = styles;

  return (
    <motion.div
      className={content.stack}
      variants={motionConfig.container}
      initial="hidden"
      animate="visible"
    >
      {badge ? (
        <motion.div
          variants={itemVariants}
          className={[content.badge, content.badgeInteractive].filter(Boolean).join(' ')}
        >
          <BadgeIcon
            size={14}
            className={content.badgeIcon}
            fill="currentColor"
            aria-hidden="true"
          />
          <span>{badge.label}</span>
        </motion.div>
      ) : null}

      {heading ? (
        <motion.h1 id={heading.id} className={content.heading} variants={itemVariants}>
          <span className={content.headingLine}>{heading.lineOne}</span>
          <span className={content.headingLine}>
            {heading.lineTwoPrimary}{' '}
            <span className={content.accent}>{heading.lineTwoAccent}</span>
          </span>
        </motion.h1>
      ) : null}

      {heading ? (
        <motion.div
          aria-hidden="true"
          className={content.divider}
          variants={itemVariants}
        />
      ) : null}

      {description ? (
        <motion.p className={content.description} variants={itemVariants}>
          {description}
        </motion.p>
      ) : null}

      {image ? (
        <motion.div className={content.mobileImage} variants={itemVariants}>
          <HeroImage image={image} />
        </motion.div>
      ) : null}

      <motion.div variants={itemVariants} className="w-full">
        <HeroButtons buttons={buttons} />
      </motion.div>

      <FeatureRow features={features} itemVariants={itemVariants} />
    </motion.div>
  );
}

export default HeroContent;
