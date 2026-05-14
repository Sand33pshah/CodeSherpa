const express = require('express');
const { createBooking, getMyBookings, getBookings, updateBookingStatus, createCheckoutSession } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getBookings);

router.route('/checkout-session/:tourId')
  .post(protect, createCheckoutSession);

router.route('/mybookings')
  .get(protect, getMyBookings);

router.route('/:id')
  .put(protect, admin, updateBookingStatus);

module.exports = router;
