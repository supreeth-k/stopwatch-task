import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import styles from "../styles/StopwatchComponent.module.scss";
import React from "react";

export default class StopWatchComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      time: localStorage.getItem("time")
        ? parseInt(localStorage.getItem("time") as string)
        : 0,
      running: false,
      resetStop: localStorage.getItem("resetStop")
        ? (localStorage.getItem("resetStop") as string)
        : false,
    };
  }

  render() {
    useEffect(() => {
      let isLoggedIn = localStorage.getItem("isLoggedIn");

      if (!isLoggedIn) {
        window.location.href = "/";
      }

      let interval: any;

      if (running) {
        interval = setInterval(() => {
          setTime((prevTime: any) => prevTime + 10);
        }, 10);
      } else if (!running) {
        localStorage.setItem("time", JSON.stringify(time));
        clearInterval(interval);
      }

      return () => {
        //console.log("cleanup");
        clearInterval(interval);
      };
    }, [running]);

    useEffect(() => {
      console.log(running, "running");
      console.log(resetStop, "resetStop");

      let data = (window.performance.getEntriesByType("navigation")[0] as any)
        .type;
      if (data === "reload" && resetStop! == "false") {
        setRunning(true);
      } else if (resetStop == "true") {
        setRunning(false);
      }

      if (running) {
        localStorage.setItem("time", JSON.stringify(time));
        console.log(time, "time");
      }
    }, [time, running]);

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
            onClick={() => {
              setRunning(true);
              setResetStop(false);
              localStorage.setItem("resetStop", JSON.stringify(false));
            }}
          >
            Start
          </Button>
          <Button
            variant="contained"
            className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
            onClick={() => {
              setRunning(false);
              setResetStop(true);
              localStorage.setItem("resetStop", JSON.stringify(true));
            }}
          >
            Stop
          </Button>
          <Button
            variant="contained"
            className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
            onClick={() => {
              setResetStop(true);
              setTime(0);
              setRunning(false);
              localStorage.setItem("time", JSON.stringify(0));
              localStorage.setItem("resetStop", JSON.stringify(true));
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}
