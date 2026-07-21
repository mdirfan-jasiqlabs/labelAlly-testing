import Container from '../common/Container';
import AboutDecorations from './AboutDecorations';
import TeamValueCard from './TeamValueCard';
import { teamSectionData } from '../../data/aboutData';
import { MotionItem, MotionStagger, MotionSection } from '../motion';

/**
 * TeamSection — Creative Team value section with centered heading and four cards.
 */
function TeamSection() {
  if (!teamSectionData?.enabled) return null;

  const { badge, heading, paragraphs, valuesHeading, values, decorations } = teamSectionData;

  const enabledParagraphs = (paragraphs ?? []).filter((para) => para.enabled);
  const enabledValues = (values ?? []).filter((value) => value.enabled);

  if (enabledValues.length === 0) return null;

  return (
    <section
      role="region"
      aria-labelledby="team-section-heading"
      className="relative w-full overflow-hidden bg-surface-page dark:bg-theme-section section-spacing transition-colors duration-250"
    >
      <AboutDecorations decorations={decorations} />

      <Container size="2xl" className="relative z-10">
        {/* ── Centered Heading Group ── */}
        <MotionItem
          standalone
          className="flex flex-col items-center text-center section-heading-stack"
        >
          {badge?.enabled && badge.text && (
            <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-accent-500 dark:bg-accent-600 mb-5 md:mb-6 shadow-sm select-none">
              {badge.text}
            </span>
          )}

          {heading && (
            <h2
              id="team-section-heading"
              className="font-heading font-black tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-5xl text-ink-primary dark:text-theme-heading max-w-4xl"
            >
              {heading}
            </h2>
          )}

          <div
            aria-hidden="true"
            className="h-1 w-20 bg-gradient-to-r from-amber-400 via-pink-500 to-teal-400 rounded-full mt-5 md:mt-6"
          />
        </MotionItem>

        {/* ── Introductory Paragraphs (one unit — not per-paragraph) ── */}
        <MotionSection className="max-w-5xl mx-auto w-full">
          {enabledParagraphs.length > 0 && (
            <div className="flex flex-col gap-5 md:gap-6 text-left section-heading-stack">
              {enabledParagraphs.map((paragraph) => {
                const enabledSegments = (paragraph.segments ?? []).filter((segment) => segment.text);

                return (
                  <p
                    key={paragraph.id}
                    className="text-[0.92rem] sm:text-base leading-relaxed text-ink-secondary dark:text-theme-body"
                  >
                    {enabledSegments.map((segment) => (
                      <span
                        key={segment.id}
                        className={segment.emphasis ? 'font-semibold text-ink-primary dark:text-theme-heading' : ''}
                      >
                        {segment.text}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>
          )}

          {valuesHeading?.enabled && valuesHeading.text && (
            <div className="text-left section-subheading-stack">
              <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-ink-primary dark:text-theme-heading leading-snug">
                {valuesHeading.text}
              </h3>
              <div
                aria-hidden="true"
                className="h-0.5 w-12 bg-pink-500 dark:bg-pink-400 rounded-full mt-3"
              />
            </div>
          )}
        </MotionSection>

        {/* ── Value Cards Grid ── */}
        <MotionStagger
          as="ul"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 list-none p-0 m-0"
          stagger={0.08}
        >
          {enabledValues.map((value) => (
            <MotionItem key={value.id} as="li" className="h-full">
              <TeamValueCard value={value} />
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}

export default TeamSection;
