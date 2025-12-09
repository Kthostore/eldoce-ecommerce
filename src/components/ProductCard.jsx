import React from "react";

const ProductCard = ({ item }) => {
  // resolver imagen desde Drive, URL o local
  const resolveImage = (src) => {
    if (!src) return "/fallback.png";

    // URL normal
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }

    // Google Drive
    if (src.includes("drive.google.com")) {
      const match = src.match(/\/d\/(.*?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }

    // archivo local en /public/stickers/
    return `/stickers/${src}`;
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-shadow duration-200 hover:shadow-xl">
      <div className="relative overflow-hidden bg-[#f3f6ee]">
        <img
          src={resolveImage(item.image)}
          alt={item.name}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-base font-semibold text-[#182c3b] line-clamp-2">{item.name}</h3>

        <p className="text-lg font-bold text-[#182c3b]">
          ${item.price.toLocaleString("es-AR")}
        </p>

        <button className="mt-auto w-full rounded-full bg-[#f26915] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ba4a19]">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

