import React from 'react';

const NavbarDesktop = () => (
  <header className="hidden md:flex justify-between items-center px-6 py-4 bg-white shadow">
    <h1 className="text-xl font-bold text-purple-600">Glucose Monitor</h1>
    <nav className="space-x-4">
      <a href="#" className="text-purple-600 font-semibold">Dashboard</a>
      <a href="#" className="text-gray-700">Records</a>
      <a href="#" className="text-gray-700">Add Entry</a>
      <a href="#" className="text-gray-700">Settings</a>
    </nav>
  </header>
);

export default NavbarDesktop;
