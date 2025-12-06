import React from "react";
import Header from "@/components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
