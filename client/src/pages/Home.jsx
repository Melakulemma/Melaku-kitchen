import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Injera', emoji: '🫓', color: 'from-amber-500 to-orange-500' },
  { name: 'Tibs', emoji: '🥩', color: 'from-red-500 to-pink-500' },
  { name: 'Kitfo', emoji: '🍖', color: 'from-rose-500 to-red-600' },
  { name: 'Drinks', emoji: '🍯', color: 'from-yellow-400 to-amber-500' },
  { name: 'Vegetarian', emoji: '🥦', color: 'from-green-500 to-emerald-600' },
  { name: 'Desserts', emoji: '🍮', color: 'from-purple-500 to-pink-500' },
];

const stats = [
  { label: 'Traditional Dishes', value: '30+' },
  { label: 'Happy Customers', value: '5K+' },
  { label: 'Years of Excellence', value: '10+' },
];

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 text-white hero-pattern">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-habesha-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-habesha-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-habesha-green/20 border border-habesha-green/30 text-habesha-yellow text-sm font-semibold mb-6 tracking-wide">
              🇪🇹 &nbsp; Authentic Habeshan Cuisine
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('Welcome to')}&nbsp;
            <span className="gradient-text">Melaku Kitchen</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            {t('Authentic Ethiopian Food')} — cooked with love, spices & tradition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/menu" className="btn-primary text-lg px-8 py-3 rounded-2xl shadow-lg shadow-green-900/40 hover:shadow-green-800/60">
              🍽️ &nbsp; Explore Menu
            </Link>
            <Link to="/about" className="glass-card text-white font-semibold px-8 py-3 rounded-2xl hover:bg-white/20 transition-all text-lg">
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center gap-12 mt-16 border-t border-white/10 pt-10"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold gradient-text">{s.value}</p>
                <p className="text-gray-400 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="block w-full fill-gray-50 dark:fill-gray-950">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32V80H0Z" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h2 className="section-title">{t('Categories')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Explore a world of Ethiopian flavors</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            >
              <Link to={`/menu`} className="card card-lift flex flex-col items-center justify-center py-6 px-4 cursor-pointer hover:border-habesha-green dark:hover:border-habesha-yellow group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                  {cat.emoji}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Loved by food enthusiasts across Ethiopia</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sara Lemma', text: 'The Doro Wat was absolutely incredible — just like my grandmother used to make. Will definitely order again!', stars: 5 },
              { name: 'Yonas Tesfaye', text: 'Best Kitfo in Addis! The ordering process was smooth and the food arrived hot and fresh.', stars: 5 },
              { name: 'Marta Haile', text: 'The Beyaynetu platter was perfect for our family dinner. Great variety, great taste!', stars: 4 },
            ].map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="card card-lift p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={j < r.stars ? 'star-filled text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic flex-1">"{r.text}"</p>
                  <p className="mt-4 font-bold text-gray-800 dark:text-white">— {r.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="py-16 bg-gradient-to-r from-habesha-green via-emerald-600 to-green-700 text-white text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to taste the best of Ethiopia?
          </h2>
          <p className="text-green-100 mb-8 text-lg">Order your favourite Habeshan dishes right now.</p>
          <Link to="/menu" className="bg-white text-habesha-green font-bold px-8 py-3 rounded-2xl shadow hover:bg-gray-100 transition-colors text-lg inline-block">
            Order Now →
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
