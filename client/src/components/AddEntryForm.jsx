import React from 'react';

const AddEntryForm = () => (
  <section className="p-4 mt-6">
    <h1 className="text-2xl font-bold text-purple-700">Add New Entry</h1>
    <form className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Glucose (mg/dL)</label>
        <input
          type="number"
          className="w-full mt-1 p-2 border border-purple-300 rounded-lg"
          placeholder="Enter value"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Medicine</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border border-pink-300 rounded-lg"
          placeholder="e.g. Insulin - 10u"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="datetime-local"
          className="w-full mt-1 p-2 border border-indigo-300 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 rounded-xl font-semibold"
      >
        Save Entry
      </button>
    </form>
  </section>
);

export default AddEntryForm;
