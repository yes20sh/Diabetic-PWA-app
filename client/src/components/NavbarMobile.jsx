
import React, { useState } from 'react';
import { FiHome, FiClipboard, FiPlus, FiUser, FiBox } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NavbarMobile = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleAddClick = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black shadow-lg flex justify-between items-center px-6 py-3 md:hidden z-50">
      
      {/* Left Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center text-teal-400 text-xs hover:text-white transition-all duration-200"
        >
          <FiHome className="text-xl mb-1" />
          Dashboard
        </button>
        <button
          onClick={() => navigate('/medicine')}
          className="flex flex-col items-center text-yellow-400 text-xs hover:text-teal-400 transition-all duration-200"
        >
          <FiBox className="text-xl mb-1" />
          Medicine
        </button>
      </div>

      {/* Center Add Button with Popup */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/3 flex flex-col items-center justify-center">
        {showOptions && (
          <div className="flex flex-col items-center gap-2 mb-2 animate-fade-in">
            <button
              className="bg-gray-900 text-teal-400 hover:text-white hover:scale-105 px-4 py-1 rounded-md text-sm border border-teal-600 shadow transition-all"
              onClick={() => {
                navigate('/addrecord');
                setShowOptions(false);
              }}
            >
              + Add Record
            </button>
            <button
              className="bg-gray-900 text-teal-400 hover:text-white hover:scale-105 px-4 py-1 rounded-md text-sm border border-teal-600 shadow transition-all"
              onClick={() => {
                navigate('/addentry');
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
          className="bg-teal-600 text-black p-4 rounded-full shadow-lg border-4 border-black hover:bg-teal-700 hover:scale-110 transition-all duration-200"
          aria-label="Add new entry"
        >
          <FiPlus className="text-2xl" />
        </button>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate('/record')}
          className="flex flex-col items-center text-yellow-400 text-xs hover:text-teal-400 transition-all duration-200"
        >
          <FiClipboard className="text-xl mb-1" />
          Records
        </button>
        <button
          onClick={() => navigate('/account')}
          className="flex flex-col items-center text-yellow-400 text-xs hover:text-teal-400 transition-all duration-200"
        >
          <FiUser className="text-xl mb-1" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default NavbarMobile;

