import {
  useGetLayoutByTypeQuery,
  useUpdateLayoutMutation,
} from "@/app/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown } from "react-icons/md";
import Loader from "../../Loader/Loader";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import _ from "lodash";
import { styles } from "@/app/utils/styles";

type Props = {};

const EditFAQ = (props: Props) => {
  const { data, isLoading, isSuccess, error, refetch } =
    useGetLayoutByTypeQuery(
      {
        type: "faq",
      },
      { refetchOnMountOrArgChange: true }
    );
  const [
    editLayout,
    {
      isLoading: updateLayoutLoading,
      isSuccess: updateLayoutIsSuccess,
      error: updateLayoutError,
    },
  ] = useUpdateLayoutMutation();
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [active, setActive] = useState(-1);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setFaqs(data.layout.faq);
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (updateLayoutIsSuccess) {
      refetch();
      setEdit(false);
      toast.success("FAQ Updated Successfully!");
    }
    if (updateLayoutError) {
      const errorMessage = updateLayoutError as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
  }, [updateLayoutIsSuccess, updateLayoutError]);

  useEffect(() => {
    if (data) {
      setEdit(!_.isEqual(data.layout.faq, faqs) && !isEmptyQuestionAnswer());
    }
  }, [faqs]);

  const handleQuestionChange = (e: any, id: number) => {
    setFaqs((prevFaqs: any) =>
      prevFaqs.map((faq: any, index: number) =>
        index === id ? { ...faq, question: e.target.value } : faq
      )
    );
  };

  const handleAnswerChange = (e: any, id: number) => {
    setFaqs((prevFaqs: any) =>
      prevFaqs.map((faq: any, index: number) =>
        index === id ? { ...faq, answer: e.target.value } : faq
      )
    );
  };

  const handleDeleteFaq = (id: number) => {
    if (faqs.length > 1) {
      setFaqs((prevFaqs: any) =>
        prevFaqs.filter((faq: any, index: number) => index !== id)
      );
    }
  };

  const isEmptyQuestionAnswer = () => {
    return faqs.some(
      (faq: any) => faq.question.trim() === "" || faq.answer.trim() === ""
    );
  };

  const handleAddFaq = () => {
    if (isEmptyQuestionAnswer()) {
      toast.error("Please fill all the fields!");
    } else {
      setFaqs([...faqs, { question: "", answer: "" }]);
    }
  };

  const handleEdit = () => {
    editLayout({ type: "faq", faq: faqs });
  };

  return (
    <>
      {updateLayoutLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-12 space-y-3">
          {faqs.map((faq: any, index: number) => (
            <div className="w-full rounded-sm shadow-md">
              <div className="dark:text-white w-full p-3 font-Poppins bg-slate-50 flex justify-between items-center dark:bg-slate-700 relative cursor-pointer">
                <input
                  className="text-sm font-medium bg-transparent outline-none w-full"
                  value={faq.question}
                  onChange={(e) => handleQuestionChange(e, index)}
                  onClick={() => setActive(active !== index ? index : -1)}
                  placeholder="Add your question"
                />
                <MdKeyboardArrowDown
                  size={25}
                  className={`cursor-pointer duration-300 ${
                    active !== index ? "rotate-0" : "rotate-180"
                  }`}
                  onClick={() => setActive(active !== index ? index : -1)}
                />
                <AiOutlineDelete
                  size={18}
                  className="dark:text-white cursor-pointer hover:text-red-500 duration-100"
                  onClick={() => handleDeleteFaq(index)}
                />
              </div>
              <div
                className={`text-sm font-Poppins w-full bg-slate-50 dark:bg-slate-700 transition-[height] duration-300 overflow-hidden ease-in-out dark:text-white ${
                  active !== index ? "h-0" : "h-[100px]"
                }`}
              >
                <textarea
                  className="p-3 font-thin outline-none bg-transparent font-Poppins w-full no-scrollbar resize-none"
                  value={faq.answer}
                  placeholder="Add your answer"
                  onChange={(e) => handleAnswerChange(e, index)}
                />
              </div>
            </div>
          ))}
          <p
            className="font-Poppins text-sm font-medium dark:text-white flex items-center mt-4 rounded-md duration-150 cursor-pointer w-full pl-4 gap-1"
            onClick={handleAddFaq}
          >
            <AiOutlinePlusCircle size={20} /> Add New FAQ
          </p>
          <div className="flex justify-end pr-12">
            <button
              className={`${styles.button} !w-[150px] ml-auto ${
                edit
                  ? "!bg-green-500"
                  : "!cursor-not-allowed !bg-slate-200 dark:!bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              disabled={!edit}
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFAQ;
