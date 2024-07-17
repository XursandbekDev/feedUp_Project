import React, { useContext } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom'; 

export default function BasketUIModal() {
  const { isOpen, closeModal,setWallet  } = useContext(Context);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const backToMenu = () => {
    navigate('/');
    closeModal()
    setWallet(0)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
      <div className="bg-white rounded-lg p-8 relative max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-2xl font-bold" onClick={closeModal}>&times;</button>
        <h2 className="text-2xl font-semibold mb-4">Buyurtmangiz tez orada yetkazib beriladi</h2>
        <button 
          onClick={backToMenu} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300"
        >
          Menu
        </button>
      </div>
    </div>
  );
}
