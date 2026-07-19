import BenefitRow from './BenefitRow';
import { artistsLabelsWhatYouGetStyles as styles } from '../../../../config/artistsLabelsWhatYouGetStyles';

/**
 * Stacked list of alternating benefit rows.
 */
function BenefitList({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className={styles.list.wrapper}>
      {items.map((item) => (
        <BenefitRow key={item.id} item={item} />
      ))}
    </div>
  );
}

export default BenefitList;
