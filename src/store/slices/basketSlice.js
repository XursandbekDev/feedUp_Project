import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    basket: [],
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const itemIndex = state.basket.findIndex(
                (item) => item.food.id === action.payload.food.id
            );
            if (itemIndex >= 0) {
                state.basket[itemIndex].count += action.payload.count;
            } else {
                state.basket.push(action.payload);
            }
        },
        removeFromBasket: (state, action) => {
            state.basket = state.basket.filter(
                (item) => item.food.id !== action.payload.id
            );
        },
        updateBasketItemCount: (state, action) => {
            const itemIndex = state.basket.findIndex(
                (item) => item.food.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.basket[itemIndex].count = action.payload.count;
            }
        },
        clearBasket: (state) => {
            state.basket = [];
        },
    },
});

export const { addToBasket, removeFromBasket, updateBasketItemCount, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
