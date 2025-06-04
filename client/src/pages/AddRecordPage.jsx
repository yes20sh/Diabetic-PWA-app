import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import AddRecord from '../components/AddRecord';

const AddRecordPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFromQuery = queryParams.get('id') || '';

  return (
    <div className="bg-gradient-to-br from-black via-black to-black min-h-screen pb-20 overflow-auto scrollbar-hide text-white">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <AddRecord recordId={idFromQuery} />
      </main>
    </div>
  );
};

export default AddRecordPage;
