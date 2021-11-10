import styles from "./sign-up-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Name is too short").required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password is too short")
    .required("Password is required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

function SignUpForm(props) {
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
    <div className={`${styles["container"]}`}>
      <form onSubmit={formik.handleSubmit}>
        <p className="my-3">Create your first user to get started</p>
        <Input name="name" formik={formik} className={`mb-4`} label="Name" />
        <Input name="email" formik={formik} label="Email" className={`mb-4`} />
        <Input
          name="password"
          type="password"
          formik={formik}
          label="Password"
          className={`mb-4 pb-2`}
        />
        <button disabled={!formik.isValid} className="btn w-100 red-btn">
          Get started
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
