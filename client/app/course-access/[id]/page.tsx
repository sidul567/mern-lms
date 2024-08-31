"use client";

import CourseContent from "@/app/components/Course/CourseContent";
import CourseDetails from "@/app/components/Course/CourseDetails";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Heading from "@/app/utils/Heading";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Props {}

const Page: FC<Props> = ({}) => {
  const [activeItem, setActiveItem] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  const params = useParams();
  const { id } = params;

  const isPurchased = user?.courses?.find(
    (course: any) => course?.courseId === id
  );

  if (!user || !isPurchased) {
    router.push("/");
    return;
  }

  return (
    <div className="bg-white dark:bg-slate-900">
      <Heading
        title="Course Content MERN-LMS"
        description="Mern-LMS is the best platform for learning LMS."
        keywords="programming, mern, react, redux, node, mongodb"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />

      <div className="w-full min-h-screen bg-white dark:bg-slate-900 px-4 md:px-8 lg:px-24 pt-24">
        <CourseContent />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
