import React, { useState } from 'react';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import RecentRecords from '../components/RecentRecords';

const RecordPage = () => {
  const [visibleRecords, setVisibleRecords] = useState(5);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    fastingTime: '',
    afterLunchTime: ''
  });

  const handleLoadMore = () => {
    setVisibleRecords((prev) => prev + 5);
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterApply = () => {
    // For now just log, you can apply filter logic later in RecentRecords
    console.log('Applied filters:', filters);
    alert('Filters applied (not yet functional)');
  };

  const handleAddRecord = () => {
    alert("Redirect to add record page/form!");
  };

  return (
    <div className="bg-gradient-to-br from-black via-black to-black min-h-screen pb-20 overflow-auto scrollbar-hide text-white relative">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-teal-400">
            Glucose Records
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={toggleFilter}
              className="bg-gray-800 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm shadow-md transition"
            >
              Filter
            </button>
            <button
              onClick={handleAddRecord}
              className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm shadow-md transition"
            >
              + Add Record
            </button>
          </div>
        </div>
{/* Filter Form */}
{filterVisible && (
  <div className="bg-gray-800 p-4 rounded-xl mb-6 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm text-gray-300 mb-1">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fastingTime" className="text-sm text-gray-300 mb-1">Fasting Time</label>
        <input
          type="time"
          id="fastingTime"
          name="fastingTime"
          value={filters.fastingTime}
          onChange={handleFilterChange}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="afterLunchTime" className="text-sm text-gray-300 mb-1">After Lunch Time</label>
        <input
          type="time"
          id="afterLunchTime"
          name="afterLunchTime"
          value={filters.afterLunchTime}
          onChange={handleFilterChange}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none"
        />
      </div>
    </div>

    <div className="flex justify-end pt-2">
      <button
        onClick={handleFilterApply}
        className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm shadow-md transition"
      >
        Apply Filter
      </button>
    </div>
  </div>
)}


        <RecentRecords visibleCount={visibleRecords} filters={filters} />

        {/* Show More Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleLoadMore}
            className="text-teal-400 underline hover:text-teal-300 transition duration-200"
          >
            Show More
          </button>
        </div>
      </main>
    </div>
  );
};

export default RecordPage;
