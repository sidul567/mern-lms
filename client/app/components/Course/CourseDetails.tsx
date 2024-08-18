import { useGetCourseContentWithoutPurchaseQuery } from "@/app/redux/features/course/courseApi";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Rating from "@/app/utils/Rating";
import { styles } from "@/app/utils/styles";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCheckDouble } from "react-icons/bi";
import { LuDot } from "react-icons/lu";
import CourseContent from "./CourseContent";
import { Box, Modal } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import {
  useCreatePaymentMutation,
  useGetStripePublishableKeyQuery,
} from "@/app/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import { useSelector } from "react-redux";

type Props = {};

const CourseDetails = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const params = useParams();
  const { id } = params;

  const { data, isSuccess, error } =
    useGetCourseContentWithoutPurchaseQuery(id);
  const { data: stripePublishableKey } = useGetStripePublishableKeyQuery({});
  const [createPayment] = useCreatePaymentMutation();

  const [courseData, setCourseData] = useState<any>();
  const [openBuyNow, setOpenBuyNow] = useState(false);
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (stripePublishableKey?.publishableKey) {
      setStripePromise(loadStripe(stripePublishableKey?.publishableKey));
    }

    if (data) {
      const amount = data?.course?.price;
      createPayment(amount)
        .then((res: any) => {
          if (res?.error) {
            console.error(res?.error?.data?.message || "Something went wrong!");
            return;
          }

          setClientSecret(res?.data?.clientSecret);
        })
        .catch((e) => {
          toast.error(e?.message || "Something went wrong!");
        });
    }
  }, [stripePublishableKey?.publishableKey, createPayment, data]);

  useEffect(() => {
    if (isSuccess) {
      setCourseData(data.course);
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, error, data?.course]);

  const discount = Math.ceil(
    ((parseInt(courseData?.estimatedPrice) - parseInt(courseData?.price)) /
      parseInt(courseData?.estimatedPrice)) *
      100
  );

  const isPurchased = user?.courses?.find(
    (course: any) => course?.courseId === courseData?._id
  );
  return (
    <>
      <div className="w-full min-h-screen bg-white dark:bg-slate-900 px-4 md:px-8 lg:px-24 pt-24 grid grid-cols-12 md:gap-12">
        <div className="flex flex-col gap-4 col-span-12 md:col-span-8">
          <h3 className="font-Poppins font-semibold text-xl text-black dark:text-white">
            {courseData?.name}
          </h3>
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <Rating rating={courseData?.ratings} />
              <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                {courseData?.reviews?.length}{" "}
                {courseData?.reviews?.length === 0 ? "review" : "reviews"}
              </p>
            </div>
            <p className="text-sm font-Poppins font-normal text-black dark:text-white">
              {courseData?.purchased}{" "}
              {courseData?.purchased > 1 ? "students" : "student"}
            </p>
          </div>
          <div className="pt-2">
            <p className="font-Poppins font-semibold text-lg text-black dark:text-white">
              What you will learn from this course?
            </p>
            {courseData?.benefits?.map((item: any, index: number) => (
              <div className="flex items-center gap-2 pt-2" key={index}>
                <BiCheckDouble size={18} className="dark:text-white" />
                <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                  {item?.title}
                </p>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <p className="font-Poppins font-semibold text-lg text-black dark:text-white">
              What are the prerequisite for starting this course?
            </p>
            {courseData?.prerequisites?.map((item: any, index: number) => (
              <div className="flex items-center gap-2 pt-2" key={index}>
                <BiCheckDouble size={18} className="dark:text-white" />
                <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                  {item?.title}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-Poppins font-semibold text-xl text-black dark:text-white py-4">
              Course Overview
            </p>
            <CourseContent data={courseData} />
          </div>
          <p className="font-Poppins font-semibold text-lg text-black dark:text-white pt-3">
            Course Details
          </p>
          <p className="text-base font-Poppins font-normal text-black dark:text-white">
            {courseData?.description}
          </p>
          <div>
            <p className="text-base font-Poppins font-normal text-black dark:text-white">
              Support me:
            </p>
            <Link
              href="https://mern-lms-567.netlify.app"
              target="_blank"
              className="text-sm font-Poppins font-normal text-black dark:text-white"
            >
              https://mern-lms-567.netlify.app
            </Link>
          </div>
          <div className="flex items-center gap-2 pb-8 md:pb-0">
            <Rating rating={courseData?.ratings} />
            <p className="text-sm md:text-xl font-Poppins font-normal text-black dark:text-white">
              Course Rating
            </p>
            <LuDot className="dark:white w-3 md:w-10" />
            <p className="text-sm md:text-xl font-Poppins font-normal text-black dark:text-white">
              {courseData?.reviews?.length}{" "}
              {courseData?.reviews?.length === 0 ? "review" : "reviews"}
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="sticky top-24">
            <CoursePlayer videoUrl="7dfa320e86b4bb5569ebaa060d2b1ccf" />
            <div className="flex gap-3 pt-4">
              <p className="text-2xl font-Poppins font-normal text-black dark:text-white">
                ${courseData?.price}
              </p>
              <p className="text-base line-through font-Poppins font-normal text-black dark:text-white">
                ${courseData?.estimatedPrice}
              </p>
              <p className="text-2xl font-Poppins font-normal text-black dark:text-white">
                {discount}% off
              </p>
            </div>
            <div className="pt-4">
              {isPurchased ? (
                <Link
                  href={`/course-access/${courseData?._id}`}
                  className={`${styles.button} px-4`}
                >
                  Enter Course
                </Link>
              ) : (
                <button
                  className={`${styles.button} !w-fit px-4`}
                  onClick={() => setOpenBuyNow(true)}
                >
                  Buy Now ${courseData?.price}
                </button>
              )}
            </div>
            <div className="flex flex-col pt-4">
              <div className="flex items-center">
                <LuDot size={40} className="dark:white" />
                <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                  30days moneybag guarantee
                </p>
              </div>
              <div className="flex items-center">
                <LuDot size={40} className="dark:white" />
                <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                  Source code included
                </p>
              </div>
              <div className="flex items-center">
                <LuDot size={40} className="dark:white" />
                <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                  Full lifetime access
                </p>
              </div>
              <div className="flex items-center">
                <LuDot size={40} className="dark:white" />
                <p className="text-sm font-Poppins font-normal text-black dark:text-white">
                  Premium Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={openBuyNow}
        onClose={() => setOpenBuyNow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[320px] 800px:w-[420px] 800px:px-6 p-4 pb-6 rounded-md shadow-none bg-gray-50 dark:bg-slate-900 outline-none">
          <div className="flex justify-between items-center">
            <div></div>
            <FaTimes
              className="text-base text-black dark:text-white cursor-pointer"
              onClick={() => setOpenBuyNow(false)}
            />
          </div>
          <div>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm data={courseData} />
              </Elements>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CourseDetails;
