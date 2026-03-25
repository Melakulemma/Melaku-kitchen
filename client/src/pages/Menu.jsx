import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const categories = ['All', 'Main', 'Vegetarian', 'Drinks', 'Desserts'];

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { t, i18n } = useTranslation();

  const suggestions = search.trim() 
    ? products.filter(p => 
        p.name_en.toLowerCase().includes(search.toLowerCase()) || 
        p.name_am.includes(search)
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://melaku-kitchen.onrender.com/api/products');
        setProducts(data);
      } catch (e) {
        console.error('Fetch products error:', e);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      result = result.filter(p =>
        p.name_en.toLowerCase().includes(search.toLowerCase()) ||
        p.name_am.includes(search)
      );
    }
    setFiltered(result);
  }, [products, activeCategory, search]);

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-green-950 text-white pt-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="section-title text-white mb-2">{t('Menu')}</h1>
          <p className="text-gray-400 mb-8">Fresh Ethiopian dishes made daily</p>
          {/* Search */}
          <div className="max-w-md mx-auto relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-habesha-yellow transition-colors" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => {setSearch(e.target.value); setShowSuggestions(true);}}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t('Search')}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-habesha-yellow backdrop-blur-md transition-all font-medium"
            />
            
            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[60]"
                >
                  {suggestions.map((p) => (
                    <button 
                      key={p._id}
                      onClick={() => { setSearch(p.name_en); setShowSuggestions(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between group/item border-b border-gray-50 dark:border-gray-700/30 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.image?.startsWith('/') ? `https://melaku-kitchen.onrender.com${p.image}` : p.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{i18n.language === 'am' ? p.name_am : p.name_en}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{p.category}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-habesha-green group-hover/item:translate-x-1 transition-transform">→</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 -mt-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm ${
                activeCategory === cat
                  ? 'bg-habesha-green text-white shadow-green-200 dark:shadow-green-900 scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card h-[400px] flex flex-col overflow-hidden">
                <div className="skeleton h-48 w-full" />
                <div className="p-4 flex-1 flex flex-col gap-3">
                  <div className="skeleton h-6 w-3/4 rounded-lg" />
                  <div className="skeleton h-4 w-1/2 rounded-lg" />
                  <div className="mt-auto flex justify-between items-center">
                    <div className="skeleton h-8 w-1/3 rounded-lg" />
                    <div className="skeleton h-10 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-xl font-medium">No dishes found.</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <motion.div 
                  key={product._id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Menu;
