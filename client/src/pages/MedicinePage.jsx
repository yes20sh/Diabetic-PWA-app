import React, { useState, useEffect } from 'react';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import { useNavigate } from 'react-router-dom';
import {
  MdDelete,
  MdEdit,
  MdAccessTime,
  MdNotificationsActive,
  MdNotificationsOff,
} from 'react-icons/md';

const API_BASE = 'http://localhost:5000/medicine';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE}/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
      }
    };

    fetchMedicines();
  }, [navigate]);

  const handleDelete = async (index) => {
    const med = medicines[index];
    if (!window.confirm(`Delete medicine "${med.name}"?`)) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/${med._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (response.ok) {
        setMedicines(medicines.filter((_, i) => i !== index));
      } else {
        const err = await response.json();
        alert(err.error || 'Failed to delete medicine');
      }
    } catch (error) {
      alert('Server error: ' + error.message);
    }
  };

  // Updated to navigate with medicine ID param
  const handleEdit = (index) => {
    const med = medicines[index];
    navigate(`/addmedicine/${med._id}`);
  };

  const handleAddMedicine = () => {
    navigate('/addmedicine');
  };

  const toggleNotification = async (index) => {
    const med = medicines[index];
    const token = getAuthToken();
    try {
      const response = await fetch(`${API_BASE}/${med._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          name: med.name,
          type: med.type,
          dosage: med.dosage,
          notification: !med.notification,
          time: med.time,
        }),
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (response.ok) {
        const { medicine } = await response.json();
        setMedicines((prev) =>
          prev.map((m, i) => (i === index ? medicine : m))
        );
      } else {
        const err = await response.json();
        alert(err.error || 'Failed to update notification');
      }
    } catch (error) {
      alert('Server error: ' + error.message);
    }
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
              key={med._id}
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

              {/* Right Section - Actions */}
              <div className="flex flex-col items-start gap-2 mt-4 sm:mt-0">
                {/* Notification Toggle */}
                <button
                  onClick={() => toggleNotification(index)}
                  className={`flex items-center justify-between text-sm text-white px-3 py-1 rounded-md ${
                    med.notification ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  style={{ minWidth: '120px' }}
                >
                  {med.notification ? 'Notify On' : 'Notify Off'}
                  {med.notification ? (
                    <MdNotificationsActive className="text-lg ml-2" />
                  ) : (
                    <MdNotificationsOff className="text-lg ml-2" />
                  )}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(index)}
                  className="flex items-center justify-between hover:bg-yellow-800 text-sm text-white bg-gray-700 px-3 py-1 rounded-md"
                  style={{ minWidth: '70px' }}
                >
                  <span>Edit</span>
                  <MdEdit className="text-lg ml-2" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center justify-between hover:bg-red-800 text-sm text-white bg-gray-700 px-3 py-1 rounded-md"
                  style={{ minWidth: '80px' }}
                >
                  <span>Delete</span>
                  <MdDelete className="text-lg ml-2" />
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
