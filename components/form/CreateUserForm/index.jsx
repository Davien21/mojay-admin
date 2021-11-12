import styles from "./create-user-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { CreateUser } from "../../../services/userService";
import { apiErrorMessage } from "../../../utils/handleAPIErrors";
import { useLoadingContext } from "../../../contexts/loadingContext";
import { useToastContext } from "../../../contexts/toastContext";
import { useDataContext } from "../../../contexts/dataContext";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function CreateUserForm({ closeForm }) {
  const {mutate} = useDataContext()
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

  const { setIsLoading } = useLoadingContext();
  const { toast } = useToastContext();

  const handleSubmit = (values, { resetForm }) => {
    (async () => {
      try {
        const body = { ...values };
        setIsLoading(true);
        (await CreateUser(body)).data.data;
        closeForm();
        setIsLoading(false);
        toast.success(`${values.name} was created successfully`);
        mutate(`${backendUrl}/all`)
      } catch (error) {
        console.log(error);
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
    <div className={`${styles["container"]} `}>
      <form className="px-0" onSubmit={formik.handleSubmit}>
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
              className=" btn light-btn stick"
            >
              Set Password
            </button>
          </div>
        )}
        <hr className="hr-1 my-4" />
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-auto px-0 ">
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className=" btn blue-btn"
              >
                Create User
              </button>
            </div>
            <div className="col-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  closeForm();
                  // formik.resetForm()
                }}
                className=" btn light-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateUserForm;
