import React, { useEffect, useState } from "react";
import { PowerButtonSvg } from "../../assets/svgs";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDataContext } from "../../contexts/dataContext";

function Sidebar() {
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
  }, [loggedIn]);
  const { allData } = useDataContext();
  // console.log(allData);
  const activeRoute = useRouter().pathname;
  const linkClass = (route) =>
    route == activeRoute ? `w-100 mb-2 ${styles["active"]}` : `w-100 mb-2`;

  return (
    <aside className={`${styles["container"]}`}>
      <div>
        <div className={`d-flex flex-wrap w-100 ${styles["details"]}`}>
          <div className="col pl-4 pr-0 small-text d-flex align-items-center">
            <span className="font-weight-light">Signed in as</span>
            <span className={`font-weight-bold px-1`}>
              {allData?.currentUser?.name}
            </span>
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
        </div>
        <ul className="d-flex flex-wrap w-100">
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
      </div>
    </aside>
  );
}

export default Sidebar;
