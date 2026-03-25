const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name_en: { type: String, required: true },
      name_am: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: String,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  discount: {
    type: Number,
    required: true,
    default: 0.0
  },
  couponCode: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Preparing', 'Delivered']
  },
  paymentRef: {
    type: String
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
