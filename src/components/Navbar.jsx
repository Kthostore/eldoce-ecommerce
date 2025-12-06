import React from 'react';
import { Search } from 'lucide-react';

const Navbar = ({ searchQuery, onSearch }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-header/80 backdrop-blur-md border-b border-white/10 shadow-sm">

      
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Replaced text with image logo */}
        <img src="https://drive.google.com/uc?export=view&id=1LzLHGbSCR_gVeOtBiKPDoiFIqIVgmceM" alt="el doce remeras de futbol" className="h-8 md:h-10 w-auto" />

        <div className="flex-1 max-w-md relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5D5EAA] transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar Pilcha..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm outline-none focus:bg-white focus:border-[#5D5EAA] focus:ring-4 focus:ring-[#5D5EAA]/10 transition-all duration-300 placeholder:text-gray-400"
          />
        </div>
      </div>
      </nav>
    
  );
};

export default Navbar;