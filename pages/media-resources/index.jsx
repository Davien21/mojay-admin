import styles from "./media-resources.module.css";
import DashboardLayout from "../../layouts/dashboard";
import SlideInSection from "../../components/slideInSection";
import CreateMediaResourceForm from "./../../components/form/CreateMediaResourceForm/index";
import Link from "next/link";
import { useState } from "react";
import { useDataContext } from "../../contexts/dataContext";

export default function MediaResourcesPage() {
  const { allData } = useDataContext();
  const [isShowingSlideIn, setIsShowingSlideIn] = useState(false);

  return (
    <DashboardLayout>
      <div className={`${styles["container"]} container-fluid `}>
        <div>
          <button
            onClick={() => setIsShowingSlideIn(true)}
            className={`blue-btn small btn`}
          >
            Create Media Resource
          </button>
        </div>
        <div className="mt-4">
          <span className={`${styles["table-title"]}`}>Name</span>
          <hr className="w-100 hr-2" />
           
          {allData?.media.length > 0 && (
            <ol className={`px-3 ${styles["table-list"]}`}>
              {allData?.media.map((media) => (
                <li key={media._id}>
                  <Link href={`/media-resources/${media._id}`}>
                    <a className="list-link">{media.name}</a>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <SlideInSection
        isShowing={isShowingSlideIn}
        setIsShowing={setIsShowingSlideIn}
        title="Media Resource"
      >
        <CreateMediaResourceForm closeForm={() => setIsShowingSlideIn(false)} />
      </SlideInSection>
    </DashboardLayout>
  );
}

// export const getServerSideProps = async function ({ req, res }) {
//   const user = { name: "Chidiebere Ekennia" };

//   if (!user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { user },
//   };
// };
