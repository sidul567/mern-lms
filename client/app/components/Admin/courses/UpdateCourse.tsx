import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetSingleCourseAdminQuery,
} from "@/app/redux/features/course/courseApi";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import { redirect } from "next/navigation";

type Props = {
  courseId: string;
};

const EditCourse: FC<Props> = ({ courseId }: Props) => {
  const [editCourse, { isLoading, error, isSuccess }] =
  useEditCourseMutation();
  const {
    isSuccess: singleCourseSuccess,
    data,
    refetch
  } = useGetSingleCourseAdminQuery({ courseId }, {refetchOnMountOrArgChange: true});
  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "",
      description: "",
      links: [{ title: "", url: "" }],
      videoUrl: "",
      videoSection: "Untitled Section",
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success("Course Updated Successful!");
      redirect("/admin/courses");
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  useEffect(() => {    
    if (singleCourseSuccess) {
      setCourseInfo({
        name: data.course.name,
        description: data.course.description,
        price: data.course.price,
        estimatedPrice: data.course.estimatedPrice,
        tags: data.course.tags,
        level: data.course.level,
        demoUrl: data.course.demoUrl,
        thumbnail: data.course.thumbnail.url,
      });
      setBenefits(data.course.benefits);
      setPrerequisites(data.course.prerequisites);
      setCourseContentData(data.course.courseData);
    }
  }, [singleCourseSuccess]);

  const handleSubmit = () => {
    const data = {
      ...courseInfo,
      benefits,
      prerequisites,
      courseData: courseContentData,
    };

    setCourseData(data);
  };

  const handleUpdateCourse = () => {
    editCourse({courseId, data: courseData});
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[70%] 800px:w-[80%]">
        {isLoading && <Loader />}
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCouseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCreateCourse={handleUpdateCourse}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[30%] 800px:w-[20%]">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
