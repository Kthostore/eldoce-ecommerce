import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    checkoutWhatsApp
  } = useCart();
  return <AnimatePresence>
      {isCartOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />

          {/* Sidebar */}
          <motion.div initial={{
        x: '100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200
      }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-[#182c3b] text-white">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-lg font-bold">Mi Pilcha nueva</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="text-lg font-medium">Aun no seleccionaste pilcha para comprar</p>
                  <Button variant="outline" onClick={() => setIsCartOpen(false)} className="mt-4">
                    Volver al catálogo
                  </Button>
                </div> : cartItems.map(item => <motion.div key={item.uniqueId} layout initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                    {/* Image placeholder if needed, keeping it simple for now */}
                    <div className="flex-1">
                      <h3 className="font-bold text-[#280000] text-sm mb-1">{item.name}</h3>
                      <p className="text-[#FB3333] font-semibold text-sm">${item.price * item.quantity}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-2">
                      <button onClick={() => removeFromCart(item.uniqueId)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center gap-3 bg-white rounded-lg px-2 py-1 border shadow-sm">
                        <button onClick={() => updateQuantity(item.uniqueId, -1)} className="p-1 hover:bg-gray-100 rounded-md disabled:opacity-50" disabled={item.quantity <= 1}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.uniqueId, 1)} className="p-1 hover:bg-gray-100 rounded-md">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>)}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && <div className="p-4 border-t bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">Total Estimado</span>
                  <span className="text-2xl font-bold text-[#280000]">${getCartTotal()}</span>
                </div>
                <Button onClick={checkoutWhatsApp} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Comprar
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Serás redirigido a la pasarela de pago
                </p>
              </div>}
          </motion.div>
        </>}
    </AnimatePresence>;
};
export default Cart;