import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

import ProductModal from './ProductModal';

const categoryColors = {
  Main: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
  Vegetarian: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
  Drinks: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
  Desserts: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200',
};

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(StoreContext);
  const { i18n, t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const name = i18n.language === 'am' ? product.name_am : product.name_en;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${name} added to cart!`, { icon: '🛒' });
  };

  const imageUrl = product.image?.startsWith('/uploads') 
    ? `https://melaku-kitchen.onrender.com${product.image}` 
    : product.image;

  const stars = Math.round(product.rating || 4);
  const categoryClass = categoryColors[product.category] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => setIsModalOpen(true)}
      className="card overflow-hidden group flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {product.image ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">🍽️</div>
        )}
        {/* Category badge */}
        <span className={`absolute top-3 left-3 food-badge ${categoryClass}`}>
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 flex-1">{product.description}</p>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={14} className={i < stars ? 'star-filled fill-current' : 'text-gray-300'} />
          ))}
          <span className="text-xs text-gray-400 ml-1">{product.rating || 4.0}</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-extrabold text-habesha-green dark:text-habesha-yellow">{product.price}</span>
            <span className="text-sm text-gray-500 ml-1">ETB</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-habesha-green hover:bg-green-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow transition-all duration-200"
          >
            <FiShoppingCart size={15} />
            {t('Add to Cart')}
          </button>
        </div>
      </div>

      <ProductModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddToCart={addToCart} 
      />
    </motion.div>
  );
};

export default ProductCard;
