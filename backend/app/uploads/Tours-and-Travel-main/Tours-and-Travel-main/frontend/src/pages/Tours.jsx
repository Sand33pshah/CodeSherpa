import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import TourCard from '../components/TourCard';
import { Search, Filter } from 'lucide-react';

const Tours = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';
  const initialCategory = queryParams.get('category') || '';

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  
  // Advanced filters
  const [maxPrice, setMaxPrice] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        let query = '/tours?';
        if (category) query += `category=${category}&`;
        if (maxPrice) query += `price[lte]=${maxPrice}&`;
        if (maxDuration) query += `duration[lte]=${maxDuration}&`;
        
        const res = await api.get(query);
        let fetchedTours = res.data.data;
        
        // Client side search for title/location
        if (searchTerm) {
          fetchedTours = fetchedTours.filter(tour => 
            tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            tour.location.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        setTours(fetchedTours);
      } catch (error) {
        console.error('Error fetching tours', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [category, searchTerm, maxPrice, maxDuration]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h1 className="text-4xl font-bold text-slate-800">Explore Destinations</h1>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center text-primary font-bold bg-white px-4 py-2 rounded-full shadow-sm"
            >
              <Filter size={18} className="mr-2" /> Filters
            </button>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  className="pl-10 w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                <select 
                  className="p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 w-48"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Relaxation">Relaxation</option>
                  <option value="Wildlife">Wildlife</option>
                </select>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">Max Price:</span>
                  <input 
                    type="number" 
                    placeholder="$ Any" 
                    className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 w-28"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">Max Days:</span>
                  <input 
                    type="number" 
                    placeholder="Any" 
                    className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 w-28"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden flex flex-col gap-4 pt-4 border-t border-gray-100">
                <select 
                  className="p-3 rounded-xl border border-gray-200 bg-white w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Relaxation">Relaxation</option>
                </select>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Max Price ($)</label>
                    <input 
                      type="number" 
                      placeholder="Any" 
                      className="p-3 rounded-xl border border-gray-200 w-full"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Max Duration (Days)</label>
                    <input 
                      type="number" 
                      placeholder="Any" 
                      className="p-3 rounded-xl border border-gray-200 w-full"
                      value={maxDuration}
                      onChange={(e) => setMaxDuration(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No tours found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;
