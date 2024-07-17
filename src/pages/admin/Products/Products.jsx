import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaDeleteLeft } from "react-icons/fa6";
import {
    useGetFoodsQuery,
    useDeleteFoodMutation,
    useGetCategoriesQuery,
} from "../../../services/apiSlice";
import { useNavigate } from "react-router";

function Products() {
    const navigate = useNavigate();
    const ExitButton = () => {
        navigate("/admin");
    };
    const {
        data: products,
        isLoading,
        isError,
        error,
        isSuccess,
        refetch,
    } = useGetFoodsQuery();
    const {
        data: categories,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
        error: categoriesError,
    } = useGetCategoriesQuery();

    const [deleteFood] = useDeleteFoodMutation();

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await deleteFood({ id, token }).unwrap();
            refetch();
        } catch (err) {
            console.error("Failed to delete the product: ", err);
            alert(`Failed to delete the product: ${err.data.message}`);
        }
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
                    Productlar
                </h1>
                {isLoading && <p>Loading...</p>}
                {isError && (
                    <p>Error: {error?.data?.message || error?.message}</p>
                )}
                {isSuccess && (
                    <div className="w-full max-w-4xl">
                        <table className="table-auto w-full bg-white shadow-md rounded my-6">
                            <thead>
                                <tr>
                                    <th className="py-2">Nomi</th>
                                    <th className="py-2">Narxi</th>
                                    <th className="py-2">O'chirish</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((product) => (
                                    <tr key={product.id}>
                                        <td className="border px-4 py-2">
                                            {product.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {product.price}
                                        </td>
                                        <td className="border px-4 py-2 text-center ">
                                            <button
                                                className="text-black text-xl  "
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                            >
                                                <RiDeleteBin5Fill />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Products;
