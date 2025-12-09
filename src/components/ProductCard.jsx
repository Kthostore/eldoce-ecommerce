import React from "react";

const ProductCard = ({ item }) => {
  const extractDriveId = (url) => {
    const patterns = [
      /\/d\/(.*?)\//, // /file/d/<id>/view
      /[?&]id=([^&#]+)/, // ?id=<id>
      /\/open\/(.*?)\?/, // /open/<id>?...
      /\/uc\/(.*?)\?/, // /uc/<id>?...
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match?.[1]) return match[1];
    }

    return null;
  };

  // resolver imagen desde Drive, URL o local
  const resolveImage = (src) => {
    const cleanSrc = src?.trim();

    if (!cleanSrc) {
      return "https://via.placeholder.com/600x600/546b75/ffffff?text=Sin+imagen";
    }

    const isDriveHost =
      cleanSrc.includes("drive.google.com") ||
      cleanSrc.includes("drive.usercontent.google.com") ||
      cleanSrc.includes("googleusercontent.com");

    if (isDriveHost) {
      const id = extractDriveId(cleanSrc);
      if (id) return `https://drive.google.com/uc?export=view&id=${id}`;

      // Asegurar que las variantes uc?id también usen export=view
      if (cleanSrc.includes("export=download") || cleanSrc.includes("uc?id=")) {
        return cleanSrc
          .replace("export=download", "export=view")
          .replace("uc?id=", "uc?export=view&id=");
      }

      return cleanSrc;
    }

    if (cleanSrc.startsWith("http://") || cleanSrc.startsWith("https://")) {
      return cleanSrc;
    }

    return `/stickers/${cleanSrc}`;
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

