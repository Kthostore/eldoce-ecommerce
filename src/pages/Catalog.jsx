import { useState, useEffect, useMemo, useCallback } from "react";
import { getProducts } from "@/api/products";
import ProductCard from "@/components/ProductCard";
import Categories from "@/components/Categories";

export default function Catalog() {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔥 Cargar productos desde Google Sheets (vía /api/products)
useEffect(() => {
  async function load() {
    const items = await getProducts();

    // Guardar todos los productos
    setAllProducts(items);

    // Inicialmente mostrar todos
    setVisibleProducts(items);
  }

  load();
}, []);


  // 🔎 FILTROS: categoría + búsqueda
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (selectedCategory !== "Todos") {
      result = result.filter((product) =>
        product.category
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase())
      );
    }

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery]);

  const hasProducts = filteredProducts.length > 0;

  // 👉 Selección de categoría
  const handleSelectCategoryWrapper = useCallback(
    (category) => {
      setSelectedCategory(category);
      setVisibleProducts(filteredProducts);
    },
    [filteredProducts]
  );

  // 🔥 Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold =
        document.documentElement.scrollHeight - 200;

      if (scrollPosition >= threshold) {
        setVisibleProducts((prev) => {
          if (filteredProducts.length === 0) return prev;
          return [...prev, ...filteredProducts];
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredProducts]);

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

          {hasProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
              <p className="text-lg text-gray-600 font-medium">
                {searchQuery
                  ? `No encontramos productos que coincidan con "${searchQuery}"`
                  : "No hay productos en esta categoría… todavía."
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
