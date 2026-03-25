const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { productValidation } = require('../middleware/validatorMiddleware');

router.route('/').get(getProducts).post(protect, admin, productValidation, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, productValidation, updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
