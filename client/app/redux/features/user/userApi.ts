import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        updateAvatar: builder.mutation({
            query: ({avatar})=>({
                url: "user/updateAvatar",
                method: "PUT",
                credentials: "include" as const,
                body: {avatar}
            }),
            invalidatesTags: ["LoadUser"],
        }),
        updateInfo: builder.mutation({
            query: ({name})=>({
                url: "user/updateInfo",
                method: "PUT",
                credentials: "include" as const,
                body: {name}
            }),
            invalidatesTags: ["LoadUser"],
        }),
        updatePassword: builder.mutation({
            query: ({oldPassword, newPassword})=>({
                url: "users",
                method: "PUT",
                credentials: "include" as const,
                body: {oldPassword, newPassword}
            }),
        }),
        getAllUsers: builder.query({
            query: ()=>({
                url: "users",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        deleteUser: builder.mutation({
            query: ({userId})=>({
                url: `user/${userId}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        updateUserRole: builder.mutation({
            query: ({email, role})=>({
                url: "user/updateRole",
                method: "PUT",
                body: {email, role},
                credentials: "include" as const,
            })
        })
    })
})

export const {useUpdateAvatarMutation, useUpdateInfoMutation, useUpdatePasswordMutation, useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserRoleMutation} = userApi;