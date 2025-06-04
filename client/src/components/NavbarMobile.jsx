import React, { useState } from 'react';
import { FiHome, FiClipboard, FiPlus, FiUser, FiBox, FiX } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const NavbarMobile = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddClick = () => {
    setShowOptions((prev) => !prev);
  };

  // Helper to check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Blur background when popup open */}
      {showOptions && (
        <div
          onClick={() => setShowOptions(false)}
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40"
        />
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black shadow-lg flex justify-between items-center px-6 py-3 md:hidden z-50">
        
        {/* Left Buttons */}
        <div className="flex gap-6 flex-1 justify-start">
          <button
            onClick={() => {
              navigate('/dashboard');
              setShowOptions(false);
            }}
            className={`flex flex-col items-center text-xs transition-all duration-200 ${
              isActive('/dashboard') ? 'text-teal-400' : 'text-white'
            } hover:text-teal-400`}
          >
            <FiHome className="text-xl mb-1" />
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate('/medicine');
              setShowOptions(false);
            }}
            className={`flex flex-col items-center text-xs transition-all duration-200 ${
              isActive('/medicine') ? 'text-teal-400' : 'text-white'
            } hover:text-teal-400`}
          >
            <FiBox className="text-xl mb-1" />
            Medicine
          </button>
        </div>

        {/* Center Add Button */}
        <div className="flex-1 flex justify-center relative -translate-y-3">
          <button
            type="button"
            onClick={handleAddClick}
            className="bg-teal-600 text-black p-4 rounded-full shadow-lg border-4 border-black hover:bg-teal-700 hover:scale-110 transition-all duration-200 z-50"
            aria-label={showOptions ? 'Close add options' : 'Add new entry'}
          >
            {showOptions ? <FiX className="text-2xl" /> : <FiPlus className="text-2xl" />}
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-6 flex-1 justify-end">
          <button
            onClick={() => {
              navigate('/record');
              setShowOptions(false);
            }}
            className={`flex flex-col items-center text-xs transition-all duration-200 ${
              isActive('/record') ? 'text-teal-400' : 'text-white'
            } hover:text-teal-400`}
          >
            <FiClipboard className="text-xl mb-1" />
            Records
          </button>
          <button
            onClick={() => {
              navigate('/account');
              setShowOptions(false);
            }}
            className={`flex flex-col items-center text-xs transition-all duration-200 ${
              isActive('/account') ? 'text-teal-400' : 'text-white'
            } hover:text-teal-400`}
          >
            <FiUser className="text-xl mb-1" />
            Account
          </button>
        </div>
      </nav>

      {/* Center popup with add options */}
      {showOptions && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-6">
          <button
            className="bg-gray-900 text-teal-400 hover:text-white hover:scale-105 px-6 py-3 rounded-md text-lg border border-teal-600 shadow transition-all"
            onClick={() => {
              navigate('/addrecord');
              setShowOptions(false);
            }}
          >
            + Add Record
          </button>
          <button
            className="bg-gray-900 text-teal-400 hover:text-white hover:scale-105 px-6 py-3 rounded-md text-lg border border-teal-600 shadow transition-all"
            onClick={() => {
              navigate('/addmedicine');
              setShowOptions(false);
            }}
          >
            + Add Medicine
          </button>
        </div>
      )}
    </>
  );
};

export default NavbarMobile;
