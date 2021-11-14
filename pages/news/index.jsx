import styles from "./news.module.css";
import DashboardLayout from "../../layouts/dashboard";
import SlideInSection from "../../components/slideInSection";
import CreateNewsForm from "./../../components/form/CreateNewsForm/index";
import Link from "next/link";
import { useState } from "react";
import { useDataContext } from "../../contexts/dataContext";

export default function NewsPage() {
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
            Create News Update
          </button>
        </div>
        <div className="mt-4">
          <span className={`${styles["table-title"]}`}>Name</span>
          <hr className="w-100 hr-2" />
          {allData?.news.length > 0 && (
            <ol className={`px-3 ${styles["table-list"]}`}>
              {allData?.news.map((news) => (
                <li key={news._id}>
                  <Link href={`/news/${news._id}`}>
                    <a className="list-link">{news.title}</a>
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
        title="News Update"
      >
        <CreateNewsForm closeForm={() => setIsShowingSlideIn(false)} />
      </SlideInSection>
    </DashboardLayout>
  );
}

export const getServerSideProps = async function ({ req, res }) {
  const user = { name: "Chidiebere Ekennia" };

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};
