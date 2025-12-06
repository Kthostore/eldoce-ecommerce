import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const categories = [
  'Todos', 'Futbol', 'Basketball', 'Selección Argentina'
];

const Categories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }} 
        className="text-3xl md:text-4xl font-bold text-[#280000] text-center mb-8"
      >
        Stickers
      </motion.h2>
      <div className="flex items-center space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {categories.map((category) => (
          <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onSelectCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`whitespace-nowrap rounded-full font-semibold transition-all duration-300 px-6 py-2 text-sm md:text-base
                ${
                  selectedCategory === category
                    ? 'bg-[#5D5EAA] text-white shadow-md'
                    : 'bg-white/80 text-[#280000] border-gray-300 hover:bg-white hover:text-[#5D5EAA] hover:border-[#5D5EAA]'
                }`}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Categories;