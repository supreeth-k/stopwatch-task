import LoginComponent from "../components/LoginComponent";
import styles from "../styles/LoginComponent.module.scss";

export default function Login() {
  return (
    <div className={styles.loginParentContainer}>
      <LoginComponent />
    </div>
  );
}
