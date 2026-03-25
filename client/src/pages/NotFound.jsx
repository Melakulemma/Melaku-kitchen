import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 text-white text-center px-4">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-9xl font-extrabold gradient-text mb-4">404</p>
      <h1 className="text-3xl font-bold mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-400 mb-8">Looks like this dish isn't on the menu yet.</p>
      <Link to="/" className="btn-primary px-8 py-3 text-lg rounded-2xl">
        🏠 Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
