export async function getProducts() {
  try {
    const url = import.meta.env.VITE_PRODUCTS_API;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Error al obtener productos");
    }

    const data = await res.json();

    const products = data.map((item, index) => ({
      id: item.Id || index,
      name: item.name,
      price: parseFloat(
        item.price
          ?.replace("$", "")
          ?.replace(".", "")
          ?.replace(",", ".") || 0
      ),
      category: item.category?.split(",").map((c) => c.trim()) || [],
      image: item.image1,
    }));

    return products;
  } catch (error) {
    console.error("API ERROR:", error);
    return [];
  }
}
