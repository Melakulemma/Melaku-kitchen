import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Payment = () => {
  const { id: orderId } = useParams();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(StoreContext);
  const navigate = useNavigate();

  const submitPaymentHandler = async (e) => {
    e.preventDefault();
    if (!referenceNumber) {
      toast.error('Please enter a valid reference number');
      return;
    }
    
    try {
      setLoading(true);
      await axios.post('https://melaku-kitchen.onrender.com/api/payments', {
        orderId,
        reference_number: referenceNumber,
        amount: 0 // Mocked amount, the backend can get it from the order
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setLoading(false);
      toast.success('Payment submitted successfully! Admin will verify soon.');
      navigate('/profile');
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || 'Payment submission failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-4 py-8 flex justify-center items-center h-[calc(100vh-200px)]">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Telebirr Payment</h2>
        <div className="text-center mb-6 text-gray-700 dark:text-gray-300">
          <p>Please transfer the total amount to:</p>
          <p className="font-bold text-xl my-2">0911XXXXXX</p>
          <p>Then enter your transaction reference number below.</p>
        </div>
        <form onSubmit={submitPaymentHandler}>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-bold">Transaction Reference No.</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border rounded font-mono uppercase focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="e.g. 7A8B9C1D"
              value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Confirm Payment'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Payment;
