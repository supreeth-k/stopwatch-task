import React from "react";
import StopWatchComponent from "../components/StopWatchComponent";
import styles from "../styles/StopwatchComponent.module.scss";

export default class Stopwatch extends React.Component {
  render() {
    return (
      <div className={styles.stopwatchComponentContainer}>
        <StopWatchComponent />
      </div>
    );
  }
}
