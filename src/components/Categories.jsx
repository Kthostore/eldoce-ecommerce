import React from "react";

const categories = ["todos", "futbol", "basket", "selección argentina"];

const Categories = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-3 mt-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${
            selected === cat
              ? "bg-black text-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories;
