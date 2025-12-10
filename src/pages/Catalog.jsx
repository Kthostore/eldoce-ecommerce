import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Categories from "@/components/Categories";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [loading, setLoading] = useState(true);

  // 🔥 Cargar productos desde tu backend real en Vercel
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        console.log("Productos cargados:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // 🔎 Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "todos") return products;

    return products.filter((p) =>
      p.category?.some((c) => c.toLowerCase() === selectedCategory.toLowerCase())
    );
  }, [products, selectedCategory]);

  // 🌀 Loading UI
  if (loading) {
    return (
      <div className="w-full text-center mt-10 text-xl font-semibold">
        Cargando productos…
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-white/60 backdrop-blur-sm md:p-8">
      <div className="text-center space-y-2">
        <p className="text-sm uppercase tracking-[0.25rem] text-[#546b75]">
          Colección 2024
        </p>
        <h1 className="text-4xl font-extrabold text-[#182c3b] md:text-5xl">
          Stickers
        </h1>
        <p className="text-base text-[#546b75]">
          Encontrá tu pilcha favorita y sumala al carrito en un click.
        </p>
      </div>

      {/* Categorías */}
      <Categories selected={selectedCategory} onSelect={setSelectedCategory} />

      {/* Si no hay productos */}
      {filteredProducts.length === 0 && (
        <p className="mt-8 text-center text-gray-600">
          No hay productos en esta categoría… todavía.
        </p>
      )}

      {/* Grid de productos */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}
