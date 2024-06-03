'use client'

import React, {FC, useState} from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Course/Courses";
import Reviews from "./components/Reviews/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

interface Props{

}

const Page: FC<Props> = (props)=>{
  const [activeItem, setActiveItem] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");
  return(
    <div className="bg-white dark:bg-slate-900">
      <Heading
        title="MERN-LMS"
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

      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Page;