import React, { useState } from "react";
import { FaHome, FaServicestack } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken"); // adminToken o'chiriladi
        navigate("/login");
    };

    const menuItems = [
        {
            icon: <FaHome className="mr-2" />,
            text: "Mahsulotlar",
            submenu: [
                { text: "Mahsulotlar ro'yxati", link: "/products" },
                { text: "Mahsulot qo'shish", link: "/products/add" },
            ],
        },
        {
            icon: <FaServicestack className="mr-2" />,
            text: "Kategoriyalar",
            submenu: [
                { text: "Kategoriyalar ro'yxati", link: "/categories" },
                { text: "Kategoriya qo'shish", link: "/category/create" },
            ],
        },
    ];

    return (
        <>
            <div
                className={`flex flex-col h-screen bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${
                    isOpen ? "w-64" : "w-16"
                }`}
            >
                <div className="p-4 flex items-center justify-between">
                    <h2
                        className={`text-3xl font-bold mb-4 transition-opacity duration-300 ${
                            isOpen ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        Admin
                    </h2>
                    <button
                        className="p-2 focus:outline-none text-blue-700 text-2xl"
                        onClick={toggleSidebar}
                        aria-label="Toggle Sidebar"
                    >
                        ☰
                    </button>
                </div>
                <ul className="px-2">
                    {menuItems.map((menuItem, index) => (
                        <li key={index} className="mb-2">
                            <div className="flex items-center p-2 hover:bg-gray-700 rounded transition-all duration-300">
                                {menuItem.icon}
                                <span
                                    className={`ml-2 ${
                                        isOpen ? "block" : "hidden"
                                    } transition-all duration-300`}
                                >
                                    {menuItem.text}
                                </span>
                            </div>
                            <ul
                                className={`${
                                    isOpen ? "block" : "hidden"
                                } pl-4`}
                            >
                                {menuItem.submenu.map((subitem, subindex) => (
                                    <li
                                        key={subindex}
                                        className="flex items-center p-2 hover:bg-gray-700 rounded mb-2 transition-all duration-300"
                                    >
                                        <Link
                                            to={subitem.link}
                                            className="text-white ml-2"
                                        >
                                            {subitem.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full p-2 bg-red-600 hover:bg-red-700 rounded transition-colors duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
