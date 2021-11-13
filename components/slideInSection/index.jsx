import React, { useEffect, useRef, useState } from "react";
import styles from "./slide-in-section.module.css";
import { useRouter } from "next/router";
import { deslugify } from "../../utils/deslugify";

function SlideInSection({ title, isShowing, setIsShowing, children }) {
  const containerRef = useRef(null);
  const route = useRouter().pathname;
  const pageTitle = deslugify(route);

  let containerClass = `${styles["container"]} `;
  if (isShowing) containerClass += `${styles["active"]} `;

  const handleClose = () => {
    setIsShowing(false);
  };

  useEffect(() => {
    const ref = containerRef?.current;
    if (isShowing) {
      ref.style["z-index"] = "var(--overlay-z-index)";
    }
  }, [isShowing]);

  return (
    <div
      ref={containerRef}
      onClick={handleClose}
      onTransitionEnd={(e) => {
        if (isShowing) return;
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style["z-index"] = "-1";
          }
        }, 300);
      }}
      className={containerClass}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles["content"]}`}
      >
        <div className={`${styles["title-section"]}`}>
          <span>Create {title || pageTitle}</span>
        </div>
        <div className={`${styles["body-section"]} `}>{children}</div>
      </div>
    </div>
  );
}

export default SlideInSection;
