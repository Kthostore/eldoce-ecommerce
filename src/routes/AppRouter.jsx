import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import App from "@/App.jsx";
import Catalog from "@/pages/Catalog.jsx";
// import Admin from "@/pages/Admin" // lo agregamos después

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Home temporal */}
          <Route path="/" element={<App />} />

          {/* Catálogo */}
          <Route path="/catalog" element={<Catalog />} />

          {/* Admin (más adelante) */}
          {/* <Route path="/admin" element={<Admin />} /> */}

          {/* Pagina de producto (añadiremos cuando toque) */}
          {/* <Route path="/product/:id" element={<ProductPage />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
