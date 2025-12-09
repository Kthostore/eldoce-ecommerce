import React from "react";

const categories = ["todos", "futbol", "basket", "selección argentina"];

const Categories = ({ selected, onSelect }) => {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start">
      {categories.map((cat) => {
        const isActive = selected === cat;

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
              isActive
                ? "bg-[#f26915] text-white border-[#f26915] shadow-md shadow-[#f26915]/30"
                : "bg-white text-[#182c3b] border-[#d6dbd2] hover:border-[#f26915] hover:text-[#f26915]"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
