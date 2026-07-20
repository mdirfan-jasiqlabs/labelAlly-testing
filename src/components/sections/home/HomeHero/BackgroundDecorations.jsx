import { homeHeroStyles as styles } from '../../../../config/homeHeroStyles';

const SPECTRUM_BAR_COUNT = 28;

const NODE_POSITIONS = [
  'top-[18%] left-[12%]',
  'top-[28%] right-[16%]',
  'bottom-[34%] left-[22%]',
  'bottom-[26%] right-[24%]',
  'top-[36%] left-[44%]',
  'top-[22%] right-[38%]',
];

/**
 * Soft ambient music-distribution background — waveforms, spectrum, and nodes.
 */
function BackgroundDecorations() {
  const { decorations: d } = styles;

  return (
    <div className={d.layer} aria-hidden="true">
      <div className={d.orbPrimary} />
      <div className={d.orbAccent} />
      <div className={d.orbSecondary} />

      <div className={d.waveBand}>
        <svg
          className={d.waveSvg}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            className={d.wavePathA}
            d="M0,64 C180,24 360,96 540,56 C720,16 900,88 1080,48 C1260,8 1380,72 1440,56 L1440,120 L0,120 Z"
          />
          <path
            className={d.wavePathB}
            d="M0,78 C220,38 420,98 640,62 C860,26 1080,92 1320,54 L1440,62 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className={d.spectrumRow}>
        {Array.from({ length: SPECTRUM_BAR_COUNT }, (_, index) => (
          <span
            key={`spectrum-${index}`}
            className={d.spectrumBar}
            style={{ animationDelay: `${(index % 10) * 90}ms` }}
          />
        ))}
      </div>

      <div className={d.networkField}>
        {NODE_POSITIONS.map((position, index) => (
          <span
            key={`node-${index}`}
            className={[d.networkNode, position].join(' ')}
            style={{ animationDelay: `${index * 1.1}s` }}
          />
        ))}
      </div>

      <div className={d.flowLine} />
      <div className={d.flowLineAlt} />
    </div>
  );
}

export default BackgroundDecorations;
