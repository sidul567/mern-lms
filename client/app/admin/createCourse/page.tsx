"use client";

import AdminDashboardHeader from "@/app/components/Admin/AdminDashboardHeader";
import CreateCourse from "@/app/components/Admin/courses/CreateCourse";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useSelector } from "react-redux";

type Props = {};

const page = (props: Props) => {
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

        <div className="flex gap-4 min-h-screen bg-slate-100 dark:bg-slate-900">
          <div className="w-0 800px:w-1/5 1500px:w-[16%]">
            <AdminSidebar
              broken={broken}
              setBroken={setBroken}
              toggled={toggled}
              setToggled={setToggled}
            />
          </div>
          <div className="w-full 800px:w-[85%]">
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
            <CreateCourse />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default page;
