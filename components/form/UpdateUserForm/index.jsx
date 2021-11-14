import styles from "./update-user-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useLoadingContext } from "../../../contexts/loadingContext";
import { useToastContext } from "../../../contexts/toastContext";
import { DeleteUser, UpdateUser } from "../../../services/userService";
import { apiErrorMessage } from "./../../../utils/handleAPIErrors";
import { useRouter } from "next/router";
import { useDataContext } from "../../../contexts/dataContext";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function UpdateUserForm({ user }) {
  const { mutate } = useDataContext();
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      name: Yup.string()
        .min(2, "Name is too short")
        .required("Name is required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string(),
    })
  );

  useEffect(() => {
    let passwordValidation;
    if (showPasswordField) {
      passwordValidation = Yup.string()
        .min(5, "Password is too short")
        .required("Password is required");
    }
    if (!showPasswordField) passwordValidation = Yup.string();
    setValidationSchema(
      Yup.object({
        name: Yup.string()
          .min(2, "Name is too short")
          .required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: passwordValidation,
      })
    );
  }, [showPasswordField]);

  const [initialValues, setInitialValues] = useState({
    name: user?.name,
    email: user?.email,
    password: user?.password,
  });

  const [allInfo, setAllInfo] = useState({ ...user });

  const { setIsLoading } = useLoadingContext();
  const { toast } = useToastContext();

  const router = useRouter();

  const handleSubmit = (values, { resetForm }) => {
    (async () => {
      try {
        const body = { ...values };
        setIsLoading(true);
        const info = (await UpdateUser(body, allInfo?._id)).data.data;
        toast.success(`${values.name} was updated successfully`);
        setIsLoading(false);
        setAllInfo(info);
        setInitialValues(values);
      } catch (error) {
        const message = apiErrorMessage(error);
        toast.error(message);
        setIsLoading(false);
      }
    })();
  };

  const handleDeleteUser = () => {
    (async () => {
      try {
        setIsLoading(true);
        (await DeleteUser(allInfo?._id)).data.data;
        setIsLoading(false);
        toast.success(`User was deleted successfully`);
        setTimeout(() => {
          toast.close();
          mutate(`${backendUrl}/all`);
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
    enableReinitialize: true,
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
              onClick={() => {
                setShowPasswordField(true);
              }}
              className=" btn light-btn stick"
            >
              Change Password
            </button>
          </div>
        )}
        <hr className="hr-1 my-4" />
        <div className="row align-items-center">
          <div className="col-auto pr-0 ">
            <button type="submit" disabled="" className=" btn blue-btn">
              Save Changes
            </button>
          </div>
          <div className="col-auto">
            <button disabled="" className=" btn light-btn">
              No Changes
            </button>
          </div>
          <div className="ml-md-auto col col-md-auto mt-3">
            <button className="btn light-red-btn w-100">Delete</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserForm;
