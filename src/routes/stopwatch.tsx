import StopWatchComponent from "../components/StopWatchComponent";
import styles from "../styles/StopwatchComponent.module.scss";

export default function Stopwatch() {
  return (
    <div className={styles.stopwatchComponentContainer}>
      <StopWatchComponent />
    </div>
  );
}
