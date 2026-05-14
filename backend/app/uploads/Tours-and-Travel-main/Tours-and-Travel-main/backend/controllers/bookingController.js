const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { tourId, date, numberOfPeople } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      tourId,
      date,
      numberOfPeople,
    });

    try {
      await sendEmail({
        email: req.user.email,
        subject: 'Tour Booking Confirmation',
        message: `Hello ${req.user.name},\n\nYour booking for ${tour.title} on ${new Date(date).toLocaleDateString()} for ${numberOfPeople} people has been confirmed.\n\nThank you for choosing Tours & Travel!`
      });
    } catch (emailError) {
      console.log('Error sending email:', emailError);
    }

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('tourId');
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email').populate('tourId', 'title');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status (Admin only)
// @route   PUT /api/bookings/:id
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe Checkout Session
// @route   POST /api/bookings/checkout-session/:tourId
// @access  Private
exports.createCheckoutSession = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      // Mock session for local development without keys
      return res.status(200).json({ success: true, url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success` });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/tours/${tour._id}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourId,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tour.title,
              description: tour.description,
              images: tour.images,
            },
            unit_amount: tour.price * 100, // Stripe expects cents
          },
          quantity: req.body.numberOfPeople || 1,
        },
      ],
      mode: 'payment',
    });

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
