const Review = require('../models/Review');
const Tour = require('../models/Tour');

// @desc    Get reviews for a tour
// @route   GET /api/tours/:tourId/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ tourId: req.params.tourId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add review
// @route   POST /api/tours/:tourId/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    req.body.tourId = req.params.tourId;
    req.body.userId = req.user.id;

    // Check if tour exists
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    // If unique index violation
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this tour' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};
