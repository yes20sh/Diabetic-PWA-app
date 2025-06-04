import React, { useState, useEffect, useMemo } from 'react';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import RecentRecords from '../components/RecentRecords';
import { useNavigate } from 'react-router-dom';

const RecordPage = () => {
  const [visibleRecords, setVisibleRecords] = useState(10); // updated from 5 to 10
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    timeRange: '',
    year: '',
  });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://sweet-track-api.onrender.com/api/report/report', {
          credentials: 'include',
        });
        if (!res.ok) {
          if (res.status === 401) {
            setError('Unauthorized access. Please log in.');
            setRecords([]);
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch records');
        }
        const data = await res.json();
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecords(data);
      } catch (err) {
        setError(err.message || 'Error fetching records');
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [navigate]);

  const handleLoadMore = () => {
    setVisibleRecords((prev) => prev + 5);
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredRecords = useMemo(() => {
    if (!filters.timeRange) return records;

    const now = new Date();
    let startDate = null;
    let endDate = new Date();

    if (filters.timeRange === 'currentMonth') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    } else if (filters.timeRange === 'lastTwoMonths') {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Calculate start date as 2 months ago from start of current month
      const startMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
      const startYear = currentMonth - 1 < 0 ? currentYear - 1 : currentYear;

      startDate = new Date(startYear, startMonth, 1);
      endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

    } else if (filters.timeRange === 'yearly') {
      if (!filters.year) return records;
      startDate = new Date(filters.year, 0, 1);
      endDate = new Date(filters.year, 11, 31, 23, 59, 59, 999);
    }

    if (!startDate) return records;

    return records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });
  }, [filters, records]);

  const handleFilterApply = () => {
    setVisibleRecords(10); // reset visible count on filter apply
    setFilterVisible(false);
  };

  const handleAddRecord = () => {
    navigate('/addrecord');
  };

  return (
    <div className="bg-gradient-to-br from-black via-black to-black min-h-screen pb-20 overflow-auto scrollbar-hide text-white relative">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
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

        {filterVisible && (
          <div className="bg-gray-800 p-4 rounded-xl mb-6 space-y-4">
            {/* Time Range Dropdown */}
            <div>
              <label
                className="block mb-1 font-semibold text-teal-300"
                htmlFor="timeRange"
              >
                Time Range
              </label>
              <select
                id="timeRange"
                name="timeRange"
                value={filters.timeRange}
                onChange={handleFilterChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="">Select time range</option>
                <option value="currentMonth">Current Month</option>
                <option value="lastTwoMonths">Last 2 Months</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Year dropdown only if yearly is selected */}
            {filters.timeRange === 'yearly' && (
              <div>
                <label
                  className="block mb-1 font-semibold text-teal-300"
                  htmlFor="year"
                >
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                >
                  <option value="">Select year</option>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleFilterApply}
                className="bg-teal-500 hover:bg-teal-700 px-4 py-2 rounded text-white font-semibold"
              >
                Apply Filter
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading records...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : (
          <>
            <RecentRecords
              data={filteredRecords.slice(0, visibleRecords)}
              filters={filters}
              visibleCount={visibleRecords}
            />

            {filteredRecords.length > visibleRecords && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleLoadMore}
                  className="text-teal-400 underline hover:text-teal-300 transition duration-200"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default RecordPage;
