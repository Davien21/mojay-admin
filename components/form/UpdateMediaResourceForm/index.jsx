import styles from "./update-media-resource-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { slugify } from "../../../utils/slugify";
import { formatSize } from "../../../utils/format-size";
import { useLoadingContext } from "../../../contexts/loadingContext";
import { useToastContext } from "../../../contexts/toastContext";
import { apiErrorMessage } from "../../../utils/handleAPIErrors";
import {
  UpdateMediaResource,
  DeleteMediaResource,
} from "../../../services/mediaService";
import { useRouter } from "next/router";
import { useDataContext } from "../../../contexts/dataContext";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function UpdateMediaResourceForm({ media }) {
  const { mutate } = useDataContext();
  const router = useRouter();
  const { setIsLoading } = useLoadingContext();
  const { toast } = useToastContext();

  const [file, setFile] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: media?.name,
    file: "",
  });

  const [allInfo, setAllInfo] = useState({ ...media });

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name is too short").required("Name is required"),
    file: Yup.mixed(),
  });

  const handleSubmit = (values, { resetForm }) => {
    (async () => {
      try {
        const body = { ...values };
        if (body.file === "") delete body.file;
        if (body.file !== "") setFile("");
        setIsLoading(true);
        const info = (await UpdateMediaResource(body, allInfo?._id)).data.data;
        toast.success(`${body.name} was updated successfully`);
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

  const handleDeleteMedia = () => {
    (async () => {
      try {
        setIsLoading(true);
        (await DeleteMediaResource(allInfo?._id)).data.data;
        setIsLoading(false);
        toast.success(`Media Resource was deleted successfully`);
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
    <div className={`${styles["container"]}`}>
      <form className="px-0" onSubmit={formik.handleSubmit}>
        <div>
          <Input
            name="name"
            formik={formik}
            className={`mb-4 pb-2`}
            label="Name"
          />

          <div className="pb-2">
            <p className="font-weight-semi-bold mb-1">File</p>
            {!file && media && (
              <div className="mb-3">
                <a rel="noreferrer" href={allInfo?.url}>{`${slugify(
                  allInfo?.name
                )}.${allInfo?.type}`}</a>
                <p className="mb-0 mt-1 text-capitalize small-text">
                  {formatSize(allInfo?.size)}
                </p>
              </div>
            )}
            <label htmlFor="file" className={`${styles["upload-file"]} `}>
              {!file && (
                <div className="row">
                  <div className="col px-0 d-flex align-items-center">
                    <div className="col-auto">
                      <span className="btn font-weight-semi-bold light-btn stick">
                        Change File
                      </span>
                    </div>
                  </div>
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
                          setFile("");
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
                formik.setFieldValue("file", file);
                setFile(file);
              }}
            ></Input>
          </div>
        </div>

        <hr className="hr-1 mt-0 mb-4" />
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
              onClick={() => {
                formik.resetForm();
                setFile("");
              }}
              disabled={!formik.dirty}
              className=" btn light-btn"
            >
              {formik.dirty ? "Reset" : "No"} Changes
            </button>
          </div>
          <div className="ml-auto col-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDeleteMedia();
              }}
              className="btn light-red-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateMediaResourceForm;
