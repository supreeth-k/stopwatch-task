import React from "react";
import LoginComponent from "../components/LoginComponent";
import styles from "../styles/LoginComponent.module.scss";

export default class Login extends React.Component {
  render() {
    return (
      <div className={styles.loginParentContainer}>
        <LoginComponent />
      </div>
    );
  }
}
