import React, { useState } from 'react';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import { useNavigate } from 'react-router-dom';
import {
  MdNotificationsActive,
  MdNotificationsOff,
  MdAccessTime,
  MdDelete,
  MdEdit,
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

  const navigate = useNavigate(); // ✅ moved here

  const toggleNotify = (index) => {
    const updated = [...medicines];
    updated[index].notify = !updated[index].notify;
    setMedicines(updated);
  };

  const handleDelete = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  const handleEdit = (index) => {
    alert(`Edit medicine at index ${index}`);
  };

  const handleAddMedicine = () => {
    navigate('/addentry'); // ✅ works correctly now
  };

  return (
    <div className="bg-black min-h-screen pb-20 text-white">
      <NavbarDesktop />
      <NavbarMobile />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-teal-400">
            Medicine Management
          </h1>
          <button
            onClick={handleAddMedicine}
            className="bg-teal-500 text-white px-4 py-2 rounded-xl text-sm shadow-md"
          >
            + Add Medicine
          </button>
        </div>

        {/* Medicine Cards */}
        <div className="flex flex-col gap-4">
          {medicines.map((med, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-4 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              {/* Left Section */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-orange-400">{med.name}</h2>
                <p className="text-sm text-gray-300">
                  <span className="text-gray-400 font-medium">Dosage:</span> {med.dosage}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-gray-400 font-medium">Type:</span> {med.type}
                </p>
                <div className="flex items-center text-sm text-gray-300 mt-1">
                  <MdAccessTime className="text-teal-400 mr-2 text-lg" />
                  {med.time}
                </div>
              </div>

              {/* Right Section - Buttons Line by Line */}
              <div className="flex flex-col items-start gap-2 mt-4 sm:mt-0">
                {/* Notification */}
                <button
                  onClick={() => toggleNotify(index)}
                  className="flex items-center gap-2 hover:bg-blue-800  text-sm text-white bg-gray-700 px-3 py-1 rounded-md"
                >
                  {med.notify ? <MdNotificationsActive className="text-lg" /> : <MdNotificationsOff className="text-lg" />}
                  {med.notify ? 'Notifications On' : 'Notifications Off'}
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(index)}
                  className="flex items-center gap-2 hover:bg-yellow-800 text-sm text-white bg-gray-700 px-3 py-1 rounded-md"
                >
                  <MdEdit className="text-lg" />
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(index)}
                  className=" flex items-center gap-2 hover:bg-red-800 text-sm text-white bg-gray-700 px-3 py-1 rounded-md"
                >
                  <MdDelete className="text-lg " />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MedicinePage;
