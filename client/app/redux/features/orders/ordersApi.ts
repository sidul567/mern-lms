import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getAllOrders: builder.query({
            query: ()=>({
                url: "/orders",
                method: "GET",
                credentials: "include" as conts,
            })
        })
    })
})

export const {useGetAllOrdersQuery} = ordersApi;