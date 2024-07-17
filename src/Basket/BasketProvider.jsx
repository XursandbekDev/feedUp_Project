import React from "react";
export const BasketContext = React.createContext();

function BasketProvider({ children }) {
    const [basket, setBasket] = React.useState([]);

    const addFood = (food) => {
        setBasket((p) => [...p, food]);
    };
    const deleteFood = (id) => {
        setBasket((p) => p.filter((food) => food.id !== id));
    };
    return (
        <BasketContext.Provider value={{ basket, addFood, deleteFood }}>
            {children}
        </BasketContext.Provider>
    );
}

export default BasketProvider;


