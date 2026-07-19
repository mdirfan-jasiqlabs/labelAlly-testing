import { getHomeHeroIcon } from './homeHeroIcons';
import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

/**
 * Static bar height classes — full strings so Tailwind can detect them.
 */
const WAVE_BAR_CLASSES = [
  'h-6',
  'h-9',
  'h-12',
  'h-16',
  'h-14',
  'h-20',
  'h-24',
  'h-16',
  'h-12',
  'h-20',
  'h-28',
  'h-20',
  'h-14',
  'h-10',
  'h-16',
  'h-24',
  'h-20',
  'h-12',
  'h-8',
  'h-14',
  'h-20',
  'h-24',
  'h-16',
  'h-12',
  'h-9',
  'h-16',
  'h-20',
  'h-14',
  'h-10',
  'h-7',
  'h-12',
  'h-16',
  'h-14',
  'h-9',
  'h-6',
];

/**
 * Right-column hero artwork — soft purple disc, equalizer wave, artist photo.
 */
function HeroImage({ image }) {
  if (!image?.src) return null;

  const MusicIcon = getHomeHeroIcon('music');
  const { image: s } = styles;

  return (
    <div className={s.col}>
      <div className={s.stage}>
        <div className={s.glowSoft} aria-hidden="true" />
        <div className={s.glow} aria-hidden="true" />

        <div className={s.waveWrap} aria-hidden="true">
          <div className={s.waveRow}>
            {WAVE_BAR_CLASSES.map((heightClass, index) => (
              <span
                key={`wave-${index}`}
                className={`${s.waveBar} ${heightClass}`}
              />
            ))}
          </div>
        </div>

        <div className={s.floatBadge} aria-hidden="true">
          <MusicIcon className="h-5 w-5 xl:h-6 xl:w-6" strokeWidth={2} />
        </div>

        <div className={s.figure}>
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
        </div>
      </div>
    </div>
  );
}

export default HeroImage;
