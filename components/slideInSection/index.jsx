import React, { useEffect, useState } from "react";
import styles from "./slide-in-section.module.css";
import { useRouter } from "next/router";
import { deslugify } from "../../utils/deslugify";
import { motion } from "framer-motion";

const slideTransition = { duration: 0.15, ease: "easeInOut" };
const slideIn = { right: "0px", transition: slideTransition };
const slideOut = { right: "-700px", transition: slideTransition };
const Overlap = { height: "93%", transition: slideTransition };

const animations = {
  true: "a"
}

function SlideInSection({ title, isShowing, setIsShowing, children }) {
  const route = useRouter().pathname;
  const pageTitle = deslugify(route);
  let containerClass = `${styles["container"]} `;
  if (isShowing) containerClass += `${styles["active"]}`;

  const handleClose = () => {
    setIsShowing(false);
  };

  return (
    <div onClick={handleClose} className={containerClass}>
      <motion.div
        animate={isShowing ? slideIn : slideOut}
        onClick={(e) => e.stopPropagation()}
        className={`${styles["content"]}`}
        onAnimationEnd={() => setIsShowing(false)}
      >
        <div className={`${styles["title-section"]}`}>
          <span>Create {title || pageTitle}</span>
        </div>
        <div className={`${styles["body-section"]} `}>{children}</div>
      </motion.div>
    </div>
  );
}

export default SlideInSection;
