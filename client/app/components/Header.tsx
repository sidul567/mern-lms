"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";
import CustomModal from "../utils/CustomModal";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Verification from "../auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "../redux/features/auth/authApi";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Header: FC<Props> = ({
  open,
  setOpen,
  route,
  setRoute,
  activeItem,
}: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          name: data.user?.name,
          email: data.user?.email,
          avatar: data.user?.image,
        });
      }
    }

    if (data !== null) {
      if (isSuccess) {
        toast.success("Login Successful!");
      }
    }

    if (!user && data === null) {
      setLogout(true);
    }

    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message || "Something went wrong!");
    }
  }, [user, data]);

  const handleOpenSidebar = () => {
    setAnimateSidebar(true);
    setOpenSidebar(true);
  };

  const handleCloseSidebar = (e: any) => {
    if (e.target.id === "screen" || e.target.id === "closeSidebarBtn") {
      setAnimateSidebar(false);
      setTimeout(() => setOpenSidebar(false), 1000);
    }
  };

  return (
    <div className="w-full h-[80px] dark:bg-black px-5 shadow-sm z-50 fixed">
      <div className="flex items-center justify-between h-full">
        <div className="logo">
          <Link
            href={"/"}
            className="text:black dark:text-white font-Poppins font-semibold text-2xl"
          >
            MERN-LMS
          </Link>
        </div>
        <div className="flex justify-center items-center gap-8">
          <NavItems activeItem={activeItem} isMobile={false} />
          <ThemeSwitcher />
          {user ? (
            <Link href={"profile"}>
              <Image
                loader={() => (user?.avatar ? user.avatar.url : avatar.src)}
                src={user?.avatar ? user.avatar.url : avatar.src}
                alt="Profile"
                className={`rounded-full cursor-pointer ${
                  activeItem === 5 &&
                  "border-2 border-orange-500 dark:border-orange-400 p-0.5"
                }`}
                width={30}
                height={30}
              />
            </Link>
          ) : (
            <HiOutlineUserCircle
              className="text-black dark:text-white cursor-pointer"
              size={25}
              onClick={() => setOpen(true)}
            />
          )}
          {/* Only for mobile */}
          <div className="800px:hidden">
            <HiOutlineMenuAlt3
              className="text-black dark:text-white cursor-pointer"
              size={25}
              onClick={handleOpenSidebar}
            />
          </div>
        </div>
      </div>

      {/* For mobile sidebar */}
      <div
        className={`${
          openSidebar ? "visible" : "invisible"
        } w-full h-screen z-[1] fixed top-0 left-0`}
        id="screen"
        onClick={handleCloseSidebar}
      >
        <div
          className={`${
            animateSidebar ? "translate-x-0" : "translate-x-full"
          } w-[70%] fixed h-full min-h-screen bg-gray-50  dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 z-[11] transition ease-in-out duration-[1000ms]`}
        >
          <div className="absolute top-10 right-5">
            <FaRegTimesCircle
              className="text-black dark:text-white cursor-pointer"
              size={25}
              onClick={handleCloseSidebar}
              id="closeSidebarBtn"
            />
          </div>
          <NavItems activeItem={activeItem} isMobile={true} />
          <p className="font-Poppins text-xs py-5 font-medium text-black dark:text-white px-10">
            Copyrights &copy; 2024 Sidul Islam Moon
          </p>
        </div>
      </div>

      {/* For Login modal */}
      {open && route === "login" && (
        <CustomModal
          activeItem={activeItem}
          component={Login}
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
        />
      )}

      {/* For Signup modal */}
      {open && route === "signup" && (
        <CustomModal
          activeItem={activeItem}
          component={SignUp}
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
        />
      )}

      {/* For Verification modal */}
      {open && route === "verification" && (
        <CustomModal
          activeItem={activeItem}
          component={Verification}
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
        />
      )}
    </div>
  );
};

export default Header;
