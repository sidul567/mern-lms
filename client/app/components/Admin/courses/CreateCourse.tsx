import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/app/redux/features/course/courseApi";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import { redirect } from "next/navigation";

type Props = {};

const CreateCourse = (props: Props) => {
  const [createCourse, {isLoading, error, isSuccess}] = useCreateCourseMutation();
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    category: "",
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
      videoLength: "",
      videoSection: "Untitled Section",
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successful!");
      redirect("/admin/courses");
    }
    if(error){
      const errorMessage = error as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  const handleSubmit = ()=>{
    const data = {
      ...courseInfo,
      benefits,
      prerequisites,
      courseData: courseContentData,
    }

    setCourseData(data);
  }

  const handleCreateCourse = ()=>{
    createCourse(courseData);
  }
  
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[70%] 800px:w-[80%]">
        {
          isLoading && <Loader />
        }
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {
          active === 1 && (
            <CourseData 
              active={active}
              setActive={setActive}
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
            />
          )
        }

        {
          active === 2 && (
            <CourseContent 
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCouseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )
        }

        {
          active === 3 && (
            <CoursePreview 
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCreateCourse={handleCreateCourse}
              isEdit={false}
            />
          )
        }
      </div>
      <div className="w-[30%] 800px:w-[20%]">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
