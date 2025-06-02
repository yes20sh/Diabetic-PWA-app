import React, { useState } from 'react';

const AddRecord = () => {
  const [recordData, setRecordData] = useState({
    date: '',
    fasting: '',
    fastingTime: '',
    afterLunch: '',
    afterLunchTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Glucose Record:', recordData);
    alert('Record saved successfully!');
    // Reset form or route as needed
  };

  return (
    <section className="p-4 mt-6 bg-black rounded-lg shadow-lg max-w-md mx-auto text-white">
      <h1 className="text-2xl font-bold text-teal-400">Add Glucose Record</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Date</label>
          <input
            type="date"
            name="date"
            value={recordData.date}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        {/* Fasting Glucose */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Fasting Glucose (mg/dL)</label>
          <input
            type="number"
            name="fasting"
            value={recordData.fasting}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-orange-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. 95"
            required
          />
        </div>

        {/* Fasting Time */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Fasting Time</label>
          <input
            type="time"
            name="fastingTime"
            value={recordData.fastingTime}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-cyan-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        {/* After Lunch Glucose */}
        <div>
          <label className="block text-sm font-medium text-gray-300">After Lunch Glucose (mg/dL)</label>
          <input
            type="number"
            name="afterLunch"
            value={recordData.afterLunch}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-lime-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400"
            placeholder="e.g. 145"
            required
          />
        </div>

        {/* After Lunch Time */}
        <div>
          <label className="block text-sm font-medium text-gray-300">After Lunch Time</label>
          <input
            type="time"
            name="afterLunchTime"
            value={recordData.afterLunchTime}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 transition-colors duration-200 text-white py-3 rounded-xl font-semibold"
        >
          Save Record
        </button>
      </form>
    </section>
  );
};

export default AddRecord;
