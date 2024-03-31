"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import defaultAvatar from "../../../../public/assets/avatar.png";
import { BarChart } from "@mui/icons-material";
import {
  ArrowBackIosOutlinedIcon,
  ArrowForwardIosOutlinedIcon,
  ArticleOutlinedIcon,
  BarChartIcon,
  CalendarViewMonthOutlinedIcon,
  CategoryIcon,
  FeaturedPlayListOutlinedIcon,
  GroupIcon,
  GroupsIcon,
  HomeIcon,
  LiveTvIcon,
  LogoutOutlinedIcon,
  ManageHistoryOutlinedIcon,
  QuizIcon,
  SettingsOutlinedIcon,
  VideoCallIcon,
} from "./Icons";
import { RiH4 } from "react-icons/ri";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";

type Props = {};

type MenuItemProps = {
  title: string;
  to: string;
  icon: JSX.Element;
  id: string;
};

interface AdminSidebarProps {
  toggled?: boolean;
  setToggled?: (toggled: boolean) => void;
  broken?: boolean;
  setBroken?: (broken: boolean) => void;
}

const Item: FC<MenuItemProps> = ({ title, to, icon, id }: MenuItemProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const params = segments[segments.length - 1];

  return (
    <Link href={to}>
      <MenuItem
        icon={icon}
        className={`${
          id === params
            ? "dark:text-orange-400 font-semibold text-orange-500"
            : "dark:gray-violet-300"
        } text-sm hover:bg-slate-100 dark:hover:bg-slate-700`}
      >
        {title}
      </MenuItem>
    </Link>
  );
};

const AdminSidebar: FC<AdminSidebarProps> = ({
  toggled,
  setToggled,
  broken,
  setBroken,
}: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="font-Poppins h-screen overflow-y-auto overflow-x-hidden">
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled && setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        className=" bg-white dark:bg-slate-600 relative shadow-md dark:shadow-none"
        backgroundColor="dark:bg-slate-600"
        rootStyles={{ border: "none", height: "100%" }}
      >
        {!collapsed && (
          <div className="dark:text-white text-black">
            <div className="text-xl font-bold  text-center mt-4 relative">
              <Link href="/">MERN-LMS</Link>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center mt-5">
              <Image
                src={user?.avatar ? user.avatar.url : defaultAvatar.src}
                width={100}
                height={100}
                alt=""
              />
              <p className="text-sm font-normal">{user.name}</p>
              <p className="text-md font-semibold capitalize">
                - {user.role} -
              </p>
            </div>
          </div>
        )}
        {!broken && (
          <div
            className={`absolute top-5 cursor-pointer dark:text-white text-black ${
              collapsed ? "w-full flex items-center justify-center" : "right-2"
            }`}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ArrowForwardIosOutlinedIcon />
            ) : (
              <ArrowBackIosOutlinedIcon />
            )}
          </div>
        )}

        <Menu className={`dark:text-white text-black ${collapsed ? "mt-16" : "mt-6"}`}>
          <Item title="Dashboard" icon={<HomeIcon />} to="/admin" id="admin" />
          {!collapsed && (
            <h4 className="px-7 text-md font-semibold mt-4">Data</h4>
          )}
          <Item
            title="Users"
            icon={<GroupsIcon />}
            to="/admin/users"
            id="users"
          />
          <Item
            title="Invoices"
            icon={<ArticleOutlinedIcon />}
            to="/admin/invoices"
            id="invoices"
          />
          {!collapsed && (
            <h4 className="px-7 text-md font-semibold mt-4">Content</h4>
          )}
          <Item
            title="Create Course"
            icon={<VideoCallIcon />}
            to="/admin/createCourse"
            id="createCourse"
          />
          <Item
            title="Live Courses"
            icon={<LiveTvIcon />}
            to="/admin/courses"
            id="courses"
          />
          {!collapsed && (
            <h4 className="px-7 text-md font-semibold mt-4">Customizations</h4>
          )}
          <Item
            title="Hero"
            icon={<FeaturedPlayListOutlinedIcon />}
            to="/admin/hero"
            id="hero"
          />
          <Item title="FAQ" icon={<QuizIcon />} to="/admin/faq" id="faq" />
          <Item
            title="Categories"
            icon={<CategoryIcon />}
            to="/admin/categories"
            id="categories"
          />
          {!collapsed && (
            <h4 className="px-7 text-md font-semibold mt-4">Controllers</h4>
          )}
          <Item
            title="Manage Team"
            icon={<GroupIcon />}
            to="/admin/teams"
            id="teams"
          />
          {!collapsed && (
            <h4 className="px-7 text-md font-semibold mt-4">Analytics</h4>
          )}
          <Item
            title="Courses Analytics"
            icon={<BarChartIcon />}
            to="/admin/courseAnalytics"
            id="courseAnalytics"
          />
          <Item
            title="Orders Analytics"
            icon={<ManageHistoryOutlinedIcon />}
            to="/admin/ordersAnalytics"
            id="ordersAnalytics"
          />
          <Item
            title="Users Analytics"
            icon={<CalendarViewMonthOutlinedIcon />}
            to="/admin/usersAnalytics"
            id="usersAnalytics"
          />
          {!collapsed && (
            <h4 className="px-7 text-md font-semibold mt-4">Extras</h4>
          )}
          <Item
            title="Settings"
            icon={<SettingsOutlinedIcon />}
            to="/admin/settings"
            id="settings"
          />
          <Item
            title="Log Out"
            icon={<LogoutOutlinedIcon />}
            to="/admin/logout"
            id="logout"
          />
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
