import { useRouter } from "next/router";
import { useEffect } from "react";
import UpdateNewsForm from "../../components/form/UpdateNewsForm";
import { useDataContext } from "../../contexts/dataContext";
import DashboardLayout from "./../../layouts/dashboard/index";

function NewsItem() {
  const { allData } = useDataContext();
  const dataIsReady = allData?.users.length > 0;
  const router = useRouter();
  const { id } = router.query;
  if (!allData) return <div></div>;

  const news = allData?.news.find((news) => news._id === id);
  if (allData.news.length > 0 && !news) router.push("/news");

  return (
    <div>
      <DashboardLayout>
        {dataIsReady && allData.news.length === 0 && (
          <div className="container-fluid">
            There are no available news updates.
          </div>
        )}
        {news && <UpdateNewsForm news={news} />}
      </DashboardLayout>
    </div>
  );
}

export default NewsItem;
