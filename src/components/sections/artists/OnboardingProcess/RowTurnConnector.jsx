import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * Inter-row turn: 03 ↓ → left → ↓ 04.
 * Starts under 03 (top of gutter), ends above 04 (bottom of gutter).
 * Must not rise on the left — that would attach to 01.
 */
function RowTurnConnector() {
  return (
    <div className={styles.process.rowTurn} aria-hidden="true">
      <svg
        className={styles.process.rowTurnSvg}
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className={styles.process.connectorPath}
          strokeWidth="2.25"
          strokeDasharray="6 9"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 1016 0
             L 1016 28
             C 1016 48, 996 52, 976 52
             H 224
             C 204 52, 184 52, 184 60
             L 184 80"
        />
      </svg>
    </div>
  );
}

export default RowTurnConnector;
