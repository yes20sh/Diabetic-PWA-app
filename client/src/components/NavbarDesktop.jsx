import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

const NavbarDesktop = () => {
  const activeClass = "text-teal-400 font-semibold";
  const inactiveClass = "text-white hover:text-teal-400 transition-colors duration-200";
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Call your backend logout endpoint
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      // Remove any client-side tokens if used
      localStorage.removeItem('token');
      // Redirect to login or home
      navigate('/login');
    } catch (error) {
      alert('Logout failed.');
    }
  };

  return (
    <header className="hidden md:flex justify-between items-center px-6 py-4 bg-gray-900 shadow-md">
      <h1 className="text-xl font-bold text-teal-400">Sweet Track</h1>
      <nav className="space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Dashboard
        </NavLink>
        
        <NavLink
          to="/record"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Records
        </NavLink>

        <NavLink
          to="/medicine"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Medicine
        </NavLink>

        <NavLink
          to="/addmedicine"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Add Medicine
        </NavLink>

        <NavLink
          to="/addrecord"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Add Record
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Account
        </NavLink>

        {/* Logout as a button */}
        <button
          onClick={handleLogout}
          className={inactiveClass + " ml-2"}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default NavbarDesktop;
