const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a tour title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  region: {
    type: String,
    required: [true, 'Please add a region/province']
  },
  images: {
    type: [String],
    default: []
  },
  duration: {
    type: Number, // in days
    required: [true, 'Please add a duration in days']
  },
  category: {
    type: String,
    required: [true, 'Please add a category (e.g., Adventure, Cultural, Relaxation)']
  },
  featured: {
    type: Boolean,
    default: false
  },
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  ratingsAverage: {
    type: Number,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual populate for reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'tour',
  justOne: false
});

module.exports = mongoose.model('Tour', tourSchema);
