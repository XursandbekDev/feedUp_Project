import React from "react";
import BasketUIHeader from "./BasketUIHeader";
import BasketUIMain from "./BasketUIMain";
import BasketUIFooter from "./BasketUIFooter";
import BasketUIModal from "./BasketUIModal"; 

function BasketUI() {
    return (
        <>
            
                <BasketUIHeader />
                <BasketUIMain />
                <BasketUIFooter />
                <BasketUIModal /> 
    
        </>
    );
}

export default BasketUI;