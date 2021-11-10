import Sidebar from "../../components/sidebar";
import Header from "../../components/header/index";
import styles from "./dashboard-layout.module.css";


export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div className={`${styles["container"]} d-flex`}>
        <Sidebar />
        <div className={`${styles["page-content"]}`}>{children}</div>
      </div>
    </>
  );
}
