import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { Box } from "@mui/material";
import { useGetAllCourseQuery } from "@/app/redux/features/course/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/app/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/app/redux/features/user/userApi";

type Props = {};

const OrderList = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { data: courseData } = useGetAllCourseQuery("");
  const { data: userData } = useGetAllUsersQuery("");
  const { data, isLoading, isSuccess } = useGetAllOrdersQuery("");

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      const tempData = data.orders.map((item: any) => {
        const user = userData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = courseData?.courses.find(
          (course: any) => course._id === item.courseId
        );

        return {
          ...item,
          userName: user?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(tempData);
    }
  }, [isSuccess, userData, courseData, data]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.4,
    },
    { field: "price", headerName: "Price", flex: 0.3 },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: "#" + item._id,
        name: item.userName,
        price: item.price,
        createdAt: format(item.createdAt),
      });
    });

  return (
    <>
      <h1 className="dark:text-orange-400 text-orange-500 font-semibold text-center text-2xl font-Josefin mb-6 border-b-2 border-b-orange-500 dark:border-b-orange-400 w-[300px] mx-auto">
        Recent Transactions
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          className="w-full"
          sx={{
            "& .MuiCheckbox-root": {
              color: theme === "dark" ? "#fff !important" : "#000 !important",
            },
            "& .MuiDataGrid-columnHeader .MuiDataGrid-checkboxInput": {
              color: "#fff !important",
            },
            "& .MuiDataGrid-footerContainer": {
              bgcolor:
                theme === "dark" ? "#fb923c !important" : "#f97316 !important",
            },
            "& .MuiToolbar-root": {
              color: "#fff !important",
              fontSize: "14px !important",
              fontFamily: "var(--font-Poppins) !important",
              fontWeight: "500 !important",
            },
            "& .MuiTablePagination-selectLabel": {
              color: "#fff !important",
              fontSize: "14px !important",
              fontFamily: "var(--font-Poppins) !important",
              fontWeight: "500 !important",
            },
            "& .MuiTablePagination-displayedRows": {
              color: "#fff !important",
              fontSize: "14px !important",
              fontFamily: "var(--font-Poppins) !important",
              fontWeight: "500 !important",
            },
            "& .MuiTablePagination-actions .MuiButtonBase-root": {
              color: "#fff !important",
            },
            "& .MuiInputBase-root": {
              color: "#fff !important",
              fontSize: "14px !important",
              fontFamily: "var(--font-Poppins) !important",
              fontWeight: "500 !important",
            },
            "& .MuiInputBase-root .MuiSvgIcon-root": {
              color: "#fff !important",
            },
            "& .MuiDataGrid-selectedRowCount": {
              color: "#fff !important",
            },
            "& .MuiDataGrid-overlay": {
              bgcolor: theme === "dark" ? "#000 !important" : "#fff !important",
              color: theme === "dark" ? "#fff !important" : "#000 !important",
              fontFamily: "var(--font-Poppins) !important",
            },
          }}
        >
          <DataGrid
            sx={{ maxHeight: "80vh" }}
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            getRowClassName={(params) =>
              "bg-gray-50 dark:bg-slate-700 dark:text-white text-sm font-Poppins"
            }
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 20]}
            autoHeight
          />
        </Box>
      )}
    </>
  );
};

export default OrderList;
