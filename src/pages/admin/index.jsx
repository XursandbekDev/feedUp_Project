import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Route, Routes } from "react-router-dom";

import AdminUI from "./Products/AddProducts";
import { useAddFoodMutation } from "../../services/apiSlice";
import Sidebar from "./Sidebar/Sidebar";
import CategoriesAdmin from "./Category";
import CategoriesCreate from "./Category/CategoriesCreate";
import CategoryPage from "./Category/CategoryPage";
import AdminOrders from "./AdminOrder";

function Admin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [addFood] = useAddFoodMutation();

    return (
        <>
            <div className="bg-white flex flex-grow">
                <Sidebar />
                <AdminOrders />
            </div>
        </>
    );
}

export default Admin;
