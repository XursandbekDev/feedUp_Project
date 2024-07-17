import React from "react";
import React, { useContext, useEffect, useState } from "react";
// import { BasketContext } from "./BasketProvider";

function BasketPrice() {
    // const { totalPrice, setTotalPrice } = useContext(BasketContext);
    const [tprice, settPrice] = useState();
    useEffect(() => {
        const money = basket.reduce(
            (total, foodprice) => total + foodprice.price,
            0
        );
        settPrice(money);
    }, [basket]);

    return (
        <div className="">
            {/* <h1>Umumiy narx : {tprice} </h1> */}
        </div>
    );
}

export default BasketPrice;
