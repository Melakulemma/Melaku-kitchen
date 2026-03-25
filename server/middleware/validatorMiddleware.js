const { check, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  validate
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  validate
];

const productValidation = [
  check('name_en', 'English name is required').not().isEmpty(),
  check('name_am', 'Amharic name is required').not().isEmpty(),
  check('price', 'Price is required and must be a number').isNumeric(),
  check('category', 'Category is required').not().isEmpty(),
  validate
];

module.exports = { registerValidation, loginValidation, productValidation };
