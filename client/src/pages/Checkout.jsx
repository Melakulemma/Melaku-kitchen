import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cartItems, userInfo, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { discount = 0, promoCode = '' } = location.state || {};
  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const placeOrderHandler = async () => {
    try {
      console.log('Final Cart Items:', cartItems);
      
      // Safety check: ensure every item has a product ID
      const invalidItems = cartItems.filter(item => !item.product);
      if (invalidItems.length > 0) {
        toast.error(`Error: Some items are missing product IDs. Please clear your cart and try again.`);
        return;
      }

      setLoading(true);
      const { data } = await axios.post('https://melaku-kitchen.onrender.com/api/orders', {
        orderItems: cartItems,
        totalPrice: total - discount,
        discount,
        couponCode: promoCode
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      
      clearCart();
      setLoading(false);
      navigate(`/payment/${data._id}`);
      toast.success('Order placed successfully. Proceeding to payment.');
    } catch (err) {
      setLoading(false);
      console.error('Order Error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Error placing order');
    }
  };

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-b-4 border-habesha-red inline-block pb-2">Checkout</h2>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Order Items</h3>
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className={`flex justify-between items-center border-b dark:border-gray-700 pb-2 ${!item.product ? 'bg-red-50 dark:bg-red-900/10 p-2 rounded-lg border-red-200' : ''}`}>
              <div className="flex items-center space-x-4">
                <img src={item.image?.startsWith('/uploads') ? `https://melaku-kitchen.onrender.com${item.image}` : item.image || 'https://via.placeholder.com/40'} alt={item.name_en} className="w-10 h-10 rounded" />
                <div>
                  <span className="dark:text-white block">{item.name_en} x {item.qty}</span>
                  {!item.product && <span className="text-[10px] text-red-500 font-bold uppercase">⚠️ Corrupted Item (Missing ID)</span>}
                </div>
              </div>
              <span className="font-semibold dark:text-white">{item.price * item.qty} ETB</span>
            </div>
          ))}
        </div>

        {/* Recovery Action if cart is corrupted */}
        {cartItems.some(item => !item.product) && (
          <div className="mt-6 p-4 bg-habesha-yellow/10 border border-habesha-yellow/30 rounded-2xl flex flex-col items-center text-center">
            <p className="text-sm text-yellow-700 dark:text-habesha-yellow mb-3 font-medium">Your cart contains some old items that are missing required data.</p>
            <button 
              onClick={() => { clearCart(); navigate('/menu'); }}
              className="bg-habesha-yellow text-gray-900 px-6 py-2 rounded-xl font-bold hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-900/20"
            >
              Clear & Refresh Cart
            </button>
          </div>
        )}

        <div className="mt-6 flex flex-col items-end gap-1">
          <div className="flex justify-between w-full text-sm text-gray-500">
            <span>Subtotal:</span>
            <span>{total} ETB</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between w-full text-sm text-habesha-green font-bold">
              <span>Discount ({promoCode}):</span>
              <span>-{discount} ETB</span>
            </div>
          )}
          <div className="h-px bg-gray-100 dark:bg-gray-700 w-full my-2" />
          <div className="flex justify-between w-full text-xl font-bold">
            <span className="dark:text-white">Grand Total</span>
            <span className="text-habesha-green dark:text-habesha-yellow">{total - discount} ETB</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">✨ You are saving {discount} ETB on this order!</p>
        </div>
      </div>

      <button 
        onClick={placeOrderHandler} 
        disabled={loading}
        className="w-full bg-habesha-green hover:bg-green-700 text-white py-3 rounded text-lg font-bold transition-colors disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>

    </motion.div>
  );
};

export default Checkout;
