import React from 'react';
import { Link } from "react-router-dom";

const NavbarDesktop = () => (
  <header className="hidden md:flex justify-between items-center px-6 py-4 bg-gray-900 shadow-md">
    <h1 className="text-xl font-bold text-teal-400">Sweet Track</h1>
    <nav className="space-x-6">
      <Link
        to="/dashboard"
        className="text-teal-400 font-semibold hover:text-orange-400 transition-colors duration-200"
      >
        Dashboard
      </Link>
      
      <Link
  to="/record"
  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
>
  Records
</Link>

<Link
  to="/medicine"
  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
>
  Medicine
</Link>

      <Link
        to="/addentry"
        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
      >
        Add Medicine
      </Link>

<Link
        to="/addrecord"
        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
      >
        Add Record
      </Link>

      
<Link
        to="/account"
        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
      >
        Account
      </Link>

      <Link
        to="/"
        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
      >
        Logout
      </Link> 

      
    </nav>
  </header>
);

export default NavbarDesktop;
