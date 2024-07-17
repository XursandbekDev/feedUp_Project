import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket: [],
    },
    reducers: {
        addBasket: (state, action) => {
            const exists = state.basket.find(item => item.food.title === action.payload.title);

            if (exists) {
                exists.count += 1;  
            } else {
                state.basket.push({ count: 1, food: { ...action.payload } }); 
            }
        }
    }
});

export const { addBasket } = basketSlice.actions;
export default basketSlice.reducer;
