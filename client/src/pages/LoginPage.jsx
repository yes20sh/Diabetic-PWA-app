import React, { useState, useEffect } from 'react';

const LoginPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-3">
      {loading ? (
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-purple-500 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <span className="text-purple-600 font-medium text-sm">Loading...</span>
        </div>
      ) : (
        <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-sm">
          <h2 className="text-lg font-semibold text-purple-600 mb-4 text-center">
            Sign in to Glucose Monitor
          </h2>
          <form className="space-y-3">
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
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium text-sm transition"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-3">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-purple-600 font-medium hover:underline">Register</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
