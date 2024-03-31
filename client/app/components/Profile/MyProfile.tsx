import React, { FC, useEffect, useState } from "react";
import defaultAvatar from "../../../public/assets/avatar.png";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/utils/styles";
import {
  useUpdateAvatarMutation,
  useUpdateInfoMutation,
} from "@/app/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import Loader from "../Loader/Loader";

type Props = {
  avatar: string | null;
  user: any;
};

const MyProfile: FC<Props> = ({ avatar, user }: Props) => {
  const [updateAvatar, { isSuccess, isLoading, error, isError }] =
    useUpdateAvatarMutation();
  const [
    updateInfo,
    {
      isSuccess: isSuccessInfo,
      isLoading: isLoadingInfo,
      error: errorInfo,
      isError: isErrorInfo,
    },
  ] = useUpdateInfoMutation();
  const [name, setName] = useState(user.name);
  const imageHandler = (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      if (fileReader.readyState === 2) {
        updateAvatar({ avatar: fileReader.result });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Avatar updated successfully!");
    }
    if (isSuccessInfo) {
      toast.success("Name updated successfully!");
    }
    if (isError) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data?.message || "Something went wrong!");
    }
    if (isErrorInfo) {
      const errorMessage = errorInfo as any;
      toast.error(errorMessage?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, isError, error, isSuccessInfo, isErrorInfo, errorInfo]);

  const handleUpdateInfo = (e: any) => {
    e.preventDefault();
    if (name !== "") {
      updateInfo({ name });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full 800px:w-[50%] mx-auto">
      {(isLoading || isLoadingInfo) && <Loader />}
      <div className="relative mx-auto">
        <Image
          width={500}
          height={500}
          loader={() => (user?.avatar ? user.avatar.url : defaultAvatar.src)}
          src={user?.avatar ? user.avatar.url : defaultAvatar.src}
          alt=""
          className="w-[120px] h-[120px] border-2 rounded-full p-2 border-orange-500 dark:border-orange-400"
        />
        <input
          type="file"
          name="avatar"
          id="avatar"
          hidden
          accept="image/png,image/jpg,image/jpeg,image/webp"
          onChange={imageHandler}
        />
        <label htmlFor="avatar">
          <div className="absolute right-0 top-[80px] bg-slate-600 flex justify-center items-center p-1 rounded-full w-[30px] h-[30px] text-white cursor-pointer">
            <AiOutlineCamera />
          </div>
        </label>
      </div>
      <div>
        <form onSubmit={handleUpdateInfo}>
          <div>
            <label htmlFor="name" className={`${styles.label}`}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`${styles.input}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className={`${styles.label}`}>
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={`${styles.input}`}
              value={user.email}
              readOnly
            />
          </div>
          <div className="mt-6">
            <input
              type="submit"
              value="Update Information"
              className={`${styles.button}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
