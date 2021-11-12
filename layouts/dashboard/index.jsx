import Sidebar from "../../components/sidebar";
import Header from "../../components/header/index";
import styles from "./dashboard-layout.module.css";
import { Loader } from "../../components/Loader";
import { useLoadingContext } from "../../contexts/loadingContext";


export default function DashboardLayout({ children }) {
  const { isLoading } = useLoadingContext();
  return (
    <>
    {isLoading && <Loader />}
      <Header />
      <div className={`${styles["container"]} d-flex`}>
        <Sidebar />
        <div className={`${styles["page-content"]}`}>{children}</div>
      </div>
    </>
  );
}
