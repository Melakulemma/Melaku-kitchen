import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Melaku Tadesse', role: 'Head Chef & Founder', emoji: '👨‍🍳' },
  { name: 'Tigist Alemu', role: 'Traditional Recipe Curator', emoji: '👩‍🍳' },
  { name: 'Dawit Bekele', role: 'Customer Experience', emoji: '🤝' },
];

const values = [
  { emoji: '🌿', title: 'Fresh Ingredients', desc: 'We source only the freshest local spices and produce every single day.' },
  { emoji: '🇪🇹', title: 'Authentic Recipes', desc: 'Every dish follows time-honoured Ethiopian traditions passed down through generations.' },
  { emoji: '❤️', title: 'Cooked with Love', desc: 'Each meal is prepared with genuine care and passion for Ethiopian cuisine.' },
  { emoji: '🚀', title: 'Fast Delivery', desc: 'We ensure your food arrives hot, fresh and on time, every time.' },
];

const About = () => (
  <div>
    {/* Hero */}
    <div className="relative bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 text-white py-28 px-4 text-center">
      <div className="absolute top-10 left-10 w-64 h-64 bg-habesha-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-habesha-green/10 rounded-full blur-3xl pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-3xl mx-auto">
        <span className="food-badge bg-habesha-green/20 text-habesha-yellow border border-habesha-green/30 mb-6 inline-block">🇪🇹 Our Story</span>
        <h1 className="text-5xl font-extrabold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          About <span className="gradient-text">Melaku Kitchen</span>
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Born in the heart of Addis Ababa, Melaku Kitchen brings the warmth, aroma, and rich taste of authentic Ethiopian cuisine right to your table.
        </p>
      </motion.div>
    </div>

    {/* Values */}
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="section-title">What We Stand For</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Our core principles that drive everything we do</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="card card-lift p-6 text-center h-full">
              <div className="text-5xl mb-4">{v.emoji}</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Team */}
    <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The passionate people behind every dish</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <div className="card p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-habesha-green to-habesha-yellow flex items-center justify-center text-4xl mx-auto mb-4">
                  {member.emoji}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-sm text-habesha-green font-medium mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 text-center px-4">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="section-title mb-4">Ready to Order?</h2>
        <Link to="/menu" className="btn-primary px-10 py-3 text-lg inline-block rounded-2xl">🍽️ Browse Menu</Link>
      </motion.div>
    </section>
  </div>
);

export default About;
