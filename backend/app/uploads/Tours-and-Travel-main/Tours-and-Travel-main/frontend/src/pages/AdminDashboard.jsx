import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Users, Map, Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ tours: 0, users: 0, bookings: 0 });
  const [bookings, setBookings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const toursRes = await api.get('/tours');
        const bookingsRes = await api.get('/bookings');
        
        const fetchedBookings = bookingsRes.data.data || [];
        
        setStats({
          tours: toursRes.data.count || 0,
          users: Math.floor(Math.random() * 50) + 10, // Mock users count
          bookings: bookingsRes.data.count || 0
        });
        
        setBookings(fetchedBookings);

        // Generate chart data (mocked by month based on bookings or dummy)
        const mockData = [
          { name: 'Jan', bookings: 4 },
          { name: 'Feb', bookings: 7 },
          { name: 'Mar', bookings: 5 },
          { name: 'Apr', bookings: 12 },
          { name: 'May', bookings: fetchedBookings.length + 2 },
          { name: 'Jun', bookings: 8 },
        ];
        setChartData(mockData);

      } catch (error) {
        console.error('Failed to fetch admin data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const updateBookingStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (error) {
      alert('Failed to update status');
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
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl mr-4">
              <Map size={32} />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Total Tours</p>
              <h3 className="text-3xl font-bold text-slate-800">{stats.tours}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-4 bg-secondary/10 text-secondary rounded-2xl mr-4">
              <CalendarIcon size={32} />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Total Bookings</p>
              <h3 className="text-3xl font-bold text-slate-800">{stats.bookings}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-4 bg-green-500/10 text-green-600 rounded-2xl mr-4">
              <Users size={32} />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Active Users</p>
              <h3 className="text-3xl font-bold text-slate-800">{stats.users}</h3>
            </div>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Booking Analytics</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend />
                <Bar dataKey="bookings" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Total Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Manage Bookings */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 overflow-hidden">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Bookings</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-gray-200">
                  <th className="p-4 font-semibold rounded-tl-xl">User</th>
                  <th className="p-4 font-semibold">Tour</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Guests</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold rounded-tr-xl text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-gray-100 hover:bg-slate-50/50 transition">
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{booking.userId?.name}</div>
                      <div className="text-sm text-slate-500">{booking.userId?.email}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{booking.tourId?.title || 'Unknown Tour'}</td>
                    <td className="p-4 text-slate-600">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="p-4 text-slate-600">{booking.numberOfPeople}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${booking.status === 'approved' ? 'bg-green-100 text-green-700' : 
                          booking.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                          'bg-red-100 text-red-700'}
                      `}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateBookingStatus(booking._id, 'approved')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Approve"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button 
                            onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Cancel"
                          >
                            <XCircle size={20} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
