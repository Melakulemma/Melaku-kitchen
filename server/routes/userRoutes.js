const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { registerValidation, loginValidation } = require('../middleware/validatorMiddleware');

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, authUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
