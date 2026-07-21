import AudienceCard from './AudienceCard';
import { artistsLabelsWhoWeWorkWithStyles as styles } from '../../../../config/artistsLabelsWhoWeWorkWithStyles';
import { MotionStagger, MotionItem } from '../../../motion';

/**
 * Responsive grid of audience cards.
 */
function AudienceGrid({ audiences = [] }) {
  if (!audiences.length) return null;

  return (
    <MotionStagger className={styles.grid.wrapper} stagger={0.08}>
      {audiences.map((audience) => (
        <MotionItem key={audience.id}>
          <AudienceCard audience={audience} />
        </MotionItem>
      ))}
    </MotionStagger>
  );
}

export default AudienceGrid;
