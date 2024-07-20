import React, { useEffect, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useGetCategoriesQuery, useGetFoodsQuery } from "../services/apiSlice";
import MainUI from "./MainUI";
import HomeFooter from "./HomeFooter";
import axios from "axios";
import { Context } from "../App";

const getToken = async (setUserToken) => {
    try {
        let token = localStorage.getItem("userToken");
        if (!token) {
            const response = await axios.get(
                "http://feed-up-api.komiljonovdev.uz/api/getToken"
            );
            token = response.data.token;
            localStorage.setItem("userToken", token); // Store token in localStorage
            setUserToken(token); // Update context state
            console.log("New token:", token);
        } else {
            setUserToken(token); // Update context state if token already exists
            console.log("Existing token:", token);
        }
    } catch (error) {
        console.error("Token olishda xatolik:", error);
    }
};

function Main({ search, setSearch }) {
    const { setUserToken } = useContext(Context);

    useEffect(() => {
        getToken(setUserToken);
    }, [setUserToken]);

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
