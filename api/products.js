// /api/products.js
export default async function handler(req, res) {
  try {
    // Tu Google Apps Script (el que ya funciona en el navegador)
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbyRxxSX0NqJtF49LUBmbJkcB3wz8E5QcoALXwPgFBUK7InTFdjOUnN7zooEXLYfIfyQ/exec";

    // Pedimos los datos a Google Sheets
    const response = await fetch(GOOGLE_SCRIPT_URL);

    if (!response.ok) {
      return res
        .status(500)
        .json({ error: "Error al obtener productos desde Google Sheets" });
    }

    const rawData = await response.json();

    // Transformamos las filas en productos React-friendly
    const products = rawData.map((item, index) => ({
      id: item.Id || index,
      name: item.name || "",
      price: parseFloat(
        item.price
          ?.replace("$", "")
          ?.replace(".", "")
          ?.replace(",", ".") || "0"
      ),
      category: item.category?.split(",").map((c) => c.trim()) || [],
      image: item.image1 || "",
    }));

    // Respuesta final
    return res.status(200).json(products);
  } catch (error) {
    console.error("API BACKEND ERROR:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

