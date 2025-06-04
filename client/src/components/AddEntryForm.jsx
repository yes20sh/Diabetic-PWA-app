import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper to convert "hh:mm AM/PM" to "HH:mm"
function to24Hour(time12h) {
  if (!time12h) return '';
  if (/^\d{2}:\d{2}$/.test(time12h)) return time12h; // Already in 24-hour format
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier && modifier.toUpperCase() === 'PM') hours = String(parseInt(hours, 10) + 12);
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

const AddEntryForm = ({ medicineId }) => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    type: '',
    time: '',
    notification: false,
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getAuthToken = () => localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    const fetchMedicine = async () => {
      if (!medicineId) return;

      setLoading(true);
      setError('');
      try {
        const token = getAuthToken();
        const response = await fetch(`http://localhost:5000/medicine/${medicineId}`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || response.statusText);
          setLoading(false);
          return;
        }

        setFormData({
          name: data.name || '',
          dosage: data.dosage || '',
          type: data.type || '',
          time: to24Hour(data.time),
          notification: data.notification || false,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [medicineId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getAuthToken();
    const url = medicineId
      ? `http://localhost:5000/medicine/${medicineId}`
      : 'http://localhost:5000/medicine';

    const method = medicineId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        alert(`Failed to ${medicineId ? 'update' : 'save'} medicine: ${result.error || response.statusText}`);
        return;
      }

      setSuccess(true);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleAddMore = () => {
    setFormData({
      name: '',
      dosage: '',
      type: '',
      time: '',
      notification: false,
    });
    setSuccess(false);
  };

  const handleViewAll = () => {
    navigate('/medicine');
  };

  if (loading) {
    return (
      <section className="p-4 mt-6 bg-black rounded-lg shadow-lg max-w-md mx-auto text-white">
        <p className="text-center text-gray-400">Loading medicine details...</p>
      </section>
    );
  }

  return (
    <section className="p-4 mt-6 bg-black rounded-lg shadow-lg max-w-md mx-auto text-white">
      <h1 className="text-3xl text-center font-bold text-teal-400">
        {medicineId ? 'Edit Medicine' : 'Add New Medicine'}
      </h1>

      {error && (
        <div className="mt-4 text-center text-red-400 font-semibold">
          {error}
        </div>
      )}

      {success ? (
        <div className="mt-6 space-y-4 text-center">
          <p className="text-green-400 font-semibold">
            ✅ Medicine {medicineId ? 'updated' : 'saved'} successfully!
          </p>
          {!medicineId && (
            <button
              onClick={handleAddMore}
              className="w-full bg-teal-600 hover:bg-teal-700 transition-colors duration-200 text-white py-3 rounded-xl font-semibold"
            >
              + Add More
            </button>
          )}
          <button
            onClick={handleViewAll}
            className="w-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-white py-3 rounded-xl font-semibold"
          >
            📋 View All Medicines
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Medicine Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-600 text-gray-100"
              required
            />
          </div>

          {/* Dosage */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Dosage</label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-orange-600 text-gray-100"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-cyan-600 text-gray-100"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-600 text-gray-100"
              required
            />
          </div>

          {/* Notification */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="notification"
              checked={formData.notification}
              onChange={handleChange}
              className="h-5 w-5 text-teal-500 focus:ring-teal-400 border-gray-300 rounded"
            />
            <label htmlFor="notification" className="text-sm text-gray-300">
              Enable notification
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 transition-colors duration-200 text-white py-3 rounded-xl font-semibold"
          >
            {medicineId ? 'Update Medicine' : 'Save Medicine'}
          </button>
        </form>
      )}
    </section>
  );
};

export default AddEntryForm;
