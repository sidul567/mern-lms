import { useGetAllCourseQuery } from "@/app/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data } = useGetAllCourseQuery("");

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-900">
      <h2 className="text-center text-lg lg:text-4xl font-bold font-Josefin mb-12">
        Expand Your Career{" "}
        <span className="text-orange-500 dark:text-orange-400">
          Opportunity
        </span>{" "}
        <br /> Opportunity Our Courses
      </h2>

      <div className="px-4 800px:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-12">
        {courses &&
          courses.map((course, index) => (
            <>
              <CourseCard course={course} />
              <CourseCard course={course} />
              <CourseCard course={course} />
              <CourseCard course={course} />
              <CourseCard course={course} />
              <CourseCard course={course} />
              <CourseCard course={course} />
              <CourseCard course={course} />
              <CourseCard course={course} />
            </>
          ))}
      </div>
    </div>
  );
};

export default Courses;
