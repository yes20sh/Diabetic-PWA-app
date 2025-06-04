import React from 'react';
import { useNavigate } from 'react-router-dom';

const getStatusColor = (value) => {
  if (value >= 180) return 'text-red-500';
  if (value >= 140) return 'text-orange-500';
  if (value >= 70) return 'text-teal-400';
  return 'text-blue-400';
};

const getStatus = (value) => {
  if (value >= 180) return 'Very High';
  if (value >= 140) return 'High';
  if (value >= 70) return 'In Range';
  return 'Low';
};

const getQuarterMonths = (quarter) => {
  switch (quarter) {
    case 'Q1': return [0, 1, 2];
    case 'Q2': return [3, 4, 5];
    case 'Q3': return [6, 7, 8];
    case 'Q4': return [9, 10, 11];
    default: return [];
  }
};

const RecentRecords = ({ data = [], filters = {}, visibleCount }) => {
  const navigate = useNavigate();
  const { timeRange, year, quarter } = filters;

  // Filter records by selected time range
  const filteredData = data.filter((record) => {
    if (!record.date) return false;
    const recordDate = new Date(record.date);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (!timeRange) return true;

    if (timeRange === 'currentMonth') {
      return (
        recordDate.getFullYear() === currentYear &&
        recordDate.getMonth() === currentMonth
      );
    }

    if (timeRange === 'quarterly') {
      if (!year || !quarter) return true;
      const filterYear = parseInt(year, 10);
      const qMonths = getQuarterMonths(quarter);
      return (
        recordDate.getFullYear() === filterYear &&
        qMonths.includes(recordDate.getMonth())
      );
    }

    if (timeRange === 'yearly') {
      if (!year) return true;
      const filterYear = parseInt(year, 10);
      return recordDate.getFullYear() === filterYear;
    }

    return true;
  });

  const visibleData = filteredData.slice(0, visibleCount);

  return (
    <section className="p-4 mt-6 bg-gray-900 rounded-lg shadow-lg max-w-full">
      <h1 className="text-2xl font-bold text-teal-400 mb-4">Recent Records</h1>

      <div
        className="overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
            th.sticky-col, td.sticky-col {
              position: sticky;
              left: 0;
              background: #1a202c;
              z-index: 10;
              border-right: 1px solid #2d3748;
              color: #4fd1c5;
            }
            thead tr {
              background-color: #2d3748;
              color: #4fd1c5;
            }
            tbody tr {
              border-bottom: 1px solid #4a5568;
            }
            tbody tr:last-child {
              border-bottom: none;
            }
            .update-button {
              cursor: pointer;
              transition: background-color 0.2s ease;
            }
            .update-button:hover {
              background-color: #4d7c0f; /* Slightly darker lime green */
            }
          `}
        </style>

        <table className="min-w-full rounded-lg">
          <thead>
            <tr>
              <th className="sticky-col py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-left font-semibold">Fasting (mg/dL)</th>
              <th className="py-3 px-4 text-left font-semibold">Fasting Time</th>
              <th className="py-3 px-4 text-left font-semibold">Fasting Status</th>
              <th className="py-3 px-4 text-left font-semibold">After Lunch (mg/dL)</th>
              <th className="py-3 px-4 text-left font-semibold">After Lunch Time</th>
              <th className="py-3 px-4 text-left font-semibold">After Lunch Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-400">
                  No records found for selected filter.
                </td>
              </tr>
            ) : (
              visibleData.map((record) => {
                const dateObj = new Date(record.date);
                // Full readable date e.g. "Jun 4, 2025"
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                const fastingTestValue = record.fastingTest ?? null;
                const afterLunchTestValue = record.afterLunchTest ?? null;

                const hasAfterLunch = afterLunchTestValue !== null && afterLunchTestValue !== undefined && afterLunchTestValue !== '';

                return (
                  <tr key={record._id || record.date}>
                    <td className="sticky-col py-3 px-4 font-semibold">{formattedDate}</td>
                    <td className="py-3 px-4 text-gray-300">{fastingTestValue !== null ? fastingTestValue : '--'}</td>
                    <td className="py-3 px-4 text-gray-300">{record.fastingTime || '--'}</td>
                    <td className={`py-3 px-4 font-semibold ${getStatusColor(fastingTestValue)}`}>
                      {record.fastingStatus || getStatus(fastingTestValue)}
                    </td>

                    <td className="py-3 px-4 text-gray-300">
                      {hasAfterLunch ? (
                        afterLunchTestValue
                      ) : (
                        <button
                          onClick={() => navigate(`/addrecord?id=${record._id}`)}
                          className="update-button text-sm bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-md"
                          aria-label={`Add after lunch glucose for ${formattedDate}`}
                        >
                          Add
                        </button>
                      )}
                    </td>

                    <td className="py-3 px-4 text-gray-300">{hasAfterLunch ? record.afterLunchTime || '--' : '--'}</td>

                    <td className="py-3 px-4 font-semibold">
                      {hasAfterLunch ? (
                        <span className={getStatusColor(afterLunchTestValue)}>
                          {record.afterLunchStatus || getStatus(afterLunchTestValue)}
                        </span>
                      ) : (
                        '--'
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentRecords;
