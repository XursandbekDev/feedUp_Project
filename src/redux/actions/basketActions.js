// redux/actions/basketActions.js

// Bu funktsiya Redux do'konida savatchani yangilash uchun harakat obyektini yaratadi.
export const updateBasket = (payload) => {
    return {
        type: "UPDATE_BASKET", // Harakat turini aniqlaydi
        payload, // Savatchani yangilash uchun kerakli ma'lumotlar, odatda productId va quantity ni o'z ichiga oladi
    };
};
