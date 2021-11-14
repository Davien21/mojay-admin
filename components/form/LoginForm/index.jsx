import styles from "./login-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../../services/userService";
import { useRouter } from "next/router";
import { apiErrorMessage } from "../../../utils/handleAPIErrors";
import { useLoadingContext } from "../../../contexts/loadingContext";
import { useToastContext } from "../../../contexts/toastContext";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

function LoginForm(props) {
  const router = useRouter();
  const { setIsLoading } = useLoadingContext();
  const { toast } = useToastContext();

  const handleSubmit = (values, { resetForm }) => {
    (async () => {
      try {
        setIsLoading(true);
        const user = { ...values };
        const token = (await login(user)).data.data;
        localStorage.setItem("token", token);
        setIsLoading(false);
        toast.success(`Login was successful`);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        const message = apiErrorMessage(error);
        toast.error(message);
        setIsLoading(false);
      }
    })();
  };

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
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn w-100 red-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
