import { useRouter } from "next/router";
import { Suspense } from "react";
import UpdateNewsForm from "../../components/form/UpdateNewsForm";
import { useDataContext } from "../../contexts/dataContext";
import DashboardLayout from "./../../layouts/dashboard/index";

function NewsItem() {
  const { allData } = useDataContext();
  const { id } = useRouter().query;
  if (!allData) return <div></div>;

  const news = allData?.news.find((news) => news._id === id);
  return (
    <div>
      <DashboardLayout>
        <Suspense fallback={<div>loading...</div>}>
          <UpdateNewsForm news={news} />
        </Suspense>
      </DashboardLayout>
    </div>
  );
}

export default NewsItem;
