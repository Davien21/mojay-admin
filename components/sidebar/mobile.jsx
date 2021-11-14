/* eslint-disable @next/next/link-passhref */
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDataContext } from "../../contexts/dataContext";
import styles from "./sidebar.module.css";
import { PowerButtonSvg, WhiteCloseIcon } from "../../assets";

const slideIn = {
  left: "0",
  transition: { duration: 0.2, ease: "easeInOut" },
};

const slideOut = {
  left: "-300px",
  transition: { duration: 0.2, ease: "easeInOut" },
};

const handleAnimationStart = (ref, isOpen) => {
  if (isOpen) ref.current.style.display = "block";
};

const handleAnimationEnd = (ref, isOpen) => {
  if (!isOpen) ref.current.style.display = "none";
};

function MobileMenu({ isOpen, onCloseSideBar }) {
  const { allData } = useDataContext();
  const router = useRouter();
  const [loggedIn, setIsLoggedIn] = useState(true);
  const logout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    if (!loggedIn) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [loggedIn, router]);

  const sidebarRef = useRef();

  const activeRoute = router.pathname;
  const linkClass = (route) =>
    route == activeRoute ? `w-100 mb-2 ${styles["active"]}` : `w-100 mb-2`;

  return (
    <motion.aside
      initial={slideOut}
      animate={isOpen ? slideIn : slideOut}
      className={`${styles["side-nav"]} ${styles["container"]}`}
      ref={sidebarRef}
      onAnimationComplete={() => handleAnimationEnd(sidebarRef, isOpen)}
      onAnimationStart={() => handleAnimationStart(sidebarRef, isOpen)}
    >
      <div className={`d-flex align-items-center ${styles["header"]}`}>
        <span className={`${styles["logo"]} px-3`}>Mojay Admin</span>
        <WhiteCloseIcon
          className={`${styles["close-btn"]}`}
          onClick={() => onCloseSideBar(false)}
        />
      </div>
      <div className={`d-flex w-100 ${styles["details"]} container-fluid`}>
        <div className="row small-text align-items-center">
          <span className="font-weight-light col-4 no-word-wrap">
            Signed in as
          </span>
          <span className={`font-weight-bold col`}>
            {allData?.currentUser?.name}
          </span>
        </div>
        <Link href="/login" passHref replace>
          <button
            onClick={logout}
            className={`${styles["power-btn"]} btn ml-auto`}
            title="Log out"
          >
            <PowerButtonSvg />
          </button>
        </Link>
      </div>
      <ul className="w-100">
        <li className={linkClass("/")}>
          <Link href="/">Dashboard</Link>
        </li>
        <li className={linkClass("/users")}>
          <Link href="/users">Users</Link>
        </li>
        <li className={linkClass("/news")}>
          <Link href="/news">News Updates</Link>
        </li>
        <li className={linkClass("/media-resources")}>
          <Link href="/media-resources">Media Resources</Link>
        </li>
      </ul>
    </motion.aside>
  );
}

export default MobileMenu;
