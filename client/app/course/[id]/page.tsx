'use client'

import CourseDetails from "@/app/components/Course/CourseDetails";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Heading from "@/app/utils/Heading";
import React, {FC, useState} from "react";

interface Props{

}

const Page: FC<Props> = (props)=>{
  const [activeItem, setActiveItem] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");
  return(
    <div className="bg-white dark:bg-slate-900">
      <Heading
        title="Course Details MERN-LMS"
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
      <CourseDetails />
      
      <Footer />
    </div>
  )
}

export default Page;