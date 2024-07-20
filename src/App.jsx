import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./pages/admin";
import Basket from "./Basket";
import AdminLogin from "./AdminLogin";
import CategoriesAdmin from "./pages/admin/Category";
import PrivateRoute from "./components/PrivateRoute";
import CategoryPage from "./pages/admin/Category/CategoryPage";
import AddProducts from "./pages/admin/Products/AddProducts";
import Products from "./pages/admin/Products/Products";

export const Context = createContext();

function App() {
    const [wallet, setWallet] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [userToken, setUserToken] = useState(
        localStorage.getItem("userToken") || ""
    );
    const [adminToken, setAdminToken] = useState(
        localStorage.getItem("adminToken") || ""
    );

    return (
        <Context.Provider
            value={{
                wallet,
                setWallet,
                totalPrice,
                setTotalPrice,
                isOpen,
                openModal,
                closeModal,
                userToken,
                setUserToken,
                adminToken,
                setAdminToken,
            }}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/login" element={<AdminLogin />} />

                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute tokenType="admin">
                            <Admin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/category/create"
                    element={
                        <PrivateRoute tokenType="admin">
                            <CategoriesAdmin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/add"
                    element={
                        <PrivateRoute tokenType="admin">
                            <AddProducts />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <PrivateRoute tokenType="admin">
                            <Products />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <PrivateRoute tokenType="admin">
                            <CategoryPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Context.Provider>
    );
}

export default App;
