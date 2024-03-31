"use client";

import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile";

type Props = {};

const page = (props: Props) => {
  const [activeItem, setActiveItem] = useState(5);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");
  const {user} = useSelector((state: any)=>state.auth);
  return (
    <Protected>
      <Heading
        title={`${user.name} - MERN-LMS`}
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

      <Profile user={user} />
    </Protected>
  );
};

export default page;
