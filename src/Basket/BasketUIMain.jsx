import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCartItemsQuery } from "../services/apiSlice";
import useAuth from "../hooks/useAuth";

function Basket() {
    const token = localStorage.getItem("token");
    console.log(token);
    useAuth();
    const {
        data: basketItems,
        error,
        isLoading,
        isSuccess,
    } = useGetCartItemsQuery();
    const basket = useSelector((state) => state.basket.basket);

    useEffect(() => {
        if (isSuccess) {
            console.log("Basket Items:", basketItems);
        }
    }, [isSuccess, basketItems]);

    if (isLoading) return <p>Yuklanmoqda...</p>;
    if (error) return <p>Xato yuz berdi: {error.message}</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Savatcha
            </h1>
            {basketItems && basketItems.length === 0 ? (
                <p className="text-gray-600">Savatchangiz bo'sh.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {basketItems &&
                        basketItems.map((item) => (
                            <div
                                key={item.id}
                                className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg"
                            >
                                <img
                                    className="w-full h-48 object-cover"
                                    src={item.food.image}
                                    alt={item.food.name}
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        {item.food.name}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {item.food.description}
                                    </p>
                                    <p className="text-lg text-blue-600 font-semibold mb-2">
                                        Narxi: {item.food.price} so'm
                                    </p>
                                    <p className="text-lg text-blue-600 font-semibold mb-2">
                                        Sanoat bo'limi:{" "}
                                        {item.food.category.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default Basket;
