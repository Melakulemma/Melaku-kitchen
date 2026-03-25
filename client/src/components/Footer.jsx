import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-habesha-green to-habesha-yellow flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">M</span>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Melaku Kitchen</span>
            </div>
            <p className="text-sm leading-relaxed">{t('Authentic Ethiopian Food')}. Order online with ease.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-habesha-green transition-colors">{t('Menu')}</Link></li>
              <li><Link to="/about" className="hover:text-habesha-green transition-colors">{t('About Us')}</Link></li>
              <li><Link to="/contact" className="hover:text-habesha-green transition-colors">{t('Contact Us')}</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-habesha-green hover:text-white transition-colors"><FiFacebook /></a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-habesha-yellow hover:text-gray-900 transition-colors"><FiInstagram /></a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-blue-500 hover:text-white transition-colors"><FiTwitter /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Melaku Kitchen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
