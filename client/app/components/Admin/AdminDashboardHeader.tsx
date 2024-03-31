import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import React, { FC, useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {};

const AdminDashboardHeader: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !notificationIconRef?.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-end gap-4 p-6">
      <ThemeSwitcher />
      <div className="dark:text-white relative">
        <div ref={notificationIconRef}>
          <IoMdNotificationsOutline
            size={25}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <span className="text-white text-xs font-semibold font-Poppins flex justify-center items-center rounded-full w-4 h-4 bg-orange-500 dark:bg-orange-400 absolute -top-1 -right-1">
          2
        </span>
        {open && (
          <div
            className="w-[300px] 800px:w-[350px] shadow-lg p-5 rounded-md dark:border-gray-200 dark:border-2 absolute right-0 top-12 bg-white dark:bg-slate-900 z-10"
            ref={notificationRef}
          >
            <h5 className="text-lg font-Josefin font-semibold text-center mb-3">
              Notifications
            </h5>
            <div className="space-y-4 max-h-[50vh] overflow-auto pr-2">
              <div className="border-b-gray-400 last-of-type:border-b-0 dark:border-b-gray-300 border-b pb-1">
                <div className="flex justify-between items-center text-sm font-Poppins font-normal mb-2">
                  <p>New Question Recieved</p>
                  <p className="border p-1 rounded-sm hover:bg-orange-500 dark:hover:bg-orange-400 hover:text-white dark:border-orange-400 border-orange-500 duration-100 cursor-pointer">
                    Mark as read
                  </p>
                </div>
                <p className="text-sm font-Poppins font-normal mb-2 text-justify">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Odio, suscipit. Fugit, placeat dignissimos sapiente vero
                  architecto reiciendis recusandae velit amet.
                </p>
                <p className="text-sm font-Poppins font-normal text-gray-400 dark:text-gray-300">
                  5 days ago
                </p>
              </div>
              <div className="border-b-gray-400 last-of-type:border-b-0 dark:border-b-gray-300 border-b pb-1">
                <div className="flex justify-between items-center text-sm font-Poppins font-normal mb-2">
                  <p>New Question Recieved</p>
                  <p className="border p-1 rounded-sm hover:bg-orange-500 dark:hover:bg-orange-400 hover:text-white dark:border-orange-400 border-orange-500 duration-100 cursor-pointer">
                    Mark as read
                  </p>
                </div>
                <p className="text-sm font-Poppins font-normal mb-2 text-justify">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Odio, suscipit. Fugit, placeat dignissimos sapiente vero
                  architecto reiciendis recusandae velit amet.
                </p>
                <p className="text-sm font-Poppins font-normal text-gray-400 dark:text-gray-300">
                  5 days ago
                </p>
              </div>
              <div className="border-b-gray-400 last-of-type:border-b-0 dark:border-b-gray-300 border-b pb-1">
                <div className="flex justify-between items-center text-sm font-Poppins font-normal mb-2">
                  <p>New Question Recieved</p>
                  <p className="border p-1 rounded-sm hover:bg-orange-500 dark:hover:bg-orange-400 hover:text-white dark:border-orange-400 border-orange-500 duration-100 cursor-pointer">
                    Mark as read
                  </p>
                </div>
                <p className="text-sm font-Poppins font-normal mb-2 text-justify">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Odio, suscipit. Fugit, placeat dignissimos sapiente vero
                  architecto reiciendis recusandae velit amet.
                </p>
                <p className="text-sm font-Poppins font-normal text-gray-400 dark:text-gray-300">
                  5 days ago
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
