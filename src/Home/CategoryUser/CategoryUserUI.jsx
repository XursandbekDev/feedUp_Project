// import React, { useState } from "react";
// import MainUIBanner from "../MainUIBanner";
// import {
//     useGetCategoriesQuery,
//     useGetFoodsQuery,
// } from "../../services/apiSlice";

// function CategoryUserUI() {
//     const {
//         data: categories,
//         isLoading: isLoadingCategories,
//         isError: isErrorCategories,
//     } = useGetCategoriesQuery();
//     const {
//         data: products,
//         isLoading: isLoadingProducts,
//         isError: isErrorProducts,
//     } = useGetFoodsQuery();

//     const isLoading = isLoadingCategories || isLoadingProducts;
//     const isError = isErrorCategories || isErrorProducts;
//     const isSuccess = !isLoading && !isError;

//     const [selectedCategory, setSelectedCategory] = useState(null);

//     const handleCategoryClick = (categoryId) => {
//         setSelectedCategory(categoryId);
//         const categoryElement = document.getElementById(
//             `category-${categoryId}`
//         );
//         if (categoryElement) {
//             categoryElement.scrollIntoView({ behavior: "smooth" });
//         }
//     };

//     const filteredProducts = selectedCategory
//         ? products?.data?.filter(
//               (product) => product.category_id === selectedCategory
//           )
//         : products?.data;

//     return (
//         <div className="p-4">
//             {isLoading && <p>Kategoriyalar yuklanmoqda...</p>}
//             {isError && <p>Kategoriyalarni yuklashda xatolik:</p>}
//             {isSuccess && (
//                 <div className="flex flex-col md:flex-row">
//                     <div className="mb-4 md:mb-0 md:w-1/4 md:pr-4">
//                         <div className="flex flex-wrap gap-x-1 mb-4">
//                             {categories?.data?.map((category) => (
//                                 <button
//                                     key={category.id}
//                                     onClick={() =>
//                                         handleCategoryClick(category.id)
//                                     }
//                                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                                 >
//                                     {category.name}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="md:w-3/4 h-screen overflow-y-auto">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {filteredProducts?.map((product) => (
//                                 <div
//                                     key={product.id}
//                                     id={`category-${product.category_id}`}
//                                 >
//                                     <MainUIBanner item={product} />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CategoryUserUI;
import React from "react";

function CategoryUserUI({ categories, setSelectedCategory, onCategoryClick }) {
    return (
        <div className="flex space-x-4 p-4 bg-gray-100">
            {categories?.data?.map((category) => (
                <button
                    key={category.id}
                    onClick={() => {
                        setSelectedCategory(category.id);
                        onCategoryClick(category.id);
                    }}
                    className="text-lg font-medium text-gray-700 focus:text-yellow-400 focus:underline "
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryUserUI;
