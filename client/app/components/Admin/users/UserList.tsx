import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { Box, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import { MdOutlineMailOutline } from "react-icons/md";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/app/redux/features/user/userApi";
import { styles } from "@/app/utils/styles";
import { AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const UserList: FC<Props> = ({ isTeam }: Props) => {
  const { theme, setTheme } = useTheme();
  const { data, isError, isLoading, error, refetch } = useGetAllUsersQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const [
    deleteUserAction,
    {
      isSuccess: deleteIsSuccess,
      error: deleteError,
      isError: deleteIsError,
      isLoading: deleteIsLoading,
    },
  ] = useDeleteUserMutation();
  const [updateUserRoleAction, {isSuccess: roleIsSuccess,
    error: roleError,
    isError: roleIsError,
    isLoading: roleIsLoading,}] = useUpdateUserRoleMutation();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [openAddMember, setOpenAddMember] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  
  useEffect(() => {
    if (deleteIsSuccess) {
      refetch();
      toast.success("User deleted successfully!");
    }
    if (deleteIsError) {
      const errorMessage = deleteError as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
    if(roleIsSuccess){
      refetch();
      toast.success("User Role Updated successfully!");
    }
    if (roleIsError) {
      const errorMessage = roleError as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
  }, [deleteIsSuccess, deleteIsError, deleteError, roleIsSuccess, roleIsError, roleError, refetch]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.4, minWidth: 70 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      minWidth: 100,
    },
    { field: "email", headerName: "Email", flex: 0.4, minWidth: 70 },
    { field: "role", headerName: "Role", flex: 0.3, minWidth: 100 },
    { field: "purchased", headerName: "Purchased", flex: 0.3, minWidth: 50 },
    { field: "joinedAt", headerName: "Joined At", flex: 0.5, minWidth: 70 },
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
              setOpen(true);
              setUserId(params.row.id);
            }}
          />
        );
      },
    },
    {
      field: "sendMail",
      headerName: "Email",
      flex: 0.25,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <a href={`mailto:${params.row.email}`}>
            <MdOutlineMailOutline
              size={20}
              className="dark:text-white cursor-pointer hover:text-green-500 duration-100"
            />
          </a>
        );
      },
    },
  ];

  const rows: any = [];

  const deleteUser = () => {
    setOpen(false);
    deleteUserAction({ userId });
  };

  const updateUserRole = (e:any)=>{
    e.preventDefault();
    setOpenAddMember(false);
    setEmail("");
    setRole("");
    updateUserRoleAction({email, role});
  }

  if (isTeam) {
    const newData =
      data && data.users.filter((user: any) => user.role === "admin");
    newData &&
      newData.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          purchased: user.courses.length,
          role: user.role,
          joinedAt: format(user.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          purchased: user.courses.length,
          role: user.role,
          joinedAt: format(user.createdAt),
        });
      });
  }

  return (
    <>
      <h1 className="dark:text-orange-400 text-orange-500 font-semibold text-center text-2xl font-Josefin mb-6 border-b-2 border-b-orange-500 dark:border-b-orange-400 w-[200px] mx-auto">
        {isTeam ? "My Teams" : "All Users"}
      </h1>
      {isTeam && (
        <div className="flex justify-end mr-4">
          <button
            className={`${styles.button} !w-[150px] mb-4 flex justify-center items-center gap-1`} onClick={()=>setOpenAddMember(true)}
          >
            <AiOutlinePlus fill="#fff" size={20} className="font-bold" /> Add
            Member
          </button>
        </div>
      )}
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
          }}
        >
          <DataGrid
            sx={{ overflowX: "auto", maxHeight: "80vh" }}
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
      {(deleteIsLoading || roleIsLoading) && <Loader />}

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
                Are you sure want to delete this user?
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
                  onClick={deleteUser}
                >
                  Delete
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
      {openAddMember && (
        <Modal
          open={openAddMember}
          onClose={() => setOpenAddMember(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[320px] 800px:w-[420px] 800px:px-6 p-4 pb-6 rounded-md shadow-none bg-gray-50 dark:bg-slate-900 outline-none">
            <div>
              <h1 className={`${styles.title}`}>
                Add New Member
              </h1>
              <form onSubmit={updateUserRole}>
                <div>
                  <label htmlFor="email" className={`${styles.label}`}>Enter Email</label>
                  <input type="email" name="email" id="email" className={`${styles.input}`} placeholder="abc@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="role" className={`${styles.label}`}>Select Role</label>
                  <select name="role" id="role" className={`${styles.input}`} onChange={(e)=>setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div>
                  <input type="submit" value="Add Member" className={`${styles.button} mt-4`} />
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default UserList;
