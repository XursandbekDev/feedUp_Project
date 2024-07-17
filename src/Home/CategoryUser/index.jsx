import React from "react";
import { useGetCategoriesQuery } from "../../services/apiSlice";
import CategoryUserUI from "./CategoryUserUI";

const CategoryUser = () => {
    const {
        data: categories,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useGetCategoriesQuery();

    return (
        // <div className="w-full flex text-blue-900 px-2 ">
        <>
            <div className="hidden" >
                <CategoryUserUI
                    isLoading={isLoading}
                    isError={isError}
                    isSuccess={isSuccess}
                />
                {/* </div> */}
            </div>
        </>
    );
};

export default CategoryUser;
