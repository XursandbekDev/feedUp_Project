import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers }) => {
        try {
            const token = localStorage.getItem("token");
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    ...headers,
                },
            });
            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://feed-up-api.komiljonovdev.uz/api/",
    }),
    endpoints: (builder) => ({
        getToken: builder.mutation({
            query: () => ({
                url: "getToken",
                method: "GET",
            }),
        }),
        loginUser: builder.mutation({
            query: ({ token }) => ({
                url: "login",
                method: "POST",
                data: { token },
            }),
        }),
        createCategory: builder.mutation({
            query: ({ formData }) => ({
                url: "category/create",
                method: "POST",
                data: formData,
            }),
        }),
        updateCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `categories/${id}`,
                method: "PATCH",
                data: formData,
            }),
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `categories/${id}`,
                method: "DELETE",
            }),
        }),
        getCategories: builder.query({
            query: () => ({
                url: "categories",
                method: "GET",
            }),
        }),
        getFoods: builder.query({
            query: () => ({
                url: "products",
                method: "GET",
            }),
        }),
        addFood: builder.mutation({
            query: ({ foodData }) => ({
                url: "product/create",
                method: "POST",
                data: foodData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        deleteFood: builder.mutation({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
        }),
        updateFood: builder.mutation({
            query: ({ id, foodData }) => ({
                url: `products/${id}`,
                method: "PATCH",
                data: foodData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        createOrder: builder.mutation({
            query: ({ orderData }) => ({
                url: "order/create",
                method: "POST",
                data: { ...orderData, token: localStorage.getItem("token") },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url: "orders",
                method: "GET",
            }),
        }),
        completeOrder: builder.mutation({
            query: ({ order_id }) => ({
                url: `orders/${order_id}/complete`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        cancelOrder: builder.mutation({
            query: ({ order_Id }) => ({
                url: `orders/${order_Id}/cancel`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        deleteOrder: builder.mutation({
            query: ({ order_Id }) => ({
                url: `orders/${order_Id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
   
        createCartItem: builder.mutation({
            query: ({ product_id, quantity }) => ({
                url: "cartItem/create",
                method: "POST",
                data: {
                    token: localStorage.getItem("token"),
                    product_id,
                    quantity,
                },
            }),
        }),
        getCartItems: builder.query({
            query: () => ({
                url: "cartItem/get",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        deleteCartItem: builder.mutation({
            query: ({ cartItem_id }) => ({
                url: `cartItems/${cartItem_id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
});

export const {
    useGetTokenMutation,
    useLoginUserMutation,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useGetFoodsQuery,
    useAddFoodMutation,
    useDeleteFoodMutation,
    useUpdateFoodMutation,
    useCreateOrderMutation,
    useGetOrdersQuery,
    useCompleteOrderMutation,
    useCancelOrderMutation,
    useDeleteOrderMutation,
    useCreateCartItemMutation,
    useGetCartItemsQuery,
    useDeleteCartItemMutation,
} = apiSlice;
