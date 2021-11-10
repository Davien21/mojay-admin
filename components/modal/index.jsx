import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Overlay from "./../overlay/index";
import { CloseButton } from "./../closeButton/index";

const handleAnimationStart = (ref, isOpen) => {
  if (isOpen) ref.current.style.display = "block";
};

const handleAnimationEnd = (ref, isOpen) => {
  if (!isOpen) ref.current.style.display = "none";
};

function Modal({ children, modalOpen, onModalOpen }) {
  const modalBodyRef = useRef();
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (!modalOpen || modalRef?.current.contains(e.target)) return;
    onModalOpen(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalOpen]);
  return (
    <>
      <Overlay className="d-lg-none z-index-100" isOpen={modalOpen}></Overlay>
      <motion.div
        ref={modalBodyRef}
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          zIndex: "102",
          width: "100%",
          marginLeft: "-1rem",
        }}
        onAnimationComplete={() => handleAnimationEnd(modalBodyRef, modalOpen)}
        onAnimationStart={() => handleAnimationStart(modalBodyRef, modalOpen)}
        initial={{ opacity: 0, y: 0 }}
        animate={modalOpen ? { opacity: 1, y: "10%" } : { opacity: 0, y: 0 }}
        className="d-lg-none"
      >
        <div
          className="row
           justify-content-center
          "
        >
          <div
            ref={modalRef}
            initial={{ opacity: 0, y: 0 }}
            style={{
              backgroundColor: "#fff",
              maxHeight: "70vh",
            }}
            className="col-10 col-sm-8 col-md-6 py-5"
          >
            <CloseButton toggle={() => onModalOpen(false)} />
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Modal;
