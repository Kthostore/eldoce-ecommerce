import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f3f6ee] text-[#182c3b]">
      <Navbar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10 md:py-12">
        {children}
      </main>

      <Footer />
    </div>
  );
}
