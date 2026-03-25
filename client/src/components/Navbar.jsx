import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiShoppingCart, FiUser, FiMoon, FiSun, FiGlobe, FiMenu, FiX } from 'react-icons/fi';
import { StoreContext } from '../context/StoreContext';
import { useState } from 'react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { cartItems, userInfo, theme, toggleTheme, setUserInfo } = useContext(StoreContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'am' : 'en');
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-habesha-green to-habesha-yellow flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">M</span>
            </div>
            <span className="text-xl font-extrabold gradient-text tracking-tight">
              Melaku Kitchen
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="nav-link">{t('Menu')}</Link>
            <Link to="/about" className="nav-link">{t('About Us')}</Link>
            <Link to="/contact" className="nav-link">{t('Contact Us')}</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleLanguage} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-sm" title={t('Language')}>
              <FiGlobe className="inline mr-1" />
              {i18n.language.toUpperCase()}
            </button>

            <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
            </button>

            <Link to="/cart" className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FiShoppingCart size={20} />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-habesha-red rounded-full animate-bounce">
                  {totalQty}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative group">
                <Link to="/profile" className="flex items-center space-x-2 pl-2 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-habesha-green to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {userInfo.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm font-semibold text-gray-700 dark:text-gray-300">{userInfo.name}</span>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="ml-2 btn-primary text-sm py-2 px-4">
                {t('Login')}
              </Link>
            )}

            <button className="md:hidden p-2 text-gray-600 dark:text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-100 dark:border-gray-800 pt-3">
            <Link to="/menu" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium" onClick={() => setMobileOpen(false)}>{t('Menu')}</Link>
            <Link to="/about" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium" onClick={() => setMobileOpen(false)}>{t('About Us')}</Link>
            <Link to="/contact" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium" onClick={() => setMobileOpen(false)}>{t('Contact Us')}</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
