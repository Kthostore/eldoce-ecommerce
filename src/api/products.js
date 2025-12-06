export async function getProducts() {
  const url = "/api/products";
  const res = await fetch(url);
  return await res.json();
}
