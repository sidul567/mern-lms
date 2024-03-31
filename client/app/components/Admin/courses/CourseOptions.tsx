import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }: Props) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div className="pt-12">
      {options.map((option, index) => (
        <div className="flex gap-2 items-center py-5" key={index}>
          <div
            className={`text-white w-[25px] h-[25px] 800px:w-[35px] 800px:h-[35px] rounded-full flex items-center justify-center relative ${
              index <= active
                ? "bg-orange-500 dark:bg-orange-400"
                : "bg-gray-300 dark:bg-slate-600"
            }`}
          >
            <IoMdCheckmark className="text-[20px] 800px:text-[25px]" />
            {index !== options.length - 1 && (
              <div
                className={`w-[2px] h-[30px] absolute -bottom-[100%] ${
                  index <= active
                    ? "bg-orange-500 dark:bg-orange-400"
                    : "bg-gray-300 dark:bg-slate-600"
                }`}
              ></div>
            )}
          </div>
          <p className="w-[70%] dark:text-white font-medium text-xs 800px:text-sm font-Poppins">{option}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
