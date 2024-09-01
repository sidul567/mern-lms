import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  tagTypes: ["LoadUser", "getCourseContentWithPurchase"],
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "user/refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    loadUser: builder.query({
      query: () => ({
        url: "user/me",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["LoadUser"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice;
