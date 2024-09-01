import { styles } from "@/app/utils/styles";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import QuestionAnswers from "./QuestionAnswers";
import { useSaveQuestionMutation } from "@/app/redux/features/course/courseApi";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";

type CourseTabPropsType = {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  data: any;
};

const CourseTab: FC<CourseTabPropsType> = ({
  activeTab,
  setActiveTab,
  data,
}) => {
  const { user } = useSelector((state: any) => state.auth);

  const params = useParams();
  const { id } = params;

  const [saveQuestion, { isLoading: saveQuestionLoading }] =
    useSaveQuestionMutation();

  const [rating, setRating] = useState(0);
  const [question, setQuestion] = useState("");

  const handleQuestionSubmit = () => {
    if (question.trim().length === 0) {
      toast.error("Question can't be empty.");
      return;
    }

    const body = {
      courseId: id,
      contentId: data?._id,
      question,
    };

    saveQuestion(body).then(({ data, error }: any) => {
      if (error) {
        toast.error(error?.message || "Something went wrong.");
        return;
      }

      if (data && data?.success) {
        toast.success("Question added successfully.");
        setQuestion("");
      }
    });
  };

  return (
    <div>
      <div className="py-2 flex justify-between items-center mb-3 px-2 bg-gray-100 dark:bg-gray-700">
        {["Overview", "Resources", "Q&A", "Reviews"].map((item, index) => (
          <button
            className={`text-base p-2 px-4 rounded-lg text-gray-800 dark:text-gray-200 font-normal ${
              activeTab === item.toLowerCase() &&
              "bg-orange-500 dark:bg-orange-400 !font-medium !text-gray-50"
            } transition-all duration-500 font-Poppins`}
            key={index}
            onClick={() => setActiveTab(item.toLowerCase())}
          >
            {item}
          </button>
        ))}
      </div>
      {activeTab === "overview" && (
        <p className="text-sm font-normal text-black dark:text-white pb-1.5 font-Poppins px-4 transition-all duration-500">
          {data?.description}
        </p>
      )}
      {activeTab === "resources" && (
        <div className="flex flex-col gap-4 px-4 transition-all duration-500">
          {data?.links?.map((item: any) => (
            <div key={item._id} className="flex items-center gap-2">
              <p className="text-sm font-semibold text-black dark:text-white font-Poppins">
                {item?.title}:
              </p>
              <Link
                href={item?.url}
                target="_blank"
                className="text-sm font-normal text-orange-500 dark:text-orange-400 underline font-Poppins"
              >
                {item?.url}
              </Link>
            </div>
          ))}
        </div>
      )}
      {activeTab === "q&a" && (
        <div className="px-4 w-full transition-all duration-500">
          <div className="w-full">
            <div className="flex gap-4 w-full">
              <Image
                src={user?.avatar?.url}
                alt=""
                width={2000}
                height={2000}
                className="!w-12 !h-12 rounded-full"
              />
              <textarea
                className="text-sm font-Poppins dark:text-white font-normal bg-transparent dark:bg-transparent outline-none resize-none no-scrollbar border rounded-lg w-full p-2"
                rows={8}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className={`${styles.button} !w-fit px-6 flex items-center gap-2`}
                onClick={handleQuestionSubmit}
                disabled={saveQuestionLoading}
              >
                Submit
                {saveQuestionLoading && (
                  <CircularProgress size={20} color="inherit" />
                )}
              </button>
            </div>
          </div>

          {/* Question and Answer */}
          <QuestionAnswers data={data} />
        </div>
      )}

      {/* Review */}
      {activeTab === "reviews" && (
        <div className="px-4 w-full transition-all duration-500">
          <div className="w-full">
            <div className="flex gap-4 w-full">
              <Image
                src={user?.avatar?.url}
                alt=""
                width={2000}
                height={2000}
                className="!w-12 !h-12 rounded-full"
              />
              <div className="w-full">
                <p className="text-base font-Poppins dark:text-white font-normal">
                  Give a Rating <span className="text-red-500">*</span>
                </p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((item) =>
                    rating >= item ? (
                      <BsStarFill
                        fill="#f97316"
                        size={18}
                        key={item}
                        className="cursor-pointer"
                        onClick={() => setRating(item)}
                      />
                    ) : (
                      <BsStar
                        fill="#f97316"
                        size={18}
                        key={item}
                        className="cursor-pointer"
                        onClick={() => setRating(item)}
                      />
                    )
                  )}
                </div>
                <textarea
                  className="text-sm font-Poppins dark:text-white font-normal bg-transparent dark:bg-transparent outline-none resize-none no-scrollbar border rounded-lg w-full mt-4 p-2"
                  rows={8}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className={`${styles.button} !w-fit px-6`}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTab;
