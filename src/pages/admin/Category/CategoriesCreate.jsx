import React, { useState } from "react";
import { useCreateCategoryMutation } from "../../../services/apiSlice";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
const CategoriesCreate = () => {
    const navigate = useNavigate();
    const ExitButton = () => {
        navigate("/admin");
    };
    const [formData, setFormData] = useState({ name: "" });
    const [createCategory, { isLoading, isSuccess, isError, error }] =
        useCreateCategoryMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            console.log("Data to be sent:", { formData, token });
            const response = await createCategory({ formData, token }).unwrap();
            console.log("Response from the server:", response);
            setFormData({ name: "" });
        } catch (err) {
            console.error("Kategoriya saqlanmadi!: ", err);
        }
    };

    return (
        <>
            <div className="relative top-7 left-5 mb-9 ">
                <button onClick={ExitButton} className="text-black text-3xl  ">
                    <FaDeleteLeft />
                </button>
            </div>
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Category
                    </button>
                </form>
                {isSuccess && (
                    <p className="text-green-500 mt-4">
                        Category added successfully!
                    </p>
                )}
                {isError && (
                    <p className="text-red-500 mt-4">
                        Error adding category:{" "}
                        {error?.data?.message || error?.data}
                    </p>
                )}
            </div>
        </>
    );
};

export default CategoriesCreate;
