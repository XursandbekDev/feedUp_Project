import React, { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import {
    useGetCategoriesQuery,
    useAddFoodMutation,
} from "../../../services/apiSlice";
import { useNavigate } from "react-router";

function AddProducts() {
    const navigate = useNavigate();
    const ExitButton = () => {
        navigate("/admin");
    };
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [addFood] = useAddFoodMutation();

    const {
        data: categories,
        isLoading,
        isError,
        error,
    } = useGetCategoriesQuery();

    useEffect(() => {
        if (categories && categories.data.length > 0) {
            setSelectedCategory(categories.data[0].id);
        }
    }, [categories]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const token = localStorage.getItem("token");

        try {
            await addFood({
                foodData: formData,
            }).unwrap();
            alert("Mahsulot muvaffaqiyatli qo'shildi!");
        } catch (err) {
            console.error("Mahsulot qo'shib bo'lmadi: ", err);
            alert(
                `Mahsulot qo'shib bo'lmadi: ${err.data?.message || err.message}`
            );
        }
        e.target.reset();
    };

    return (
        <>
            <div className="absolute top-7 left-5">
                <button onClick={ExitButton} className="text-black text-3xl  ">
                    <FaDeleteLeft />
                </button>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl text-gray-800 mb-8 font-bold">
                    Admin Panel
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Mahsulot nomi
                        </label>
                        <input
                            required
                            id="title"
                            className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="name"
                            placeholder="Mahsulot nomini kiriting"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="price"
                        >
                            Mahsulot narxi
                        </label>
                        <input
                            required
                            id="price"
                            className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="price"
                            placeholder="Mahsulot narxini kiriting"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="category"
                        >
                            Kategoriya
                        </label>
                        {isLoading && <p>Kategoriyalar yuklanmoqda...</p>}
                        {isError && (
                            <p>
                                Xatolik: {error?.data?.message || error?.data}
                            </p>
                        )}
                        {categories && (
                            <select
                                required
                                id="category_id"
                                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="category_id"
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                            >
                                {categories.data.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="img"
                        >
                            Mahsulot rasmi
                        </label>
                        <label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white focus-within:border-blue-500 focus-within:shadow-outline">
                                <FaImage className="text-gray-500 mr-2 text-2xl cursor-pointer" />
                                <h1>Suratni yuklang</h1>
                                <input
                                    required
                                    id="img"
                                    className="w-full text-gray-700 focus:outline-none hidden"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </label>
                        {imagePreview && (
                            <div className="mt-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Qo'shish
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProducts;
