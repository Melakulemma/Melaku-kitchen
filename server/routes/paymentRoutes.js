const express = require('express');
const router = express.Router();
const { submitPayment, getPayments } = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, submitPayment).get(protect, admin, getPayments);

module.exports = router;
