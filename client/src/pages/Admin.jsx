import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit, FiPackage, FiDollarSign, FiUsers } from 'react-icons/fi';

const CATEGORIES = ['Main', 'Vegetarian', 'Drinks', 'Desserts'];

const emptyForm = { name_en: '', name_am: '', price: '', category: 'Main', description: '', image: '', rating: 4 };

const Admin = () => {
  const { userInfo } = useContext(StoreContext);
  const navigate = useNavigate();
  const headers = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) { navigate('/'); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, oRes, payRes] = await Promise.all([
        axios.get('https://melaku-kitchen.onrender.com/api/products'),
        axios.get('https://melaku-kitchen.onrender.com/api/orders/all', headers).catch(() => ({ data: [] })),
        axios.get('https://melaku-kitchen.onrender.com/api/payments', headers).catch(() => ({ data: [] })),
      ]);
      setProducts(pRes.data);
      setOrders(oRes.data);
      setPayments(payRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!form.name_en || !form.price) { toast.error('Name and price are required'); return; }
    setLoading(true);
    try {
      const productData = {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating)
      };

      if (isEditing) {
        await axios.put(`https://melaku-kitchen.onrender.com/api/products/${editId}`, productData, headers);
        toast.success(`"${form.name_en}" updated successfully! ✨`);
      } else {
        await axios.post('https://melaku-kitchen.onrender.com/api/products', productData, headers);
        toast.success(`"${form.name_en}" added successfully! 🎉`);
      }

      setForm(emptyForm);
      setShowForm(false);
      setIsEditing(false);
      setEditId(null);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'add'} product`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setForm({
      name_en: product.name_en,
      name_am: product.name_am,
      price: product.price,
      category: product.category,
      description: product.description || '',
      image: product.image || '',
      rating: product.rating || 4
    });
    setEditId(product._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('https://melaku-kitchen.onrender.com/api/upload', formData, config);
      setForm({ ...form, image: data });
      toast.success('Image uploaded successfully! 📁');
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await axios.delete(`https://melaku-kitchen.onrender.com/api/products/${id}`, headers);
      toast.success(`"${name}" deleted`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`https://melaku-kitchen.onrender.com/api/orders/${orderId}/deliver`, {}, headers);
      toast.success(`Order updated to ${status}`);
      fetchAll();
    } catch (err) {
      toast.error('Failed to update order');
    }
  };

  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const statCards = [
    { icon: <FiPackage />, label: 'Products', value: products.length, color: 'bg-habesha-green/10 text-habesha-green' },
    { icon: <FiUsers />, label: 'Total Orders', value: orders.length, color: 'bg-habesha-yellow/20 text-yellow-700 dark:text-yellow-400' },
    { icon: <FiPackage />, label: 'Delivered', value: deliveredOrders.length, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { icon: <FiDollarSign />, label: 'Total Revenue', value: `${totalRevenue} ETB`, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white border-b-4 border-habesha-red inline-block pb-2">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(s => (
          <div key={s.label} className="card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-2xl font-extrabold dark:text-white">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {['products', 'orders', 'payments'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-xl font-semibold capitalize transition-all ${activeTab === tab ? 'bg-habesha-green text-white shadow' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-white">Food Items ({products.length})</h2>
            <button onClick={() => { setShowForm(!showForm); setIsEditing(false); setForm(emptyForm); }} className="btn-primary flex items-center gap-2">
              <FiPlus /> {showForm ? 'Cancel' : 'Add New Item'}
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 mb-6 border-t-4 border-habesha-green">
              <h3 className="text-lg font-bold dark:text-white mb-4">{isEditing ? '📝 Edit Food Item' : '✨ New Food Item'}</h3>
              <form onSubmit={handleSubmitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">English Name *</label>
                  <input className="input-field" placeholder="e.g. Doro Wat" value={form.name_en} onChange={e => setForm({ ...form, name_en: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amharic Name (አማርኛ) *</label>
                  <input className="input-field" placeholder="e.g. ዶሮ ወጥ" value={form.name_am} onChange={e => setForm({ ...form, name_am: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (ETB) *</label>
                  <input type="number" className="input-field" placeholder="e.g. 450" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
                  <div className="flex items-center gap-3">
                    {form.image && (
                      <img src={form.image.startsWith('/uploads') ? `https://melaku-kitchen.onrender.com${form.image}` : form.image} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                    )}
                    <div className="flex-1 relative">
                      <input 
                        type="file" 
                        id="image-upload"
                        className="hidden" 
                        onChange={uploadFileHandler} 
                      />
                      <label 
                        htmlFor="image-upload"
                        className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm text-gray-500"
                      >
                        {form.image ? (form.image.length > 20 ? '...' + form.image.slice(-15) : form.image) : 'Choose Image File'}
                        <FiPlus size={16} />
                      </label>
                    </div>
                  </div>
                  <input className="input-field mt-2 text-xs" placeholder="Or enter manual path..." value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating (1–5)</label>
                  <input type="number" min="1" max="5" step="0.5" className="input-field" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea className="input-field" rows={2} placeholder="Short description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50 justify-center">
                    {loading ? (isEditing ? 'Updating...' : 'Adding...') : `✓ ${isEditing ? 'Update Food Item' : 'Add Food Item'}`}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setIsEditing(false); setForm(emptyForm); }} className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Products Table */}
          <div className="card overflow-hidden">
            {loading ? 
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 h-10 w-1/4"><div className="skeleton h-4 w-20 rounded" /></th>
                    <th className="px-4 py-3 h-10 w-1/4"><div className="skeleton h-4 w-20 rounded" /></th>
                    <th className="px-4 py-3 h-10 w-1/8"><div className="skeleton h-4 w-10 rounded" /></th>
                    <th className="px-4 py-3 h-10 w-1/8"><div className="skeleton h-4 w-10 rounded" /></th>
                    <th className="px-4 py-3 text-right h-10"><div className="skeleton h-4 w-10 ml-auto rounded" /></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-4 flex items-center gap-3">
                        <div className="skeleton w-10 h-10 rounded-lg" />
                        <div className="skeleton h-4 w-24 rounded" />
                      </td>
                      <td className="px-4 py-4"><div className="skeleton h-4 w-20 rounded" /></td>
                      <td className="px-4 py-4"><div className="skeleton h-6 w-16 rounded-full" /></td>
                      <td className="px-4 py-4"><div className="skeleton h-4 w-12 rounded" /></td>
                      <td className="px-4 py-4 text-right"><div className="skeleton h-8 w-16 ml-auto rounded-lg" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            : products.length === 0 ? 
              <div className="p-10 text-center text-gray-400">
                <p className="text-4xl mb-3">🍽️</p>
                <p>No products yet. Add your first one!</p>
              </div>
            : 
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Amharic</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Rating</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {products.map(p => (
                      <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-4 py-3 flex items-center gap-3">
                          {p.image && <img src={p.image.startsWith('/uploads') ? `https://melaku-kitchen.onrender.com${p.image}` : p.image} alt={p.name_en} className="w-10 h-10 rounded-lg object-cover" />}
                          <span className="font-medium dark:text-white">{p.name_en}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.name_am}</td>
                        <td className="px-4 py-3"><span className="food-badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{p.category}</span></td>
                        <td className="px-4 py-3 font-bold text-habesha-green dark:text-habesha-yellow">{p.price} ETB</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">⭐ {p.rating}</td>
                        <td className="px-4 py-3 text-right flex gap-1 justify-end">
                          <button onClick={() => handleEditClick(p)} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            <FiEdit size={17} />
                          </button>
                          <button onClick={() => handleDeleteProduct(p._id, p.name_en)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <FiTrash2 size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="card overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-10 text-center text-gray-400"><p className="text-4xl mb-3">📦</p><p>No orders yet.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {orders.map(o => (
                    <tr key={o._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 font-mono text-sm dark:text-white">{o._id.substring(0, 10)}...</td>
                      <td className="px-4 py-3">
                        <p className="font-medium dark:text-white">{o.user?.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-400">{o.user?.email}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{o.createdAt?.substring(0, 10)}</td>
                      <td className="px-4 py-3 font-bold text-habesha-green dark:text-habesha-yellow">{o.totalPrice} ETB</td>
                      <td className="px-4 py-3">
                        <span className={`food-badge ${o.status === 'Delivered' ? 'status-delivered' : o.status === 'Preparing' ? 'status-preparing' : 'status-pending'}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {o.status !== 'Delivered' && (
                          <button onClick={() => handleUpdateOrderStatus(o._id, 'Delivered')} className="text-sm btn-primary py-1.5 px-3 rounded-lg">Mark Delivered</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="card overflow-hidden">
          {payments.length === 0 ? (
            <div className="p-10 text-center text-gray-400"><p className="text-4xl mb-3">💳</p><p>No payments yet.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Reference No.</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {payments.map(pay => (
                    <tr key={pay._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 font-mono dark:text-white">{pay.reference_number}</td>
                      <td className="px-4 py-3 font-bold text-habesha-green dark:text-habesha-yellow">{pay.amount} ETB</td>
                      <td className="px-4 py-3"><span className="food-badge status-pending">{pay.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Admin;
