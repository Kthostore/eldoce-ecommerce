import React from "react";
import { motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#182c3b] px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <MessageCircle className="h-6 w-6 text-[#ECA2BD]" />
            <span className="text-lg font-semibold">Pilcha a tu casa en un click</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-[#E2E2E2]">
            <MapPin className="h-6 w-6 text-[#C5A1C4]" />
            <span className="text-base">Entregas en todo Argentina - Envío gratis a CABA</span>
          </div>

          <div className="border-t border-white/10 pt-6 text-sm text-[#C5A1C4]">
            © 2024-2025 catálogo desarrollada por agencykth.store
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
