import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Hero: FC<Props> = (props: Props) => {
  return (
    <div className="w-full min-h-screen flex flex-col 1000px:flex-row items-center bg-white dark:bg-slate-900 px-4 800px:px-24 gap-10 800px:gap-20 1000px:gap-0 pt-20 800px:pt-16">
      <div className="relative h-[300px] w-[300px] 800px:w-[400px] 800px:h-[400px] 1000px:h-[450px] 1000px:w-[450px] flex justify-center items-center">
        <div className="hero_animation absolute w-full h-full rounded-full left-0 top-0"></div>
        <div className="w-[80%] h-[80%] relative flex justify-center items-center">
          <Image
            src={require("../../public/assets/hero.png")}
            className="object-contain w-full h-full"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col 1000px:gap-10 gap-8 w-full 1000px:w-[45%] ml-auto">
        <h2 className="text-2xl 800px:text-5xl font-Josefin dark:text-white font-semibold">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <p className="font-Josefin text-sm 800px:text-md dark:text-white font-semibold">
          We have 40k+ online courses and 500k+ online students. Find your
          desired courses from them.
        </p>
        <div className="flex">
          <input
            type="text"
            className="p-2 ring-2 ring-orange-500 outline-none dark:ring-orange-400 rounded-sm text-md font-Josefin 800px:placeholder:text-lg placeholder:font-semibold w-[85%] dark:text-white text-sm 800px:text-lg"
            placeholder="Search Courses..."
          />
          <button className="w-[10%] bg-orange-500 dark:bg-orange-400 flex items-center justify-center ring-2 ring-orange-500 dark:ring-orange-400 rounded-tr-sm rounded-br-sm text-white">
            <BiSearch size={25} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex">
            <Image
              src={require("../../public/assets/client1.jpg")}
              alt=""
              className="w-10 h-10 object-contain rounded-full bg-white p-0.5"
            />
            <Image
              src={require("../../public/assets/client2.jpg")}
              alt=""
              className="w-10 h-10 object-contain rounded-full bg-white p-0.5 ml-[-15px]"
            />
            <Image
              src={require("../../public/assets/client3.jpg")}
              alt=""
              className="w-10 h-10 object-contain rounded-full bg-white p-0.5 ml-[-15px]"
            />
          </div>
          <p className="font-Josefin text-sm 800px:text-md dark:text-white font-medium">
            500k+ people already trusted us.{" "}
            <Link
              href={"/courses"}
              className="text-orange-500 dark:text-orange-400"
            >
              View courses
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
