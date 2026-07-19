import Container from '../common/Container';
import AboutDecorations from './AboutDecorations';
import TeamValueCard from './TeamValueCard';
import { teamSectionData } from '../../data/aboutData';

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
      className="relative w-full overflow-hidden bg-white dark:bg-theme-section py-16 md:py-24 lg:py-28 transition-colors duration-250"
    >
      <AboutDecorations decorations={decorations} />

      <Container size="2xl" className="relative z-10">
        {/* ── Centered Heading Group ── */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-12 lg:mb-14">
          {badge?.enabled && badge.text && (
            <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-accent-500 dark:bg-accent-600 mb-5 md:mb-6 shadow-sm select-none">
              {badge.text}
            </span>
          )}

          {heading && (
            <h2
              id="team-section-heading"
              className="font-heading font-black tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-5xl text-neutral-900 dark:text-theme-heading max-w-4xl"
            >
              {heading}
            </h2>
          )}

          <div
            aria-hidden="true"
            className="h-1 w-20 bg-gradient-to-r from-amber-400 via-pink-500 to-teal-400 rounded-full mt-5 md:mt-6"
          />
        </div>

        {/* ── Introductory Paragraphs ── */}
        {enabledParagraphs.length > 0 && (
          <div className="flex flex-col gap-5 md:gap-6 text-left max-w-5xl mx-auto mb-12 md:mb-14 lg:mb-16">
            {enabledParagraphs.map((paragraph) => {
              const enabledSegments = (paragraph.segments ?? []).filter((segment) => segment.text);

              return (
                <p
                  key={paragraph.id}
                  className="text-[0.92rem] sm:text-base leading-relaxed text-neutral-600 dark:text-theme-body"
                >
                  {enabledSegments.map((segment) => (
                    <span
                      key={segment.id}
                      className={segment.emphasis ? 'font-semibold text-neutral-800 dark:text-theme-heading' : ''}
                    >
                      {segment.text}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>
        )}

        {/* ── Secondary Heading ── */}
        {valuesHeading?.enabled && valuesHeading.text && (
          <div className="text-left mb-8 md:mb-10">
            <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-neutral-900 dark:text-theme-heading leading-snug">
              {valuesHeading.text}
            </h3>
            <div
              aria-hidden="true"
              className="h-0.5 w-12 bg-pink-500 dark:bg-pink-400 rounded-full mt-3"
            />
          </div>
        )}

        {/* ── Value Cards Grid ── */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 list-none p-0 m-0">
          {enabledValues.map((value) => (
            <li key={value.id} className="h-full">
              <TeamValueCard value={value} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default TeamSection;
