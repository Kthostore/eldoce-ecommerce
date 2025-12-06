import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-[#2E465C] py-3 px-6 flex items-center justify-between shadow-lg">
      
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img 
          src="https://drive.google.com/uc?export=view&id=1LzLHGbSCR_gVeOtBiKPDoiFIqIVgmceM" 
          alt="el doce remeras de futbol" 
          className="h-8 object-contain"
        />
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-[280px] md:w-[400px] shadow">
        <input
          type="text"
          placeholder="Buscar Pilcha..."
          className="w-full outline-none text-gray-600"
        />
      </div>

    </header>
  );
}
