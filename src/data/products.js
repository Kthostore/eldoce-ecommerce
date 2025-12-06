export async function getProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("No se pudo cargar el catálogo");

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error cargando productos:", error);
    return [];
  }
}
