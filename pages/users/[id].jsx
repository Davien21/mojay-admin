import { useRouter } from "next/router";
import React from "react";
import { useDataContext } from "../../contexts/dataContext";
import DashboardLayout from "./../../layouts/dashboard/index";
import UpdateUserForm from "./../../components/form/UpdateUserForm/index";
import { getCookie } from "../../services/cookieService";
import { getData, getCurrentUser } from "../../services/dataService";

function User() {
  const { allData } = useDataContext();
  const { id } = useRouter().query;
  if (!allData) return <div></div>

  const user =   allData?.users.find(user => user._id === id)
  return (
    <div>
      <DashboardLayout>
        <UpdateUserForm user={user} />
      </DashboardLayout>
    </div>
  );
}

export default User;

// export async function getServerSideProps(ctx) {
//   const token = await getCookie("token", ctx.req.headers.cookie);

//   const allData = await getData(token);
//   const user = await getCurrentUser(token);
//   if (!user.data) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   const response = {
//     props: {
//       allData: allData.data,
//       user: user.data,
//     },
//   };
//   return response;
// }
