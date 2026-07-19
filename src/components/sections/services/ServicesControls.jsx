import { ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../../common/Button';

/**
 * ServicesControls — Show More / Show Less buttons for batched service display.
 */
function ServicesControls({
  visibleCount,
  totalCount,
  batchSize,
  showMoreLabel,
  showLessLabel,
  onShowMore,
  onShowLess,
}) {
  const canShowMore = visibleCount < totalCount;
  const canShowLess = visibleCount > batchSize;

  if (!canShowMore && !canShowLess) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
      {/* Show Less Button */}
      {canShowLess && (
        <Button
          variant="outline"
          size="md"
          onClick={onShowLess}
          leftIcon={<ChevronUp size={16} aria-hidden="true" />}
          className="w-full sm:w-auto"
        >
          {showLessLabel}
        </Button>
      )}

      {/* Show More Button */}
      {canShowMore && (
        <Button
          variant="primary"
          size="md"
          onClick={onShowMore}
          rightIcon={<ChevronDown size={16} aria-hidden="true" />}
          className="w-full sm:w-auto"
        >
          {showMoreLabel}
        </Button>
      )}
    </div>
  );
}

export default ServicesControls;
