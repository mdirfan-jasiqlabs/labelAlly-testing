import { getWhoWeWorkWithIcon } from './audienceIcons';
import { artistsLabelsWhoWeWorkWithStyles as styles } from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Bottom trust statement under the audience cards.
 */
function TrustMessage({ trustMessage }) {
  if (!trustMessage?.text) return null;

  const Icon = getWhoWeWorkWithIcon(trustMessage.icon);

  return (
    <p className={styles.trust.wrapper}>
      <Icon
        size={18}
        strokeWidth={2.25}
        className={styles.trust.icon}
        aria-hidden="true"
      />
      <span className={styles.trust.text}>{trustMessage.text}</span>
    </p>
  );
}

export default TrustMessage;
