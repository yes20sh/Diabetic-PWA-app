import React from 'react';
import { useParams } from 'react-router-dom';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import AddEntryForm from '../components/AddEntryForm';

// This page is protected by JWT authentication (see backend setup)[1].
function AddMedicinePage() {
  // Get the medicine id from the URL if present (for edit mode)
  const { id = null } = useParams();

  return (
    <div className="bg-gradient-to-br from-black via-black to-black min-h-screen pb-20 overflow-auto scrollbar-hide text-white">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* AddEntryForm handles both add and edit modes depending on medicineId */}
        <AddEntryForm medicineId={id} />
      </main>
    </div>
  );
}

export default AddMedicinePage;
