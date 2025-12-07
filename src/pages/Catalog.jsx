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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Catálogo</h1>

      {/* Categorías */}
      <Categories
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Si no hay productos */}
      {filteredProducts.length === 0 && (
        <p className="mt-6 text-gray-600">
          No hay productos en esta categoría… todavía.
        </p>
      )}

      {/* Grid de productos */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}
