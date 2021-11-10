import Link from "next/link";
import { getData, getCurrentUser } from "../services/dataService";
import styles from "./index.module.css";
import { PlusSvg } from "../assets";
import DashboardLayout from "../layouts/dashboard";
import { getCookie } from "../services/cookieService";
import { useDataContext } from "../contexts/dataContext";

export default function IndexPage() {
  const { allData } = useDataContext();
  return (
    <DashboardLayout>
      <div className={`${styles["container"]} container-fluid`}>
        <div className={`row ${styles["cards-container"]}`}>
          <div className={`col-auto pl-3 mb-3 pr-md-0 pb-md-0`}>
            <Link href="/users">
              <a className={`${styles["card"]}`}>
                <h3 className={`${styles["heading"]}`}>Users</h3>
                <span className={`${styles["number"]}`}>
                  {allData?.users?.length +
                    " " +
                    (allData?.users?.length !== 1 ? "items" : "item")}
                </span>
                <span className={`${styles["add-btn"]} btn`} title="New User">
                  <PlusSvg />
                </span>
              </a>
            </Link>
          </div>
          <div className={`col-auto pl-3 mb-3 pr-md-0 pb-md-0`}>
            <Link href="/news">
              <a className={`${styles["card"]}`}>
                <h3 className={`${styles["heading"]}`}>News Updates</h3>
                <span className={`${styles["number"]}`}>
                  {allData?.news?.length +
                    " " +
                    (allData?.news?.length !== 1 ? "items" : "item")}
                </span>
                <span className={`${styles["add-btn"]} btn`} title="New Update">
                  <PlusSvg />
                </span>
              </a>
            </Link>
          </div>
          <div className={`col-auto pl-3 mb-3`}>
            <Link href="/media-resources">
              <a className={`${styles["card"]}`}>
                <h3 className={`${styles["heading"]}`}>Media Resources</h3>
                <span className={`${styles["number"]}`}>
                  {allData?.media?.length +
                    " " +
                    (allData?.media?.length !== 1 ? "items" : "item")}
                </span>
                <span
                  className={`${styles["add-btn"]} btn`}
                  title="New Media Resource"
                >
                  <PlusSvg />
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// export async function getServerSideProps(ctx) {
//   const token = await getCookie("token", ctx.req.headers.cookie);

//   const allData = await getData(token);
//   const user = await getCurrentUser(token);
//   if (!user.data) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   const response = {
//     props: {
//       allData: allData?.data,?
//       user: user.data,
//     },
//   };
//   return response;
// }
