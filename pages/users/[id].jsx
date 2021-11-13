import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDataContext } from "../../contexts/dataContext";
import DashboardLayout from "./../../layouts/dashboard/index";
import UpdateUserForm from "./../../components/form/UpdateUserForm/index";

function User() {
  const { allData } = useDataContext();
  const router = useRouter();
  const { id } = router.query;
  if (!allData) return <div></div>;

  const user = allData?.users.find((user) => user._id === id);
  if (allData.users.length > 0 && !user) router.push("/users");

  return (
    <div>
      <DashboardLayout>
        {allData.users.length === 0 && (
          <div className="container-fluid">
            There are no registered users.
          </div>
        )}
        {user && <UpdateUserForm user={user} />}
      </DashboardLayout>
    </div>
  );
}

export default User;
