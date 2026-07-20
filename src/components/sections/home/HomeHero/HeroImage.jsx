import { motion, useReducedMotion } from 'framer-motion';
import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';
import { homeHeroMotion as motionConfig } from '../../../../config/homeHeroMotion';

/** Equalizer bar count — denser music-player visualizer */
const WAVE_BAR_COUNT = 42;

/** Cycle animation speeds so the waveform feels organic */
const EQ_ANIMATIONS = [
  'motion-safe:animate-eq-bar',
  'motion-safe:animate-eq-bar-fast',
  'motion-safe:animate-eq-bar-slow',
];

/**
 * Hero artwork — soft purple disc, animated equalizer, artist photo.
 */
function HeroImage({ image }) {
  const reduceMotion = useReducedMotion();

  if (!image?.src) return null;

  const MusicIcon = getHomeHeroIcon('music');
  const { image: s } = styles;
  const stageVariants = reduceMotion
    ? motionConfig.imageStageReduced
    : motionConfig.imageStage;

  return (
    <div className={s.col}>
      <motion.div
        className={s.stage}
        variants={stageVariants}
        initial="hidden"
        animate="visible"
        whileHover={
          reduceMotion
            ? undefined
            : { y: -4, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
        }
      >
        <div className={s.glowSoft} aria-hidden="true" />
        <div className={s.glowAccent} aria-hidden="true" />
        <div className={s.glow} aria-hidden="true" />
        <div className={s.ring} aria-hidden="true" />
        <div className={s.ringInner} aria-hidden="true" />

        <div className={s.waveWrap} aria-hidden="true">
          <div className={s.waveRow}>
            {Array.from({ length: WAVE_BAR_COUNT }, (_, index) => {
              const animationClass = EQ_ANIMATIONS[index % EQ_ANIMATIONS.length];
              const delayMs = (index % 14) * 65;

              return (
                <span
                  key={`wave-${index}`}
                  className={`${s.waveBar} ${animationClass}`}
                  style={{ animationDelay: `${delayMs}ms` }}
                />
              );
            })}
          </div>
        </div>

        <div className={s.floatBadge} aria-hidden="true">
          <MusicIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
        </div>

        <motion.div
          className={s.figure}
          whileHover={
            reduceMotion
              ? undefined
              : { scale: 1.02, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
          }
        >
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={s.img}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroImage;
