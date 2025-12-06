export default async function handler(req, res) {
  try {
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbyRxxSX0NqJtF49LUBmbJkcB3wz8E5QcoALXwPgFBUK7InTFdjOUnN7zooEXLYfIfyQ/exec";

    const response = await fetch(GOOGLE_SCRIPT_URL);

    if (!response.ok) {
      const txt = await response.text();
      console.error("GOOGLE SCRIPT FAIL:", txt);
      return res.status(500).json({ error: "Error al obtener datos" });
    }

    const rawData = await response.json();

    if (!Array.isArray(rawData)) {
      console.error("GOOGLE SCRIPT ERROR: respuesta no es array", rawData);
      return res.status(500).json({ error: "Datos inválidos" });
    }

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
      image: item.image1 || ""
    }));

    return res.status(200).json(products);
  } catch (error) {
    console.error("API BACKEND ERROR:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
