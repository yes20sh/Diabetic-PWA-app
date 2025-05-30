import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add actual registration logic here if needed
    navigate('/'); // Redirect after registration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#000000] p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
        <h2 className="text-center text-xl sm:text-2xl font-bold text-teal-400 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-sm text-gray-300 mb-1">
          Join us to start monitoring your sugar levels smartly and securely,
        </p>
        <p className="text-center text-sm text-teal-500 mb-6">
          One Step Closer to Managing Your Sugar Smartly!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-400">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-400">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
              placeholder="you@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-400">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-400">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-800 text-white py-2 rounded-lg font-medium transition duration-200 text-sm sm:text-base"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-zinc-300 mt-5">
          Already have an account?{' '}
          <Link to="/" className="text-teal-400 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
