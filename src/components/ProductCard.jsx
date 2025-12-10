import React from "react";

const ProductCard = ({ item }) => {
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23546b75'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff' font-size='32' font-family='Arial, sans-serif' dominant-baseline='middle' text-anchor='middle'%3ESin imagen%3C/text%3E%3C/svg%3E";

  const extractDriveId = (url) => {
    try {
      const parsed = new URL(url);
      const { pathname, searchParams } = parsed;

      const idFromQuery = searchParams.get("id") || searchParams.get("thid");
      if (idFromQuery) return idFromQuery;

      const fileMatch = pathname.match(/\/d\/([^/]+)/); // /file/d/<id>/...
      if (fileMatch?.[1]) return fileMatch[1];

      const openMatch = pathname.match(/\/open\/(.+)/); // /open/<id>
      if (openMatch?.[1]) return openMatch[1].split(/[/?#]/)[0];

      const ucMatch = pathname.match(/\/uc\/(.+)/); // /uc/<id>
      if (ucMatch?.[1]) return ucMatch[1].split(/[/?#]/)[0];

      // Some shared links come as /drive/folders/<id>; skip folder-like ids
      if (pathname.includes("/folders/")) return null;

      // Last resort: look for a 25+ char alphanumeric token in the URL
      const genericMatch = url.match(/[A-Za-z0-9_-]{25,}/);
      if (genericMatch?.[0]) return genericMatch[0];

      return null;
    } catch (e) {
      return null;
    }
  };

  const isGoogleHost = (url) => {
    try {
      const host = new URL(url).host;
      return (
        host.includes("drive.google.com") ||
        host.includes("drive.usercontent.google.com") ||
        host.includes("googleusercontent.com") ||
        host.includes("docs.google.com")
      );
    } catch (e) {
      return false;
    }
  };

  // resolver imagen desde Drive, URL o local
  const resolveImage = (src) => {
    const cleanSrc = src?.trim();

    if (!cleanSrc) {
      return placeholderImage;
    }

    if (isGoogleHost(cleanSrc)) {
      const id = extractDriveId(cleanSrc);
      if (id) return `https://drive.google.com/uc?export=view&id=${id}`;

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
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(event) => {
            if (event.currentTarget.dataset.fallback) return;
            event.currentTarget.dataset.fallback = "true";
            event.currentTarget.src = placeholderImage;
          }}
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

