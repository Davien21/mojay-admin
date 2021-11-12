import styles from "./update-news-form.module.css";
import { Input } from "../../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";

import { TextArea } from "../../textArea";
import { Editor } from "@tinymce/tinymce-react";

import Image from "next/image";
import SegmentedControl from "../../segmentedControl";
import { useLoadingContext } from "../../../contexts/loadingContext";
import { useToastContext } from "../../../contexts/toastContext";
import { UpdateNewsItem } from "../../../services/newsService";
import { apiErrorMessage } from "./../../../utils/handleAPIErrors";

const statuses = ["Published", "Draft"];

function UpdateNewsForm({ news }) {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Title is too short")
      .required("Title is required"),
    image: Yup.string(),
    altText: Yup.string(),
    shortDescription: Yup.string()
      .min(300, "Description must be at least 300 characters")
      .required("Description is required"),
    content: Yup.mixed().required("Some content is required"),
    publishDate: Yup.mixed().required("The Published Date is required"),
    status: Yup.string().required(),
  });

  const [initialValues, setInitialValues] = useState({
    title: news?.title,
    image: "",
    altText: news?.altText,
    shortDescription: news?.shortDescription,
    content: news?.content,
    publishDate: news?.publishDate,
    status: news?.status,
  });

  const [allInfo, setAllInfo] = useState({ ...news });
  const [image, setImage] = useState("");

  const { setIsLoading } = useLoadingContext();
  const { toast } = useToastContext();
  
  const handleSubmit = (values, { resetForm }) => {
    (async () => {
      try {
        const body = { ...values };
        if (body.image === "") delete body.image;
        if (body.image !== "") setImage("");
        setIsLoading(true);
        const info = (await UpdateNewsItem(body, allInfo?._id)).data.data;
        toast.success(`${values.title} was updated successfully`);
        setIsLoading(false);
        setAllInfo(info);
        setInitialValues(values);
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
    enableReinitialize: true,
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
              <div className="d-flex flex-wrap">
                <div className="col-auto px-0">
                  <img
                    width={150}
                    height={150}
                    src={image || news?.url}
                    alt={formik?.values["altText"]}
                  />
                </div>
                <div className="col px-0 d-flex align-items-center">
                  <div className="col-auto">
                    <span
                      onClick={(e) => {
                        setImage(null);
                        formik.setFieldValue("image", "");
                      }}
                      className="btn light-btn stick font-weight-semi-bold"
                    >
                      Change Image
                    </span>
                  </div>
                </div>
              </div>
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
                  // console.log(file)
                  setImage(url);
                }
              }}
            ></Input>

            <Input
              name="altText"
              formik={formik}
              className={`mb-4 pb-2`}
              label="Alt Text"
            />
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
              initialValue={news?.content}
              id="content"
              name="content"
              apiKey="npo4yf1vmo05zwnqyfbbfqlfrqsvrvcz4y3wnsd5c3wu95fd"
              init={{
                selector: "#content",
                textareaName: "content",
                statusbar: false,
                height: 600,
                menubar: false,
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
                // console.log(e);
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
          <div className="row align-items-center">
            <div className="col-auto pr-0 ">
              <button
                type="submit"
                disabled={!formik.isValid}
                className=" btn blue-btn"
              >
                Save Changes
              </button>
            </div>
            <div className="col-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  formik.resetForm();
                }}
                disabled={!formik.isValid}
                className=" btn light-btn"
              >
                {formik.dirty ? "Reset" : "No"} Changes
              </button>
            </div>
            <div className="ml-auto col-auto">
              <button className="btn light-red-btn">Delete</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateNewsForm;
