import React from "react";
import avatar from "/public/assets/avatar.png";
import Rating from "@/app/utils/Rating";
import Image from "next/image";

type Props = {};

const ReviewCard = (props: Props) => {
  return (
    <div className="dark:bg-slate-700 shadow-md p-4 rounded-md">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Image
            src={avatar}
            alt=""
            width={300}
            height={300}
            className="w-12 h-12 rounded-full p-0.5 border border-orange-500 dark:border-orange-400"
          />
          <div>
            <p className="text-black dark:text-white font-bold text-lg">
              Sidul Islam
            </p>
            <p className="text-gray-600 dark:text-gray-50 font-normal text-sm">
              Full Stack Developer
            </p>
          </div>
        </div>
        <Rating rating={5} />
      </div>
      <p className="text-slate-800 dark:text-gray-100 text-sm font-normal pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste reprehenderit sequi eos reiciendis dicta cum, asperiores laboriosam omnis est animi error doloribus soluta. In doloribus inventore rem quod, ut at.</p>
    </div>
  );
};

export default ReviewCard;
