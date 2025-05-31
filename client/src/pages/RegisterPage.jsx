import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        alert('Registration successful!');
        // Optionally reset form or navigate
        setFormData({ fullname: '', email: '', username: '', password: '' });
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#000000] p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
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
              className="w-full mt-1 p-2 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
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
              className="w-full mt-1 p-2 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
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
              className="w-full mt-1 p-2 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
              placeholder="yourusername"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-pink-200 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-300 text-sm"
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
