import { useRouter } from "next/router";
import React from "react";
import { useDataContext } from "../../contexts/dataContext";
import DashboardLayout from "./../../layouts/dashboard/index";
import UpdateUserForm from "./../../components/form/UpdateUserForm/index";

function User() {
  const { allData } = useDataContext();
  const { id } = useRouter().query;
  if (!allData) return <div></div>;

  const user = allData?.users.find((user) => user._id === id);
  return (
    <div>
      <DashboardLayout>
        {user && <UpdateUserForm user={user} />}
      </DashboardLayout>
    </div>
  );
}

export default User;
