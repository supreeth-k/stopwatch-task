import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import styles from "../styles/StopwatchComponent.module.scss";

const StopWatchComponent = () => {
  const [time, setTime] = useState<any>(
    localStorage.getItem("time")
      ? parseInt(localStorage.getItem("time") as string)
      : 0
  );
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      window.location.href = "/";
    }

    let interval: any;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime: any) => prevTime + 10);
        localStorage.setItem("time", JSON.stringify(time));
      }, 10);
    } else if (!running) {
      localStorage.setItem("time", JSON.stringify(time));
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className={styles.stopwatchTimer}>
      <div className={`row mb-3 mx-2`}>
        <div className="col-12">
          <span className={`${styles.stopwatchTimes}`}>
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          </span>
          <span className={styles.stopwatchTimes}>
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
          </span>
          <span className={styles.stopwatchTimes}>
            {("0" + ((time / 10) % 100)).slice(-2)}
          </span>
        </div>
      </div>
      <div className="row text-center">
        <Button
          variant="contained"
          className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
          onClick={() => setRunning(true)}
        >
          Start
        </Button>
        <Button
          variant="contained"
          className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
          onClick={() => setRunning(false)}
        >
          Stop
        </Button>
        <Button
          variant="contained"
          className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
          onClick={() => {
            setTime(0);
            localStorage.setItem("time", JSON.stringify(0));
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default StopWatchComponent;
