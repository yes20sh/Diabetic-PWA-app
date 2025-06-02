


import React, { useState } from 'react';

const AddEntryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    type: '',
    time: '',
    notify: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Medicine Entry:', formData);
    alert('Medicine saved successfully!');
    // Reset or route accordingly
  };

  return (
    <section className="p-4 mt-6 bg-black rounded-lg shadow-lg max-w-md mx-auto text-white">
      <h1 className="text-2xl font-bold text-teal-400">Add New Medicine</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Medicine Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="e.g. Insulin"
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
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-orange-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. 10u or 500 mg"
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
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-cyan-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="e.g. Insulin - Long-acting"
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
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        {/* Notification Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notify"
            checked={formData.notify}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-teal-500 bg-gray-800 border-gray-600 focus:ring-teal-500"
          />
          <label className="text-sm text-gray-300">Enable Notifications</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 transition-colors duration-200 text-white py-3 rounded-xl font-semibold"
        >
          Save Medicine
        </button>
      </form>
    </section>
  );
};

export default AddEntryForm;
