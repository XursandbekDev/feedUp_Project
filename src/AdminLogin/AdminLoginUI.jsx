import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loginAction = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setValidationErrors({});
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        try {
            const res = await axios.post(
                "http://feed-up-api.komiljonovdev.uz/api/login",
                data
            );
            // Tokenni localStoragega saqlash
            localStorage.setItem("adminToken", res.data.token);
            navigate("/admin");
        } catch (error) {
            if (error.response && error.response.data) {
                setValidationErrors(error.response.data.errors);
            } else {
                console.error(error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("adminToken")) {
            navigate("/admin");
        }
    }, [navigate]); // Dependency arrayda faqat 'navigate' qo'shilgan

    return (
        <div className="flex justify-center mt-20">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h5 className="text-2xl font-bold mb-4">Sign In</h5>
                    <form onSubmit={loginAction}>
                        {Object.keys(validationErrors).length !== 0 && (
                            <p className="text-center text-red-500">
                                Incorrect Email or Password
                            </p>
                        )}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email address
                            </label>
                            <input
                                required
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                autoComplete="email"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Password
                            </label>
                            <input
                                required
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
