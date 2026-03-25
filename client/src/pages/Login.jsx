import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('https://melaku-kitchen.onrender.com/api/users/login', { email, password });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
      toast.success('Welcome back! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const [loginMode, setLoginMode] = useState('user'); // 'user' | 'admin'

  const switchMode = (mode) => {
    setLoginMode(mode);
    if (mode === 'admin') {
      setEmail('admin@melaku.com');
      setPassword('admin1234');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        {/* Card */}
        <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/10">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-habesha-green to-habesha-yellow flex items-center justify-center shadow-lg">
              <span className="text-3xl font-extrabold text-white">M</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
            <p className="text-gray-400 mt-1">Sign in to your Melaku Kitchen account</p>
          </div>

          {/* User / Admin Toggle */}
          <div className="flex bg-white/10 rounded-xl p-1 mb-6">
            <button
              onClick={() => switchMode('user')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${loginMode === 'user' ? 'bg-habesha-green text-white shadow' : 'text-gray-300 hover:text-white'}`}
            >
              👤 User Login
            </button>
            <button
              onClick={() => switchMode('admin')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${loginMode === 'admin' ? 'bg-habesha-yellow text-gray-900 shadow' : 'text-gray-300 hover:text-white'}`}
            >
              🛡️ Admin Login
            </button>
          </div>

          {loginMode === 'admin' && (
            <div className="mb-4 bg-habesha-yellow/10 border border-habesha-yellow/30 rounded-xl px-4 py-3 text-sm text-habesha-yellow">
              Admin credentials have been auto-filled. Click Sign In!
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" className="input-field pl-11" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-habesha-yellow transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="input-field pl-11 pr-12" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className={`w-full justify-center text-base py-3 rounded-xl disabled:opacity-50 ${loginMode === 'admin' ? 'btn-secondary' : 'btn-primary'}`}>
              {loading ? 'Signing in...' : loginMode === 'admin' ? '🛡️ Sign In as Admin →' : 'Sign In →'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            New here?{' '}
            <Link to={`/register?redirect=${redirect}`} className="text-habesha-yellow font-semibold hover:underline">Create an account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
