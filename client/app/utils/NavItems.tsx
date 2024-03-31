import Link from "next/link";
import React, { FC } from "react";

const navItemsData = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "Courses",
    url: "/courses",
  },
  {
    text: "About",
    url: "/about",
  },
  {
    text: "Policy",
    url: "/policy",
  },
  {
    text: "FAQ",
    url: "/faq",
  },
];

type Props = {
  isMobile: boolean;
  activeItem: number;
};

const NavItems: FC<Props> = ({ isMobile, activeItem }: Props) => {
  return (
    <>
      <div className="hidden 800px:flex 800px:gap-8">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link
              href={item.url}
              passHref
              className={`${
                activeItem === index
                  ? "text-orange-500 dark:text-orange-300"
                  : "text-black dark:text-white"
              } font-Poppins text-md font-medium`}
            >
              {item.text}
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden flex flex-col p-10 mt-12">
          <Link
            href={"/"}
            className="text:black dark:text-white font-Poppins font-semibold text-2xl text-center mb-10"
          >
            MERN-LMS
          </Link>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link
                href={item.url}
                passHref
                className={`${
                  activeItem === index
                    ? "text-orange-500 dark:text-orange-300"
                    : "text-black dark:text-white"
                } font-Poppins text-lg py-4 font-medium`}
              >
                {item.text}
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
