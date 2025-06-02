


import React, { useState } from 'react';
import { FiHome, FiClipboard, FiPlus, FiUser, FiBox } from 'react-icons/fi';

const NavbarMobile = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleAddClick = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black shadow-lg flex justify-between items-center px-5 sm:px-6 py-3 md:hidden z-50">
      
      {/* Left Buttons */}
      <div className="flex gap-5 sm:gap-6">
        <button className="flex flex-col items-center text-teal-400 font-semibold text-xs sm:text-sm hover:text-teal-300">
          <FiHome className="text-lg sm:text-xl mb-1" />
          Dashboard
        </button>
        <button className="flex flex-col items-center text-gray-500 text-xs sm:text-sm hover:text-teal-300">
          <FiBox className="text-lg sm:text-xl mb-1" />
          Medicine
        </button>
      </div>

      {/* Center Add Button with Popup */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {showOptions && (
          <div className="flex flex-col items-center gap-2 mb-2 animate-fade-in">
            <button
              className="bg-gray-900 text-teal-400 hover:text-white px-4 py-1 rounded-md text-sm border border-teal-600 shadow"
              onClick={() => {
                alert("Add Record clicked");
                setShowOptions(false);
              }}
            >
              + Add Record
            </button>
            <button
              className="bg-gray-900 text-teal-400 hover:text-white px-4 py-1 rounded-md text-sm border border-teal-600 shadow"
              onClick={() => {
                alert("Add Medicine clicked");
                setShowOptions(false);
              }}
            >
              + Add Medicine
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddClick}
          className="bg-teal-600 text-black p-4 rounded-full shadow-lg border-4 border-black hover:bg-teal-700 transition"
          aria-label="Add new entry"
        >
          <FiPlus className="text-2xl sm:text-3xl" />
        </button>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-5 sm:gap-6">
        <button className="flex flex-col items-center text-gray-500 text-xs sm:text-sm hover:text-teal-300">
          <FiClipboard className="text-lg sm:text-xl mb-1" />
          Records
        </button>
        <button className="flex flex-col items-center text-gray-500 text-xs sm:text-sm hover:text-teal-300">
          <FiUser className="text-lg sm:text-xl mb-1" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default NavbarMobile;
