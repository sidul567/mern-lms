import React from "react";
import defaultAvatar from "../../../public/assets/avatar.png";
import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  active: number;
  setActive: (active: number) => void;
  logoutHandler: () => void;
  user: any;
  avatar: string | null;
};

const SiderBar = ({
  active,
  setActive,
  logoutHandler,
  user,
  avatar,
}: Props) => {
  return (
    <div className="flex flex-col p-1 items-center 800px:p-8 800px:items-stretch shadow-md gap-4 w-full">
      <div
        className={`flex items-center gap-2 cursor-pointer p-1 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${
          active === 1 &&
          "bg-slate-100 dark:bg-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          width={30}
          height={30}
          loader={() => (user?.avatar ? user.avatar.url : defaultAvatar.src)}
          src={user?.avatar ? user.avatar.url : defaultAvatar.src}
          alt="Avatar"
          className="rounded-full cursor-pointer"
        />
        <h5 className="hidden 800px:block font-Poppins text-sm font-medium dark:text-white">
          My Account
        </h5>
      </div>
      <div
        className={`flex items-center gap-2 cursor-pointer p-1 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${
          active === 2 &&
          "bg-slate-100 dark:bg-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
        }`}
        onClick={() => setActive(2)}
      >
        <div className="dark:text-white">
          <RiLockPasswordLine size={30} />
        </div>
        <h5 className="hidden 800px:block font-Poppins text-sm font-medium dark:text-white">
          Change Password
        </h5>
      </div>
      <div
        className={`flex items-center gap-2 cursor-pointer p-1 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${
          active === 3 &&
          "bg-slate-100 dark:bg-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
        }`}
        onClick={() => setActive(3)}
      >
        <div className="dark:text-white">
          <SiCoursera size={30} />
        </div>
        <h5 className="hidden 800px:block font-Poppins text-sm font-medium dark:text-white">
          Enrolled courses
        </h5>
      </div>
      {
        user?.role === "admin" && <Link href="/admin"
        className={`flex items-center gap-2 cursor-pointer p-1 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${
          active === 3 &&
          "bg-slate-100 dark:bg-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
        }`}
        onClick={() => setActive(4)}
      >
        <div className="dark:text-white">
          <MdOutlineAdminPanelSettings size={30} />
        </div>
        <h5 className="hidden 800px:block font-Poppins text-sm font-medium dark:text-white">
          Admin Dashboard
        </h5>
      </Link>
      }
      <div
        className={`flex items-center gap-2 cursor-pointer p-1 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700`}
        onClick={() => logoutHandler()}
      >
        <div className="dark:text-white">
          <AiOutlineLogout size={30} />
        </div>
        <h5 className="hidden 800px:block font-Poppins text-sm font-medium dark:text-white">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SiderBar;
