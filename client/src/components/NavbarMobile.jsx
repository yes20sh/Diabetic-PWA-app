// import React from 'react';
// import { FiHome, FiClipboard, FiPlus, FiUser, FiBox } from 'react-icons/fi';

// const NavbarMobile = () => (
//   <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-6 py-3 md:hidden z-50">
//     <div className="flex gap-6">
//       <button className="flex flex-col items-center text-purple-600 font-semibold text-sm">
//         <FiHome className="text-xl mb-1" />
//         Dashboard
//       </button>
//       <button className="flex flex-col items-center text-gray-600 text-sm">
//         <FiBox className="text-xl mb-1" />
//         Medicine
//       </button>
//     </div>

//     {/* Center Add Button */}
//     <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
//       <button className="bg-purple-600 text-white p-4 rounded-full shadow-lg border-4 border-white">
//         <FiPlus className="text-2xl" />
//       </button>
//     </div>

//     <div className="flex gap-6">
//       <button className="flex flex-col items-center text-gray-600 text-sm">
//         <FiClipboard className="text-xl mb-1" />
//         Records
//       </button>
//       <button className="flex flex-col items-center text-gray-600 text-sm">
//         <FiUser className="text-xl mb-1" />
//         Account
//       </button>
//     </div>
//   </nav>
// );

// export default NavbarMobile;







import React from 'react';
import { FiHome, FiClipboard, FiPlus, FiUser, FiBox } from 'react-icons/fi';

const NavbarMobile = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-black shadow-lg flex justify-between items-center px-5 sm:px-6 py-3 md:hidden z-50">
    <div className="flex gap-5 sm:gap-6">
      <button
        className="flex flex-col items-center text-teal-400 font-semibold text-xs sm:text-sm hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
        aria-current="page"
        type="button"
      >
        <FiHome className="text-lg sm:text-xl mb-1" />
        Dashboard
      </button>
      <button
        className="flex flex-col items-center text-gray-500 text-xs sm:text-sm hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
        type="button"
      >
        <FiBox className="text-lg sm:text-xl mb-1" />
        Medicine
      </button>
    </div>

    {/* Center Add Button */}
    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
      <button
        type="button"
        className="bg-teal-600 text-black p-4 rounded-full shadow-lg border-4 border-black hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        aria-label="Add new entry"
      >
        <FiPlus className="text-2xl sm:text-3xl" />
      </button>
    </div>

    <div className="flex gap-5 sm:gap-6">
      <button
        className="flex flex-col items-center text-gray-500 text-xs sm:text-sm hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
        type="button"
      >
        <FiClipboard className="text-lg sm:text-xl mb-1" />
        Records
      </button>
      <button
        className="flex flex-col items-center text-gray-500 text-xs sm:text-sm hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
        type="button"
      >
        <FiUser className="text-lg sm:text-xl mb-1" />
        Account
      </button>
    </div>
  </nav>
);

export default NavbarMobile;
