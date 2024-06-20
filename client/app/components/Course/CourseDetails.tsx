import { useGetCourseContentWithoutPurchaseQuery } from "@/app/redux/features/course/courseApi";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Rating from "@/app/utils/Rating";
import { styles } from "@/app/utils/styles";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCheckDouble } from "react-icons/bi";
import { LuDot } from "react-icons/lu";
import CourseContent from "./CourseContent";

type Props = {};

const CourseDetails = (props: Props) => {
  const params = useParams();
  const { id } = params;

  const { data, isSuccess, error } =
    useGetCourseContentWithoutPurchaseQuery(id);

  const [courseData, setCourseData] = useState<any>();

  useEffect(() => {
    if (isSuccess) {
      setCourseData(data.course);
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  const discount = Math.ceil(
    ((parseInt(courseData?.estimatedPrice) - parseInt(courseData?.price)) /
      parseInt(courseData?.estimatedPrice)) *
      100
  );
  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-900 px-4 md:px-8 lg:px-24 pt-24 grid grid-cols-12 md:gap-12">
      <div className="flex flex-col gap-4 col-span-12 md:col-span-8">
        <h3 className="font-Poppins font-semibold text-xl text-black dark:text-white">
          {courseData?.name}
        </h3>
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <Rating rating={courseData?.ratings} />
            <p className="text-sm font-Poppins font-normal text-black dark:text-white">
              {courseData?.reviews?.length}{" "}
              {courseData?.reviews?.length === 0 ? "review" : "reviews"}
            </p>
          </div>
          <p className="text-sm font-Poppins font-normal text-black dark:text-white">
            {courseData?.purchased}{" "}
            {courseData?.purchased > 1 ? "students" : "student"}
          </p>
        </div>
        <div className="pt-2">
          <p className="font-Poppins font-semibold text-lg text-black dark:text-white">
            What you will learn from this course?
          </p>
          {courseData?.benefits?.map((item: any) => (
            <div className="flex items-center gap-2 pt-2">
              <BiCheckDouble size={18} className="dark:text-white" />
              <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                {item?.title}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <p className="font-Poppins font-semibold text-lg text-black dark:text-white">
            What are the prerequisite for starting this course?
          </p>
          {courseData?.prerequisites?.map((item: any) => (
            <div className="flex items-center gap-2 pt-2">
              <BiCheckDouble size={18} className="dark:text-white" />
              <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                {item?.title}
              </p>
            </div>
          ))}
        </div>
        <div>
          <p className="font-Poppins font-semibold text-xl text-black dark:text-white py-4">
            Course Overview
          </p>
          <CourseContent data={courseData} />
        </div>
        <p className="font-Poppins font-semibold text-lg text-black dark:text-white pt-3">
          Course Details
        </p>
        <p className="text-base font-Poppins font-normal text-black dark:text-white">
          {courseData?.description}
        </p>
        <div>
          <p className="text-base font-Poppins font-normal text-black dark:text-white">
            Support me:
          </p>
          <Link
            href="https://mern-lms-567.netlify.app"
            target="_blank"
            className="text-sm font-Poppins font-normal text-black dark:text-white"
          >
            https://mern-lms-567.netlify.app
          </Link>
        </div>
        <div className="flex items-center gap-2 pb-8 md:pb-0">
          <Rating rating={courseData?.ratings} />
          <p className="text-sm md:text-xl font-Poppins font-normal text-black dark:text-white">
            Course Rating
          </p>
          <LuDot className="dark:white w-3 md:w-10" />
          <p className="text-sm md:text-xl font-Poppins font-normal text-black dark:text-white">
            {courseData?.reviews?.length}{" "}
            {courseData?.reviews?.length === 0 ? "review" : "reviews"}
          </p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className="sticky top-24">
          <CoursePlayer videoUrl="7dfa320e86b4bb5569ebaa060d2b1ccf" />
          <div className="flex gap-3 pt-4">
            <p className="text-2xl font-Poppins font-normal text-black dark:text-white">
              ${courseData?.price}
            </p>
            <p className="text-base line-through font-Poppins font-normal text-black dark:text-white">
              ${courseData?.estimatedPrice}
            </p>
            <p className="text-2xl font-Poppins font-normal text-black dark:text-white">
              {discount}% off
            </p>
          </div>
          <div className="pt-4">
            <Link href="/" className={`${styles.button} px-4`}>
              Buy Now ${courseData?.price}
            </Link>
          </div>
          <div className="flex flex-col pt-4">
            <div className="flex items-center">
              <LuDot size={40} className="dark:white" />
              <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                30days moneybag guarantee
              </p>
            </div>
            <div className="flex items-center">
              <LuDot size={40} className="dark:white" />
              <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                Source code included
              </p>
            </div>
            <div className="flex items-center">
              <LuDot size={40} className="dark:white" />
              <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                Full lifetime access
              </p>
            </div>
            <div className="flex items-center">
              <LuDot size={40} className="dark:white" />
              <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
