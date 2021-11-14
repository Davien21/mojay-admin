import Sidebar from "../../components/sidebar";
import Header from "../../components/header/index";
import styles from "./dashboard-layout.module.css";
import { Loader } from "../../components/Loader";
import { useLoadingContext } from "../../contexts/loadingContext";
import { useState } from "react";
import MobileMenu from "../../components/sidebar/mobile";

export default function DashboardLayout({ children }) {
  const { isLoading } = useLoadingContext();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {isLoading && <Loader />}
      <Header isOpen={menuOpen} onCloseSideBar={setMenuOpen} />
      <div className={`${styles["container"]} d-flex`}>
        <Sidebar isOpen={menuOpen} />
        <MobileMenu isOpen={menuOpen} onCloseSideBar={setMenuOpen} />
        <div className={`${styles["page-content"]}`}>{children}</div>
      </div>
    </>
  );
}
