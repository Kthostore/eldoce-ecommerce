export default async function handler(req, res) {
  try {
    const url =
      "https://script.google.com/macros/s/AKfycbyRxxSX0NqJtF49LUBmbJkcB3wz8E5QcoALXwPgFBUK7InTFdjOUnN7zooEXLYfIfyQ/exec";

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json({ products: data });
  } catch (error) {
    console.error("Error en /api/products:", error);
    return res.status(500).json({ error: "No se pudo cargar el catálogo" });
  }
}
