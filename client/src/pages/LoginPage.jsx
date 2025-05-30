import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add authentication logic here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4">
      {loading ? (
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-teal-200 mb-2"
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
          <span className="text-teal-100 font-medium text-sm">Loading...</span>
        </div>
      ) : (
        <div className="bg-black p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-teal-400 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-sm text-white mb-6">
            Let's login to continue tracking your sugar levels.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="text-right text-xs text-zinc-300 mt-1 hover:underline">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-800 text-white py-2 rounded-lg font-medium transition duration-200 text-sm sm:text-base"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center my-5">
            <hr className="flex-grow border-gray-700" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <button className="w-full flex items-center justify-center border border-gray-600 text-white rounded-lg py-2 hover:bg-gray-800 transition duration-200">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-zinc-300 mt-5">
            Don’t have an account?{' '}
            <Link to="/register" className="text-teal-400 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
