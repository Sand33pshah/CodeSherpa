import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Calendar, Users, Info } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleWishlist, isWishlisted } = useAuth();
  
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Booking State
  const [date, setDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Review State
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Wishlist State




  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const [tourRes, reviewsRes] = await Promise.all([
          api.get(`/tours/${id}`),
          api.get(`/tours/${id}/reviews`)
        ]);
        setTour(tourRes.data.data);
        setReviews(reviewsRes.data.data);
      } catch (err) {
        setError('Failed to load tour details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      // First, create the actual booking in our DB
      await api.post('/bookings', {
        tourId: tour._id,
        date,
        numberOfPeople
      });

      // Then create Stripe session
      const res = await api.post(`/bookings/checkout-session/${tour._id}`, { numberOfPeople });
      
      if (res.data.url) {
        // Mock flow
        window.location.href = res.data.url;
      } else {
        // Stripe flow
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
          sessionId: res.data.session.id,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      setBookingLoading(false);
    }
  };




  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    setReviewLoading(true);
    try {
      await api.post(`/tours/${id}/reviews`, {
        rating: newRating,
        comment: newReview
      });
      // refresh reviews
      const reviewsRes = await api.get(`/tours/${id}/reviews`);
      setReviews(reviewsRes.data.data);
      setNewReview('');
      setNewRating(5);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="container mx-auto p-8 text-center text-red-600 bg-red-50 rounded-xl mt-8">
        {error || 'Tour not found'}
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Tour Header Image */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <img 
          src={tour.images[0] || 'https://images.unsplash.com/photo-1504280390467-333065a3d463?q=80&w=2000&auto=format&fit=crop'} 
          alt={tour.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <div className="inline-block px-4 py-1 bg-primary/90 backdrop-blur text-white text-sm font-bold rounded-full uppercase tracking-widest mb-4">
              {tour.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">{tour.title}</h1>
            <div className="flex items-center text-slate-200 text-lg space-x-6">
              <span className="flex items-center"><MapPin className="mr-2" size={20} /> {tour.location}</span>
              <span className="flex items-center"><Clock className="mr-2" size={20} /> {tour.duration} Days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Tour Info */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                <Info className="mr-3 text-primary" size={28} /> Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {tour.description}
              </p>
            </section>

            {/* Location Map */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                <MapPin className="mr-3 text-primary" size={28} /> Location
              </h2>
              <div className="w-full h-80 rounded-2xl overflow-hidden bg-gray-100">
                <iframe 
                  title="Tour Location"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(tour.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
              </div>
            </section>

            {/* Itinerary Section */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                  <Calendar className="mr-3 text-primary" size={28} /> Itinerary
                </h2>
                <div className="space-y-4">
                  {tour.itinerary.map((item) => (
                    <details key={item._id || item.day} className="group bg-slate-50 border border-slate-200 rounded-xl">
                      <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-slate-800 marker:content-none">
                        <span>Day {item.day}: {item.title}</span>
                        <svg className="h-5 w-5 text-slate-500 transition group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-4 pb-4 text-slate-600 leading-relaxed border-t border-slate-200 pt-4">
                        {item.description}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800 flex items-center">
                  <Star className="mr-3 text-primary" size={28} /> Reviews
                </h2>
                <div className="text-lg font-bold text-slate-600 bg-slate-100 px-4 py-1 rounded-full">
                  {tour.ratingsAverage?.toFixed(1)} / 5 ({tour.ratingsQuantity} reviews)
                </div>
              </div>
              
              <div className="space-y-6 mb-10">
                {reviews.length === 0 ? (
                  <p className="text-slate-500 italic">No reviews yet. Be the first to review!</p>
                ) : (
                  reviews.map(review => (
                    <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800">{review.userId?.name || 'Guest'}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Review Form */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Leave a Review</h3>
                {user ? (
                  <form onSubmit={submitReview}>
                    <div className="mb-4">
                      <label className="block text-slate-700 font-medium mb-2">Rating</label>
                      <select 
                        value={newRating} 
                        onChange={e => setNewRating(Number(e.target.value))}
                        className="w-full md:w-32 p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Terrible</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-slate-700 font-medium mb-2">Your Review</label>
                      <textarea 
                        required
                        value={newReview}
                        onChange={e => setNewReview(e.target.value)}
                        rows="4"
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
                        placeholder="Share your experience..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={reviewLoading}
                      className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition disabled:opacity-70"
                    >
                      {reviewLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <p className="text-slate-600">Please <a href="/login" className="text-primary font-bold hover:underline">log in</a> to leave a review.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Box */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-28">
              <div className="flex justify-between items-center mb-2">
                <div className="text-3xl font-bold text-slate-800">
                  ${tour.price} <span className="text-lg text-slate-500 font-normal">/ person</span>
                </div>
                <button 
                  onClick={() => toggleWishlist(tour._id)}

                  className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition shadow-sm border border-slate-200 group"
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:scale-110 transition-transform ${isWishlisted ? "text-secondary" : "text-gray-400 group-hover:text-secondary"}`}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <hr className="my-6 border-gray-100" />
              
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2 flex items-center">
                    <Calendar className="mr-2 text-primary" size={18} /> Select Date
                  </label>
                  <input 
                    type="date" 
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-700 font-medium mb-2 flex items-center">
                    <Users className="mr-2 text-primary" size={18} /> Travelers
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  />
                </div>

                <div className="flex justify-between items-center py-4 text-lg font-bold text-slate-800 border-t border-gray-100">
                  <span>Total</span>
                  <span>${tour.price * numberOfPeople}</span>
                </div>

                {bookingSuccess && (
                  <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-medium">
                    Booking Successful! 🎉
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={bookingLoading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-lg transition duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {bookingLoading ? 'Processing...' : 'Book Now'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourDetails;
