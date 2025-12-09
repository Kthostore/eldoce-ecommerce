// src/components/Header.jsx
import React from "react";

const logoUrl =
  "https://drive.google.com/uc?export=view&id=1LzLHGbSCR_gVeOtBiKPDoiFIqIVgmceM";

export default function Header() {
  return (
    <header className="w-full bg-[#182c3b] py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO */}
        <img
          src={logoUrl}
          alt="El Doce Store"
          className="h-12 w-auto object-contain cursor-pointer"
        />

        {/* SEARCH BAR */}
        <div className="hidden sm:block">
          <input
            type="text"
            placeholder="Buscar Pilcha..."
            className="w-64 md:w-80 px-4 py-2 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f26915]"
          />
        </div>
      </div>
    </header>
  );
}
