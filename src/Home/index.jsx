import React from "react";
import Nav from "../Navbar";
import Main from "./Main";
// import Footer from "../Footer";
// import BasketUI from "../Basket/BasketUI";
import { useState } from "react";
import CategoryUser from "./CategoryUser";

function Home() {
    const [search, setSearch] = useState("");
    return (
        <div className="">
            <Nav setSearch={setSearch} />
            <CategoryUser />
            <Main search={search} setSearch={setSearch} />
        </div>
    );
}

export default Home;
