import { apiSlice } from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data: any) => ({
        url: "course/create",
        body: data,
        credentials: "include" as const,
        method: "POST",
      }),
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "course/getAllCourses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getSingleCourseAdmin: builder.query({
      query: ({ courseId }) => ({
        url: `admin/course/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContentWithoutPurchase: builder.query({
      query: (courseId) => ({
        url: `/course/get/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: ({ courseId }) => ({
        url: `course/${courseId}`,
        credentials: "include" as const,
        method: "DELETE",
      }),
    }),
    editCourse: builder.mutation({
      query: ({ data, courseId }) => ({
        url: `course/update/${courseId}`,
        body: data,
        credentials: "include" as const,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDeleteCourseMutation,
  useGetSingleCourseAdminQuery,
  useEditCourseMutation,
  useGetCourseContentWithoutPurchaseQuery,
} = courseApi;
