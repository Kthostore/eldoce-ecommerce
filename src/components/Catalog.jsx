import { useState, useEffect, useMemo, useCallback } from "react";
import { getStickers } from "@/data/stickers";
import StickerCard from "@/components/StickerCard";
import Categories from "@/components/Categories";

export default function Catalog() {
  const [allStickers, setAllStickers] = useState([]);
  const [visibleStickers, setVisibleStickers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar productos desde Google Sheets
  useEffect(() => {
    async function loadProducts() {
      const stickers = await getStickers();
      setAllStickers(stickers);
      setVisibleStickers(stickers); // primera vista
    }
    loadProducts();
  }, []);

  // FILTROS: categoría + búsqueda
  const filteredStickers = useMemo(() => {
    let result = allStickers;

    if (selectedCategory !== "Todos") {
      result = result.filter((sticker) =>
        sticker.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchQuery) {
      result = result.filter((sticker) =>
        sticker.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [allStickers, selectedCategory, searchQuery]);

  const hasStickers = filteredStickers.length > 0;

  // Manejador de selección de categoría
  const handleSelectCategoryWrapper = useCallback((category) => {
    setSelectedCategory(category);
    setVisibleStickers(filteredStickers);
  }, [filteredStickers]);

  // 🔥 TU SCROLL INFINITO ORIGINAL — FUSIONADO
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 200;

      if (scrollPosition >= threshold) {
        setVisibleStickers((prev) => {
          if (filteredStickers.length === 0) return prev;
          return [...prev, ...filteredStickers];
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredStickers]);

  return (
    <section className="py-8 md:py-12 bg-[#E2E2E2]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6 md:gap-8">

        {/* Categorías */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategoryWrapper}
        />

        {/* Contenedor general */}
        <div className="rounded-3xl bg-white/30 backdrop-blur-sm border border-white/20 shadow-inner p-4 md:p-6 min-h-[400px]">

          {hasStickers ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {visibleStickers.map((sticker, index) => (
                <StickerCard
                  key={`${sticker.id}-${index}`}
                  sticker={sticker}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
              <p className="text-lg text-gray-600 font-medium">
                {searchQuery
                  ? `No encontramos Remeras que coincidan con "${searchQuery}"`
                  : "No hay remeras en esta categoría... todavía."
                }
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Prueba con otra búsqueda o categoría.
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
