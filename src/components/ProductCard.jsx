import React from 'react';

const StickerCard = ({ sticker }) => {
  // Detecta si es ruta local, Google Drive o CDN
  const resolveImage = (src) => {
    if (!src) return "/fallback.png";

    // Si empieza con http → es una URL real
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }

    // Si es Google Drive (formato viejo)
    if (src.includes("drive.google.com")) {
      const match = src.match(/\/d\/(.*?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }

    // Si es ruta local dentro de /public
    return `/stickers/${src}`;
  };

  return (
    <div className="p-4 rounded-xl bg-white shadow-md flex flex-col">
      <img
        src={resolveImage(sticker.image)}
        alt={sticker.name}
        className="rounded-lg w-full h-40 object-cover"
      />

      <h3 className="mt-3 text-sm font-semibold text-gray-900">{sticker.name}</h3>

      <p className="text-lg font-bold text-price mt-1">${sticker.price}</p>

      <button className="bg-primaryButton hover:bg-buttonHover text-icons w-full py-2 mt-3 rounded-lg transition-colors duration-200">
        Agregar al carrito
      </button>
    </div>
  );
};

export default StickerCard;
