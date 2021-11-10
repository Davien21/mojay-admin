import styles from "./update-user-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDataContext } from "../../../contexts/dataContext";
import { useRouter } from "next/router";

function UpdateUserForm({ user }) {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name is too short").required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: showPasswordField
      ? Yup.string()
          .min(5, "Password is too short")
          .required("Password is required")
      : Yup.string(),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
    
  console.log(user)

  Object.assign(initialValues, user);

  const handleSubmit = (values, { resetForm }) => {
    console.log({ values });
    alert(JSON.stringify(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className={`${styles["container"]} container-fluid`}>
      <form className="px-0 col-xl-8" onSubmit={formik.handleSubmit}>
        <Input name="name" formik={formik} className={`mb-4`} label="Name" />
        <Input name="email" formik={formik} label="Email" className={`mb-4`} />
        {showPasswordField && (
          <Input
            name="password"
            type="password"
            formik={formik}
            label="Password"
            className={``}
          />
        )}
        {!showPasswordField && (
          <div className="">
            <p className="font-weight-semi-bold mb-1">Password</p>
            <button
              onClick={() => setShowPasswordField(true)}
              className=" btn light-btn"
            >
              Change Password
            </button>
          </div>
        )}
        <hr className="hr-1 my-4" />
        <div className="row align-items-center">
          <div className="col-auto pr-0 ">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className=" btn blue-btn"
            >
              Save Changes
            </button>
          </div>
          <div className="col-auto">
            <button
              onClick={() => formik.resetForm()}
              disabled={!formik.dirty}
              className=" btn light-btn"
            >
              {formik.dirty ? "Reset" : "No"} Changes
            </button>
          </div>
          <div className="ml-auto col-auto">
            <button className="btn light-red-btn">Delete</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserForm;
