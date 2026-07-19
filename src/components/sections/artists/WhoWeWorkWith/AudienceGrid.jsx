import AudienceCard from './AudienceCard';
import { artistsLabelsWhoWeWorkWithStyles as styles } from '../../../../config/artistsLabelsWhoWeWorkWithStyles';

/**
 * Responsive grid of audience cards.
 */
function AudienceGrid({ audiences = [] }) {
  if (!audiences.length) return null;

  return (
    <div className={styles.grid.wrapper}>
      {audiences.map((audience) => (
        <AudienceCard key={audience.id} audience={audience} />
      ))}
    </div>
  );
}

export default AudienceGrid;
