import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, paymentInfo }) => ({
        url: "/order/create",
        method: "POST",
        credentials: "include" as const,
        body: {
          courseId,
          paymentInfo,
        },
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "/stripe-publishable-key",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPayment: builder.mutation({
      query: (amount) => ({
        url: "/payment",
        method: "POST",
        credentials: "include" as const,
        body: {
          amount,
        },
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useCreatePaymentMutation,
  useGetStripePublishableKeyQuery,
} = ordersApi;
