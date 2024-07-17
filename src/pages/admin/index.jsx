import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Route, Routes } from "react-router-dom";

import AdminUI from "./Products/AddProducts";
import { useAddFoodMutation } from "../../services/apiSlice";
import Sidebar from "./Sidebar/Sidebar";
import CategoriesAdmin from "./Category";
import CategoriesCreate from "./Category/CategoriesCreate";
import CategoryPage from "./Category/CategoryPage";

function Admin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [addFood] = useAddFoodMutation();

    useEffect(() => {
        if (
            localStorage.getItem("token") === "" ||
            localStorage.getItem("token") === null
        ) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
        
            <div className="bg-white flex">
                <Sidebar />
            </div>
            

        </>
    );
}

export default Admin;
