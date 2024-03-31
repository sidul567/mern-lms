"use client"

import Loader from "@/app/components/Loader/Loader";
import { useGetUserAnalyticsQuery } from "@/app/redux/features/analytics/analyticsApi";
import React, { FC } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  isDashboard ?: boolean;
};

const UserAnalytics:FC<Props> = ({isDashboard}: Props) => {
  const { data, isLoading } = useGetUserAnalyticsQuery("");
  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({
        name: item.month,
        count: item.count,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`w-full ${isDashboard ? "h-[300px]" : "h-[90vh]"}`}>
          <h1 className="dark:text-orange-400 text-orange-500 font-semibold text-2xl font-Josefin">
            User Analytics
          </h1>
          <h2 className={`dark:text-white text-black text-sm font-Poppins`}>
            Last 12 months analytics data
          </h2>
          <div className="w-[90%] h-[90%] flex justify-center items-center mx-auto !font-Poppins">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={analyticsData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
