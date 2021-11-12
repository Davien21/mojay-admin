import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../contexts/loadingContext";
import styles from "./loader.module.css";

function Loader() {
  const [containerClass, setContainerClass] = useState(
    `${styles["container"]} `
  );
  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "auto";
    if (isLoading) return setContainerClass(`${styles["container"]}`);

    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, [isLoading, setIsLoading]);

  return (
    isLoading && (
      <div className={containerClass}>
        <div className={`${styles["loader-body"]}`}>
          <div className={`${styles["loader"]}`}>Loading...</div>
        </div>
      </div>
    )
  );
}

export { Loader };
