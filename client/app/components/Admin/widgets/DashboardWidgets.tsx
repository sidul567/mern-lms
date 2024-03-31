import React from "react";
import UserAnalytics from "../analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OrderAnalytics from "../analytics/OrderAnalytics";
import OrderList from "../orders/OrderList";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          className=" text-black dark:text-white"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

type Props = {};

const DashboardWidgets = (props: Props) => {
  return (
    <div className="mt-30 space-y-12">
      <div className="grid grid-cols-[75%,25%]">
        <div className="w-full">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="w-full mt-12 space-y-2">
            <div className="flex justify-between items-center dark:bg-slate-800 p-5 shadow-md">
                <div className="space-y-2">
                  <BiBorderLeft className="text-black dark:text-white" size={25} />
                  <p className="text-sm font-Poppins font-semibold text-black dark:text-white">120</p>
                  <p className="text-base font-Poppins font-medium dark:text-orange-400 text-orange-500">Sales Obtain</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={100} />
                  <h5 className="text-sm font-semibold text-black dark:text-white font-Poppins">+120%</h5>
                </div>
            </div>
            <div className="flex justify-between items-center dark:bg-slate-800 p-5 shadow-md">
                <div className="space-y-2">
                  <PiUsersFourLight className="text-black dark:text-white" size={25} />
                  <p className="text-sm font-Poppins font-semibold text-black dark:text-white">450</p>
                  <p className="text-base font-Poppins font-medium dark:text-orange-400 text-orange-500">Sales Obtain</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={100} />
                  <h5 className="text-sm font-semibold text-black dark:text-white font-Poppins">+150%</h5>
                </div>
            </div>
        </div>
      </div>
      <div className="grid grid-cols-[75%,25%]">
        <div className="w-full">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="w-full mt-12 space-y-2">
          <OrderList />
        </div>
      </div>
      
    </div>
  );
};

export default DashboardWidgets;
