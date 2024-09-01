import Image from "next/image";
import React, { FC } from "react";
import { format } from "timeago.js";

type QuestionAnswersPropsType = {
  data: any;
};

const QuestionAnswers: FC<QuestionAnswersPropsType> = ({ data }) => {
  return (
    <div className="mt-6">
        <h3 className="text-lg lg:text-2xl font-semibold text-orange-500 dark:text-orange-400 mb-6">Questions</h3>
        <div className="flex flex-col gap-6">
      {data?.questions?.length === 0 ? <div className="flex justify-center items-center">
        <p className="dark:text-white text-base font-Poppins font-normal">Please enter your first question.</p>
      </div> : data?.questions?.map((item: any) => (
        <div className="flex gap-4" key={item._id}>
          <Image
            src={item?.user?.avatar?.url}
            alt=""
            width={2000}
            height={2000}
            className="!w-12 !h-12 object-cover rounded-full"
          />
          <div>
            <h4 className="text-base font-semibold font-Poppins dark:text-white">
              {item?.user?.name}
            </h4>
            <p className="text-base font-normal font-Poppins text-slate-800 dark:text-gray-50 mb-1">
              {item?.question}
            </p>
            <p className="text-sm font-light font-Poppins text-slate-500 dark:text-gray-300">
              {format(item?.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default QuestionAnswers;
