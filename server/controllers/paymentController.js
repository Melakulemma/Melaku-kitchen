const Payment = require('../models/Payment');
const Order = require('../models/Order');

const submitPayment = async (req, res) => {
  try {
    const { orderId, reference_number, amount } = req.body;
    
    // Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if payment reference is already used
    const existingPayment = await Payment.findOne({ reference_number });
    if (existingPayment) {
      return res.status(400).json({ message: 'Payment reference already used' });
    }

    const payment = new Payment({
      user: req.user._id,
      order: orderId,
      reference_number,
      amount,
      status: 'Pending' // Wait for admin to varify optionally
    });

    const createdPayment = await payment.save();
    
    // Attach payment info to order
    order.paymentRef = reference_number;
    order.status = 'Preparing';
    await order.save();
    
    res.status(201).json(createdPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate('user', 'id name').populate('order', 'totalPrice');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitPayment, getPayments };
