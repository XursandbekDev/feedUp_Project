import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./pages/admin";
import Basket from "./Basket";
import BasketUI from "./Basket/BasketUI";
import AdminLogin from "./AdminLogin";
import CategoriesAdmin from "./pages/admin/Category";
import PrivateRoute from "./components/PrivateRoute";
import CategoryPage from "./pages/admin/Category/CategoryPage";
import AdminUI from "./pages/admin/Products/AddProducts";
import AddProducts from "./pages/admin/Products/AddProducts";
import Products from "./pages/admin/Products/Products";

export const Context = createContext();

function App() {
    const [wallet, setWallet] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
                token,
                setToken,
            }}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/basket" element={<Basket />} />
                {/* <Route path="/basketUI" element={<BasketUI />} /> */}
                <Route path="/login" element={<AdminLogin />} />

                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/category/create"
                    element={
                        <PrivateRoute>
                            <CategoriesAdmin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/add"
                    element={
                        <PrivateRoute>
                            <AddProducts />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <PrivateRoute>
                            <CategoryPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Context.Provider>
    );
}

export default App;
