export default async function handler(req, res) {
  try {
    // ID de tu Google Sheet
    const sheetId = process.env.GOOGLE_SHEET_ID;

    // API Key de Google
    const apiKey = process.env.GOOGLE_API_KEY;

const url = `https://sheets.googleapis.com/v4/spreadsheets/1jVh5SpfsbHXTpr0CpSj6E_xy_kOjC5SZRtQJKWnMT4M/values/productos?key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const rows = data.values || [];

    // Primera fila = encabezados
    const headers = rows[0];

    // Resto de filas = productos
    const products = rows.slice(1).map((row) => {
      let product = {};
      headers.forEach((header, index) => {
        product[header] = row[index] || "";
      });
      return product;
    });

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error en /api/products:", error);
    return res.status(500).json({ error: "No se pudo cargar el catálogo" });
  }
}
