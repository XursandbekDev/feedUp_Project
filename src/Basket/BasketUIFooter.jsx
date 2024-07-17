import React, { useContext } from 'react';
import { Context } from '../App';

export default function BasketUIFooter() {
  const { totalPrice, openModal, wallet } = useContext(Context);

  return (
    <div className="p-4 shadow-xl rounded-lg bg-white">
      <button 
        className="bg-orange-700 w-full hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        <h1 className="text-xl">Buyurtma Berish {totalPrice} UZS</h1>
      </button>
    </div>
  );
}
