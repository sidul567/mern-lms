import { apiSlice } from "../api/apiSlice";

const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayoutByType: builder.query({
      query: ({ type }) => ({
        url: `layout/get/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateLayout: builder.mutation({
        query: ({type, title, subtitle, image, faq, categories})=>({
            url: "layout/update",
            method: "PUT",
            body: {type, title, subtitle, image, faq, categories},
            credentials: "include" as const,
        })
    })
  }),
});

export const {useGetLayoutByTypeQuery, useUpdateLayoutMutation} = layoutApi;