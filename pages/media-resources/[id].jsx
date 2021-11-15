import { useRouter } from "next/router";
import React from "react";
import { useDataContext } from "../../contexts/dataContext";
import DashboardLayout from "./../../layouts/dashboard/index";
import UpdateMediaResourceForm from "./../../components/form/UpdateMediaResourceForm/index";

function MediaResource() {
  const { allData } = useDataContext();
  const dataIsReady = allData?.users.length > 0;

  const router = useRouter();
  const { id } = router.query;
  if (!allData) return <div></div>;

  const media = allData?.media.find((media) => media._id === id);
  if (allData.media.length > 0 && !media) router.push("/media-resources");

  return (
    <div>
      <DashboardLayout>
        {dataIsReady && allData.media.length === 0 && (
          <div className="container-fluid">
            There are no available Media Resources.
          </div>
        )}
        {media && <UpdateMediaResourceForm media={media} />}
      </DashboardLayout>
    </div>
  );
}

export default MediaResource;
