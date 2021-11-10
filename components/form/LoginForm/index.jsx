import styles from "./login-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../../services/authService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setCookie } from "../../../services/cookieService";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password is too short")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

function LoginForm(props) {
  const router = useRouter();

  const handleSubmit = (values, { resetForm }) => {
    const user = values;
    console.log({ values });
    (async () => {
      const token = await login(user);
      setCookie("token", token);
      localStorage.setItem("token", token);
      router.push("/");
    })();
  };

  // useEffect(() => {

  // }, [isLoggedIn])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className={`${styles["container"]}`}>
      <form onSubmit={formik.handleSubmit}>
        <p className="my-3">Fill in your details to login</p>
        <Input name="email" formik={formik} label="Email" className={`mb-4`} />
        <Input
          name="password"
          type="password"
          formik={formik}
          label="Password"
          className={`mb-4 pb-2`}
        />
        <button disabled={!formik.isValid} className="btn w-100 red-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
