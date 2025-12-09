import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-[#BA4A19] text-white py-12 md:py-20 relative overflow-hidden">

       <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide drop-shadow-md">
          PILCHA PARA LA HINCHADA
        </h1>

        <p className="mt-4 text-lg md:text-xl font-light">
          Elegí tu equipo favorito
        </p>
      </div>
    </header>
  );
};

export default Header;

