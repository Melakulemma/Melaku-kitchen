import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const { i18n } = useTranslation();
  if (!isOpen || !product) return null;

  const imageUrl = product.image?.startsWith('/uploads') 
    ? `https://melaku-kitchen.onrender.com${product.image}` 
    : product.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white md:text-gray-500 md:bg-gray-100 md:hover:bg-gray-200 transition-all"
          >
            <FiX size={24} />
          </button>

          {/* Image */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden bg-gray-100">
            <img 
              src={imageUrl || '/images/placeholder.jpg'} 
              alt={product.name_en} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-8 flex flex-col">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="food-badge status-preparing text-xs">{product.category}</span>
                <div className="flex items-center text-habesha-yellow">
                  <FiStar className="fill-current" />
                  <span className="ml-1 text-sm font-bold">{product.rating || 5}</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                {i18n.language === 'am' ? product.name_am : product.name_en}
              </h2>
              <p className="text-xl font-bold text-habesha-green mb-6">{product.price} ETB</p>
              
              <div className="h-px bg-gray-100 dark:bg-gray-700 w-16 mb-6" />
              
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                {product.description || "Authentic Ethiopian dish prepared with fresh ingredients and traditional spices. Experiences the true taste of Habesha culture in every bite."}
              </p>
            </div>

            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold shadow-lg shadow-green-900/20"
            >
              <FiShoppingCart /> Add to Cart — {product.price} ETB
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
