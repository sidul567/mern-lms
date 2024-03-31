import React, { useState } from "react";
import SideBar from "./SiderBar";
import { useLogoutQuery } from "@/app/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import MyProfile from "./MyProfile";
import ChangePassword from "./ChangePassword";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState("");
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout? true : false,
  })
  
  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
    toast.success("Logout Successfully!");
  };
  return (
    <div className="w-full px-8 dark:bg-slate-900 pt-40 min-h-screen flex gap-12">
      <div className="w-[60px] 800px:w-[310px] 800px:h-[450px]">
        <SideBar
          active={active}
          setActive={setActive}
          logoutHandler={logoutHandler}
          avatar={avatar}
          user={user}
        />
      </div>
      {
        active === 1 && (
            <MyProfile avatar={avatar} user={user} />
        )
      }
      {
        active === 2 && (
            <ChangePassword user={user} />
        )
      }
    </div>
  );
};

export default Profile;
