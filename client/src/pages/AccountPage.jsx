import React from 'react';
import { MdEdit, MdLogout, MdLock } from 'react-icons/md';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';

const AccountPage = () => {
  const userData = {
    name: 'John Doe',
    username: 'johnd123',
    email: 'john@example.com',
  };

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <NavbarDesktop />
      <NavbarMobile />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <h1 className="text-3xl font-bold text-teal-400 mb-7">Account Settings</h1>

        {/* Info Cards */}
        <div className="space-y-6">
          {/* Name */}
          <div className="bg-gray-900 p-5 rounded-xl flex justify-between items-center shadow-md">
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
            </div>
            <button className="text-yellow-400 hover:bg-yellow-800 p-2 rounded-full transition">
              <MdEdit className="text-xl" />
            </button>
          </div>

          {/* Username */}
          <div className="bg-gray-900 p-5 rounded-xl flex justify-between items-center shadow-md">
            <div>
              <p className="text-sm text-gray-400">Username</p>
              <h2 className="text-xl font-semibold">{userData.username}</h2>
            </div>
            <button className="text-yellow-400 hover:bg-yellow-800 p-2 rounded-full transition">
              <MdEdit className="text-xl" />
            </button>
          </div>

          {/* Email */}
          <div className="bg-gray-900 p-5 rounded-xl flex justify-between items-center shadow-md">
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <h2 className="text-xl font-semibold">{userData.email}</h2>
            </div>
            <button className="text-yellow-400 hover:bg-yellow-800 p-2 rounded-full transition">
              <MdEdit className="text-xl" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-5 rounded-xl text-sm shadow-md transition">
            <MdLock className="text-lg" />
            Change Password
          </button>

          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-5 rounded-xl text-sm shadow-md transition">
            <MdLogout className="text-lg" />
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
