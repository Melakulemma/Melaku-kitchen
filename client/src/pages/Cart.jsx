import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, userInfo } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'MELAKU10') {
      setDiscount(Math.round(total * 0.1));
      toast.success('Promo code applied: 10% off! 🏷️');
    } else {
      setDiscount(0);
      toast.error('Invalid promo code');
    }
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout', { state: { discount, promoCode } });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-b-4 border-habesha-yellow inline-block pb-2">
        {t('Cart')}
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/menu" className="text-habesha-green font-bold text-lg hover:underline">
            Go back to Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                    <img src={item.image || 'https://via.placeholder.com/64'} alt="food" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold dark:text-white">
                      {i18n.language === 'am' ? item.name_am : item.name_en}
                    </h4>
                    <span className="text-gray-500 dark:text-gray-400">{item.price} ETB</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                    <button 
                      onClick={() => addToCart(item, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300 font-bold"
                      disabled={item.qty <= 1}
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold dark:text-white">{item.qty}</span>
                    <button 
                      onClick={() => addToCart(item, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.product)} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Summary</h3>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Items Subtotal:</span>
              <span className="dark:text-white font-semibold">{total} ETB</span>
            </div>

            {/* Promo Code */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. MELAKU10"
                  className="flex-1 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-habesha-yellow"
                />
                <button 
                  onClick={applyPromoCode}
                  className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-xs font-bold px-3 py-2 rounded-lg transition-colors dark:text-white"
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <p className="text-xs text-habesha-green font-bold mt-2">✨ Discount Applied: -{discount} ETB</p>
              )}
            </div>

            <div className="flex justify-between mb-6 text-lg pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="font-bold dark:text-white">{t('Total')}:</span>
              <span className="font-bold text-habesha-green dark:text-habesha-yellow">{total - discount} ETB</span>
            </div>
            <button 
              onClick={checkoutHandler}
              className="w-full bg-habesha-green hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-green-900/20"
            >
              {t('Checkout')}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
