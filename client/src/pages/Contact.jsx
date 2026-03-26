import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

const info = [
  { icon: <FiPhone />, label: 'Phone', value: '+251 930804410', href: 'tel:+251930804410' },
  { icon: <FiMail />, label: 'Email', value: 'hello@melakukitchen.com', href: 'mailto:hello@melakukitchen.com' },
  { icon: <FiMapPin />, label: 'Location', value: 'Bole, Addis Ababa, Ethiopia', href: '#' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon 😊');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 text-white py-24 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-extrabold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg">We'd love to hear from you. Reach out anytime!</p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info Cards */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Contact Information</h2>
          {info.map((item) => (
            <a key={item.label} href={item.href} className="card flex items-center gap-4 p-5 hover:border-habesha-green dark:hover:border-habesha-yellow">
              <div className="w-12 h-12 rounded-xl bg-habesha-green/10 dark:bg-habesha-green/20 text-habesha-green flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{item.label}</p>
                <p className="text-gray-800 dark:text-white font-medium">{item.value}</p>
              </div>
            </a>
          ))}

          {/* Hours */}
          <div className="card p-5">
            <h3 className="font-bold text-gray-800 dark:text-white mb-3">🕐 Opening Hours</h3>
            <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex justify-between"><span>Mon – Fri</span><span className="font-medium text-habesha-green">8:00 AM – 10:00 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span className="font-medium text-habesha-green">9:00 AM – 11:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-habesha-green">10:00 AM – 9:00 PM</span></div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                <input type="text" className="input-field" placeholder="Abebe Kebede" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea rows={5} className="input-field resize-none" placeholder="How can we help you?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2">
                <FiSend /> Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
