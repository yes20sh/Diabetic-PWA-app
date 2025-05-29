import React, { useState } from 'react';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import {
  MdNotificationsActive,
  MdNotificationsOff,
  MdAccessTime,
  MdDelete,
} from 'react-icons/md';

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([
    {
      name: 'Insulin',
      dosage: '10u',
      type: 'Insulin - Long-acting',
      time: '08:00 AM',
      notify: true,
    },
    {
      name: 'Metformin',
      dosage: '500 mg',
      type: 'Tablet',
      time: '12:30 PM',
      notify: false,
    },
    {
      name: 'Insulin',
      dosage: '6u',
      type: 'Insulin - Rapid',
      time: '06:45 PM',
      notify: true,
    },
  ]);

  const toggleNotify = (index) => {
    const updated = [...medicines];
    updated[index].notify = !updated[index].notify;
    setMedicines(updated);
  };

  const handleDelete = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  return (
    <>
         {/* Navbar: Desktop & Tablet */}
      <NavbarDesktop />
      {/* Navbar: Mobile */}
      <NavbarMobile />
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mt-6 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">Medicine Management</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-semibold">
          + Add Medicine
        </button>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto space-y-6">
        {medicines.map((med, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <div className="text-xl font-bold text-purple-800 mb-2">{med.name}</div>
            <div className="text-sm text-gray-700 mb-1">
              <strong>Dosage:</strong> {med.dosage}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <strong>Type:</strong> {med.type}
            </div>

            <div className="flex items-center text-sm text-gray-700 mb-2">
              <MdAccessTime className="text-purple-600 mr-2 text-lg" />
              {med.time}
            </div>

            <button
              onClick={() => toggleNotify(index)}
              className="flex items-center text-sm text-purple-600 hover:text-purple-800 mb-2"
            >
              {med.notify ? (
                <>
                  <MdNotificationsActive className="mr-2 text-lg" />
                  Notifications On
                </>
              ) : (
                <>
                  <MdNotificationsOff className="mr-2 text-lg" />
                  Notifications Off
                </>
              )}
            </button>

            <button
              onClick={() => handleDelete(index)}
              className="flex items-center text-sm text-red-500 hover:text-red-700"
            >
              <MdDelete className="mr-2 text-lg" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MedicinePage;
