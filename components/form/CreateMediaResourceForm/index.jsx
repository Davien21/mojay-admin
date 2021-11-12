import styles from "./create-media-resource-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { CreateMediaResource } from "../../../services/mediaService";
import { apiErrorMessage } from "./../../../utils/handleAPIErrors";
import { useLoadingContext } from "../../../contexts/loadingContext";
import { useToastContext } from "../../../contexts/toastContext";

function CreateMediaResourceForm({ closeForm }) {
  const { setIsLoading } = useLoadingContext();
  const { toast } = useToastContext();
  const [file, setFile] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name is too short").required("Name is required"),
    file: Yup.mixed().required("Please Add a file"),
  });

  const initialValues = {
    name: "",
    file: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    (async () => {
      try {
        setIsLoading(true);
        await CreateMediaResource(values);
        setIsLoading(false);
        closeForm()
        toast.success(`${values.name} was uploaded successfully`);
        resetForm();
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

  const fileError = formik?.touched["file"] && formik?.errors?.["file"];

  return (
    <div className={`${styles["container"]}`}>
      <form className="px-0" onSubmit={formik.handleSubmit}>
        <div>
          <Input
            name="name"
            formik={formik}
            className={`mb-4 pb-2`}
            label="Name"
          />

          <div className="mb-4 pb-">
            <p className="font-weight-semi-bold mb-1">File</p>
            <label htmlFor="file" className={`${styles["upload-file"]} `}>
              {!file && (
                <span className="btn light-green-btn">Upload File</span>
              )}
              {fileError && (
                <div className={`${styles["error-message"]} mt-2`}>
                  Please upload a file
                </div>
              )}
              {file && (
                <div className="row">
                  <div className="col px-0 d-flex align-items-center">
                    <div className="col-auto">
                      <span className="btn font-weight-semi-bold light-btn stick">
                        Change
                      </span>
                    </div>
                    <div className="col-auto px-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                          formik.setFieldValue("file", "");
                        }}
                        className="btn light-red-btn"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-auto">
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="btn light-green-badge"
                      >
                        Save to Upload this File
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </label>
            <Input
              id="file"
              className="d-none"
              name="file"
              type="file"
              onChange={(event) => {
                const file = event?.currentTarget?.files[0];
                console.log(file);
                formik.setFieldValue("file", file);
                setFile(file);
              }}
            ></Input>
          </div>
        </div>

        <hr className="hr-1 mt-0 mb-4" />
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-auto px-0 ">
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className=" btn blue-btn"
              >
                Create Media Resource
              </button>
            </div>
            <div className="col-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  closeForm();
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

export default CreateMediaResourceForm;
