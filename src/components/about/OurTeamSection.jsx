import { useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import TeamMemberCard from './TeamMemberCard';
import TeamCTA from './TeamCTA';
import teamData from '../../data/about/team.json';
import { MotionItem, MotionStagger } from '../motion';

/**
 * OurTeamSection — People grid for the About page (above Testimonials).
 *
 * Named OurTeamSection to avoid colliding with the existing Creative Team
 * TeamSection. Content is driven by src/data/about/team.json.
 * Hides entirely when there are no members.
 */
function OurTeamSection() {
  if (!teamData?.enabled) return null;

  const { eyebrow, title, description, members = [], cta, controls } = teamData;
  const enabledMembers = members.filter((member) => member?.id && member?.name);
  const sectionRef = useRef(null);
  const batchSize = controls?.batchSize ?? 3;
  const showMoreLabel = controls?.showMoreLabel ?? 'Show More';
  const showLessLabel = controls?.showLessLabel ?? 'Show Less';
  const [visibleCount, setVisibleCount] = useState(batchSize);

  if (enabledMembers.length === 0) return null;

  const visibleMembers = enabledMembers.slice(0, visibleCount);
  const canShowMore = visibleCount < enabledMembers.length;
  const canShowLess = visibleCount > batchSize;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, enabledMembers.length));
  };

  const handleShowLess = () => {
    setVisibleCount(batchSize);

    window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 120);
  };

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-labelledby="our-team-heading"
      className="relative w-full overflow-hidden bg-surface-secondary dark:bg-theme-section section-spacing border-t border-theme-border/40 dark:border-theme-border/50 transition-colors duration-250"
    >
      <Container size="2xl" className="relative z-10">
        {/* Header */}
        <MotionItem
          standalone
          className="flex flex-col items-center text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          {eyebrow && (
            <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-theme-action-primaryForeground bg-theme-action-primary dark:bg-theme-action-primary shadow-sm select-none mb-5 sm:mb-6">
              {eyebrow}
            </span>
          )}

          {title && (
            <h2
              id="our-team-heading"
              className="font-heading font-black tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-5xl text-ink-primary dark:text-theme-heading max-w-4xl text-balance"
            >
              {title}
            </h2>
          )}

          <div
            aria-hidden="true"
            className="h-1 w-14 sm:w-16 rounded-full bg-theme-action-primary mt-5 sm:mt-6"
          />

          {description && (
            <p className="mt-5 sm:mt-6 text-[0.92rem] sm:text-base md:text-lg leading-relaxed text-ink-secondary dark:text-theme-body max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </MotionItem>

        {/* Cards — 1 / 2 / 3 columns with progressive reveal */}
        <MotionStagger
          as="ul"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 list-none p-0 m-0"
          stagger={0.08}
        >
          {visibleMembers.map((member, index) => {
            if (index >= batchSize) {
              return (
                <MotionItem
                  key={member.id}
                  as="li"
                  standalone
                  className="h-full min-w-0"
                >
                  <TeamMemberCard member={member} />
                </MotionItem>
              );
            }

            return (
              <MotionItem key={member.id} as="li" className="h-full min-w-0">
                <TeamMemberCard member={member} />
              </MotionItem>
            );
          })}
        </MotionStagger>

        {(canShowMore || canShowLess) && (
          <MotionItem
            standalone
            className="mt-10 sm:mt-12 md:mt-14 flex flex-wrap items-center justify-center gap-4"
          >
            {canShowMore && (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleShowMore}
                rightIcon={<ChevronDown size={16} aria-hidden="true" />}
                className="w-full sm:w-auto min-w-[10.5rem] dark:text-orange-400 dark:hover:text-orange-300 dark:border-orange-400/70 dark:hover:border-orange-400 dark:hover:bg-theme-action-primary/10"
              >
                {showMoreLabel}
              </Button>
            )}

            {canShowLess && (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleShowLess}
                rightIcon={<ChevronUp size={16} aria-hidden="true" />}
                className="w-full sm:w-auto min-w-[10.5rem]"
              >
                {showLessLabel}
              </Button>
            )}
          </MotionItem>
        )}

        {/* CTA — no duplicate page-level CTA after Testimonials on About */}
        {cta?.enabled && (
          <MotionItem standalone className="mt-12 sm:mt-14 md:mt-16 lg:mt-20">
            <TeamCTA cta={cta} />
          </MotionItem>
        )}
      </Container>
    </section>
  );
}

export default OurTeamSection;
