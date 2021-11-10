import React from "react";
import styles from "./header.module.css";
import { LogoSvg, RightArrowSvg } from "../../assets";
import { useRouter } from "next/router";
import { deslugify } from "../../utils/deslugify";
import { useDataContext } from "../../contexts/dataContext";
import { slugify } from "../../utils/slugify";
import Link from "next/link";

function Header(props) {
  const route = useRouter().pathname;
  const { id } = useRouter().query;
  
  let currentData;
  const { allData } = useDataContext();
  const isDefault = route === "/";
  const pageTitle = isDefault ? "Admin Dashboard" : deslugify(route);
  let dataKey = slugify(pageTitle);
  if (dataKey === "media-resources") dataKey = "media";
  
  if (id) currentData = allData[dataKey].find((item) => item._id === id);

  return (
    <div className={`${styles["container"]} d-flex`}>
      <div className={`${styles["logo"]} px-4`}>
        <LogoSvg />
      </div>
      <div className={`${styles["page-title"]}`}>
        {!id && <span>{pageTitle}</span>}
        {id && (
          <>
            <Link href={`/${dataKey}`}>
              <a className="list-link">{pageTitle}</a>
            </Link>
            <div className="px-2">
              <RightArrowSvg />
            </div>
            <span>{currentData?.title ?? currentData?.name}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
