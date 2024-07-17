import React, { useContext, useState } from 'react';
import { Context } from '../App';

export default function BasketOrder({ count, food, deliveryFee }) {
    const [quantity, setQuantity] = useState(count || 1);
    const { setTotalPrice } = useContext(Context);

    return (
        <div className="basket-item flex flex-col md:flex-row rounded-lg py-4 px-5 bg-gray-100 shadow-lg relative">
            <p className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">{quantity}</p>
            <img
                className="item-image rounded-xl w-full md:w-60 object-cover"
                src={food?.img}
                alt={food?.title}
            />
            <div className="item-details flex flex-col p-4 flex-1">
                <h1 className="item-title text-xl md:text-2xl font-semibold">{food.title}</h1>
                <p className="item-description text-gray-600 mt-2">{food.description}</p>
            </div>
            <div className="quantity-controls flex flex-col justify-center items-center py-3 px-4 md:px-6 bg-white rounded-lg shadow-md w-full md:w-auto mt-4 md:mt-0">
                <h2 className="text-lg md:text-xl text-blue-600 font-semibold">{food.price * quantity} UZS</h2>
            </div>
        </div>
    );
}