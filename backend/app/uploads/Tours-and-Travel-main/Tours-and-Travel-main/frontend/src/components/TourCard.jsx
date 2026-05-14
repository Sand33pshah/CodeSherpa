import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const TourCard = ({ tour }) => {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (user && user.wishlist?.includes(tour._id)) {
      setIsWishlisted(true);
    }
  }, [user, tour._id]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    if (!user) return; // Optional: redirect to login or show alert
    
    try {
      setIsWishlisted(!isWishlisted);
      await api.post(`/users/wishlist/${tour._id}`);
    } catch (error) {
      setIsWishlisted(!isWishlisted); // revert on fail
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={tour.images[0] || 'https://images.unsplash.com/photo-1504280390467-333065a3d463?q=80&w=800&auto=format&fit=crop'} 
          alt={tour.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
          ${tour.price}
        </div>
        
        <button 
          onClick={toggleWishlist}
          className="absolute top-4 right-20 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-secondary transition"
        >
          <Heart size={18} className={isWishlisted ? "fill-secondary text-secondary" : ""} />
        </button>
        
        {tour.featured && (
          <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={16} className="mr-1 text-primary" />
          {tour.location}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">{tour.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{tour.description}</p>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <Clock size={16} className="mr-2 text-gray-400" />
            {tour.duration} Days
          </div>
          <Link 
            to={`/tours/${tour._id}`} 
            className="text-primary font-semibold hover:text-primary-dark transition-colors flex items-center"
          >
            Explore <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
