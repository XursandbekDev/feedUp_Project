import React, { useState, useEffect } from "react";
import {
    useDeleteFoodMutation,
    useGetFoodsQuery,
} from "../../../services/apiSlice";
import AdminDeleteUI from "../AdminDeleteUI";
import { RotatingLines } from "react-loader-spinner";

function AdminDelete() {
    const [adminSearch, setAdminSearch] = useState("");
    const [filteredFoodData, setFilteredFoodData] = useState([]);
    const [deleteFood] = useDeleteFoodMutation();
    const {
        data: foodData,
        error: foodError,
        isLoading: isFoodLoading,
        isSuccess: isFoodSuccess,
    } = useGetFoodsQuery();

    useEffect(() => {
        if (foodData) {
            setFilteredFoodData(foodData);
        }
    }, [foodData]);

    const handleDeleteTask = async (id) => {
        setFilteredFoodData((prevData) =>
            prevData.filter((item) => item.id !== id)
        );
        try {
            await deleteFood(id).unwrap();
        } catch (error) {
            console.error("Failed to delete the food item: ", error);
            setFilteredFoodData(foodData);
        }
    };

    return (
        <>
            {isFoodLoading && (
                <div className="absolute top-1/2 left-1/2">
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="orange"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
            {foodError && (
                <p className="text-2xl text-black"> Serverda xatolik... </p>
            )}

            {isFoodSuccess && (
                <div className="pt-5">
                    <AdminDeleteUI
                        adminSearch={adminSearch}
                        setAdminSearch={setAdminSearch}
                        foodData={filteredFoodData}
                        onDelete={handleDeleteTask}
                    />
                </div>
            )}
        </>
    );
}

export default AdminDelete;
