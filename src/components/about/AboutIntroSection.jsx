import Container from '../common/Container';
import AboutInfoGroup from './AboutInfoGroup';
import AboutImageGallery from './AboutImageGallery';
import { aboutIntroData } from '../../data/aboutData';

/**
 * AboutIntroSection — Main layout containing Left (Content + Info blocks)
 * and Right (2x2 Image gallery).
 */
function AboutIntroSection() {
  const { label, heading, paragraphs, whatWeDo, whyChooseUs } = aboutIntroData;

  // Filter enabled paragraphs
  const enabledParagraphs = paragraphs
    ? paragraphs.filter((p) => p.enabled)
    : [];

  return (
    <section
      role="region"
      aria-label="LabelAlly Introduction and Services"
      className="section-spacing bg-white dark:bg-theme-section transition-colors duration-250"
    >
      <Container size="2xl">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-start justify-between min-w-0">
          
          {/* ── Left Column: Company Info and Services (approx 50%) ── */}
          <div className="w-full lg:w-[50%] min-w-0 flex flex-col items-start text-left shrink-0 order-1">
            {/* Small Badge / Label */}
            {label && (
              <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 mb-5 md:mb-6 shadow-sm select-none">
                {label}
              </span>
            )}

            {/* Main Heading */}
            {heading && (
              <h2 className="font-heading font-black tracking-tight leading-[1.1] text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-theme-heading mb-5 md:mb-6 text-balance">
                {heading}
              </h2>
            )}

            {/* Introductory Paragraphs */}
            {enabledParagraphs.length > 0 && (
              <div className="flex flex-col gap-4 sm:gap-5 w-full text-[0.95rem] sm:text-base leading-relaxed text-neutral-600 dark:text-theme-body lg:max-w-xl">
                {enabledParagraphs.map((para) => (
                  <p key={para.id}>{para.text}</p>
                ))}
              </div>
            )}

            {/* First Divider */}
            <hr className="w-full border-t border-neutral-200/60 dark:border-theme-border/40 my-6 md:my-8" />

            {/* What We Do block */}
            {whatWeDo && whatWeDo.enabled && (
              <AboutInfoGroup
                title={whatWeDo.title}
                icon={whatWeDo.icon}
                items={whatWeDo.items}
              />
            )}

            {/* Second Divider */}
            <hr className="w-full border-t border-neutral-200/60 dark:border-theme-border/40 my-5 md:my-6" />

            {/* Why Choose Us block */}
            {whyChooseUs && whyChooseUs.enabled && (
              <AboutInfoGroup
                title={whyChooseUs.title}
                icon={whyChooseUs.icon}
                items={whyChooseUs.items}
              />
            )}
          </div>

          {/* ── Right Column: 2x2 Image Gallery (approx 50%) ── */}
          <div className="w-full lg:w-[48%] min-w-0 flex justify-center lg:justify-end items-start lg:sticky lg:top-24 order-2">
            <AboutImageGallery />
          </div>

        </div>
      </Container>
    </section>
  );
}

export default AboutIntroSection;
