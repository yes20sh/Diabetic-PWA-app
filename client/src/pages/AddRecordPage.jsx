import React from 'react';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import AddRecord from '../components/addrecord';
const AddRecordPage = () => {
  return (
    <div className="bg-gradient-to-br from-black via-black to-black min-h-screen pb-20 overflow-auto scrollbar-hide text-white">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-400 mb-6">
          Add New Glucose Record
        </h1>
        <AddRecord />
      </main>
    </div>
  );
};

export default AddRecordPage;
