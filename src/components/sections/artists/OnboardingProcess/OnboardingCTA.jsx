import CTAButtons from './CTAButtons';
import CTAHighlights from './CTAHighlights';
import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Split onboarding CTA banner — copy left, studio image right.
 */
function OnboardingCTA({ cta }) {
  if (!cta) return null;

  const { cta: ctaStyles } = styles;

  return (
    <div className={ctaStyles.wrapper}>
      <div className={ctaStyles.content}>
        {cta.eyebrow ? (
          <p className={ctaStyles.eyebrow}>
            <span className={ctaStyles.eyebrowLine} aria-hidden="true" />
            <span>{cta.eyebrow.label}</span>
            <span className={ctaStyles.eyebrowLine} aria-hidden="true" />
          </p>
        ) : null}

        {cta.heading ? (
          <h3 className={ctaStyles.heading}>
            <span className="block">{cta.heading.firstLine}</span>
            <span className="block">
              <span className={ctaStyles.highlightedLimitless}>
                {cta.heading.secondLinePrefix}
              </span>{' '}
              <span className={ctaStyles.highlightedPossibilities}>
                {cta.heading.highlightedText}
              </span>
            </span>
          </h3>
        ) : null}

        {cta.description ? (
          <p className={ctaStyles.description}>{cta.description}</p>
        ) : null}

        <CTAHighlights highlights={cta.highlights} />
        <CTAButtons buttons={cta.buttons} />
      </div>

      {cta.image ? (
        <div className={ctaStyles.imageWrapper}>
          <img
            src={cta.image.src}
            alt={cta.image.alt}
            width={cta.image.width}
            height={cta.image.height}
            loading="lazy"
            decoding="async"
            className={ctaStyles.image}
          />
        </div>
      ) : null}
    </div>
  );
}

export default OnboardingCTA;
