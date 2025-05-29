import React from 'react';
import { FiHome, FiClipboard, FiPlus, FiUser, FiBox } from 'react-icons/fi';

const NavbarMobile = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-6 py-3 md:hidden z-50">
    <div className="flex gap-6">
      <button className="flex flex-col items-center text-purple-600 font-semibold text-sm">
        <FiHome className="text-xl mb-1" />
        Dashboard
      </button>
      <button className="flex flex-col items-center text-gray-600 text-sm">
        <FiBox className="text-xl mb-1" />
        Medicine
      </button>
    </div>

    {/* Center Add Button */}
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
      <button className="bg-purple-600 text-white p-4 rounded-full shadow-lg border-4 border-white">
        <FiPlus className="text-2xl" />
      </button>
    </div>

    <div className="flex gap-6">
      <button className="flex flex-col items-center text-gray-600 text-sm">
        <FiClipboard className="text-xl mb-1" />
        Records
      </button>
      <button className="flex flex-col items-center text-gray-600 text-sm">
        <FiUser className="text-xl mb-1" />
        Account
      </button>
    </div>
  </nav>
);

export default NavbarMobile;
