// src/components/Navbar.jsx
import React from "react";
import { Search } from "lucide-react";

const Navbar = ({ searchQuery = "", onSearch }) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-[#182c3b]/90 backdrop-blur-md border-b border-white/10 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* LOGO */}
        <img
          src="https://drive.google.com/uc?export=view&id=1LzLHGbSCR_gVeOtBiKPDoiFIqIVgmceM"
          alt="El Doce Store"
          className="h-10 w-auto object-contain"
        />

        {/* SEARCH BAR (con tus animaciones actuales) */}
        <div className="flex-1 max-w-md relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f26915] transition-colors">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            placeholder="Buscar Pilcha..."
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 
              bg-gray-100 
              border border-transparent 
              rounded-full text-sm 
              outline-none 
              focus:bg-white 
              focus:border-[#f26915] 
              focus:ring-4 focus:ring-[#f26915]/20 
              transition-all duration-300 
              placeholder:text-gray-400"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
