import React, { useRef, useState } from "react";
import { useGetCategoriesQuery, useGetFoodsQuery } from "../services/apiSlice";
import MainUIBanner from "./MainUIBanner";
import CategoryUserUI from "./CategoryUser/CategoryUserUI";

function MainUI({ search, setSearch }) {
    const {
        data: products,
        isLoading: isLoadingProducts,
        isError: isErrorProducts,
        isSuccess: isSuccessProducts,
    } = useGetFoodsQuery();
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        isSuccess: isSuccessCategories,
    } = useGetCategoriesQuery();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const categoryRefs = useRef({});

    const isLoading = isLoadingProducts || isLoadingCategories;
    const isError = isErrorProducts || isErrorCategories;
    const isSuccess = isSuccessProducts && isSuccessCategories;

    const handleCategoryClick = (categoryId) => {
        if (categoryRefs.current[categoryId]) {
            categoryRefs.current[categoryId].scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            {isLoading && (
                <p className="text-center my-4">Ma'lumotlar yuklanmoqda...</p>
            )}
            {isError && (
                <p className="text-center text-red-500 my-4">
                    Ma'lumotlarni yuklashda xatolik:{" "}
                </p>
            )}
            {isSuccess && (
                <div className="">
                    <CategoryUserUI
                        categories={categories}
                        setSelectedCategory={setSelectedCategory}
                        onCategoryClick={handleCategoryClick}
                    />
                    <div className="flex flex-col items-start w-full gap-6 p-6 bg-gray-100 pb-32">
                        {categories?.data?.map((category) => (
                            <div
                                key={category.id}
                                ref={(el) =>
                                    (categoryRefs.current[category.id] = el)
                                }
                            >
                                <h2 className="text-xl font-bold mb-4">
                                    {category.name}
                                </h2>
                                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {products?.data
                                        ?.filter(
                                            (product) =>
                                                product.category_id ===
                                                    category.id &&
                                                (search.trim() === "" ||
                                                    product.name
                                                        .toLowerCase()
                                                        .includes(
                                                            search
                                                                .trim()
                                                                .toLowerCase()
                                                        ))
                                        )
                                        .map((product) => (
                                            <div
                                                key={product.id}
                                                className="rounded-lg w-full overflow-hidden shadow-md bg-white"
                                            >
                                                <MainUIBanner
                                                    item={product}
                                                    setSearch={setSearch}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default MainUI;
