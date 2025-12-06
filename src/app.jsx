import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido a la Tienda — Arquitectura PRO ✔
      </h1>

      <Link
        to="/catalog"
        className="px-4 py-2 bg-primaryButton text-white rounded-lg"
      >
        Ver Catálogo
      </Link>
    </div>
  );
}
