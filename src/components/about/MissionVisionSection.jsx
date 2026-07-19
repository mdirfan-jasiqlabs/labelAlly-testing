import Container from '../common/Container';
import PurposeCard from './PurposeCard';
import AboutDecorations from './AboutDecorations';
import { missionVisionData } from '../../data/aboutData';

/**
 * MissionVisionSection — Centered heading with stacked Mission and Vision cards.
 */
function MissionVisionSection() {
  if (!missionVisionData?.enabled) return null;

  const { eyebrow, heading, cards, decorations } = missionVisionData;

  const enabledCards = (cards ?? []).filter((card) => card.enabled);

  if (enabledCards.length === 0) return null;

  return (
    <section
      role="region"
      aria-labelledby="mission-vision-heading"
      className="relative w-full overflow-hidden bg-neutral-50/60 dark:bg-theme-section py-16 md:py-24 lg:py-28 transition-colors duration-250"
    >
      <AboutDecorations decorations={decorations} />

      <Container size="2xl" className="relative z-10">
        {/* ── Heading Group ── */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-14 lg:mb-16">
          {eyebrow?.enabled && eyebrow.text && (
            <div className="flex items-center gap-3 mb-4 md:mb-5">
              <span
                aria-hidden="true"
                className="block w-8 sm:w-10 h-px bg-accent-500/70 dark:bg-accent-400/60"
              />
              <span className="text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400">
                {eyebrow.text}
              </span>
              <span
                aria-hidden="true"
                className="block w-8 sm:w-10 h-px bg-accent-500/70 dark:bg-accent-400/60"
              />
            </div>
          )}

          {heading && (
            <h2
              id="mission-vision-heading"
              className="font-heading font-black tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-5xl text-neutral-900 dark:text-theme-heading max-w-3xl"
            >
              {heading}
            </h2>
          )}

          <div
            aria-hidden="true"
            className="h-1 w-20 bg-gradient-to-r from-amber-400 via-pink-500 to-teal-400 rounded-full mt-5 md:mt-6"
          />
        </div>

        {/* ── Mission & Vision Cards ── */}
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-7 max-w-5xl mx-auto">
          {enabledCards.map((card) => (
            <PurposeCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default MissionVisionSection;
