import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCartItemMutation } from "../services/apiSlice";
import { Context } from "../App";

function MainUIBanner({ item }) {
    const dispatch = useDispatch();
    const { wallet, setWallet } = useContext(Context);
    const [createCartItem] = useCreateCartItemMutation();

    const basket = useSelector((state) =>
        state.basket.basket.find((basketItem) => basketItem.food.id === item.id)
    );
    const initialQuantity = basket ? basket.count : 0;
    const [quantity, setQuantity] = useState(initialQuantity); // State to manage quantity

    const PlusHandler = async () => {
        const newQuantity = quantity + 1;
        const token = localStorage.getItem("token");
        if (token) {
            try {
                setQuantity(newQuantity); // Update quantity in state
                setWallet(wallet + parseInt(item.price));
            } catch (error) {
                console.error("Failed to create cart item:", error);
            }
        } else {
            console.error("Token not found in localStorage");
        }
    };

    const MinusHandler = async () => {
        const token = localStorage.getItem("token");
        if (token && quantity > 0) {
            const newQuantity = quantity - 1;
            try {
                setQuantity(newQuantity);
                setWallet(wallet - parseInt(item.price));
            } catch (error) {
                console.error("Failed to create cart item:", error);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg">
            <div className="relative">
                <button className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow">
                    {quantity}
                </button>
                <img
                    className="w-full h-48 object-cover"
                    src={item.image}
                    alt={item.name}
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.name}
                </h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                    <p className="text-lg text-blue-600 font-semibold">
                        {item.price} so'm
                    </p>
                    <div className="flex space-x-2">
                        <button
                            onClick={PlusHandler}
                            className="text-sm bg-blue-600 text-white rounded px-3 py-1 transition duration-300 hover:bg-blue-700"
                        >
                            +
                        </button>
                        <button
                            onClick={MinusHandler}
                            className={`text-sm ${
                                quantity === 0
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                            } text-white rounded px-4 py-2 transition duration-300 shadow`}
                            disabled={quantity === 0}
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainUIBanner;
