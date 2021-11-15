import React, { forwardRef, useState } from "react";
import styles from "./input.module.css";
import EyeIcon from "./../Icons/EyeIcon";

function Input(props, ref) {
  const { type, onClick, label, className, id, name, formik, ...rest } = props;
  const [inputType, setType] = useState(type);
  const wasPassword = type === "password";
  const handleTogglePasswordView = (e) => {
    e.preventDefault();
    if (inputType === "password") return setType("text");
    setType("password");
  };

  const error = formik?.touched[name] && formik?.errors?.[name];
  let classes = `${styles.container} ${className} `;
  if (error) classes += styles["error"];
  let placeholder = rest?.placeholder;

  if (rest.isdate) rest.onFocus = () => setType("date");

  if (label) rest.placeholder = "";

  if (formik) {
    Object.assign(rest, {
      onChange: formik?.handleChange,
      onBlur: formik?.handleBlur,
      value: formik?.values[name],
    });
  }
  return (
    <div className={classes}>
      {label && (
        <label className="mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="d-flex">
        <input
          id={id ?? name}
          name={name ?? id}
          type={inputType}
          onClick={onClick}
          error={error}
          {...rest}
          ref={ref && ref}
          placeholder={placeholder}
          className="form-control col"
        />
        {wasPassword && (
          <div onClick={handleTogglePasswordView} className="col-auto pr-0">
            <EyeIcon isOpen={type === "password"} />
          </div>
        )}
      </div>
      {error && <div className={`${styles["error-message"]}`}>{error}</div>}
    </div>
  );
};

Input = forwardRef(Input)

export { Input };
