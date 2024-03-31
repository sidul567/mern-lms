import { useUpdatePasswordMutation } from "@/app/redux/features/user/userApi";
import { styles } from "@/app/utils/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const ChangePassword = ({ user }: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [changePassword, { isSuccess, isError, error }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmpassword("");
    }
    if (isError) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, isError, error]);

  const handleChangePassword = (e:any) => {
    e.preventDefault();
    if (newPassword !== confirmpassword) {
      toast.error("New password and Confirm password don't match!");
    } else {
      changePassword({ oldPassword, newPassword });
    }
  };
  return (
    <div className="flex flex-col gap-6 w-full 800px:w-[50%] mx-auto">
      <h3 className={`${styles.title}`}>Change Password</h3>
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="oldpassword" className={`${styles.label}`}>
            Enter your old Password
          </label>
          <input
            type="password"
            name="oldpassword"
            id="oldpassword"
            className={`${styles.input}`}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newpassword" className={`${styles.label}`}>
            Enter your new Password
          </label>
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            className={`${styles.input}`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmpassword" className={`${styles.label}`}>
            Enter your confirm Password
          </label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            className={`${styles.input}`}
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <input
            type="submit"
            value="Change Password"
            className={`${styles.button}`}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
