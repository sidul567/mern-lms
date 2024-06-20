"use client";

import AdminDashboardHeader from "@/app/components/Admin/AdminDashboardHeader";
import EditFAQ from "@/app/components/Admin/layout/EditFAQ";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import UserList from "@/app/components/Admin/users/UserList";
import AdminProtected from "@/app/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);

  return (
    <>
      <AdminProtected>
        <Heading
          title={`${user.name} - ADMIN`}
          description="Mern-LMS is the best platform for learning LMS."
          keywords="programming, mern, react, redux, node, mongodb"
        />

        <div className="flex gap-4 min-h-screen dark:bg-slate-900 bg-slate-100">
          <div className="w-0 800px:w-1/5 1500px:w-[16%]">
            <AdminSidebar
              broken={broken}
              setBroken={setBroken}
              toggled={toggled}
              setToggled={setToggled}
            />
          </div>
          <div className="w-full 800px:w-[80%]">
            <div className="flex justify-between">
              {broken && (
                <div
                  className="dark:text-white mt-6 ml-6 cursor-pointer"
                  onClick={() => setToggled(!toggled)}
                >
                  <HiOutlineMenuAlt3 size={30} />
                </div>
              )}
              <AdminDashboardHeader />
            </div>
            <EditFAQ />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default Page;