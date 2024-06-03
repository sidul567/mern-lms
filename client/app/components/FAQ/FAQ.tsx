import {
  useGetLayoutByTypeQuery,
  useUpdateLayoutMutation,
} from "@/app/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { styles } from "@/app/utils/styles";
import toast from "react-hot-toast";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading, isSuccess, error, refetch } =
    useGetLayoutByTypeQuery(
      {
        type: "faq",
      },
      { refetchOnMountOrArgChange: true }
    );

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (isSuccess) {
      setFaqs(data.layout.faq);
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  return (
    <div className="bg-white dark:bg-slate-900 w-full px-4 800px:px-24 pt-12 space-y-3">
      <h3 className={`${styles.title}`}>Frequently Asked Questions</h3>
      {faqs.map((faq: any, index: number) => (
        <div className="w-full rounded-sm shadow-md">
          <div className="dark:text-white w-full p-3 font-Poppins bg-slate-50 flex justify-between items-center dark:bg-slate-700 relative cursor-pointer">
            <p
              className="text-sm font-medium bg-transparent outline-none w-full"
              onClick={() => setActive(active !== index ? index : -1)}
            >
              {faq.question}
            </p>
            <MdKeyboardArrowDown
              size={25}
              className={`cursor-pointer duration-300 ${
                active !== index ? "rotate-0" : "rotate-180"
              }`}
              onClick={() => setActive(active !== index ? index : -1)}
            />
          </div>
          <div
            className={`text-sm font-Poppins w-full bg-slate-50 dark:bg-slate-700 transition-[height] duration-300 overflow-hidden ease-in-out dark:text-white ${
              active !== index ? "h-0" : "h-[100px]"
            }`}
          >
            <p className="p-3 font-thin outline-none bg-transparent font-Poppins w-full no-scrollbar resize-none">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
