const express = require('express');
const { toggleWishlist, getWishlist } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/wishlist')
  .get(protect, getWishlist);

router.route('/wishlist/:tourId')
  .post(protect, toggleWishlist);

module.exports = router;
