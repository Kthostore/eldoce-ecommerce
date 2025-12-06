import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-[#182c3b] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-[#ECA2BD]" />
            <span className="text-white text-lg font-semibold">
              Pilcha a tu casa en un click
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-[#C5A1C4]" />
            <span className="text-[#E2E2E2] text-base">Entregas en todo Argentina - Envio gratis a CABA</span>
          </div>
          
          <div className="border-t border-[#ECA2BD]/30 pt-6">
            <p className="text-[#C5A1C4] text-sm">© 2024-2025 catalogo desarrollada por agencykth.store</p>
          </div>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;