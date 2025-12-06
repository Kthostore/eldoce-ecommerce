import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-black">
      {/* Header (lo agregamos más adelante) */}

      <main className="pt-4">
        {children}
      </main>

      {/* Footer (opcional después) */}
    </div>
  );
}
