import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import {
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from "../../../services/apiSlice";
import { useNavigate } from "react-router";

const CategoryPage = () => {
    const navigate = useNavigate();
    const ExitButton = () => {
        navigate("/admin");
    };
    const [formData, setFormData] = useState({ name: "" });
    const [editingCategory, setEditingCategory] = useState(null);
    const {
        data: categories,
        isLoading,
        isError,
        error,
        isSuccess,
        refetch,
    } = useGetCategoriesQuery();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await updateCategory({
                id: editingCategory.id,
                formData,
                token,
            }).unwrap();
            setEditingCategory(null);
            setFormData({ name: "" });
            refetch(); // Sahifani qayta yuklash
        } catch (err) {
            console.error("Failed to save the category: ", err);
            alert(`Failed to save the category: ${err.data || err.message}`);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({ name: category.name });
    };

    const handleCancel = () => {
        setEditingCategory(null);
        setFormData({ name: "" });
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await deleteCategory({ id, token }).unwrap();
            refetch(); // Sahifani qayta yuklash
        } catch (err) {
            console.error("Failed to delete the category: ", err);
            alert(`Failed to delete the category: ${err.data || err.message}`);
        }
    };

    return (
        <>
             <div className="relative top-7 left-5 mb-9 ">
                <button onClick={ExitButton} className="text-black text-3xl  ">
                    <FaDeleteLeft />
                </button>
            </div>
            <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Kategoriyalar ro'yxati
                </h2>

                {isLoading && <p>Kategoriyalar yuklanmoqda...</p>}
                {isError && (
                    <p>
                        Kategoriyalarni yuklashda xatolik:{" "}
                        {error?.data?.message || error?.data}
                    </p>
                )}
                {isSuccess && (
                    <>
                        <ul className="space-y-4">
                            {categories?.data?.map((category) => (
                                <li
                                    key={category.id}
                                    className={`flex justify-between items-center ${
                                        editingCategory &&
                                        editingCategory.id !== category.id
                                            ? "blur-sm"
                                            : ""
                                    } ${
                                        editingCategory?.id === category.id
                                            ? "bg-white shadow-lg p-4 rounded-lg z-10 relative"
                                            : ""
                                    }`}
                                >
                                    {editingCategory?.id === category.id ? (
                                        <form
                                            onSubmit={handleSubmit}
                                            className="flex w-full"
                                        >
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Saqlash
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Bekor qilish
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <span>{category.name}</span>
                                            <div className="space-x-2 flex gap-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(category)
                                                    }
                                                    className="text-black text-xl focus:outline-none focus:shadow-outline"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            category.id
                                                        )
                                                    }
                                                    className="text-black focus:outline-none focus:shadow-outline"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
};

export default CategoryPage;
