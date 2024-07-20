import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Context } from "../App";
import { useCreateOrderMutation } from "../services/apiSlice";

export default function BasketUIFooter() {
    const { wallet, openModal } = useContext(Context);
    const basket = useSelector((state) => state.basket.items);
    const [createOrder] = useCreateOrderMutation();

    const handleOrder = async () => {
        if (basket.length === 0) return;

        const orderData = {
            items: basket.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            })),
            total_price: wallet,
        };

        try {
            const response = await createOrder({ orderData }).unwrap();
            if (response) {
                openModal();
            }
        } catch (error) {
            console.error("Failed to create order:", error);
        }
    };

    return (
        <div className="p-4 shadow-xl rounded-lg bg-white">
            <button
                className="bg-orange-700 w-full hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleOrder}
            >
                <h1 className="text-xl">Buyurtma Berish {wallet} UZS</h1>
            </button>
        </div>
    );
}

