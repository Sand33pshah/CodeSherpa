import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
      <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100 text-center max-w-lg w-full">
        <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Payment Successful!</h1>
        <p className="text-lg text-slate-600 mb-8">
          Thank you for your booking. Your tour has been successfully reserved, and a confirmation email has been sent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/dashboard" 
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition shadow-md"
          >
            View Dashboard
          </Link>
          <Link 
            to="/tours" 
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-8 rounded-xl transition"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
