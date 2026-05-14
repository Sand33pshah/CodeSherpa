import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Map, ShieldCheck, HeartHandshake, Users, Quote } from 'lucide-react';
import TourCard from '../components/TourCard';
import api from '../utils/api';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/tours?limit=3&featured=true');
        setFeaturedTours(res.data.data);
      } catch (error) {
        console.error('Failed to fetch tours', error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop" 
            alt="Himalayas in Nepal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Discover Your Next <span className="text-primary">Himalayan</span> Adventure
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light">
            Tailored Nepal tours, trekking, and cultural holidays with local experts.
          </p>
          
          <div className="bg-white p-2 rounded-full shadow-2xl flex items-center max-w-2xl mx-auto border-4 border-white/20 backdrop-blur-md">
            <Search className="text-slate-400 ml-4" size={24} />
            <input 
              type="text" 
              placeholder="Search by destination or tour name..." 
              className="flex-grow py-3 px-4 outline-none text-slate-700 bg-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link 
              to={`/tours${searchQuery ? `?search=${searchQuery}` : ''}`}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold transition duration-300 text-lg shadow-md"
            >
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Travel Styles (Categories) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-secondary mb-4">Choose Your Travel Style</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Whether you seek thrilling mountain treks or relaxing cultural immersions, we have the perfect itinerary for you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/tours?category=Adventure" className="group relative rounded-3xl overflow-hidden h-96 shadow-md">
              <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop" alt="Real Adventures" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl font-bold text-white mb-2">Real Adventures</h3>
                <p className="text-slate-200">Trekking & Active Travel</p>
              </div>
            </Link>
            <Link to="/tours?category=Cultural" className="group relative rounded-3xl overflow-hidden h-96 shadow-md">
              <img src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop" alt="Classical Adventures" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl font-bold text-white mb-2">Classical Adventures</h3>
                <p className="text-slate-200">Sightseeing & Culture</p>
              </div>
            </Link>
            <Link to="/tours?category=Relaxation" className="group relative rounded-3xl overflow-hidden h-96 shadow-md">
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop" alt="Luxury Holidays" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl font-bold text-white mb-2">Luxury Holidays</h3>
                <p className="text-slate-200">Exclusive & Family Tours</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Core Values / Travel with confidence */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-secondary mb-4">Travel With Confidence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Our core values dictate our responsibility and behavior towards you, the environment, and the local communities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <ShieldCheck className="text-primary w-14 h-14 mb-6" />
              <h3 className="text-xl font-bold text-secondary mb-4">Safety First!</h3>
              <p className="text-slate-600 leading-relaxed">At Tours & TRAVEL safety is NUMBER ONE. Guests are the final decision makers, and all arrangements aim to make holidays a lifetime experience safely.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <HeartHandshake className="text-primary w-14 h-14 mb-6" />
              <h3 className="text-xl font-bold text-secondary mb-4">Authentic Experiences</h3>
              <p className="text-slate-600 leading-relaxed">Our focus is on organizing authentic travel experiences. All our trips are experiential, responsible, and immersive in local culture.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <Map className="text-primary w-14 h-14 mb-6" />
              <h3 className="text-xl font-bold text-secondary mb-4">Local Leaders</h3>
              <p className="text-slate-600 leading-relaxed">Our tour leaders are hospitable, friendly & skillful professionals from the local communities you travel to.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <Users className="text-primary w-14 h-14 mb-6" />
              <h3 className="text-xl font-bold text-secondary mb-4">Custom Group Size</h3>
              <p className="text-slate-600 leading-relaxed">Our Small Group Tours accommodate max 10 guests ensuring personal attention. Friend and Family Private Holidays are ideal with 2 to 12 guests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Trips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-4xl font-black text-secondary mb-2">Featured Trips</h2>
              <p className="text-slate-500 text-lg">Hand-picked itineraries loved by our guests.</p>
            </div>
            <Link to="/tours" className="hidden sm:inline-flex items-center text-primary font-bold hover:text-primary-dark transition">
              See All Trips &rarr;
            </Link>
          </div>
          
          {featuredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map(tour => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Loading featured tours or none available. Have you seeded the database?
            </div>
          )}
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/tours" className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition">
              See All Trips &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          {/* Abstract pattern background */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Recent Experiences</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Hear what our travelers have to say about their Himalayan adventures.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary-light p-8 rounded-3xl border border-slate-700 relative">
              <Quote className="absolute top-8 right-8 text-slate-600 opacity-50 w-12 h-12" />
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl font-bold mr-4">L</div>
                <div>
                  <h4 className="font-bold text-lg">Lloyd</h4>
                  <p className="text-slate-400 text-sm">United Kingdom</p>
                </div>
              </div>
              <h5 className="font-bold text-primary mb-3 text-lg">Ultimate Trip</h5>
              <p className="text-slate-300 leading-relaxed">
                "Incredible Experience! I would highly recommend Tours & TRAVEL. Very organised and very helpful through the whole Everest base camp trek... Always willing to help!"
              </p>
            </div>
            
            <div className="bg-secondary-light p-8 rounded-3xl border border-slate-700 relative">
              <Quote className="absolute top-8 right-8 text-slate-600 opacity-50 w-12 h-12" />
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl font-bold mr-4">M</div>
                <div>
                  <h4 className="font-bold text-lg">Morevish</h4>
                  <p className="text-slate-400 text-sm">Netherlands</p>
                </div>
              </div>
              <h5 className="font-bold text-primary mb-3 text-lg">Excellent travel agency</h5>
              <p className="text-slate-300 leading-relaxed">
                "I can highly recommend this travel agency. Communication is smooth and clear and the quality of services is excellent. We booked a 5 days tour and everything was very well organized."
              </p>
            </div>
            
            <div className="bg-secondary-light p-8 rounded-3xl border border-slate-700 relative">
              <Quote className="absolute top-8 right-8 text-slate-600 opacity-50 w-12 h-12" />
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl font-bold mr-4">D</div>
                <div>
                  <h4 className="font-bold text-lg">Daniel Gierlinger</h4>
                  <p className="text-slate-400 text-sm">Germany</p>
                </div>
              </div>
              <h5 className="font-bold text-primary mb-3 text-lg">Best Travel Company</h5>
              <p className="text-slate-300 leading-relaxed">
                "We took a three-week trip to Nepal with Tours & TRAVEL – and it was simply fantastic! The itinerary included ABC Tour, Chitwan, Pokhara, and Kathmandu."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Blog Preview / Ground Experiences */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-secondary mb-4">Read the Ground Experiences</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Helpful tips, guides, and cost breakdowns for your trip to Nepal.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop" alt="Blog 1" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-primary mb-2">February 12, 2026</p>
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition">Nepal Trekking Cost Breakdown 2026: Permits, Guide, Food</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop" alt="Blog 2" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-primary mb-2">February 08, 2026</p>
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition">Beginner’s Guide to Trekking in Nepal: Easy Routes, Costs</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop" alt="Blog 3" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-primary mb-2">February 02, 2026</p>
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition">Annapurna Circuit Trek | Cost & Preparation Guide</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
