import { getHeroIcon } from './heroIcons';
import { heroClasses } from './heroClasses';

/**
 * Floating “Music Available On” glass card with full-color platform logos.
 */
function PlatformCard({ card }) {
  if (!card) return null;

  const { cardClass, platformClass } = heroClasses;
  const FooterIcon = getHeroIcon(card.footer?.icon);

  return (
    <aside className={cardClass} aria-label={card.title}>
      <p className={platformClass.title}>{card.title}</p>

      <div className={platformClass.logoRow}>
        {(card.platforms ?? []).map((platform) => (
          <img
            key={platform.id}
            src={platform.logo}
            alt={platform.alt || platform.name}
            width={72}
            height={20}
            loading="lazy"
            decoding="async"
            className={platformClass.logo}
          />
        ))}
      </div>

      {card.footer?.text ? (
        <p className={platformClass.footer}>
          <FooterIcon size={14} strokeWidth={2.25} aria-hidden="true" />
          <span>{card.footer.text}</span>
        </p>
      ) : null}
    </aside>
  );
}

export default PlatformCard;
