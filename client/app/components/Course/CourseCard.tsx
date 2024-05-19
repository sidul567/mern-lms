import Rating from "@/app/utils/Rating";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  course: any;
};

const CourseCard = ({ course }: Props) => {
  return (
    <Link href={`course/${course._id}`} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-sm">
      <Image
        src={course.thumbnail.url}
        alt=""
        width={2000}
        height={2000}
        className="object-cover w-full h-[300px] rounded-xl"
      />
      <p className="font-normal font-Poppins text-lg text-black dark:text-white mt-2">
        {course.name}
      </p>
      <div className="mt-2 flex justify-between items-center">
        <Rating rating={course.ratings} />
        <p className="font-normal font-Poppins text-base text-black dark:text-white">
          {course.purchased} Students
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          <p className="font-normal font-Poppins text-base text-orange-500 dark:text-orange-400">
           ${course.price}
          </p>
          <p className="font-normal font-Poppins text-sm line-through -mt-1 text-black dark:text-white">
           ${course.price}
          </p>
        </div>
        <p className="flex items-center gap-2 font-normal font-Poppins text-base text-black dark:text-white">
          <AiOutlineUnorderedList /> {course.courseData.length} Lectures
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
