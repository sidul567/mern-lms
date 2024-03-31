import { useGetCourseAnalyticsQuery } from "@/app/redux/features/analytics/analyticsApi";
import { styles } from "@/app/utils/styles";
import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "../../Loader/Loader";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCourseAnalyticsQuery("");
  const analyticsData:any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({
        name: item.month,
        uv: item.count,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-[90vh]">
          <h1 className="dark:text-orange-400 text-orange-500 font-semibold text-2xl font-Josefin">
            Course Analytics
          </h1>
          <h2 className={`dark:text-white text-black text-sm font-Poppins`}>
            Last 12 months analytics data
          </h2>
          <div className="w-[90%] h-[90%] flex justify-center items-center mx-auto !font-Poppins">
            <ResponsiveContainer width="100%" height="50%">
              <BarChart width={150} height={40} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" value="Prices" />
                </XAxis>
                <YAxis domain={["auto", "auto"]} />
                <Bar dataKey="uv" fill="#fb923c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
