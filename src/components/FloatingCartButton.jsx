import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const FloatingCartButton = () => {
  const { setIsCartOpen, getCartCount } = useCart();
  const count = getCartCount();

  return (
    <motion.button
      onClick={() => setIsCartOpen(true)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 bg-[#182c3b] text-white p-4 rounded-full shadow-2xl border-2 border-[#f3f6ee] hover:border-white transition-colors group"
    >
      <ShoppingBag className="w-6 h-6" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-[#FB3333] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default FloatingCartButton;