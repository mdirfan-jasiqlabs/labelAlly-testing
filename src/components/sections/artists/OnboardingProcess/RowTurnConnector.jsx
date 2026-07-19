import { artistsLabelsOnboardingStyles as styles } from '../../../../config/artistsLabelsOnboardingStyles';

/**
 * U-turn dashed path from step 03 down and across into step 04.
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
          d="M 1085 0
             C 1175 0, 1190 25, 1190 40
             C 1190 62, 1155 80, 1060 80
             H 220"
        />
      </svg>
    </div>
  );
}

export default RowTurnConnector;
