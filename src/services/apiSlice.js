import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// Custom base query function
const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers, tokenType }) => {
        try {
            const token = localStorage.getItem(
                tokenType === "admin" ? "adminToken" : "userToken"
            );
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
                tokenType: "user", // Token turini belgilash
            }),
        }),
        loginAdmin: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                data: { email, password },
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        createCategory: builder.mutation({
            query: ({ formData }) => ({
                url: "category/create",
                method: "POST",
                data: formData,
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        updateCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `categories/${id}`,
                method: "PATCH",
                data: formData,
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `categories/${id}`,
                method: "DELETE",
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        getCategories: builder.query({
            query: () => ({
                url: "categories",
                method: "GET",
                tokenType: "user", // Token turini belgilash
            }),
        }),
        getFoods: builder.query({
            query: () => ({
                url: "products",
                method: "GET",
                tokenType: "user", // Token turini belgilash
            }),
        }),
        addFood: builder.mutation({
            query: ({ foodData }) => ({
                url: "product/create",
                method: "POST",
                data: foodData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "userToken"
                    )}`, // Tokenni shu yerga qo'shing
                },
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        deleteFood: builder.mutation({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: "DELETE",
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        updateFood: builder.mutation({
            query: ({ id, foodData }) => ({
                url: `products/${id}`,
                method: "PATCH",
                data: foodData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "userToken"
                    )}`, // Tokenni shu yerga qo'shing
                },
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        createOrder: builder.mutation({
            query: ({ orderData }) => {
                const token = localStorage.getItem("userToken");
                return {
                    url: "order/create",
                    method: "POST",
                    data: {
                        ...orderData, // orderData ob'ektini qo'shing
                        token: token, // Tokenni shu yerga qo'shing
                    },
                    tokenType: "user", // Token turini belgilash
                };
            },
        }),
        getOrders: builder.query({
            query: () => ({
                url: "orders",
                method: "GET",
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        completeOrder: builder.mutation({
            query: ({ order_id }) => ({
                url: `orders/${order_id}/complete`,
                method: "PATCH",
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        cancelOrder: builder.mutation({
            query: ({ order_Id }) => ({
                url: `orders/${order_Id}/cancel`,
                method: "PATCH",
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        deleteOrder: builder.mutation({
            query: ({ order_Id }) => ({
                url: `orders/${order_Id}`,
                method: "DELETE",
                tokenType: "admin", // Token turini belgilash
            }),
        }),
        createCartItem: builder.mutation({
            query: ({ product_id, quantity }) => ({
                url: "cartItem/create",
                method: "POST",
                data: {
                    product_id,
                    quantity,
                },
                tokenType: "user", // Token turini belgilash
            }),
        }),
        getCartItems: builder.query({
            query: () => ({
                url: "cartItem/get",
                method: "GET",
                tokenType: "user", // Token turini belgilash
            }),
        }),
        deleteCartItem: builder.mutation({
            query: ({ cartItem_id }) => ({
                url: `cartItems/${cartItem_id}`,
                method: "DELETE",
                tokenType: "user", // Token turini belgilash
            }),
        }),
    }),
});

export const {
    useGetTokenMutation,
    useLoginAdminMutation,
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
