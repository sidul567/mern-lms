import { useGetCourseContentWithPurchaseQuery } from "@/app/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import CourseMedia from "./CourseMedia";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { styles } from "@/app/utils/styles";
import CourseTab from "./CourseTab";
import CourseContentList from "./CourseContentList";

type Props = {};

const CourseContent = (props: Props) => {
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isSuccess } =
    useGetCourseContentWithPurchaseQuery(id);
  const [courseContent, setCourseContent] = useState<any>([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    if (isSuccess) {
      setCourseContent(data?.content);
    }
  }, [data, isSuccess]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-10 md:col-span-6 lg:col-span-7">
            <CourseMedia
              data={courseContent}
              activeVideoIndex={activeVideoIndex}
              setActiveVideoIndex={setActiveVideoIndex}
            />
            <div className="flex justify-between items-center mt-6">
              <button
                className={`${styles.button} flex items-center justify-center gap-2 !w-fit px-8`}
                onClick={() =>
                  activeVideoIndex > 0 &&
                  setActiveVideoIndex(activeVideoIndex - 1)
                }
                disabled = {activeVideoIndex === 0}
              >
                <FaArrowLeft />
                Prev
              </button>
              <button
                className={`${styles.button} flex items-center justify-center gap-2 !w-fit px-8`}
                onClick={() =>
                  activeVideoIndex < courseContent.length - 1 &&
                  setActiveVideoIndex(activeVideoIndex + 1)
                }
                disabled = {activeVideoIndex === courseContent.length - 1}
              >
                Next
                <FaArrowRight />
              </button>
            </div>

            <h3 className="text-lg font-semibold font-Poppins dark:text-white my-4">{courseContent?.[activeVideoIndex]?.title}</h3>

            {/* Course tab */}
            <CourseTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              data={courseContent[activeVideoIndex]}
            />
          </div>
          <div className="col-span-10 md:col-span-4 lg:col-span-3">
              <CourseContentList data={courseContent} activeVideoIndex={activeVideoIndex} setActiveVideoIndex={setActiveVideoIndex} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
