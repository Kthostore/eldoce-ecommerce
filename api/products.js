export default async function handler(req, res) {
  try {
    // 🔥 URL NUEVA de tu Apps Script
    const SHEETS_URL =
      "https://script.google.com/macros/s/AKfycbzipO3QveE165OWqhV88mXyvJBcRieRmll8LlGjHOaAPmrbPgMdJZji2ssznf7C-f_e/exec";

    // Llamar al Apps Script
    const response = await fetch(SHEETS_URL);
    const rawData = await response.json();

    if (!Array.isArray(rawData)) {
      throw new Error("Formato no válido desde Google Sheets");
    }

    // Transformación → Formato limpio para la tienda
    const products = rawData.map((item, index) => {
      // 🧼 Sanear precio (string o número)
      const cleanPrice = (() => {
        const raw = item.price;

        // Si viene como número → devolver directo
        if (typeof raw === "number") return raw;

        // Si viene como string → limpiar formato $38.900,00
        if (typeof raw === "string") {
          return parseFloat(
            raw
              .replace("$", "")
              .replace(/\./g, "") // miles
              .replace(",", ".")  // decimal
          );
        }

        return 0;
      })();

      const imageSrc =
        (typeof item.image1 === "string" && item.image1.trim()) ||
        (typeof item.image === "string" && item.image.trim()) ||
        (typeof item.img === "string" && item.img.trim()) ||
        (typeof item.photo === "string" && item.photo.trim()) ||
        (typeof item.image_url === "string" && item.image_url.trim()) ||
        "";

      return {
        id: item.Id || index + 1,
        name: item.name || "",
        price: cleanPrice,
        category: item.category?.split(",").map((c) => c.trim()) || [],
        image: imageSrc,
      };
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("API BACKEND ERROR:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
