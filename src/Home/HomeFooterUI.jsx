import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Context } from "../App";

function HomeFooterUI() {
    const navigate = useNavigate();
    const { wallet } = useContext(Context);
    const basket = useSelector((state) => state.basket.items);

    const handleNextPage = () => {
        if (wallet > 0) {
            console.log("Basket items:", basket);
            navigate("/basket");
        } else if (wallet === 0) {
            navigate("/");
        }
    };

    return (
        <div className="flex flex-row justify-between items-center px-4 py-2 bg-white w-full">
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
                        ? "bg-gray-300 cursor-not-allowed hidden"
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
