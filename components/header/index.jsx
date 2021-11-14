import React from "react";
import styles from "./header.module.css";
import { LogoSvg, MenuIcon, RightArrowSvg } from "../../assets";
import { useRouter } from "next/router";
import { deslugify } from "../../utils/deslugify";
import { useDataContext } from "../../contexts/dataContext";
import { slugify } from "../../utils/slugify";
import Link from "next/link";
import { clippedText } from "./../../utils/clipText";

function Header({ isOpen, onCloseSideBar }) {
  const route = useRouter().pathname;
  const { id } = useRouter().query;

  let currentData;
  const { allData } = useDataContext();
  const isDefault = route === "/";
  const pageTitle = isDefault ? "Admin Dashboard" : deslugify(route);
  let dataKey = slugify(pageTitle);
  let href = dataKey;
  if (dataKey === "media-resources") dataKey = "media";

  if (id) currentData = allData[dataKey].find((item) => item._id === id);

  return (
    <div className={`${styles["container"]} d-flex`}>
      <div className={`${styles["logo"]} px-4 d-none d-md-block`}>
        <LogoSvg />
      </div>
      <div className="px-3 d-flex align-items-center justify-content-between w-100">
        <div className={`${styles["page-title"]} flex-column flex-md-row`}>
          {!id && <span>{pageTitle}</span>}
          {id && (
            <>
              <Link href={`/${href}`}>
                <a className="list-link">{pageTitle}</a>
              </Link>
              <div className="d-none d-md-block px-2">
                <RightArrowSvg />
              </div>
              <span>
                {clippedText(currentData?.title ?? currentData?.name)}
              </span>
            </>
          )}
        </div>
        <button
          onClick={onCloseSideBar}
          className={`${styles["menu-btn"]} btn d-md-none`}
        >
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
