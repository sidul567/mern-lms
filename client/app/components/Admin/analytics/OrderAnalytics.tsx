import { useGetOrderAnalyticsQuery } from "@/app/redux/features/analytics/analyticsApi";
import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Loader from "../../Loader/Loader";

type Props = {
  isDashboard ?: boolean;
};

const OrderAnalytics:FC<Props> = ({isDashboard}: Props) => {
  const { data, isLoading } = useGetOrderAnalyticsQuery("");
  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
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
            Order Analytics
          </h1>
          <h2 className={`dark:text-white text-black text-sm font-Poppins`}>
            Last 12 months analytics data
          </h2>
          <div className="w-[90%] h-[80%] flex justify-center items-center mx-auto !font-Poppins">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="left" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="count"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
