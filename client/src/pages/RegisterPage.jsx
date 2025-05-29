import React from 'react';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-3">
      <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold text-purple-600 mb-4 text-center">
          Create Your Glucose Monitor Account
        </h2>
        <form className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
              placeholder="you@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-pink-200 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-300 text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-pink-200 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-300 text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium text-sm transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 mt-3">
          Already have an account?{' '}
          <a href="/" className="text-purple-600 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
