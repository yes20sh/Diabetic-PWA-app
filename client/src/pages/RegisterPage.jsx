import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setRegistrationSuccess(true);
        setFormData({ fullname: '', email: '', username: '', password: '' });
      } else {
        setError(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#000000] p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
        {registrationSuccess ? (
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold text-teal-400 mb-4">Registration Successful!</h2>
            <p className="mb-6">Your account has been created successfully.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-teal-600 hover:bg-teal-800 text-white py-2 rounded-lg font-medium transition duration-200"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-center text-xl sm:text-2xl font-bold text-teal-400 mb-4">
              Create Your Account
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-orange-400">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-600 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-orange-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-600 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-orange-400">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-600 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                  placeholder="yourusername"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-orange-400">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-600 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base pr-10"
                  placeholder="••••••••"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[46px] transform -translate-y-1/2 cursor-pointer text-white hover:text-teal-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}

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
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
