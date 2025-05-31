import React from 'react';
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full gap-8 p-6 sm:p-10 rounded-xl shadow-2xl bg-[#0d0d0d]">
        
        {/* Left Side - Image */}
        <div className="flex items-center justify-center">
          <img
            src="Diabetes-amico-removebg-preview.png" 
            alt="Health Monitoring"
            className="w-full max-w-md"
          />
        </div>

        {/* Right Side - Text + Buttons */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font text-teal-400 mb-4 pt-sans">
            Track Your Sugar, Own Your Health.
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-8">
            Stay one step ahead with your diabetic insights—smart, simple, and secure.
            Join our health-conscious community today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-800 text-white py-3 px-6 rounded-lg font-semibold text-sm sm:text-base text-center transition duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto border border-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-semibold text-sm sm:text-base text-center transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
