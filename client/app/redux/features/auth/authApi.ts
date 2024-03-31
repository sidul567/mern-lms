import { apiSlice } from "../api/apiSlice";
import { userLogin, userLogout, userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: "";
  token: "";
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "user/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.token,
              message: result.data.message,
            })
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),

    activation: builder.mutation({
        query: ({activationCode, activationToken})=>({
            url: "user/activate",
            method: "POST",
            body: {activationCode, activationToken},
            credentials: "include" as const,
        })
    }),

    login: builder.mutation({
      query: ({email, password})=>({
        url: "user/login",
        method: "POST",
        body: {email, password},
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}){
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
      }
    }),

    socialAuth: builder.mutation({
      query: ({name, email, avatar})=>({
        url: "user/socialAuthLogin",
        method: "POST",
        body: {name, email, avatar},
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}){
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
      }
    }),

    logout: builder.query({
      query: ()=>({
        url: "user/logout",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}){
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogout()
          );
        } catch (e) {
          console.log(e);
        }
      }
    })
  }),
});

export const  {useRegistrationMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogoutQuery} = authApi;