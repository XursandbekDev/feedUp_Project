import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Context } from "../App";
import { useCreateCartItemMutation } from "../services/apiSlice";

function HomeFooterUI() {
    const navigate = useNavigate();
    const { token, wallet } = useContext(Context);
    const basket = useSelector((state) => state.basket.basket);
    const [createCartItem] = useCreateCartItemMutation();

    const handleNextPage = async () => {
        if (wallet > 0) {
            try {
                await Promise.all(
                    basket.map(async (item) => {
                        const response = await createCartItem({
                            token,
                            product_id: item.food.id,
                            quantity: item.count,
                        }).unwrap();
                        console.log("Success:", response);
                    })
                );
                navigate("/basket");
            } catch (error) {
                console.error("Failed to add cart item:", error);
            }
        } else if (wallet === 0) {
            navigate("/");
        }
    };

    return (
        <div className="flex flex-row justify-between items-center px-4 py-2 bg-white  w-full">
            <div className="flex flex-col items-start">
                <p className="text-gray-700 text-lg">Umumiy narx:</p>
                <p className="text-2xl text-orange-500 font-bold">
                    {wallet} UZS
                </p>
            </div>
            <button
                onClick={handleNextPage}
                className={`text-lg ${
                    wallet === 0
                        ? "bg-gray-300 cursor-not-allowed "
                        : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                } text-white font-semibold rounded-lg px-4 py-2 transition duration-200 ease-in-out`}
                disabled={wallet === 0}
            >
                Buyurtma berish
            </button>
        </div>
    );
}

export default HomeFooterUI;
