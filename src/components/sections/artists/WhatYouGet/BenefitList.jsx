import BenefitRow from './BenefitRow';
import { artistsLabelsWhatYouGetStyles as styles } from '../../../../config/artistsLabelsWhatYouGetStyles';
import { MotionStagger, MotionItem } from '../../../motion';

/**
 * Stacked list of alternating benefit rows.
 */
function BenefitList({ items = [] }) {
  if (!items.length) return null;

  return (
    <MotionStagger className={styles.list.wrapper} stagger={0.1}>
      {items.map((item) => (
        <MotionItem key={item.id}>
          <BenefitRow item={item} />
        </MotionItem>
      ))}
    </MotionStagger>
  );
}

export default BenefitList;
