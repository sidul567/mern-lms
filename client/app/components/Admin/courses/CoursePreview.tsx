import CoursePlayer from "@/app/utils/CoursePlayer";
import Rating from "@/app/utils/Rating";
import { styles } from "@/app/utils/styles";
import React, { FC } from "react";
import { BiCheckDouble } from "react-icons/bi";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCreateCourse: () => void;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  courseData,
  handleCreateCourse,
  setActive,
  isEdit
}: Props) => {
  const discount =
    ((parseInt(courseData.estimatedPrice) - parseInt(courseData.price)) /
      parseInt(courseData.estimatedPrice)) *
    100;
  return (
    <div className="w-[95%] 800px:w-[80%]">
      <CoursePlayer videoUrl={courseData.demoUrl} title={courseData.name} />
      <div className="flex gap-2 mt-5">
        <p className="text-2xl dark:text-orange-400 text-orange-500 font-semibold font-Poppins">
          ${courseData.price}
        </p>
        <p className="text-sm dark:text-white line-through font-semibold font-Poppins">
          ${courseData.estimatedPrice}
        </p>
        <p className="text-xl dark:text-white font-normal font-Poppins">
          {discount.toFixed(0)}% off
        </p>
      </div>
      <div className="w-[60%] 800px:w-[25%] mt-2">
        <button className={`${styles.button} bg-red-500 dark:bg-red-500 hover:bg-red-600 duration-100`}>
          Buy Now ${courseData.price}
        </button>
      </div>
      <div className="mt-4 flex gap-2 800px:w-[70%]">
        <input
          type="text"
          placeholder="Discount Code"
          className={`800px:w-[70%!important] ${styles.input}`}
        />
        <button className={`${styles.button} 800px:w-[30%!important]`}>
          Apply Code
        </button>
      </div>
      <ul className="text-sm font-normal font-Poppins dark:text-white list-disc pl-4 mt-4">
        <li>Source code included</li>
        <li>Full lifetime access</li>
        <li>Certificate of completion</li>
        <li>Premium Support</li>
      </ul>
      <h2 className="font-semibold dark:text-white mt-4 text-xl">{courseData.name}</h2>
      <div className="flex justify-between mt-4 flex-col 800px:flex-row">
        <div className="flex items-center justify-center gap-2">
          <Rating rating={0} />
          <p className="text-sm font-normal dark:text-white font-Poppins">
            0 Reviews
          </p>
        </div>
        <p className="text-sm font-normal dark:text-white font-Poppins mt-4 800px:mt-0">
          0 Student
        </p>
      </div>
      <h2 className="font-semibold dark:text-white mt-4 text-xl">What you will learn from this course?</h2>
      {
        courseData.benefits.map((benefit:any)=>(
          <div className="flex mt-2 gap-1">
            <BiCheckDouble size={18} className="dark:text-white" />
            <p className="text-sm font-normal dark:text-white font-Poppins">{benefit.title}</p>
          </div>
        ))
      }
      <h2 className="font-semibold dark:text-white mt-4 text-xl">What are the prerequisites for start this course?</h2>
      {
        courseData.prerequisites.map((prerequisite:any)=>(
          <div className="flex mt-2 gap-1">
            <BiCheckDouble size={18} className="dark:text-white" />
            <p className="text-sm font-normal dark:text-white font-Poppins">{prerequisite.title}</p>
          </div>
        ))
      }
      <h2 className="font-semibold dark:text-white mt-4 text-xl">Course Details</h2>
      <p className="text-sm font-normal dark:text-white font-Poppins mt-2">{courseData.description}</p>
      <div className="flex justify-between">
        <div className="w-[30%] my-8">
          <button className={`${styles.button}`} onClick={()=>setActive(active-1)}>Prev</button>
        </div>
        <div className="w-[30%] my-8">
        <button className={`${styles.button}`} onClick={handleCreateCourse}>{isEdit ? "Update" : "Create"}</button>
        </div> 
      </div>
    </div>
  );
};

export default CoursePreview;
