import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/mybookings');
        setBookings(res.data.data);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle className="text-green-500 mr-2" size={20} />;
      case 'pending': return <Clock className="text-orange-500 mr-2" size={20} />;
      case 'cancelled': return <XCircle className="text-red-500 mr-2" size={20} />;
      default: return <Clock className="text-gray-500 mr-2" size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">My Dashboard</h1>
            <p className="text-slate-600 text-lg">Welcome back, {user.name}!</p>
          </div>
          {user.role === 'admin' && (
            <Link 
              to="/admin" 
              className="mt-4 md:mt-0 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-6 rounded-xl transition"
            >
              Go to Admin Panel
            </Link>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-gray-100 pb-4">My Bookings</h2>
          
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="flex flex-col md:flex-row border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <img 
                      src={booking.tourId?.images[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop'} 
                      alt="Tour" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link to={`/tours/${booking.tourId?._id}`} className="text-xl font-bold text-slate-800 hover:text-primary transition">
                          {booking.tourId?.title || 'Tour removed'}
                        </Link>
                        <div className="flex items-center capitalize font-medium px-3 py-1 bg-slate-50 rounded-lg">
                          {getStatusIcon(booking.status)} {booking.status}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-slate-500 mt-2 space-x-4">
                        <span className="flex items-center"><MapPin size={16} className="mr-1" /> {booking.tourId?.location}</span>
                        <span className="flex items-center"><Calendar size={16} className="mr-1" /> {new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg">
                        {booking.numberOfPeople} Traveler(s)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">You don't have any bookings yet.</p>
              <Link to="/tours" className="inline-block mt-4 text-primary font-semibold hover:underline">
                Explore Tours
              </Link>
            </div>
          )}
        </div>

        {/* Wishlist Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-gray-100 pb-4">My Wishlist</h2>
          {/* We'll just show a placeholder since we haven't fetched the detailed wishlist array in Dashboard yet, 
              or we can redirect to /tours with a wishlist filter. For now, a simple note. */}
          <p className="text-slate-600">Your wishlisted tours appear in your profile. (Feature expanding soon!)</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
