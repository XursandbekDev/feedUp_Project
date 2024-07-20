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
                    className="text-lg font-medium text-gray-700 focus:text-yellow-400  underline "
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryUserUI;
