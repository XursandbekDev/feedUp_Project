import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import basketSlice from "./features/basketSlice";

export const store = configureStore({
    reducer: {
        basket: basketSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
