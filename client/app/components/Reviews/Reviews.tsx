import Image from "next/image";
import React, { useEffect, useState } from "react";
import FeaturedImg from "/public/assets/feedback.svg";
import ReviewCard from "./ReviewCard";

type Props = {};

const Reviews = (props: Props) => {
  return (
    <div className="bg-white dark:bg-slate-900 px-4 800px:px-24 pt-12">
      <div className="flex items-center justify-between pb-24">
        <Image src={FeaturedImg} alt="" className="max-w-sm hidden md:block" />
        <div className="max-w-6xl">
          <h2 className="text-center text-lg lg:text-4xl font-bold font-Josefin pb-4">
            Our Students Are{" "}
            <span className="text-orange-500 dark:text-orange-400">
              Strength
            </span>{" "}
            <br /> See What They Say About Us
          </h2>
          <p className="text-center text-lg font-normal font-Poppins">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium quibusdam debitis temporibus veniam facere, at sit vel
            sed porro non.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-12">
        {[1,2,3,4,5,6,7].map((item, index) => (
          <ReviewCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
