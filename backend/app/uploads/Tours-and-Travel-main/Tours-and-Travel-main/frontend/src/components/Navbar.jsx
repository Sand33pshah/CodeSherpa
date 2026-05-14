import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Phone, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-secondary text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="mailto:info@n0travel.com" className="flex items-center hover:text-primary transition">
              <Mail size={16} className="mr-2" /> info@n0travel.com
            </a>
            <a href="tel:+9779841697870" className="flex items-center hover:text-primary transition">
              <Phone size={16} className="mr-2" /> +977 9841697870
            </a>
          </div>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:text-primary transition">About Us</Link>
            <Link to="/contact" className="hover:text-primary transition">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tight text-secondary flex items-center">
          <span className="text-primary mr-1">Tours & TRAVEL</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-secondary-light">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/tours" className="hover:text-primary transition">All Tours</Link>
          
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="flex items-center hover:text-primary transition">
              Travel Style <ChevronDown size={16} className="ml-1" />
            </span>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                <Link to="/tours?category=Adventure" className="block px-6 py-3 hover:bg-gray-50 hover:text-primary transition">Real Adventures (Trekking)</Link>
                <Link to="/tours?category=Cultural" className="block px-6 py-3 hover:bg-gray-50 hover:text-primary transition">Classical Adventures</Link>
                <Link to="/tours?category=Relaxation" className="block px-6 py-3 hover:bg-gray-50 hover:text-primary transition">Luxury Holidays</Link>
                <Link to="/tours" className="block px-6 py-3 hover:bg-gray-50 hover:text-primary transition">Weekend & Week-long Trips</Link>
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-primary transition">About Us</Link>

          {user ? (
            <div className="flex items-center space-x-4 ml-4">
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-secondary hover:text-primary transition font-semibold">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-5 py-2 rounded-full transition font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 ml-4">
              <Link to="/login" className="text-secondary hover:text-primary transition font-semibold">Login</Link>
              <Link to="/register" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full transition shadow-md shadow-primary/20 font-semibold">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-secondary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg absolute w-full animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-4 font-medium text-secondary-light">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/tours" onClick={() => setIsOpen(false)}>All Tours</Link>
            <Link to="/tours?category=Adventure" onClick={() => setIsOpen(false)}>Real Adventures</Link>
            <Link to="/tours?category=Cultural" onClick={() => setIsOpen(false)}>Classical Adventures</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-4">
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="text-primary font-bold">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
