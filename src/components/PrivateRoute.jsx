import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, tokenType }) => {
    const location = useLocation();
    const tokenKey = tokenType === "admin" ? "adminToken" : "userToken";
    const token = localStorage.getItem(tokenKey);

    // Token mavjudligini tekshirish
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
