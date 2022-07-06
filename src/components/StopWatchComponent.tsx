import { Button } from "@mui/material";
import styles from "../styles/StopwatchComponent.module.scss";
import React from "react";

interface StateInterface {
  time: number;
  running: boolean;
  resetStop: boolean | string;
}

interface PropsInterface {}

export default class StopWatchComponent extends React.Component<
  PropsInterface,
  StateInterface
> {
  interval: any;

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

  componentDidUpdate(prevProps: any, prevState: any) {
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      window.location.href = "/";
    }

    if (!prevState.running && this.state.running) {
      this.interval = setInterval(() => {
        console.log(this.state.running, "running-state");
        this.setState({ time: this.state.time + 10 });
      }, 10);
      // console.log(this.interval, "running-interval");
    } else if (!this.state.running) {
      //console.log(this.interval, "stopped-interval");
      localStorage.setItem("time", JSON.stringify(this.state.time));
      clearInterval(this.interval);
      //console.log(this.state.time, "time");
    }

    let data = (window.performance.getEntriesByType("navigation")[0] as any)
      .type;
    if (data === "reload" && this.state.resetStop! == "false") {
      this.setState({ resetStop: true });
    } else if (this.state.resetStop == "true") {
      this.setState({ running: false });
    }

    if (this.state.running) {
      localStorage.setItem("time", JSON.stringify(this.state.running));
    }

    console.log(prevState, "prevState");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /*
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
  
  
  */

  render() {
    return (
      <div className={styles.stopwatchTimer}>
        <div className={`row mb-3 mx-2`}>
          <div className="col-12">
            <span className={`${styles.stopwatchTimes}`}>
              {("0" + Math.floor((this.state.time / 60000) % 60)).slice(-2)}:
            </span>
            <span className={styles.stopwatchTimes}>
              {("0" + Math.floor((this.state.time / 1000) % 60)).slice(-2)}:
            </span>
            <span className={styles.stopwatchTimes}>
              {("0" + ((this.state.time / 10) % 100)).slice(-2)}
            </span>
          </div>
        </div>
        <div className="row text-center">
          <Button
            variant="contained"
            className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
            onClick={() => {
              this.setState({ running: true });
              this.setState({ resetStop: false });
              localStorage.setItem("resetStop", JSON.stringify(false));
            }}
          >
            Start
          </Button>
          <Button
            variant="contained"
            className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
            onClick={() => {
              this.setState({ running: false });
              this.setState({ resetStop: true });
              localStorage.setItem("resetStop", JSON.stringify(true));
            }}
          >
            Stop
          </Button>
          <Button
            variant="contained"
            className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
            onClick={() => {
              this.setState({ resetStop: true });
              this.setState({ time: 0 });
              this.setState({ running: false });
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
