import { useRouter } from "next/router";
import React from "react";
import { useDataContext } from "../../contexts/dataContext";
import DashboardLayout from "./../../layouts/dashboard/index";
import UpdateMediaResourceForm from "./../../components/form/UpdateMediaResourceForm/index";

function MediaResource() {
  const { allData } = useDataContext();
  const { id } = useRouter().query;
  if (!allData) return <div></div>;

  const media = allData?.media.find((media) => media._id === id);
  return (
    <div>
      <DashboardLayout>
        {media && <UpdateMediaResourceForm media={media} />}
      </DashboardLayout>
    </div>
  );
}

export default MediaResource;
