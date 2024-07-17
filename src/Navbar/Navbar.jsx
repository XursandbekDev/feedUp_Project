import React from "react";
import Logo from "../assets/images/feedUp.png";
import { CiSearch } from "react-icons/ci";
function Navbar({  setSearch }) {
    return (
        <div className=" flex flex-row items-center justify-between gap-x-1  w-full ">
            <div className="  ">
                <img
                    className="h-20 w-30 bg-cover bg-center bg-no-repeat "
                    src={Logo}
                    alt="feed up"
                />
            </div>
            <div className=" border-2  border-yellow-600 w-full  h-auto rounded-lg flex items-center flex-row  pl-2 max-w-md">
                <CiSearch className=" text-2xl text-black" />
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Taomni kiriting..."
                    className="outline-none px-2 py-1 rounded  "
                />
            </div>
        </div>
    );
}

export default Navbar;
