import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link to="/" className="text-3xl font-black tracking-tight text-white flex items-center mb-6">
              <span className="text-primary mr-1">Tours & TRAVEL</span>
            </Link>
            <p className="mb-6 leading-relaxed">
              Discover tailored Nepal and Himalayan tours with expert guides, cultural experiences, trekking, family holidays and responsible travel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center hover:bg-primary hover:text-white transition font-bold text-sm">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center hover:bg-primary hover:text-white transition font-bold text-sm">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center hover:bg-primary hover:text-white transition font-bold text-sm">
                IG
              </a>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6">About Us</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-primary transition">Who We Are</Link></li>
              <li><Link to="#" className="hover:text-primary transition">Leader and Guides</Link></li>
              <li><Link to="#" className="hover:text-primary transition">Responsible Travel</Link></li>
              <li><Link to="#" className="hover:text-primary transition">Partner with Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Office & Contacts</Link></li>
            </ul>
          </div>

          {/* Booking & Info */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6">Booking & Info</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="hover:text-primary transition">Travel Styles</Link></li>
              <li><Link to="#" className="hover:text-primary transition">How to Book?</Link></li>
              <li><Link to="#" className="hover:text-primary transition">Terms and Conditions</Link></li>
              <li><Link to="#" className="hover:text-primary transition">Borders and Visa Info</Link></li>
              <li><Link to="#" className="hover:text-primary transition">Tourist Seasons in Nepal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-primary mr-3 mt-1 shrink-0" size={20} />
                <span>Thamel Marg, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-primary mr-3 shrink-0" size={20} />
                <a href="tel:+9779841697870" className="hover:text-primary transition">+977 9841697870</a>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-3 shrink-0" size={20} />
                <a href="mailto:info@n0travel.com" className="hover:text-primary transition">info@n0travel.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Tours & TRAVEL Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
