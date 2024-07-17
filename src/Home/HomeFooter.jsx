import React from "react";
import HomeFooterUI from "./HomeFooterUI";

function HomeFooter({ count, setCount, totalPrice }) {
    return (
        <div className=" fixed bottom-0 z-30 bg-white  pt-2 px-4  w-full h-auto max-h-56 shadow-sm ">
            <HomeFooterUI count={count} totalPrice={totalPrice} setCount={setCount} />
        </div>
    );
}

export default HomeFooter;
