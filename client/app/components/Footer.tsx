import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 py-12 mx-4 800px:mx-24 mt-24 border-t border-gray-300 dark:border-gray-50 bg-white dark:bg-slate-900">
      <div>
        <p className="text-sm font-bold text-black dark:text-white pb-1.5">
          About
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Our Story
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Privacy Policy
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          FAQ
        </p>
      </div>
      <div>
        <p className="text-sm font-bold text-black dark:text-white pb-1.5">
          Quick Links
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Courses
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          My Account
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Course Dashboard
        </p>
      </div>
      <div>
        <p className="text-sm font-bold text-black dark:text-white pb-1.5">
          Social Links
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Youtube
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Facebook
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          GitHub
        </p>
      </div>
      <div>
        <p className="text-sm font-bold text-black dark:text-white pb-1.5">
          Contact Info
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Call Us: +8801010101010
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Address: Lorem ipsum dolor sit amet.
        </p>
        <p className="text-sm font-normal text-black dark:text-white pb-1.5">
          Mail Us: test@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Footer;
