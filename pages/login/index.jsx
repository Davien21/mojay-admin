import React from "react";
import styles from "./login.module.css";
import LoginForm from "../../components/form/LoginForm";

function LoginPage(props) {
  return (
    <div className={`${styles["container"]} container`}>
      <div className="row align-it ems-center">
        <div className={`${styles["form-container"]} col-12 mx-auto`}>
          <h2 className="font-weight-bold">Welcome to Mojay Admin</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
