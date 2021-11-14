import styles from "./create-news-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { TextArea } from "../../textArea";
import { Editor } from "@tinymce/tinymce-react";
import { getToday } from "../../../utils/dateFormatter";
import Image from "next/image";
import SegmentedControl from "../../segmentedControl";
import { CreateNewsItem } from "../../../services/newsService";
import { useLoadingContext } from "../../../contexts/loadingContext";
import { useToastContext } from "../../../contexts/toastContext";
import { useDataContext } from "../../../contexts/dataContext";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
import { apiErrorMessage } from "./../../../utils/handleAPIErrors";

const statuses = ["Published", "Draft"];

function CreateNewsForm({ closeForm }) {
  const { mutate } = useDataContext();
  const { setIsLoading } = useLoadingContext();
  const { toast } = useToastContext();
  const [image, setImage] = useState(null);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Title is too short")
      .required("Title is required"),
    image: Yup.string().required("Please include an Image"),
    altText: Yup.string(),
    shortDescription: Yup.string()
      .min(300, "Description must be at least 300 characters")
      .required("Description is required"),
    content: Yup.mixed().required("Some content is required"),
    publishDate: Yup.mixed().required("The Published Date is required"),
    status: Yup.string().required(),
  });

  const initialValues = {
    title: "",
    image: "",
    altText: "",
    shortDescription: "",
    content: "",
    publishDate: getToday(),
    status: "Draft",
  };

  const handleSubmit = (values, { resetForm }) => {
    (async () => {
      try {
        setIsLoading(true);
        await CreateNewsItem(values);
        setIsLoading(false);
        toast.success(`${values.title} was uploaded successfully`);
        mutate(`${backendUrl}/all`);
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

  const changeStatus = (status) => {
    formik.setFieldValue("status", status);
  };

  return (
    <div className={`${styles["container"]}`}>
      <form className="px-0" onSubmit={formik.handleSubmit}>
        <div>
          <Input
            name="title"
            formik={formik}
            className={`mb-4 pb-2`}
            label="Title"
          />

          <div className="mb-4 pb-2">
            <p className="font-weight-semi-bold mb-1">Photo</p>
            <label htmlFor="image" className={`${styles["upload-image"]} `}>
              {!image && (
                <span className="font-weight-semi-bold btn light-btn stick">
                  Create related News Image
                </span>
              )}
              {!image && formik.submitCount > 0 && (
                <div className={`${styles["error-message"]} mt-2`}>
                  Please upload an image
                </div>
              )}
              {image && (
                <div className="d-flex flex-wrap">
                  <div className="col-auto px-0">
                    <Image width={150} height={150} src={image} alt="" />
                  </div>
                  <div className="col px-0 d-flex align-items-center">
                    <div className="col-auto">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setImage(null);
                          formik.setFieldValue("image", "");
                        }}
                        className="btn light-red-btn"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-auto pl-0">
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="btn light-green-badge"
                      >
                        Save to Upload this Image
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </label>
            <Input
              id="image"
              className="d-none"
              name="image"
              type="file"
              onChange={(event) => {
                const file = event?.currentTarget?.files[0];
                formik.setFieldValue("image", file);
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImage(url);
                }
              }}
            ></Input>
            {image && (
              <Input
                name="altText"
                formik={formik}
                className={`mb-4 pb-2`}
                label="Alt Text"
              />
            )}
          </div>

          <TextArea
            label="Short Description"
            name={"shortDescription"}
            formik={formik}
            className={`mb-4`}
          />
          <div className="mb-4">
            <p className="font-weight-semi-bold mb-1">Status</p>
            <SegmentedControl
              active={formik?.values["status"]}
              onSetActiveControl={changeStatus}
              controls={statuses}
            />
          </div>

          <p className="font-weight-semi-bold mb-1">Content</p>
          <div className={`${styles["editor-container"]}`}>
            <Editor
              id="content"
              name="content"
              apiKey="npo4yf1vmo05zwnqyfbbfqlfrqsvrvcz4y3wnsd5c3wu95fd"
              init={{
                selector: "#content",
                textareaName: "content",
                statusbar: false,
                height: 600,
                menubar: false,
                content_style: "body { font-family: Poppins; }",
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
              }}
              onEditorChange={(e) => {
                console.log(e);
                formik.setFieldValue("content", e);
              }}
            />
            <Input
              type="date"
              name="publishDate"
              formik={formik}
              className={`mb-4 pb-2`}
              label="Publish Date"
            />
          </div>
        </div>

        <div className={`${styles["main-btns-container"]}`}>
          <div className="d-flex flex-wrap align-items-center">
            <div className="col-auto px-0 ">
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className=" btn blue-btn"
              >
                Create News Update
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

export default CreateNewsForm;
