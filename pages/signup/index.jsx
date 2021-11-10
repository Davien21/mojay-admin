import React from "react";
import styles from "./sign-up.module.css";
import SignUpForm from "./../../components/form/SignUpForm/index";

function SignUp() {
  return (
    <div className={`${styles["container"]} container`}>
      <div className="row align-items-center">
        <div className={`${styles["form-container"]} col-12 mx-auto`}>
          <h2 className="font-weight-bold">Welcome to Mojay Admin</h2>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
