import { motion, useReducedMotion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';
import { homeHeroMotion as motionConfig } from '../../../../config/homeHeroMotion';

/**
 * Left-column hero stack — tight vertical rhythm matching the approved wireframe.
 * Renders badge, brand H1, headline, gradient divider, description, and CTA buttons.
 */
function HeroContent({ badge, heading, description, buttons }) {
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
          role="status"
        >
          {BadgeIcon ? (
            <BadgeIcon
              size={14}
              strokeWidth={2.25}
              className={content.badgeIcon}
              aria-hidden="true"
            />
          ) : null}
          <span className="min-w-0 uppercase">{badge.label}</span>
        </motion.div>
      ) : null}

      {heading?.brandName ? (
        <motion.h1 id={heading.id} className={content.brandName} variants={itemVariants}>
          {heading.brandName}
        </motion.h1>
      ) : null}

      {heading ? (
        <motion.p className={content.heading} variants={itemVariants}>
          <span className={content.headingLine}>{heading.lineOne}</span>
          <span className={content.headingLine}>
            {heading.lineTwoPrimary}{' '}
            <span className={content.accent}>{heading.lineTwoAccent}</span>
          </span>
        </motion.p>
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

      <motion.div variants={itemVariants} className="w-full">
        <HeroButtons buttons={buttons} />
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
