import styles from "./users.module.css";
import DashboardLayout from "../../layouts/dashboard";
import Link from "next/link";
import SlideInSection from "../../components/slideInSection";
import CreateUserForm from "../../components/form/CreateUserForm";
import { useState } from "react";
import { useDataContext } from "../../contexts/dataContext";

export default function UsersPage() {
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
            Create User
          </button>
        </div>
        <div className="mt-4">
          <span className={`${styles["table-title"]}`}>Name</span>
          <hr className="w-100 hr-2" />
          {allData?.users.length > 0 && (
            <ol className={`px-3 ${styles["user-list"]}`}>
              {allData?.users.map((user) => (
                <li key={user._id}>
                  <Link href={`/users/${user._id}`}>
                    <a className="list-link">{user.name}</a>
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
        title="User"
      >
        <CreateUserForm closeForm={() => setIsShowingSlideIn(false)} />
      </SlideInSection>
    </DashboardLayout>
  );
}
