import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiLogOut, FiSettings, FiPackage, FiUser } from 'react-icons/fi';

const statusSteps = ['Pending', 'Preparing', 'Delivered'];

const StatusBar = ({ status }) => {
  const idx = statusSteps.indexOf(status);
  return (
    <div className="flex items-center gap-1 mt-3">
      {statusSteps.map((step, i) => (
        <React.Fragment key={step}>
          <div className={`flex flex-col items-center`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i <= idx ? 'bg-habesha-green text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-400'}`}>
              {i < idx ? '✓' : i + 1}
            </div>
            <span className={`text-xs mt-1 ${i <= idx ? 'text-habesha-green font-semibold' : 'text-gray-400'}`}>{step}</span>
          </div>
          {i < statusSteps.length - 1 && (
            <div className={`flex-1 h-1 rounded-full mb-4 ${i < idx ? 'bg-habesha-green' : 'bg-gray-200 dark:bg-gray-600'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Profile = () => {
  const { userInfo, setUserInfo } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!userInfo) { navigate('/login'); return; }
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo, navigate]);

  const logoutHandler = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <div className="lg:w-72 space-y-4">
          {/* Avatar Card */}
          <div className="card p-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-habesha-green to-blue-500 flex items-center justify-center text-white text-3xl font-extrabold mb-4 shadow-lg">
              {userInfo?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-extrabold dark:text-white">{userInfo?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{userInfo?.email}</p>
            {userInfo?.isAdmin && (
              <span className="inline-block mt-2 px-3 py-1 bg-habesha-yellow/20 text-habesha-yellow text-xs font-bold rounded-full">Administrator</span>
            )}
          </div>

          {/* Stats */}
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-1">
              <FiPackage className="text-habesha-green" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">Total Orders</span>
            </div>
            <p className="text-3xl font-extrabold dark:text-white ml-7">{orders.length}</p>
          </div>

          {/* Actions */}
          <div className="card p-4 space-y-2">
            {userInfo?.isAdmin && (
              <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-habesha-green/10 text-habesha-green hover:bg-habesha-green/20 font-semibold transition-colors">
                <FiSettings /> Admin Dashboard
              </button>
            )}
            <button onClick={logoutHandler} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 font-semibold transition-colors">
              <FiLogOut /> {t('Logout')}
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="flex-1">
          <h2 className="section-title mb-6">Order History</h2>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-habesha-green border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-5xl mb-4">📦</p>
              <p className="text-xl font-bold dark:text-white mb-2">No orders yet</p>
              <p className="text-gray-400 mb-6">Start exploring our menu and place your first order!</p>
              <button onClick={() => navigate('/menu')} className="btn-primary px-8 py-2.5 rounded-xl">Browse Menu</button>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order, i) => (
                <motion.div key={order._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <div className="card p-5">
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-400 font-mono">Order #{order._id.substring(0, 10).toUpperCase()}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-extrabold text-habesha-green dark:text-habesha-yellow">{order.totalPrice} ETB</p>
                        <p className="text-xs text-gray-400">{order.orderItems?.length} item(s)</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {order.orderItems?.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2">
                          {item.image && <img src={item.image} alt={item.name_en} className="w-8 h-8 rounded-lg object-cover" />}
                          <span className="text-sm font-medium dark:text-white">{item.name_en}</span>
                          <span className="text-xs text-gray-400">×{item.qty}</span>
                          <span className="text-xs font-bold text-habesha-green dark:text-habesha-yellow">{item.price} ETB</span>
                        </div>
                      ))}
                    </div>

                    {/* Status Bar */}
                    <StatusBar status={order.status || 'Pending'} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
