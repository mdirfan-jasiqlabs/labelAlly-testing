import { heroClasses } from './heroClasses';

/**
 * Bottom trust bar — centered copy, then logos + platform count (reference layout).
 */
function TrustSection({ trustSection }) {
  if (!trustSection?.enabled) return null;

  const { trustClass } = heroClasses;
  const { text, platforms = [], stat } = trustSection;

  return (
    <div className={trustClass.root}>
      <div className={trustClass.shell}>
        <div className={trustClass.layout}>
          {text ? (
            <p className={trustClass.copy}>
              {text.prefix}
              <span className={trustClass.highlight}>{text.highlight}</span>
              {text.suffix}
            </p>
          ) : null}

          <div className={trustClass.logosRow}>
            {platforms.length > 0 ? (
              <div className={trustClass.logosWrap}>
                <ul className={trustClass.logos} aria-label="Distribution platforms">
                  {platforms.map((platform) => (
                    <li key={platform.id} className="shrink-0">
                      <img
                        src={platform.logo}
                        alt={platform.alt || platform.name}
                        width={120}
                        height={32}
                        loading="lazy"
                        decoding="async"
                        className={trustClass.logo}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {stat ? (
              <>
                <div className={trustClass.divider} aria-hidden="true" />
                <p
                  className={trustClass.statWrap}
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  <span className={trustClass.statValue}>{stat.value}</span>
                  <span className={trustClass.statLabel}>{stat.label}</span>
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustSection;
