import React from "react";

const Header = () => {
  return (
    <header className="relative w-full overflow-hidden bg-[#BA4A19] py-12 md:py-20 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#f3f6ee,transparent_35%),radial-gradient(circle_at_80%_0%,#546b75,transparent_30%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-md md:text-5xl">
          PILCHA PARA LA HINCHADA
        </h1>

        <p className="mt-4 text-lg font-light md:text-xl">Elegí tu equipo favorito</p>

        <span className="mt-6 inline-block h-1 w-24 rounded-full bg-white/70" aria-hidden="true" />
      </div>
    </header>
  );
};

export default Header;

