import { Button } from "@mui/material";
import styles from "../styles/StopwatchComponent.module.scss";
import React from "react";
import { count } from "console";

interface StateInterface {
  time: number;
  running: boolean | string;
  resetStop: boolean | string;
}

let interval: any;
interface PropsInterface {}

export default class StopWatchComponent extends React.Component<
  PropsInterface,
  StateInterface
> {
  constructor(props: any) {
    super(props);
    this.state = {
      time: localStorage.getItem("time")
        ? parseInt(localStorage.getItem("time") as string)
        : 0,
      running: localStorage.getItem("running") === "true",
      resetStop: localStorage.getItem("resetStop") === "true",
    };

    console.log("inside constructor");
    clearInterval(interval);
  }

  componentDidMount() {
    this.setState({
      time: localStorage.getItem("time")
        ? parseInt(localStorage.getItem("time") as string)
        : 0,
      running: localStorage.getItem("running") === "true",
      resetStop: localStorage.getItem("resetStop") === "true",
    });

    clearInterval(interval);
  }

  componentDidUpdate() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      window.location.href = "/";
    }

    if (this.state.running && !this.state.resetStop && interval) {
      clearInterval(interval);
      interval = null;
    }
    if (this.state.running && !interval) {
      interval = setInterval(() => {
        this.setState({ time: this.state.time + 10 });
        localStorage.setItem("time", JSON.stringify(this.state.time));
      }, 10);
    } else if (!this.state.running && interval) {
      localStorage.setItem("time", JSON.stringify(this.state.time));
      clearInterval(interval);
    }

    let data = (window.performance.getEntriesByType("navigation")[0] as any)
      .type;
    if (data === "reload" && this.state.resetStop! == "false") {
      this.setState({ resetStop: true });
    } else if (this.state.resetStop == "true") {
      this.setState({ running: false });
    }

    if (this.state.running) {
      localStorage.setItem("running", JSON.stringify(this.state.running));
    }
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

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
              this.setState({ running: true, resetStop: false });
              localStorage.setItem("resetStop", JSON.stringify(false));
            }}
          >
            Start
          </Button>
          <Button
            variant="contained"
            className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
            onClick={() => {
              clearInterval(interval);
              this.setState({ running: false, resetStop: true });
              localStorage.setItem("resetStop", JSON.stringify(true));
              localStorage.setItem("running", JSON.stringify(false));
            }}
          >
            Stop
          </Button>
          <Button
            variant="contained"
            className={`${styles.stopwatchButtons} col-lg-3 col-xs-12 mx-4`}
            onClick={() => {
              clearInterval(interval);
              this.setState({ resetStop: true, time: 0, running: false });
              localStorage.setItem("time", JSON.stringify(0));
              localStorage.setItem("resetStop", JSON.stringify(true));
              localStorage.setItem("running", JSON.stringify(false));
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}
