import { useState, useEffect, useMemo, useCallback } from "react";
import { getStickers } from "@/data/stickers";
import ProductCard from "@/components/ProductCard";
import Categories from "@/components/Categories";

export default function Catalog() {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar productos desde Google Sheets
  useEffect(() => {
    async function loadProducts() {
      const products = await getStickers(); // Mantengo tu función original
      setAllProducts(products);
      setVisibleProducts(products); // primera vista
    }
    loadProducts();
  }, []);

  // FILTROS: categoría + búsqueda
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (selectedCategory !== "Todos") {
      result = result.filter((product) =>
        product.category?.toLowerCase().includes(selectedCategory.toLowerCase())
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

  // Manejador de selección de categoría
  const handl
