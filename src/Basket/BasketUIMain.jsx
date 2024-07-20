import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/apiSlice";

function BasketUIMain() {
    // useCreateOrderMutation hook'ini chaqirish
    const [createOrder] = useCreateOrderMutation();
    // Redux state'idan savatchadagi mahsulotlarni olish
    const basket = useSelector((state) => state.basket.items);
    // Navigate funksiyasini chaqirish uchun useNavigate hook'ini ishlatish
    const navigate = useNavigate();

    // useEffect hook'i savatcha bo'sh bo'lsa, asosiy sahifaga yo'naltiradi
    useEffect(() => {
        if (basket.length === 0) {
            navigate("/");
        }
    }, [basket, navigate]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sizning savatchangiz</h1>
            {basket.length === 0 ? (
                <p>Savatchangiz bo'sh</p>
            ) : (
                <ul>
                    {basket.map((item) => (
                        <li
                            key={item.id}
                            className="flex justify-between items-center mb-4 bg-white shadow-md rounded-lg p-4"
                        >
                            <img
                                className="w-16 h-16 object-cover rounded-md mr-4"
                                src={item.image}
                                alt={item.name}
                            />
                            <div className="flex-grow">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-gray-600">
                                    {item.quantity} x {item.price} UZS
                                </p>
                            </div>
                            <p className="font-bold">
                                {item.quantity * item.price} UZS
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BasketUIMain;
