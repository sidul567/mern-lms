"use client";

import React, { FC } from "react";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/AdminProtected";
import AdminDashboard from "../components/Admin/AdminDashboard";

type Props = {};

const page: FC<Props> = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      <AdminProtected>
        <Heading
          title={`${user.name} - ADMIN`}
          description="Mern-LMS is the best platform for learning LMS."
          keywords="programming, mern, react, redux, node, mongodb"
        />

        <div className="flex gap-4 min-h-screen dark:bg-slate-900 bg-slate-100">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[80%]">
            <AdminDashboard />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default page;
