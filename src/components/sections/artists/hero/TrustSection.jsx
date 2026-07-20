import PlatformMarquee, {
  platformMarqueeStyles as marqueeStyles,
} from '../../../common/PlatformMarquee';
import { heroClasses } from './heroClasses';

/**
 * Bottom trust bar — trust copy + infinite platform marquee (same as Home Hero).
 */
function TrustSection({ trustSection }) {
  if (!trustSection?.enabled) return null;

  const { trustClass } = heroClasses;
  const { text, platforms = [], stat } = trustSection;

  if (!platforms.length) return null;

  const support = text ? (
    <p className={marqueeStyles.supportCopy}>
      {text.prefix}
      <span className={marqueeStyles.supportHighlight}>{text.highlight}</span>
      {text.suffix}
    </p>
  ) : null;

  const heading = stat ? 'Available On' : undefined;
  const highlightText = stat ? `${stat.value} ${stat.label}` : undefined;

  return (
    <div className={trustClass.root}>
      <PlatformMarquee
        items={platforms}
        heading={heading}
        highlightText={highlightText}
        support={support}
      />
    </div>
  );
}

export default TrustSection;
