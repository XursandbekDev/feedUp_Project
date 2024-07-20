import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
    items: [],
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromBasket: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

const selectBasket = (state) => state.basket;

export const selectBasketItems = createSelector(
  [selectBasket],
  (basket) => basket.items
);

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
