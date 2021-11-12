import { useToastContext } from "../../contexts/toastContext";
import styles from "./toasts.module.css";
import { ErrorIcon, GoodTickIcon, WhiteCloseIcon } from "../../assets";
import { useEffect } from "react";

function Toast() {
  const { toastType, toastMessage, isDisplayingToast, setIsDisplayingToast } =
    useToastContext();

  const containerClass = (() => {
    if (!isDisplayingToast)
      return `${styles["container"]} ${styles[toastType]}`;

    return `${styles["container"]} ${styles[toastType]} ${styles["active"]}`;
  })();

  useEffect(() => {
    if (!isDisplayingToast) return;
    setTimeout(() => {
      if (!isDisplayingToast) return;
      setIsDisplayingToast(false);
    }, 3500);
  }, [isDisplayingToast, setIsDisplayingToast]);

  return (
    <div className={containerClass}>
      <button
        className={`${styles["close-btn"]} btn pt-0`}
        onClick={() => setIsDisplayingToast(false)}
      >
        <WhiteCloseIcon />
      </button>
      <div className="row align-items-center mb-2">
        {toastType === "success" && <GoodTickIcon className="col-auto" />}
        {toastType === "error" && <ErrorIcon className="col-auto" />}
        <p className={`${styles["heading"]} mb-0`}>{toastType}</p>
      </div>
      <p className={`${styles["message"]}`}>{toastMessage}</p>
      <div className={styles["progress-bar"]}></div>
    </div>
  );
}

export { Toast };
