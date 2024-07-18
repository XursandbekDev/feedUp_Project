import React, { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useGetCategoriesQuery, useGetFoodsQuery } from "../services/apiSlice";
import MainUI from "./MainUI";
import HomeFooter from "./HomeFooter";
import axios from "axios";

const getToken = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            const response = await axios.get(
                "http://feed-up-api.komiljonovdev.uz/api/getToken"
            );
            const newToken = response.data.token;
            localStorage.setItem("token", newToken); // Store token in localStorage
            console.log(newToken);
        }
        console.log(token)
    } catch (error) {
        console.error("Token olishda xatolik:", error);
    }

};

function Main({ search, setSearch }) {
    useEffect(() => {
        getToken();
    }, []);

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
    } = useGetCategoriesQuery();
    const {
        data: products,
        isLoading: isLoadingProducts,
        isError: isErrorProducts,
    } = useGetFoodsQuery();

    const isLoading = isLoadingCategories || isLoadingProducts;
    const isError = isErrorCategories || isErrorProducts;
    const isSuccess = !isLoading && !isError;

    return (
        <>
            {isLoading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <RotatingLines
                        visible={true}
                        height={96}
                        width={96}
                        color="orange"
                        strokeWidth={5}
                        animationDuration={0.75}
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
            {isError && (
                <p className="text-2xl text-black text-center">
                    Serverda xatolik...
                </p>
            )}
            {isSuccess && (
                <main className="pt-5">
                    <MainUI
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                        categories={categories}
                        products={products}
                        search={search}
                        setSearch={setSearch}
                    />
                    <HomeFooter />
                </main>
            )}
        </>
    );
}

export default Main;
