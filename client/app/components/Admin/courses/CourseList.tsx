import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { Box, Modal } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "@/app/redux/features/course/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/utils/styles";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const CourseList = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { data, isError, isLoading, error, refetch } = useGetAllCourseQuery(
    "",
    { refetchOnMountOrArgChange: true }
  );
  const [
    deleteCourseAction,
    {
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
      error: deleteError,
      isLoading: deleteIsLoading,
    },
  ] = useDeleteCourseMutation();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    if (deleteIsSuccess) {
      refetch();
      toast.success("Course deleted successfully!");
    }
    if (deleteIsError) {
      const errorMessage = deleteError as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
  }, [deleteIsSuccess, deleteIsError, deleteError]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 100 },
    {
      field: "courseTitle",
      headerName: "Course Title",
      flex: 1,
      minWidth: 300,
    },
    { field: "ratings", headerName: "Ratings", flex: 0.3, minWidth: 100 },
    { field: "purchased", headerName: "Purchased", flex: 0.4, minWidth: 100 },
    { field: "createAt", headerName: "Created At", flex: 0.5, minWidth: 100 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.25,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <Link href={`/admin/updateCourse/${params.row.id}`}>
            <FaRegEdit
              size={20}
              className="dark:text-white cursor-pointer hover:text-green-500 duration-100"
            />
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <AiOutlineDelete
            size={20}
            className="dark:text-white cursor-pointer hover:text-red-500 duration-100"
            onClick={() => {
              setCourseId(params.row.id);
              setOpen(true);
            }}
          />
        );
      },
    },
  ];

  const rows: any = [];

  data &&
    data.courses.forEach((course: any) => {
      rows.push({
        id: course._id,
        courseTitle: course.name,
        ratings: course.ratings,
        purchased: course.purchased,
        createAt: format(course.createdAt),
      });
    });
    
  const deleteCourse = () => {
    setOpen(false);
    deleteCourseAction({ courseId });
  };

  return (
    <>
      <h1 className="dark:text-orange-400 text-orange-500 font-semibold text-center text-2xl font-Josefin mb-6 border-b-2 border-b-orange-500 dark:border-b-orange-400 w-[200px] mx-auto">
        Live Courses
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          className="w-full pr-4"
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
            }
          }}
        >
          <DataGrid
            sx={{ maxHeight: "80vh" }}
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            checkboxSelection
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
      {deleteIsLoading && <Loader />}
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[320px] 800px:w-[420px] 800px:px-6 p-4 pb-6 rounded-md shadow-none bg-gray-50 dark:bg-slate-900 outline-none">
            <div>
              <h1 className="text-2xl text-center font-semibold font-Josefin dark:text-white">
                Are you sure want to delete this course?
              </h1>
              <div className="flex justify-end mt-8 gap-10">
                <button
                  className={`${styles.button} !bg-green-500`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={`${styles.button} !bg-red-500`}
                  onClick={deleteCourse}
                >
                  Delete
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CourseList;
