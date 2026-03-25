const Order = require('../models/Order');

const addOrderItems = async (req, res) => {
  try {
    console.log('Incoming Order Payload:', JSON.stringify(req.body, null, 2));
    const { orderItems, totalPrice, discount, couponCode } = req.body;
    
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    } 
    
    // Check for missing product IDs
    const missingProduct = orderItems.find(item => !item.product);
    if (missingProduct) {
      console.error('Validation Error: Missing product ID in item:', missingProduct);
      return res.status(400).json({ message: `Product ID is required for item: ${missingProduct.name_en}` });
    }

    const order = new Order({
        orderItems,
        user: req.user._id,
        totalPrice,
        discount: discount || 0,
        couponCode: couponCode || ''
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = 'Delivered';
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getOrderById, getMyOrders, updateOrderToDelivered, getAllOrders };
