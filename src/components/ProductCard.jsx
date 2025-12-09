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
    <div className="p-4 rounded-xl bg-white shadow-md flex flex-col">
      <img
        src={resolveImage(item.image)}
        alt={item.name}
        className="rounded-lg w-full h-40 object-cover"
      />

      <h3 className="mt-3 text-sm font-semibold text-gray-900">{item.name}</h3>

      <p className="text-lg font-bold text-price mt-1">
        ${item.price.toLocaleString("es-AR")}
      </p>

      <button className="bg-primaryButton hover:bg-buttonHover text-icons w-full py-2 mt-3 rounded-lg transition-colors duration-200">
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;

