const express = require('express');
const { getTours, getTour, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const { protect, admin } = require('../middleware/authMiddleware');

// Include other resource routers
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Re-route into other resource routers
router.use('/:tourId/reviews', reviewRouter);

router.route('/')
  .get(getTours)
  .post(protect, admin, createTour);

router.route('/:id')
  .get(getTour)
  .put(protect, admin, updateTour)
  .delete(protect, admin, deleteTour);

module.exports = router;
