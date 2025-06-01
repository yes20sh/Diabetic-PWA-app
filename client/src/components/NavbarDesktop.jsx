// import React from 'react';

// const NavbarDesktop = () => (
//   <header className="hidden md:flex justify-between items-center px-6 py-4 bg-white shadow">
//     <h1 className="text-xl font-bold text-purple-600">Sweet Track</h1>
//     <nav className="space-x-4">
//       <a href="#" className="text-purple-600 font-semibold">Dashboard</a>
//       <a href="#" className="text-gray-700">Records</a>
//       <a href="#" className="text-gray-700">Add Entry</a>
//       <a href="#" className="text-gray-700">Settings</a>
//     </nav>
//   </header>
// );

// export default NavbarDesktop;


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
        to="/addentry"
        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
      >
        Add Entry
      </Link>
      <a
        href="#"
        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
      >
        Settings
      </a>


       <a
        href="#"
        className="text-gray-300 hover:text-red-400 transition-colors duration-200"
      >
        Logout
      </a>

      
    </nav>
  </header>
);

export default NavbarDesktop;
