import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { FC } from "react";

type CourseMediaPropsType = {
  data: any;
  activeVideoIndex: number;
  setActiveVideoIndex: (index: number) => void;
};

const CourseMedia: FC<CourseMediaPropsType> = ({
  data,
  activeVideoIndex,
  setActiveVideoIndex,
}) => {
  return (
    <div>
      <CoursePlayer videoUrl={data[activeVideoIndex]?.videoUrl} />
    </div>
  );
};

export default CourseMedia;
